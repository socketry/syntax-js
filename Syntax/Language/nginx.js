// brush: "nginx" aliases: []

//	This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
//	Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>
//	See <jquery.syntax.js> for licensing details.

Syntax.register('nginx', function (brush) {
	language.push({
		pattern: /((\w+).*?);/,
		matches: Syntax.extractMatches(
			{type: 'directive', allow: '*'},
			{
				type: 'function',
				process: Syntax.lib.webLinkProcess('http://nginx.org/r/')
			}
		)
	});

	language.push({
		pattern: /(\w+).*?{/,
		matches: Syntax.extractMatches({type: 'keyword'})
	});

	language.push({pattern: /(\$)[\w]+/, type: 'variable'});

	language.push(Syntax.lib.perlStyleComment);
	language.push(Syntax.lib.singleQuotedString);
	language.push(Syntax.lib.doubleQuotedString);

	language.push(Syntax.lib.webLink);
});
