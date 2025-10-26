// brush: "lua" aliases: []

//	This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
//	Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>
//	See <jquery.syntax.js> for licensing details.

Syntax.register('lua', function (brush) {
	var keywords = [
		'and',
		'break',
		'do',
		'else',
		'elseif',
		'end',
		'false',
		'for',
		'function',
		'if',
		'in',
		'local',
		'nil',
		'not',
		'or',
		'repeat',
		'return',
		'then',
		'true',
		'until',
		'while'
	];

	var operators = [
		'+',
		'-',
		'*',
		'/',
		'%',
		'^',
		'#',
		'..',
		'=',
		'==',
		'~=',
		'<',
		'>',
		'<=',
		'>=',
		'?',
		':'
	];

	var values = ['self', 'true', 'false', 'nil'];

	language.push(values, {type: 'constant'});
	language.push(keywords, {type: 'keyword'});
	language.push(operators, {type: 'operator'});

	// Camelcase Types
	language.push(Syntax.lib.camelCaseType);
	language.push(Syntax.lib.cStyleFunction);

	language.push({
		pattern: /\-\-.*$/m,
		type: 'comment',
		allow: ['href']
	});

	language.push({
		pattern: /\-\-\[\[(\n|.)*?\]\]\-\-/m,
		type: 'comment',
		allow: ['href']
	});

	// Strings
	language.push(Syntax.lib.singleQuotedString);
	language.push(Syntax.lib.doubleQuotedString);
	language.push(Syntax.lib.stringEscape);

	language.push(Syntax.lib.hexNumber);
	language.push(Syntax.lib.decimalNumber);

	language.push(Syntax.lib.webLink);
});
