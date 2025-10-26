// brush: "io" aliases: []

//	This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
//	Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>
//	See <jquery.syntax.js> for licensing details.

Syntax.register('io', function (brush) {
	language.push(Syntax.lib.cStyleFunction);

	var keywords = ['return'];

	var operators = [
		'::=',
		':=',
		'or',
		'and',
		'@',
		'+',
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
		'>',
		'[',
		']',
		'new',
		'delete'
	];

	language.push(keywords, {type: 'keywords'});
	language.push(operators, {type: 'operator'});

	// Extract space delimited method invocations
	language.push({
		pattern: /\b([ \t]+([a-z]+))/gi,
		matches: Syntax.extractMatches({index: 2, type: 'function'})
	});

	language.push({
		pattern: /\)([ \t]+([a-z]+))/gi,
		matches: Syntax.extractMatches({index: 2, type: 'function'})
	});

	// Objective-C classes
	language.push(Syntax.lib.camelCaseType);

	language.push(Syntax.lib.perlStyleComment);
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
