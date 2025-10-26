// brush: "php" aliases: []

//	This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
//	Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>
//	See <jquery.syntax.js> for licensing details.

Syntax.brushes.dependency('php', 'php-script');

Syntax.register('php', function (brush) {
	language.push({
		pattern: /(<\?(php)?)((.|\n)*?)(\?>)/m,
		matches: Syntax.extractMatches(
			{type: 'keyword'},
			null,
			{brush: 'php-script'},
			null,
			{type: 'keyword'}
		)
	});
});
