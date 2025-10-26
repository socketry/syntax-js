// brush: "html" aliases: []

//	This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
//	Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>
//	See <jquery.syntax.js> for licensing details.

Syntax.brushes.dependency('html', 'xml');
Syntax.brushes.dependency('html', 'javascript');
Syntax.brushes.dependency('html', 'css');
Syntax.brushes.dependency('html', 'php-script');
Syntax.brushes.dependency('html', 'ruby');

Syntax.register('html', function (brush) {
	language.push({
		pattern: /<script.*?type\=.?text\/javascript.*?>((.|\n)*?)<\/script>/im,
		matches: Syntax.extractMatches({brush: 'javascript'})
	});

	language.push({
		pattern: /<style.*?type=.?text\/css.*?>((.|\n)*?)<\/style>/im,
		matches: Syntax.extractMatches({brush: 'css'})
	});

	language.push({
		pattern: /((<\?php)([\s\S]*?)(\?>))/m,
		matches: Syntax.extractMatches(
			{type: 'php-tag', allow: ['keyword', 'php-script']},
			{type: 'keyword'},
			{brush: 'php-script'},
			{type: 'keyword'}
		)
	});

	language.push({
		pattern: /((<\?rb?)([\s\S]*?)(\?>))/m,
		matches: Syntax.extractMatches(
			{type: 'ruby-tag', allow: ['keyword', 'ruby']},
			{type: 'keyword'},
			{brush: 'ruby'},
			{type: 'keyword'}
		)
	});

	language.push({
		pattern: /<%=?(.*?)(%>)/,
		type: 'instruction',
		allow: ['string']
	});

	language.push({
		pattern: /<\!(DOCTYPE(.*?))>/,
		matches: Syntax.extractMatches({type: 'doctype'})
	});

	// Is this rule still relevant?
	language.push({
		pattern: /(%[0-9a-f]{2})/i,
		type: 'percent-escape',
		only: ['html']
	});

	// The position of this statement is important - it determines at what point the rules of the parent are processed.
	// In this case, the rules for xml are processed after the rules for html.
	brush.derives('xml');
});
