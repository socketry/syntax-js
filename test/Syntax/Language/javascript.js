/**
 * Tests for JavaScript language definition
 */

import {test} from 'node:test';
import assert from 'node:assert';
import {JSDOM} from 'jsdom';

// Setup DOM environment
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;

import Syntax from '../../../Syntax.js';
import registerJavaScript from '../../../Syntax/Language/javascript.js';

test('JavaScript language can be registered', async () => {
	const syntax = new Syntax();
	registerJavaScript(syntax);
	const language = await syntax.getLanguage('javascript');
	assert.ok(language);
	assert.strictEqual(language.name, 'javascript');
});

test('JavaScript aliases are registered', async () => {
	const syntax = new Syntax();
	registerJavaScript(syntax);
	assert.ok(syntax.getLanguage('js'));
	assert.ok(syntax.getLanguage('jsx'));
});

test('JavaScript can match keywords', async () => {
	const syntax = new Syntax();
	registerJavaScript(syntax);
	const language = await syntax.getLanguage('javascript');

	const code = 'const x = 42;';
	const matches = await language.getMatches(code, syntax);

	const keywordMatch = matches.find(m => m.type === 'keyword');
	assert.ok(keywordMatch);
	assert.strictEqual(
		code.substring(
			keywordMatch.offset,
			keywordMatch.offset + keywordMatch.length
		),
		'const'
	);
});

test('JavaScript can match strings', async () => {
	const syntax = new Syntax();
	registerJavaScript(syntax);
	const language = await syntax.getLanguage('javascript');

	const code = 'const s = "hello";';
	const matches = await language.getMatches(code, syntax);

	const stringMatch = matches.find(m => m.type === 'string');
	assert.ok(stringMatch);
	assert.strictEqual(
		code.substring(stringMatch.offset, stringMatch.offset + stringMatch.length),
		'"hello"'
	);
});

test('JavaScript can match single-quoted strings', async () => {
	const syntax = new Syntax();
	registerJavaScript(syntax);
	const language = await syntax.getLanguage('javascript');

	const code = "const s = 'world';";
	const matches = await language.getMatches(code, syntax);

	const stringMatch = matches.find(m => m.type === 'string');
	assert.ok(stringMatch);
	assert.strictEqual(
		code.substring(stringMatch.offset, stringMatch.offset + stringMatch.length),
		"'world'"
	);
});

test('JavaScript can match template literals', async () => {
	const syntax = new Syntax();
	registerJavaScript(syntax);
	const language = await syntax.getLanguage('javascript');

	const code = 'const s = `template`;';
	const matches = await language.getMatches(code, syntax);

	const stringMatch = matches.find(m => m.type === 'string');
	assert.ok(stringMatch);
	assert.strictEqual(
		code.substring(stringMatch.offset, stringMatch.offset + stringMatch.length),
		'`template`'
	);
});

test('JavaScript can match line comments', async () => {
	const syntax = new Syntax();
	registerJavaScript(syntax);
	const language = await syntax.getLanguage('javascript');

	const code = '// This is a comment\nconst x = 1;';
	const matches = await language.getMatches(code, syntax);

	const commentMatch = matches.find(m => m.type === 'comment');
	assert.ok(commentMatch);
	assert.ok(
		code
			.substring(commentMatch.offset, commentMatch.offset + commentMatch.length)
			.startsWith('//')
	);
});

test('JavaScript can match block comments', async () => {
	const syntax = new Syntax();
	registerJavaScript(syntax);
	const language = await syntax.getLanguage('javascript');

	const code = '/* block comment */ const x = 1;';
	const matches = await language.getMatches(code, syntax);

	const commentMatch = matches.find(m => m.type === 'comment');
	assert.ok(commentMatch);
	assert.strictEqual(
		code.substring(
			commentMatch.offset,
			commentMatch.offset + commentMatch.length
		),
		'/* block comment */'
	);
});

test('JavaScript can match numbers', async () => {
	const syntax = new Syntax();
	registerJavaScript(syntax);
	const language = await syntax.getLanguage('javascript');

	const code = 'const x = 42;';
	const matches = await language.getMatches(code, syntax);

	const constantMatch = matches.find(
		m =>
			m.type === 'constant' &&
			code.substring(m.offset, m.offset + m.length) === '42'
	);
	assert.ok(constantMatch);
});

test('JavaScript can match operators', async () => {
	const syntax = new Syntax();
	registerJavaScript(syntax);
	const language = await syntax.getLanguage('javascript');

	const code = 'x + y - z';
	const matches = await language.getMatches(code, syntax);

	const operatorMatches = matches.filter(m => m.type === 'operator');
	assert.ok(operatorMatches.length >= 2); // At least + and -
});

test('JavaScript can build a syntax tree', async () => {
	const syntax = new Syntax();
	registerJavaScript(syntax);
	const language = await syntax.getLanguage('javascript');

	const code = 'const x = 42;';
	const tree = await language.buildTree(code, 0);

	assert.ok(tree);
	assert.strictEqual(tree.offset, 0);
	assert.strictEqual(tree.length, code.length);
});

test('JavaScript can process code to HTML', async () => {
	const syntax = new Syntax();
	registerJavaScript(syntax);
	const language = await syntax.getLanguage('javascript');

	const code = 'const x = 42;';
	const html = await language.process(code, syntax);

	assert.ok(html.innerHTML.includes('keyword'));
	assert.ok(html.innerHTML.includes('const'));
});
