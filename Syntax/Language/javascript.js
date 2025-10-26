// brush: "javascript" aliases: ["js", "actionscript"]

//	This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
//	Copyright (c) 2019 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>
//	See <jquery.syntax.js> for licensing details.

Syntax.register('javascript', function (brush) {
	var keywords = [
		'async',
		'await',
		'break',
		'case',
		'catch',
		'class',
		'const',
		'continue',
		'debugger',
		'default',
		'delete',
		'do',
		'else',
		'export',
		'extends',
		'finally',
		'for',
		'function',
		'if',
		'import',
		'in',
		'instanceof',
		'let',
		'new',
		'return',
		'super',
		'switch',
		'this',
		'throw',
		'try',
		'typeof',
		'var',
		'void',
		'while',
		'with',
		'yield'
	];

	var operators = ['+', '*', '/', '-', '&', '|', '~', '!', '%', '<', '=', '>'];
	var values = ['this', 'true', 'false', 'null'];

	var access = [
		'implements',
		'package',
		'protected',
		'interface',
		'private',
		'public'
	];

	language.push(values, {type: 'constant'});
	language.push(keywords, {type: 'keyword'});
	language.push(operators, {type: 'operator'});
	language.push(access, {type: 'access'});

	// Regular expressions
	language.push(Syntax.lib.perlStyleRegularExpression);

	// Camel Case Types
	language.push(Syntax.lib.camelCaseType);

	// Comments
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

	// Functions
	language.push(Syntax.lib.cStyleFunction);
});
