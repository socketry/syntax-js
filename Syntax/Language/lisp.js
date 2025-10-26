// brush: "lisp" aliases: ['scheme', 'clojure']

//	This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
//	Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>
//	See <jquery.syntax.js> for licensing details.

Syntax.lib.lispStyleComment = {
	pattern: /(;+) .*$/m,
	type: 'comment',
	allow: ['href']
};

// This syntax is intentionally very sparse. This is because it is a general syntax for Lisp like languages.
// It might be a good idea to make specific dialects (e.g. common lisp, scheme, clojure, etc)
Syntax.register('lisp', function (brush) {
	language.push(['(', ')'], {type: 'operator'});

	language.push(Syntax.lib.lispStyleComment);

	language.push(Syntax.lib.hexNumber);
	language.push(Syntax.lib.decimalNumber);
	language.push(Syntax.lib.webLink);

	language.push({
		pattern: /\(\s*([^\s\(\)]+)/im,
		matches: Syntax.extractMatches({type: 'function'})
	});

	language.push({
		pattern: /#[a-z]+/i,
		type: 'constant'
	});

	// Strings
	language.push(Syntax.lib.multiLineDoubleQuotedString);
	language.push(Syntax.lib.stringEscape);
});
