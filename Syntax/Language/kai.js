// brush: "kai" aliases: []

//	This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
//	Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>
//	See <jquery.syntax.js> for licensing details.

Syntax.register('kai', function (brush) {
	language.push(['(', ')', '[', ']', '{', '}'], {type: 'operator'});

	language.push(Syntax.lib.perlStyleComment);

	language.push(Syntax.lib.decimalNumber);
	language.push(Syntax.lib.webLink);

	language.push({
		pattern: /\(([^\s\(\)]+)/i,
		matches: Syntax.extractMatches({type: 'function'})
	});

	language.push({
		pattern: /`[a-z]*/i,
		type: 'constant'
	});

	// Strings
	language.push(Syntax.lib.multiLineDoubleQuotedString);
	language.push(Syntax.lib.stringEscape);
});
