/**
 * CodeElement Integration Tests
 *
 * Tests the <syntax-code> web component with auto-loading
 *
 * Note: These tests focus on the integration between Syntax.js and Language classes
 * without requiring a full browser environment. Full end-to-end tests with stylesheets
 * and DOM rendering are better suited for browser-based testing.
 */

import {test} from 'node:test';
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';
import Syntax from '../../Syntax.js';

// Set up JSDOM environment
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
	url: 'http://localhost:8000/'
});

global.window = dom.window;
global.document = dom.window.document;
global.HTMLElement = dom.window.HTMLElement;
global.customElements = dom.window.customElements;
global.CustomEvent = dom.window.CustomEvent;

test('Syntax.highlight() registers the web component', async () => {
	// This should register the <syntax-code> element
	await Syntax.highlight({upgradeAll: false});

	// Verify the element is registered
	const constructor = customElements.get('syntax-code');
	assert.ok(constructor, 'syntax-code element should be registered');

	// Verify we can create an instance
	const element = new constructor();
	assert.ok(element instanceof HTMLElement);
});

test('Auto-loading mechanism loads YAML language on demand', async () => {
	const syntax = Syntax.default;

	// YAML should not be loaded yet
	assert.ok(!syntax.hasLanguage('yaml'), 'YAML should not be loaded initially');

	// Request the YAML language
	const language = await syntax.getResource('yaml');

	// Verify it was loaded and cached
	assert.ok(language, 'Language should be loaded');
	assert.equal(language.name, 'yaml', 'Language name should be yaml');
	assert.ok(syntax.hasLanguage('yaml'), 'YAML should now be cached');

	// Requesting again should return the same instance
	const language2 = await syntax.getResource('yaml');
	assert.equal(language2, language, 'Should return cached instance');
});

test('Auto-loading deduplicates concurrent requests', async () => {
	const syntax = new Syntax();

	// Make multiple concurrent requests for the same language
	const [lang1, lang2, lang3] = await Promise.all([
		syntax.getResource('python'),
		syntax.getResource('python'),
		syntax.getResource('python')
	]);

	// All should return the same instance
	assert.equal(
		lang1,
		lang2,
		'Concurrent request 1 and 2 should return same instance'
	);
	assert.equal(
		lang2,
		lang3,
		'Concurrent request 2 and 3 should return same instance'
	);
	assert.equal(lang1.name, 'python');
});

test('Language registration works correctly', async () => {
	const syntax = new Syntax();

	// Load CSS which uses the register() pattern
	const language = await syntax.getResource('css');

	// Verify it's registered under the correct name
	assert.ok(syntax.hasLanguage('css'));
	assert.equal(language.name, 'css');

	// Verify we can process code with it
	const html = await language.process(syntax, 'body { color: red; }');
	assert.ok(html instanceof HTMLElement);
	assert.ok(html.outerHTML.includes('color'));
	assert.ok(html.outerHTML.includes('red'));
});

test('Language.process() with multiple languages', async () => {
	const syntax = Syntax.default;

	// Load multiple languages
	const python = await syntax.getResource('python');
	const yaml = await syntax.getResource('yaml');
	const css = await syntax.getResource('css');

	// Process code in each language
	const pythonHtml = await python.process(syntax, 'def hello(): pass');
	const yamlHtml = await yaml.process(syntax, 'key: value');
	const cssHtml = await css.process(syntax, 'a { color: blue; }');

	// Verify all returned HTML elements
	assert.ok(pythonHtml instanceof HTMLElement);
	assert.ok(yamlHtml instanceof HTMLElement);
	assert.ok(cssHtml instanceof HTMLElement);

	// Verify they contain the expected content
	assert.ok(pythonHtml.textContent.includes('def'));
	assert.ok(yamlHtml.textContent.includes('key'));
	assert.ok(cssHtml.textContent.includes('color'));
});

test('Error handling for non-existent language', async () => {
	const syntax = new Syntax();

	// Try to load a language that doesn't exist
	await assert.rejects(
		async () => await syntax.getResource('nonexistent-language-xyz'),
		{
			name: 'LanguageLoadError',
			message: /Failed to load language 'nonexistent-language-xyz'/
		},
		'Should throw LanguageLoadError for non-existent language'
	);
});

