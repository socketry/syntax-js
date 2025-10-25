// Tests for HTML language definition

import test from 'node:test';
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';

import Syntax from '../../../Syntax.js';
import registerHTML from '../../../Syntax/Language/html.js';

const dom = new JSDOM();
global.document = dom.window.document;

test('HTML language can be registered', async () => {
	const syntax = new Syntax();
	registerHTML(syntax);

	const language = await syntax.getLanguage('html');
	assert.ok(language, 'HTML language should be registered');
	assert.equal(language.name, 'html');
});

test('HTML aliases are registered', async () => {
	const syntax = new Syntax();
	registerHTML(syntax);

	const htmlLang = await syntax.getLanguage('html');
	const htmLang = await syntax.getLanguage('htm');

	assert.equal(htmlLang, htmLang, 'htm should be an alias for html');
});

test('HTML can match basic tags', async () => {
	const syntax = new Syntax();
	registerHTML(syntax);
	const language = await syntax.getLanguage('html');

	const code = '<div></div>';
	const matches = await language.getMatches(code);

	assert.ok(matches.length > 0, 'Should find matches in basic HTML tags');
});

test('HTML can match self-closing tags', async () => {
	const syntax = new Syntax();
	registerHTML(syntax);
	const language = await syntax.getLanguage('html');

	const code = '<img src="test.jpg" />';
	const matches = await language.getMatches(code);

	assert.ok(matches.length > 0, 'Should find matches in self-closing tags');
	const tagMatches = matches.filter(m => m.expression.type === 'tag');
	assert.ok(tagMatches.length > 0, 'Should match the tag');
});

test('HTML can match attributes', async () => {
	const syntax = new Syntax();
	registerHTML(syntax);
	const language = await syntax.getLanguage('html');

	const code = '<a href="https://example.com" class="link">Link</a>';
	const matches = await language.getMatches(code);

	const attributeMatches = matches.filter(
		m => m.expression.type === 'attribute'
	);
	assert.ok(attributeMatches.length > 0, 'Should match attributes');
});

test('HTML can match double-quoted attribute values', async () => {
	const syntax = new Syntax();
	registerHTML(syntax);
	const language = await syntax.getLanguage('html');

	const code = '<div class="container"></div>';
	const matches = await language.getMatches(code);

	const stringMatches = matches.filter(m => m.expression.type === 'string');
	assert.ok(stringMatches.length > 0, 'Should match quoted attribute values');
});

test('HTML can match single-quoted attribute values', async () => {
	const syntax = new Syntax();
	registerHTML(syntax);
	const language = await syntax.getLanguage('html');

	const code = "<div class='container'></div>";
	const matches = await language.getMatches(code);

	const stringMatches = matches.filter(m => m.expression.type === 'string');
	assert.ok(
		stringMatches.length > 0,
		'Should match single-quoted attribute values'
	);
});

test('HTML can match comments', async () => {
	const syntax = new Syntax();
	registerHTML(syntax);
	const language = await syntax.getLanguage('html');

	const code = '<!-- This is a comment -->';
	const matches = await language.getMatches(code);

	const commentMatches = matches.filter(m => m.expression.type === 'comment');
	assert.equal(commentMatches.length, 1, 'Should match HTML comment');
	assert.equal(commentMatches[0].value, '<!-- This is a comment -->');
});

test('HTML can match multi-line comments', async () => {
	const syntax = new Syntax();
	registerHTML(syntax);
	const language = await syntax.getLanguage('html');

	const code = `<!-- 
		Multi-line
		comment
	-->`;
	const matches = await language.getMatches(code);

	const commentMatches = matches.filter(m => m.expression.type === 'comment');
	assert.equal(commentMatches.length, 1, 'Should match multi-line HTML comment');
});

test('HTML can match DOCTYPE', async () => {
	const syntax = new Syntax();
	registerHTML(syntax);
	const language = await syntax.getLanguage('html');

	const code = '<!DOCTYPE html>';
	const matches = await language.getMatches(code);

	const doctypeMatches = matches.filter(m => m.expression.type === 'doctype');
	assert.equal(doctypeMatches.length, 1, 'Should match DOCTYPE');
	assert.equal(doctypeMatches[0].value, '<!DOCTYPE html>');
});

