// brush: "apache" aliases: []

//	This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
//	Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>
//	See <jquery.syntax.js> for licensing details.

Syntax.register('apache', function (brush) {
	language.push({
		pattern: /(<(\w+).*?>)/gi,
		matches: Syntax.extractMatches(
			{
				type: 'tag',
				allow: ['attribute', 'tag-name', 'string']
			},
			{
				type: 'tag-name',
				process: Syntax.lib.webLinkProcess(
					'site:http://httpd.apache.org/docs/trunk/ directive',
					true
				)
			}
		)
	});

	language.push({
		pattern: /(<\/(\w+).*?>)/gi,
		matches: Syntax.extractMatches(
			{type: 'tag', allow: ['tag-name']},
			{type: 'tag-name'}
		)
	});

	language.push({
		pattern: /^\s+([A-Z][\w]+)/gm,
		matches: Syntax.extractMatches({
			type: 'function',
			allow: ['attribute'],
			process: Syntax.lib.webLinkProcess(
				'site:http://httpd.apache.org/docs/trunk/ directive',
				true
			)
		})
	});

	language.push(Syntax.lib.perlStyleComment);
	language.push(Syntax.lib.singleQuotedString);
	language.push(Syntax.lib.doubleQuotedString);

	language.push(Syntax.lib.webLink);
});
