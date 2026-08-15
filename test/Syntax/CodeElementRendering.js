/**
 * Regression tests for preserving code content while syntax highlighting loads.
 */

import {test} from 'node:test';
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';
import Syntax from '../../Syntax.js';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
	url: 'http://localhost:8000/'
});

global.window = dom.window;
global.document = dom.window.document;
global.Document = dom.window.Document;
global.HTMLElement = dom.window.HTMLElement;
global.customElements = dom.window.customElements;
global.CustomEvent = dom.window.CustomEvent;

function createDeferredSyntax() {
	let resolveLanguage;

	const language = {
		name: 'test',
		async process(syntax, source) {
			const code = document.createElement('code');
			code.textContent = source;
			return code;
		}
	};

	const languagePromise = new Promise(resolve => {
		resolveLanguage = resolve;
	});

	return {
		syntax: {
			defaultOptions: {theme: 'base'},
			themeRoot: 'http://localhost:8000/themes/base/',
			getLanguage() {
				return languagePromise;
			},
			async getStyleSheet() {
				return {cssText: ''};
			}
		},
		release() {
			resolveLanguage(language);
		}
	};
}

test(
	'source content remains visible until highlighting completes',
	{timeout: 1000},
	async t => {
		const previousSyntax = Syntax.default;
		const deferred = createDeferredSyntax();

		t.after(() => {
			Syntax.default = previousSyntax;
			deferred.release();
		});

		document.body.innerHTML =
			'<pre><code class="language-test">first line\nsecond line</code></pre>';

		await Syntax.highlight({syntax: deferred.syntax});

		const element = document.querySelector('syntax-code');
		assert.ok(element, 'syntax-code element should be created');
		assert.equal(element.textContent, 'first line\nsecond line');
		assert.ok(
			element.shadowRoot.querySelector('slot'),
			'source should remain visible through a slot'
		);

		deferred.release();
		await element.ready;

		assert.equal(element.shadowRoot.querySelector('slot'), null);
		assert.equal(element.textContent, '');
		assert.equal(
			element.shadowRoot.querySelector('code').textContent,
			'first line\nsecond line'
		);
	}
);

test(
	'rendering failures preserve source content and settle readiness',
	{timeout: 1000},
	async t => {
		const previousSyntax = Syntax.default;
		const warning = console.warn;

		t.after(() => {
			Syntax.default = previousSyntax;
			console.warn = warning;
		});

		console.warn = () => {};

		const syntax = {
			defaultOptions: {theme: 'base'},
			themeRoot: 'http://localhost:8000/themes/base/',
			async getLanguage() {
				throw new Error('Language load failed');
			}
		};

		document.body.innerHTML =
			'<pre><code class="language-test">original source</code></pre>';

		await Syntax.highlight({syntax});

		const element = document.querySelector('syntax-code');
		await element.ready;

		assert.equal(element.textContent, 'original source');
		assert.ok(element.shadowRoot.querySelector('slot'));
		assert.equal(element.shadowRoot.querySelector('code'), null);
	}
);
