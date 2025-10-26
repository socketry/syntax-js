// brush: "go" aliases: []

//	This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
//	Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>
//	See <jquery.syntax.js> for licensing details.

Syntax.register('go', function (brush) {
	var keywords = [
		'break',
		'default',
		'func',
		'interface',
		'select',
		'case',
		'defer',
		'go',
		'map',
		'struct',
		'chan',
		'else',
		'goto',
		'package',
		'switch',
		'const',
		'fallthrough',
		'if',
		'range',
		'type',
		'continue',
		'for',
		'import',
		'return',
		'var'
	];

	var types = [
		/u?int\d*/g,
		/float\d+/g,
		/complex\d+/g,
		'byte',
		'uintptr',
		'string'
	];

	var operators = [
		'+',
		'&',
		'+=',
		'&=',
		'&&',
		'==',
		'!=',
		'-',
		'|',
		'-=',
		'|=',
		'||',
		'<',
		'<=',
		'*',
		'^',
		'*=',
		'^=',
		'<-',
		'>',
		'>=',
		'/',
		'<<',
		'/=',
		'<<=',
		'++',
		'=',
		':=',
		',',
		';',
		'%',
		'>>',
		'%=',
		'>>=',
		'--',
		'!',
		'...',
		'.',
		':',
		'&^',
		'&^='
	];

	var values = ['true', 'false', 'iota', 'nil'];

	var functions = [
		'append',
		'cap',
		'close',
		'complex',
		'copy',
		'imag',
		'len',
		'make',
		'new',
		'panic',
		'print',
		'println',
		'real',
		'recover'
	];

	language.push(values, {type: 'constant'});
	language.push(types, {type: 'type'});
	language.push(keywords, {type: 'keyword'});
	language.push(operators, {type: 'operator'});
	language.push(functions, {type: 'function'});

	language.push(Syntax.lib.cStyleFunction);

	language.push(Syntax.lib.camelCaseType);

	language.push(Syntax.lib.cStyleComment);
	language.push(Syntax.lib.cppStyleComment);
	language.push(Syntax.lib.webLink);

	// Strings
	language.push(Syntax.lib.singleQuotedString);
	language.push(Syntax.lib.doubleQuotedString);
	language.push(Syntax.lib.stringEscape);

	// Numbers
	language.push(Syntax.lib.decimalNumber);
	language.push(Syntax.lib.hexNumber);
});
