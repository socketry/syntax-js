// brush: "yaml" aliases: []

//	This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
//	Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>
//	See <jquery.syntax.js> for licensing details.

Syntax.register('yaml', function (brush) {
	language.push({
		pattern: /^\s*#.*$/gm,
		type: 'comment',
		allow: ['href']
	});

	language.push(Syntax.lib.singleQuotedString);
	language.push(Syntax.lib.doubleQuotedString);

	language.push({
		pattern: /(&|\*)[a-z0-9]+/gi,
		type: 'constant'
	});

	language.push({
		pattern: /(.*?):/gi,
		matches: Syntax.extractMatches({type: 'keyword'})
	});

	language.push(Syntax.lib.webLink);
});
