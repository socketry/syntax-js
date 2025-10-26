// brush: "java" aliases: []

//	This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
//	Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>
//	See <jquery.syntax.js> for licensing details.

Syntax.register('java', function (brush) {
	var keywords = [
		'abstract',
		'continue',
		'for',
		'switch',
		'assert',
		'default',
		'goto',
		'synchronized',
		'do',
		'if',
		'break',
		'implements',
		'throw',
		'else',
		'import',
		'throws',
		'case',
		'enum',
		'return',
		'transient',
		'catch',
		'extends',
		'try',
		'final',
		'interface',
		'static',
		'class',
		'finally',
		'strictfp',
		'volatile',
		'const',
		'native',
		'super',
		'while'
	];

	var access = ['private', 'protected', 'public', 'package'];

	var types = [
		'void',
		'byte',
		'short',
		'int',
		'long',
		'float',
		'double',
		'boolean',
		'char'
	];

	var operators = [
		'++',
		'--',
		'++',
		'--',
		'+',
		'-',
		'~',
		'!',
		'*',
		'/',
		'%',
		'+',
		'-',
		'<<',
		'>>',
		'>>>',
		'<',
		'>',
		'<=',
		'>=',
		'==',
		'!=',
		'&',
		'^',
		'|',
		'&&',
		'||',
		'?',
		'=',
		'+=',
		'-=',
		'*=',
		'/=',
		'%=',
		'&=',
		'^=',
		'|=',
		'<<=',
		'>>=',
		'>>>=',
		'instanceof',
		'new',
		'delete'
	];

	var constants = ['this', 'true', 'false', 'null'];

	language.push(constants, {type: 'constant'});
	language.push(types, {type: 'type'});
	language.push(keywords, {type: 'keyword'});
	language.push(operators, {type: 'operator'});
	language.push(access, {type: 'access'});

	// Camel Case Types
	language.push(Syntax.lib.camelCaseType);

	// Comments
	language.push(Syntax.lib.cStyleComment);
	language.push(Syntax.lib.cppStyleComment);
	language.push(Syntax.lib.webLink);

	// Numbers
	language.push(Syntax.lib.decimalNumber);
	language.push(Syntax.lib.hexNumber);

	// Strings
	language.push(Syntax.lib.singleQuotedString);
	language.push(Syntax.lib.doubleQuotedString);
	language.push(Syntax.lib.stringEscape);

	language.push(Syntax.lib.cStyleFunction);

	brush.processes['function'] = Syntax.lib.webLinkProcess(
		'java "Developer Documentation"',
		true
	);
});