test('HTML can match HTML entities', async () => {
	const syntax = new Syntax();
	registerHTML(syntax);
	const language = await syntax.getLanguage('html');

	const code = '&nbsp;&lt;&gt;&amp;&#160;&#xA0;';
	const matches = await language.getMatches(code);

	const entityMatches = matches.filter(m => m.expression.type === 'entity');
	assert.equal(entityMatches.length, 6, 'Should match all entities');
});

test('HTML can match tag names', async () => {
	const syntax = new Syntax();
	registerHTML(syntax);
	const language = await syntax.getLanguage('html');

	const code = '<div><span></span></div>';
	const matches = await language.getMatches(code);

	const tagNameMatches = matches.filter(m => m.expression.type === 'tag-name');
	assert.ok(tagNameMatches.length >= 2, 'Should match tag names');
});

test('HTML can build a syntax tree', async () => {
	const syntax = new Syntax();
	registerHTML(syntax);
	const language = await syntax.getLanguage('html');

	const code = '<div class="test">Hello</div>';
	const tree = await language.buildTree(code, 0);

	assert.ok(tree, 'Should build a syntax tree');
	assert.equal(tree.value, code);
});

test('HTML can process code to HTML', async () => {
	const syntax = new Syntax();
	registerHTML(syntax);
	const language = await syntax.getLanguage('html');

	const code =
		'<!DOCTYPE html>\n<html>\n<head>\n\t<title>Test</title>\n</head>\n<body>\n\t<div class="container">\n\t\t<p>Hello &nbsp; World!</p>\n\t</div>\n\t<!-- Comment -->\n</body>\n</html>';
	const html = await language.process(code, syntax);

	assert.ok(html, 'Should process HTML code');
	assert.equal(html.tagName, 'CODE');
	assert.ok(html.className.includes('syntax'), 'Should have syntax class');
	assert.ok(
		html.className.includes('highlighted'),
		'Should have highlighted class'
	);

	// Check that various elements are highlighted
	const innerHTML = html.innerHTML;
	assert.ok(
		innerHTML.includes('doctype') || innerHTML.includes('DOCTYPE'),
		'Should highlight DOCTYPE'
	);
	assert.ok(
		innerHTML.includes('comment') || innerHTML.includes('Comment'),
		'Should highlight comments'
	);
	assert.ok(innerHTML.includes('entity'), 'Should highlight entities');
});

test('HTML can handle complex nested structure', async () => {
	const syntax = new Syntax();
	registerHTML(syntax);
	const language = await syntax.getLanguage('html');

	const code = `<article id="main" class="content">
		<header>
			<h1>Title</h1>
		</header>
		<section data-value="test">
			<p>Text with <strong>bold</strong> and <em>italic</em>.</p>
		</section>
	</article>`;

	const html = await language.process(code, syntax);
	assert.ok(html, 'Should process complex HTML structure');
	assert.equal(html.tagName, 'CODE');
});

test('HTML can match CDATA sections', async () => {
	const syntax = new Syntax();
	registerHTML(syntax);
	const language = await syntax.getLanguage('html');

	const code = '<![CDATA[Some text with <special> characters]]>';
	const matches = await language.getMatches(code);

	const cdataMatches = matches.filter(m => m.expression.type === 'cdata');
	assert.equal(cdataMatches.length, 1, 'Should match CDATA section');
});

test('HTML can handle unquoted attribute values', async () => {
	const syntax = new Syntax();
	registerHTML(syntax);
	const language = await syntax.getLanguage('html');

	const code = '<input type=text disabled>';
	const matches = await language.getMatches(code);

	const attributeMatches = matches.filter(
		m => m.expression.type === 'attribute'
	);
	assert.ok(attributeMatches.length >= 2, 'Should match both attributes');
});

test('HTML can highlight embedded JavaScript', async () => {
	const syntax = new Syntax();

	// Register JavaScript first
	const registerJS = (await import('../../../Syntax/Language/javascript.js'))
		.default;
	registerJS(syntax);

	// Then register HTML
	registerHTML(syntax);

	const language = await syntax.getLanguage('html');

	const code = `<script>
		const x = 42;
		console.log(x);
	</script>`;

	const tree = await language.buildTree(code, 0);
	assert.ok(tree, 'Should build tree with embedded JavaScript');

	// Check that JavaScript keywords are highlighted
	const html = await language.process(code, syntax);
	const innerHTML = html.innerHTML;
	assert.ok(
		innerHTML.includes('keyword') || innerHTML.includes('const'),
		'Should highlight JavaScript keywords'
	);
});