test('Aliases work correctly', async () => {
	const syntax = new Syntax();

	// Load bash-script language and check it registered bash-statement too
	const bashScript = await syntax.getResource('bash-script');

	// bash-statement should also be available (registered by bash-script)
	assert.ok(syntax.hasLanguage('bash-statement'));

	// Load clang which has multiple aliases
	const clang = await syntax.getResource('clang');

	// Check aliases
	assert.ok(syntax.hasLanguage('c'));
	assert.ok(syntax.hasLanguage('cpp'));
	assert.ok(syntax.hasLanguage('c++'));
	assert.ok(syntax.hasLanguage('objective-c'));

	// All aliases should resolve to the same language
	const c = await syntax.getResource('c');
	const cpp = await syntax.getResource('cpp');
	assert.equal(c, clang);
	assert.equal(cpp, clang);
});

test('upgradeAll handles <pre><code> blocks without double-nesting', async () => {
	// Import the upgradeAll function
	const {upgradeAll} = await import('../../Syntax/CodeElement.js');

	// Create a typical code block structure: <pre><code>
	document.body.innerHTML = `
		<div id="test-container">
			<pre><code class="language-javascript">const x = 1;</code></pre>
		</div>
	`;

	// Run upgradeAll
	upgradeAll('code[class*="language-"]');

	const container = document.getElementById('test-container');

	// Check that the syntax-code element was created
	const syntaxCode = container.querySelector('syntax-code');
	assert.ok(syntaxCode, 'syntax-code element should be created');

	// Check that syntax-code is INSIDE the <pre> (replacing <code>)
	const pre = container.querySelector('pre');
	assert.ok(pre, '<pre> should still exist in the container');
	assert.equal(
		syntaxCode.parentElement,
		pre,
		'syntax-code should be child of <pre>'
	);

	// Verify the language was set correctly
	assert.equal(
		syntaxCode.getAttribute('language'),
		'javascript',
		'Language should be set from class name'
	);

	// Verify the code content is preserved
	assert.equal(
		syntaxCode.textContent.trim(),
		'const x = 1;',
		'Code content should be preserved'
	);

	// Verify wrap attribute is set (because it's inside <pre>)
	// Note: This happens in connectedCallback, which may not fire in JSDOM
	// We'll just verify structure for now
});

test('upgradeAll can handle standalone <code> blocks with custom selector', async () => {
	const {upgradeAll} = await import('../../Syntax/CodeElement.js');

	// Create a standalone code block (no <pre> wrapper)
	document.body.innerHTML = `
		<div id="test-container">
			<code class="language-python">print("hello")</code>
		</div>
	`;

	// For standalone code blocks, use a selector without 'pre >'
	upgradeAll('code[class*="language-"]');

	const container = document.getElementById('test-container');
	const syntaxCode = container.querySelector('syntax-code');

	assert.ok(syntaxCode, 'syntax-code element should be created');
	assert.equal(
		syntaxCode.parentElement.tagName,
		'DIV',
		'syntax-code should be child of DIV'
	);
	assert.equal(
		syntaxCode.getAttribute('language'),
		'python',
		'Language should be set'
	);
	assert.equal(
		syntaxCode.textContent.trim(),
		'print("hello")',
		'Code content should be preserved'
	);
});

test('upgradeAll preserves and highlights code containing markup', async () => {
	const {upgradeAll} = await import('../../Syntax/CodeElement.js');

	document.body.innerHTML = `
		<code class="language-ruby">class <a href="/source/Foo">Foo</a></code>
	`;

	upgradeAll('code[class*="language-"]');

	const element = document.querySelector('syntax-code');
	await element.ready;

	const sourceLink = element.querySelector('a');
	const renderedLink = element.shadowRoot.querySelector('a');

	assert.equal(element.textContent, 'class Foo');
	assert.equal(sourceLink.getAttribute('href'), '/source/Foo');
	assert.equal(renderedLink.getAttribute('href'), '/source/Foo');
	assert.equal(renderedLink.textContent, 'Foo');
	assert.ok(
		renderedLink.closest('.type'),
		'linked source should still receive syntax highlighting'
	);
});

