// brush: "bash" aliases: []

//	This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
//	Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>
//	See <jquery.syntax.js> for licensing details.

Syntax.brushes.dependency('bash', 'bash-script');

Syntax.register('bash', function (brush) {
	language.push({
		pattern: /^([\w@:~ ]*?[\$|\#])\s+(.*?)$/m,
		matches: Syntax.extractMatches({type: 'prompt'}, {brush: 'bash-script'})
	});

	language.push({
		pattern: /^\-\- .*$/m,
		type: 'comment',
		allow: ['href']
	});

	// Strings
	language.push(Syntax.lib.singleQuotedString);
	language.push(Syntax.lib.doubleQuotedString);
	language.push(Syntax.lib.stringEscape);

	// Numbers
	language.push(Syntax.lib.webLink);

	language.push({
		type: 'stderr',
		allow: ['string', 'comment', 'constant', 'href']
	});
});
