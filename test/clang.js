import {test} from 'node:test';
import assert from 'node:assert/strict';

import Syntax from '../Syntax.js';
import clang from '../Syntax/Language/clang.js';

const syntax = new Syntax();
clang(syntax);

test('clang language is registered', async () => {
	assert.ok(syntax.hasLanguage('clang'));
});

test('clang aliases are registered', async () => {
	assert.ok(syntax.hasLanguage('c'));
	assert.ok(syntax.hasLanguage('cpp'));
	assert.ok(syntax.hasLanguage('c++'));
	assert.ok(syntax.hasLanguage('objective-c'));
});

test('highlights C keywords', async () => {
	const language = await syntax.getLanguage('c');
	const code = 'struct Point { int x; int y; };';
	const tree = await language.buildTree(code);

	assert.ok(
		tree.children.some(node => node.value === 'struct' && node.type === 'keyword')
	);
	assert.ok(
		tree.children.some(node => node.value === 'int' && node.type === 'type')
	);
});

test('highlights C++ keywords', async () => {
	const language = await syntax.getLanguage('cpp');
	const code = 'class MyClass { public: virtual void doSomething(); };';
	const tree = await language.buildTree(code);

	assert.ok(
		tree.children.some(node => node.value === 'class' && node.type === 'keyword')
	);
	assert.ok(
		tree.children.some(node => node.value === 'public:' && node.type === 'access')
	);
	assert.ok(
		tree.children.some(
			node => node.value === 'virtual' && node.type === 'keyword'
		)
	);
});

test('highlights Objective-C keywords', async () => {
	const language = await syntax.getLanguage('objective-c');
	const code = '@interface MyClass : NSObject @end';
	const tree = await language.buildTree(code);

	assert.ok(
		tree.children.some(
			node => node.value === '@interface' && node.type === 'keyword'
		)
	);
	assert.ok(
		tree.children.some(node => node.value === '@end' && node.type === 'keyword')
	);
});

test('highlights preprocessor directives', async () => {
	const language = await syntax.getLanguage('c');
	const code = '#include <stdio.h>\n#define MAX 100';
	const tree = await language.buildTree(code);

	assert.ok(tree.children.some(node => node.type === 'preprocessor'));
});

test('highlights C++ style comments', async () => {
	const language = await syntax.getLanguage('cpp');
	const code = '// This is a comment\nint x = 5;';
	const tree = await language.buildTree(code);

	assert.ok(tree.children.some(node => node.type === 'comment'));
});

test('highlights C style comments', async () => {
	const language = await syntax.getLanguage('c');
	const code = '/* Multi-line\ncomment */\nint x = 5;';
	const tree = await language.buildTree(code);

	assert.ok(tree.children.some(node => node.type === 'comment'));
});

test('highlights strings with escape sequences', async () => {
	const language = await syntax.getLanguage('c');
	const code = 'char *str = "Hello\\nWorld";';
	const tree = await language.buildTree(code);

	// Find string node
	const stringNode = tree.children.find(node => node.type === 'string');
	assert.ok(stringNode, 'Should have a string node');

	// Check for escape sequence inside the string
	assert.ok(
		stringNode.children.some(
			node => node.value === '\\n' && node.type === 'escape'
		)
	);
});

test('highlights Objective-C strings', async () => {
	const language = await syntax.getLanguage('objective-c');
	const code = 'NSString *str = @"Hello World";';
	const tree = await language.buildTree(code);

	assert.ok(
		tree.children.some(node => node.value === '@' && node.type === 'string')
	);
});

test('highlights character literals', async () => {
	const language = await syntax.getLanguage('c');
	const code = "char ch = 'a';";
	const tree = await language.buildTree(code);

	assert.ok(
		tree.children.some(node => node.value === "'a'" && node.type === 'string')
	);
});

test('highlights CamelCase types', async () => {
	const language = await syntax.getLanguage('cpp');
	const code = 'MyClass obj; NSString *str;';
	const tree = await language.buildTree(code);

	assert.ok(
		tree.children.some(node => node.value === 'MyClass' && node.type === 'type')
	);
	assert.ok(
		tree.children.some(node => node.value === 'NSString' && node.type === 'type')
	);
});

test('highlights C-style _t types', async () => {
	const language = await syntax.getLanguage('c');
	const code = 'size_t len; pthread_t thread;';
	const tree = await language.buildTree(code);

	assert.ok(
		tree.children.some(node => node.value === 'size_t' && node.type === 'type')
	);
	assert.ok(
		tree.children.some(node => node.value === 'pthread_t' && node.type === 'type')
	);
});

test('highlights type declarations', async () => {
	const language = await syntax.getLanguage('cpp');
	const code = 'class MyClass {}; struct Point {}; enum Color { RED, GREEN };';
	const tree = await language.buildTree(code);

	assert.ok(
		tree.children.some(node => node.value === 'MyClass' && node.type === 'type')
	);
	assert.ok(
		tree.children.some(node => node.value === 'Point' && node.type === 'type')
	);
	assert.ok(
		tree.children.some(node => node.value === 'Color' && node.type === 'type')
	);
});

test('highlights C function calls', async () => {
	const language = await syntax.getLanguage('c');
	const code = 'printf("Hello"); strlen(str);';
	const tree = await language.buildTree(code);

	assert.ok(
		tree.children.some(
			node => node.value === 'printf' && node.type === 'function'
		)
	);
	assert.ok(
		tree.children.some(
			node => node.value === 'strlen' && node.type === 'function'
		)
	);
});

test('highlights Objective-C method names', async () => {
	const language = await syntax.getLanguage('objective-c');
	const code = '[obj setValue:value forKey:key];';
	const tree = await language.buildTree(code);

	assert.ok(
		tree.children.some(
			node => node.value === 'setValue:' && node.type === 'function'
		)
	);
	assert.ok(
		tree.children.some(
			node => node.value === 'forKey:' && node.type === 'function'
		)
	);
});

test('highlights operators', async () => {
	const language = await syntax.getLanguage('c');
	const code = 'x = a + b - c * d / e;';
	const tree = await language.buildTree(code);

	assert.ok(tree.children.some(node => node.type === 'operator'));
});

test('highlights hexadecimal numbers', async () => {
	const language = await syntax.getLanguage('c');
	const code = 'int val = 0xFF00;';
	const tree = await language.buildTree(code);

	assert.ok(
		tree.children.some(
			node => node.value === '0xFF00' && node.type === 'constant'
		)
	);
});

test('highlights decimal numbers', async () => {
	const language = await syntax.getLanguage('c');
	const code = 'double pi = 3.14159; int count = 42;';
	const tree = await language.buildTree(code);

	assert.ok(tree.children.some(node => node.type === 'constant'));
});

test('highlights constants', async () => {
	const language = await syntax.getLanguage('cpp');
	const code = 'bool flag = true; void *ptr = NULL;';
	const tree = await language.buildTree(code);

	assert.ok(
		tree.children.some(node => node.value === 'true' && node.type === 'constant')
	);
	assert.ok(
		tree.children.some(node => node.value === 'NULL' && node.type === 'constant')
	);
});

test('highlights Objective-C @property', async () => {
	const language = await syntax.getLanguage('objective-c');
	const code = '@property (nonatomic, retain) NSString *name;';
	const tree = await language.buildTree(code);

	// The entire @property(...) is matched as objective-c-property
	const propertyNode = tree.children.find(
		node => node.type === 'objective-c-property'
	);
	assert.ok(propertyNode, 'Should have objective-c-property node');
	assert.ok(
		propertyNode.value.startsWith('@property'),
		'@property should be at start of property node'
	);
});