test('upgradeAll preserves nested markup structure', async () => {
	const {upgradeAll} = await import('../../Syntax/CodeElement.js');

	document.body.innerHTML = `
		<code class="language-ruby"><a href="/source/Foo"><strong>Foo</strong>::Bar</a></code>
	`;

	upgradeAll('code[class*="language-"]');

	const element = document.querySelector('syntax-code');
	await element.ready;

	const renderedLink = element.shadowRoot.querySelector('a');
	const renderedStrong = renderedLink.querySelector('strong');

	assert.equal(renderedLink.getAttribute('href'), '/source/Foo');
	assert.equal(renderedLink.textContent, 'Foo::Bar');
	assert.equal(renderedStrong.textContent, 'Foo');
	assert.ok(renderedStrong.closest('.type'));
	assert.equal(renderedLink.querySelectorAll('.type').length, 2);
});

test('upgradeAll preserves markup spanning multiple lines', async () => {
	const {upgradeAll} = await import('../../Syntax/CodeElement.js');

	document.body.innerHTML =
		'<code class="language-ruby"><a href="/source/Foo">Foo\nBar</a></code>';

	upgradeAll('code[class*="language-"]');

	const element = document.querySelector('syntax-code');
	await element.ready;

	const renderedLinks = [...element.shadowRoot.querySelectorAll('a')];

	assert.equal(element.lineCount, 2);
	assert.deepEqual(
		renderedLinks.map(link => link.textContent),
		['Foo\n', 'Bar']
	);
	assert.ok(
		renderedLinks.every(link => link.getAttribute('href') === '/source/Foo')
	);
});

test('syntax-code preserves markup when re-rendering', async () => {
	await import('../../Syntax/CodeElement.js');

	document.body.innerHTML =
		'<syntax-code language="ruby"><a href="/source/Foo" data-kind="class">Foo</a></syntax-code>';

	const element = document.querySelector('syntax-code');
	await element.ready;

	const firstLink = element.shadowRoot.querySelector('a');
	assert.equal(firstLink.getAttribute('href'), '/source/Foo');
	assert.equal(firstLink.dataset.kind, 'class');

	element.language = 'python';
	await element.ready;

	const secondLink = element.shadowRoot.querySelector('a');
	assert.notEqual(secondLink, firstLink);
	assert.equal(secondLink.getAttribute('href'), '/source/Foo');
	assert.equal(secondLink.dataset.kind, 'class');
	assert.equal(secondLink.textContent, 'Foo');
});

test('syntax-code behaves semantically like <code> when inline', async () => {
	const {CodeElement} = await import('../../Syntax/CodeElement.js');

	// Create an inline syntax-code element
	document.body.innerHTML = `
		<p id="test-container">
			Some text <syntax-code language="javascript">const x = 1;</syntax-code> more text.
		</p>
	`;

	const element = document.querySelector('syntax-code');

	// Wait for rendering to complete
	await new Promise(resolve => setTimeout(resolve, 100));

	// Verify it's inline (like <code>) by checking the shadow DOM structure
	const shadowRoot = element.shadowRoot;
	assert.ok(shadowRoot, 'Shadow root should exist');

	// Should contain a <code> element, not wrapped in <pre>
	const codeElement = shadowRoot.querySelector('code');
	assert.ok(codeElement, 'Shadow DOM should contain <code> element');

	const preElement = shadowRoot.querySelector('pre');
	assert.equal(
		preElement,
		null,
		'Shadow DOM should NOT contain <pre> wrapper for inline usage'
	);

	// The code element should be a direct child of shadow root
	assert.ok(
		Array.from(shadowRoot.children).includes(codeElement),
		'<code> should be direct child of shadow root'
	);
});

test('syntax-code behaves as block when inside <pre>', async () => {
	const {CodeElement} = await import('../../Syntax/CodeElement.js');

	// Create a block syntax-code element inside <pre>
	document.body.innerHTML = `
		<div id="test-container">
			<pre><syntax-code language="javascript">const x = 1;</syntax-code></pre>
		</div>
	`;

	const element = document.querySelector('syntax-code');

	// Wait for rendering to complete
	await new Promise(resolve => setTimeout(resolve, 100));

	// Check that wrap attribute was set (because it's inside <pre>)
	assert.ok(
		element.hasAttribute('wrap'),
		'wrap attribute should be set when inside <pre>'
	);

	// After rendering, light DOM is cleared, so check shadow DOM
	const shadowRoot = element.shadowRoot;
	const codeElement = shadowRoot.querySelector('code');
	assert.ok(codeElement, 'Shadow DOM should contain <code> element');

	// The <code> should be a direct child of shadow root (no <pre> wrapper needed inside)
	assert.ok(
		Array.from(shadowRoot.children).includes(codeElement),
		'<code> should be direct child of shadow root'
	);
});

