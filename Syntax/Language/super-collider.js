// brush: "super-collider" aliases: ["sc"]

//	This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
//	Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>
//	See <jquery.syntax.js> for licensing details.

Syntax.register('super-collider', function (brush) {
	var keywords = ['const', 'arg', 'classvar', 'var'];
	language.push(keywords, {type: 'keyword'});

	var operators = [
		'`',
		'+',
		'@',
		':',
		'*',
		'/',
		'-',
		'&',
		'|',
		'~',
		'!',
		'%',
		'<',
		'=',
		'>'
	];
	language.push(operators, {type: 'operator'});

	var values = [
		'thisFunctionDef',
		'thisFunction',
		'thisMethod',
		'thisProcess',
		'thisThread',
		'this',
		'super',
		'true',
		'false',
		'nil',
		'inf'
	];
	language.push(values, {type: 'constant'});

	language.push(Syntax.lib.camelCaseType);

	// Single Characters
	language.push({
		pattern: /\$(\\)?./,
		type: 'constant'
	});

	// Symbols
	language.push({
		pattern: /\\[a-z_][a-z0-9_]*/i,
		type: 'symbol'
	});

	language.push({
		pattern: /'[^']+'/,
		type: 'symbol'
	});

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
	language.push({
		pattern: /(?:\.)([a-z_][a-z0-9_]*)/i,
		matches: Syntax.extractMatches({type: 'function'})
	});

	language.push(Syntax.lib.cStyleFunction);
});
