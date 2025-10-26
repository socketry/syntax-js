// brush: "pascal" aliases: ["delphi"]

//	This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
//	Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>
//	See <jquery.syntax.js> for licensing details.
//
// Constructed using information from http://pascal.comsci.us/etymology/
//

Syntax.register('pascal', function (brush) {
	var keywords = [
		'absolute',
		'abstract',
		'all',
		'and_then',
		'as',
		'asm',
		'asmname',
		'attribute',
		'begin',
		'bindable',
		'c',
		'c_language',
		'case',
		'class',
		'const',
		'constructor',
		'destructor',
		'dispose',
		'do',
		'downto',
		'else',
		'end',
		'except',
		'exit',
		'export',
		'exports',
		'external',
		'far',
		'file',
		'finalization',
		'finally',
		'for',
		'forward',
		'function',
		'goto',
		'if',
		'implementation',
		'import',
		'inherited',
		'initialization',
		'inline',
		'interface',
		'interrupt',
		'is',
		'keywords',
		'label',
		'library',
		'module',
		'name',
		'near',
		'new',
		'object',
		'of',
		'on',
		'only',
		'operator',
		'or_else',
		'otherwise',
		'packed',
		'pascal',
		'pow',
		'private',
		'procedure',
		'program',
		'property',
		'protected',
		'public',
		'published',
		'qualified',
		'raise',
		'record',
		'repeat',
		'resident',
		'restricted',
		'segment',
		'set',
		'then',
		'threadvar',
		'to',
		'try',
		'type',
		'unit',
		'until',
		'uses',
		'value',
		'var',
		'view',
		'virtual',
		'while',
		'with'
	];

	var operators = [
		'+',
		'-',
		'*',
		'/',
		'div',
		'mod',
		'and',
		'or',
		'xor',
		'shl',
		'shr',
		'not',
		'=',
		'>=',
		'>',
		'<>',
		'<=',
		'<',
		'in',
		':='
	];

	var values = ['true', 'false', 'nil'];

	// Keywords are case insensitive
	language.push(values, {type: 'constant', options: 'gi'});
	language.push(keywords, {type: 'keyword', options: 'gi'});
	language.push(operators, {type: 'operator', options: 'gi'});

	language.push(Syntax.lib.camelCaseType);

	// Pascal style comments
	language.push({
		pattern: /\{[\s\S]*?\}/m,
		type: 'comment',
		allow: ['href']
	});

	language.push({
		pattern: /\(\*[\s\S]*?\*\)/m,
		type: 'comment',
		allow: ['href']
	});

	language.push(Syntax.lib.webLink);

	// Strings
	language.push(Syntax.lib.singleQuotedString);
	language.push(Syntax.lib.doubleQuotedString);
	language.push(Syntax.lib.stringEscape);

	// Numbers
	language.push(Syntax.lib.decimalNumber);
	language.push(Syntax.lib.hexNumber);

	// Functions
	language.push(Syntax.lib.cStyleFunction);
});