test('ready promise resolves after rendering completes', async () => {
	document.body.innerHTML = `
		<syntax-code language="javascript">const x = 1;\nconst y = 2;</syntax-code>
	`;

	const element = document.querySelector('syntax-code');

	// ready should be a Promise
	assert.ok(element.ready instanceof Promise, 'ready should be a Promise');

	// Awaiting it should not hang
	await element.ready;

	// After ready resolves, the shadow root should exist and contain rendered content
	const shadowRoot = element.shadowRoot;
	assert.ok(shadowRoot, 'Shadow root should exist after ready');
	assert.ok(
		shadowRoot.querySelector('code'),
		'Shadow DOM should contain <code> after ready'
	);
});

test('ready promise resets and re-resolves when language attribute changes', async () => {
	document.body.innerHTML = `
		<syntax-code language="javascript">const x = 1;</syntax-code>
	`;

	const element = document.querySelector('syntax-code');
	await element.ready;

	const firstReady = element.ready;

	// Change the language attribute — this resets the ready promise
	element.setAttribute('language', 'python');

	// The promise should have been replaced
	assert.notEqual(
		element.ready,
		firstReady,
		'ready should be a new Promise after attribute change'
	);

	// The new promise should also resolve
	await element.ready;
	assert.ok(
		element.shadowRoot.querySelector('code'),
		'Shadow DOM should be re-rendered'
	);
});

test('lineCount returns 0 before element is connected', async () => {
	const {CodeElement} = await import('../../Syntax/CodeElement.js');
	const element = new CodeElement();
	assert.equal(element.lineCount, 0, 'lineCount should be 0 before connection');
});

test('lineCount returns the number of rendered lines after ready', async () => {
	const threeLineCode = 'const a = 1;\nconst b = 2;\nconst c = 3;';

	document.body.innerHTML = `
		<syntax-code language="javascript">${threeLineCode}</syntax-code>
	`;

	const element = document.querySelector('syntax-code');
	await element.ready;

	assert.ok(
		element.lineCount > 0,
		'lineCount should be greater than 0 after rendering'
	);
	assert.equal(
		element.lineCount,
		element.shadowRoot.querySelector('code').children.length,
		'lineCount should match actual child count'
	);
});

test('getLineBoundingClientRect returns null before element is connected', async () => {
	const {CodeElement} = await import('../../Syntax/CodeElement.js');
	const element = new CodeElement();
	assert.equal(
		element.getLineBoundingClientRect(1),
		null,
		'Should return null before shadow DOM exists'
	);
});

test('getLineBoundingClientRect returns null for out-of-range line numbers', async () => {
	document.body.innerHTML = `
		<syntax-code language="javascript">const x = 1;</syntax-code>
	`;

	const element = document.querySelector('syntax-code');
	await element.ready;

	assert.equal(
		element.getLineBoundingClientRect(0),
		null,
		'Line 0 (below 1-based range) should return null'
	);
	assert.equal(
		element.getLineBoundingClientRect(-1),
		null,
		'Negative line number should return null'
	);

	const count = element.lineCount;
	assert.equal(
		element.getLineBoundingClientRect(count + 1),
		null,
		'Line beyond lineCount should return null'
	);
});

test('getLineBoundingClientRect returns a DOMRect for valid line numbers', async () => {
	const twoLineCode = 'const a = 1;\nconst b = 2;';

	document.body.innerHTML = `
		<syntax-code language="javascript">${twoLineCode}</syntax-code>
	`;

	const element = document.querySelector('syntax-code');
	await element.ready;

	const count = element.lineCount;
	assert.ok(count >= 1, 'Should have at least one rendered line');

	for (let i = 1; i <= count; i++) {
		const rect = element.getLineBoundingClientRect(i);
		assert.ok(rect !== null, `Line ${i} should return a DOMRect, not null`);
		assert.ok(
			typeof rect.top === 'number',
			'DOMRect should have a numeric top property'
		);
		assert.ok(
			typeof rect.height === 'number',
			'DOMRect should have a numeric height property'
		);
	}
});
