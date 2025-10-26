// brush: "xrb" aliases: ["trenni"]

//	This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
//	Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>
//	See <jquery.syntax.js> for licensing details.

Syntax.brushes.dependency('xrb', 'xml');
Syntax.brushes.dependency('xrb', 'ruby');

Syntax.register('xrb', function (brush) {
	language.push({
		pattern: /((<\?r)([\s\S]*?)(\?>))/gm,
		matches: Syntax.extractMatches(
			{type: 'ruby-tag', allow: ['keyword', 'ruby']},
			{type: 'keyword'},
			{brush: 'ruby'},
			{type: 'keyword'}
		)
	});

	language.push({
		pattern: /((#{)([\s\S]*?)(}))/gm,
		matches: Syntax.extractMatches(
			{type: 'ruby-tag', allow: ['keyword', 'ruby']},
			{type: 'keyword'},
			{brush: 'ruby'},
			{type: 'keyword'}
		)
	});

	// The position of this statement is important - it determines at what point the rules of the parent are processed.
	// In this case, the rules for xml are processed after the rules for html.
	brush.derives('xml');
});
