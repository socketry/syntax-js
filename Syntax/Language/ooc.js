// brush: "ooc" aliases: []

//	This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
//	Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>
//	See <jquery.syntax.js> for licensing details.

Syntax.register('ooc', function (brush) {
	var keywords = [
		'class',
		'interface',
		'implement',
		'abstract',
		'extends',
		'from',
		'const',
		'final',
		'static',
		'import',
		'use',
		'extern',
		'inline',
		'proto',
		'break',
		'continue',
		'fallthrough',
		'operator',
		'if',
		'else',
		'for',
		'while',
		'do',
		'switch',
		'case',
		'as',
		'in',
		'version',
		'return',
		'include',
		'cover',
		'func'
	];

	var types = [
		'Int',
		'Int8',
		'Int16',
		'Int32',
		'Int64',
		'Int80',
		'Int128',
		'UInt',
		'UInt8',
		'UInt16',
		'UInt32',
		'UInt64',
		'UInt80',
		'UInt128',
		'Octet',
		'Short',
		'UShort',
		'Long',
		'ULong',
		'LLong',
		'ULLong',
		'Float',
		'Double',
		'LDouble',
		'Float32',
		'Float64',
		'Float128',
		'Char',
		'UChar',
		'WChar',
		'String',
		'Void',
		'Pointer',
		'Bool',
		'SizeT',
		'This'
	];

	var operators = [
		'+',
		'-',
		'*',
		'/',
		'+=',
		'-=',
		'*=',
		'/=',
		'=',
		':=',
		'==',
		'!=',
		'!',
		'%',
		'?',
		'>',
		'<',
		'>=',
		'<=',
		'&&',
		'||',
		'&',
		'|',
		'^',
		'.',
		'~',
		'..',
		'>>',
		'<<',
		'>>>',
		'<<<',
		'>>=',
		'<<=',
		'>>>=',
		'<<<=',
		'%=',
		'^=',
		'@'
	];

	var values = ['this', 'super', 'true', 'false', 'null', /[A-Z][A-Z0-9_]+/];

	language.push(values, {type: 'constant'});
	language.push(types, {type: 'type'});
	language.push(keywords, {type: 'keyword'});
	language.push(operators, {type: 'operator'});

	// Hex, Octal and Binary numbers :)
	language.push({
		pattern: /0[xcb][0-9a-fA-F]+/,
		type: 'constant'
	});

	language.push(Syntax.lib.decimalNumber);

	// ClassNames (CamelCase)
	language.push(Syntax.lib.camelCaseType);
	language.push(Syntax.lib.cStyleType);
	language.push(Syntax.lib.cStyleFunction);

	language.push(Syntax.lib.cStyleComment);
	language.push(Syntax.lib.cppStyleComment);

	language.push(Syntax.lib.webLink);

	// Strings
	language.push(Syntax.lib.singleQuotedString);
	language.push(Syntax.lib.doubleQuotedString);
	language.push(Syntax.lib.stringEscape);

	brush.processes['function'] = Syntax.lib.webLinkProcess(
		'http://docs.ooc-lang.org/search.html?q='
	);
});
