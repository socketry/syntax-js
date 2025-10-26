// brush: "assembly" aliases: ["asm"]

//	This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
//	Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>
//	See <jquery.syntax.js> for licensing details.

Syntax.register('assembly', function (brush) {
	language.push(Syntax.lib.cStyleComment);
	language.push(Syntax.lib.cppStyleComment);

	language.push({pattern: /\.[a-zA-Z_][a-zA-Z0-9_]*/m, type: 'directive'});

	language.push({pattern: /^[a-zA-Z_][a-zA-Z0-9_]*:/m, type: 'label'});

	language.push({
		pattern: /^\s*([a-zA-Z]+)/m,
		matches: Syntax.extractMatches({type: 'function'})
	});

	language.push({pattern: /(-[0-9]+)|(\b[0-9]+)|(\$[0-9]+)/, type: 'constant'});
	language.push({
		pattern: /(\-|\b|\$)(0x[0-9a-f]+|[0-9]+|[a-z0-9_]+)/i,
		type: 'constant'
	});

	language.push({pattern: /%\w+/, type: 'register'});

	// Strings
	language.push(Syntax.lib.singleQuotedString);
	language.push(Syntax.lib.doubleQuotedString);
	language.push(Syntax.lib.stringEscape);

	// Numbers
	language.push(Syntax.lib.decimalNumber);
	language.push(Syntax.lib.hexNumber);

	// Comments
	language.push(Syntax.lib.perlStyleComment);
	language.push(Syntax.lib.webLink);
});
