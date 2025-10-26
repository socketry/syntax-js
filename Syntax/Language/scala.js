// brush: "scala" aliases: []

//	This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
//	Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>
//	See <jquery.syntax.js> for licensing details.

Syntax.brushes.dependency('scala', 'xml');

Syntax.register('scala', function (brush) {
	var keywords = [
		'abstract',
		'do',
		'finally',
		'import',
		'object',
		'return',
		'trait',
		'var',
		'case',
		'catch',
		'class',
		'else',
		'extends',
		'for',
		'forSome',
		'if',
		'lazy',
		'match',
		'new',
		'override',
		'package',
		'private',
		'sealed',
		'super',
		'try',
		'type',
		'while',
		'with',
		'yield',
		'def',
		'final',
		'implicit',
		'protected',
		'throw',
		'val'
	];
	language.push(keywords, {type: 'keyword'});

	var operators = ['_', ':', '=', '=>', '<-', '<:', '<%', '>:', '#', '@'];
	language.push(operators, {type: 'operator'});

	var constants = ['this', 'null', 'true', 'false'];
	language.push(constants, {type: 'constant'});

	// Strings
	language.push({
		pattern: /"""[\s\S]*?"""/,
		type: 'string'
	});

	language.push(Syntax.lib.doubleQuotedString);

	// Functions
	language.push({
		pattern: /(?:def\s+|\.)([a-z_][a-z0-9_]+)/i,
		matches: Syntax.extractMatches({type: 'function'})
	});

	language.push(Syntax.lib.camelCaseType);

	// Types
	language.push(Syntax.lib.cStyleFunction);

	// Comments
	language.push(Syntax.lib.cStyleComment);
	language.push(Syntax.lib.cppStyleComment);

	brush.derives('xml');
});
