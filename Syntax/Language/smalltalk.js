// brush: "smalltalk" aliases: []

//	This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
//	Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>
//	See <jquery.syntax.js> for licensing details.

Syntax.register('smalltalk', function (brush) {
	var operators = ['[', ']', '|', ':=', '.'];

	var values = ['self', 'super', 'true', 'false', 'nil'];

	language.push(values, {type: 'constant'});
	language.push(operators, {type: 'operator'});

	// Objective-C style functions
	language.push({pattern: /\w+:/, type: 'function'});

	// Camelcase Types
	language.push(Syntax.lib.camelCaseType);

	// Strings
	language.push(Syntax.lib.singleQuotedString);
	language.push(Syntax.lib.doubleQuotedString);
	language.push(Syntax.lib.stringEscape);

	// Numbers
	language.push(Syntax.lib.decimalNumber);
	language.push(Syntax.lib.hexNumber);
});
