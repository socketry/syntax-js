// brush: "csharp" aliases: ["c-sharp", "c#"]

//	This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
//	Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>
//	See <jquery.syntax.js> for licensing details.

Syntax.register('csharp', function (brush) {
	var keywords = [
		'abstract',
		'add',
		'alias',
		'ascending',
		'base',
		'break',
		'case',
		'catch',
		'class',
		'const',
		'continue',
		'default',
		'delegate',
		'descending',
		'do',
		'dynamic',
		'else',
		'enum',
		'event',
		'explicit',
		'extern',
		'finally',
		'for',
		'foreach',
		'from',
		'get',
		'global',
		'goto',
		'group',
		'if',
		'implicit',
		'in',
		'interface',
		'into',
		'join',
		'let',
		'lock',
		'namespace',
		'new',
		'operator',
		'orderby',
		'out',
		'override',
		'params',
		'partial',
		'readonly',
		'ref',
		'remove',
		'return',
		'sealed',
		'select',
		'set',
		'stackalloc',
		'static',
		'struct',
		'switch',
		'throw',
		'try',
		'unsafe',
		'using',
		'value',
		'var',
		'virtual',
		'volatile',
		'where',
		'while',
		'yield'
	];

	var access = ['public', 'private', 'internal', 'protected'];

	var types = [
		'object',
		'bool',
		'byte',
		'fixed',
		'float',
		'uint',
		'char',
		'ulong',
		'ushort',
		'decimal',
		'int',
		'sbyte',
		'short',
		'void',
		'long',
		'string',
		'double'
	];

	var operators = [
		'+',
		'-',
		'*',
		'/',
		'%',
		'&',
		'|',
		'^',
		'!',
		'~',
		'&&',
		'||',
		'++',
		'--',
		'<<',
		'>>',
		'==',
		'!=',
		'<',
		'>',
		'<=',
		'>=',
		'=',
		'?',
		'new',
		'as',
		'is',
		'sizeof',
		'typeof',
		'checked',
		'unchecked'
	];

	var values = ['this', 'true', 'false', 'null'];

	language.push(values, {type: 'constant'});
	language.push(types, {type: 'type'});
	language.push(keywords, {type: 'keyword'});
	language.push(operators, {type: 'operator'});
	language.push(access, {type: 'access'});

	// Functions
	language.push(Syntax.lib.cStyleFunction);
	language.push({
		pattern: /(?:\.)([a-z_][a-z0-9_]+)/gi,
		matches: Syntax.extractMatches({type: 'function'})
	});

	// Camel Case Types
	language.push(Syntax.lib.camelCaseType);

	// Comments
	language.push(Syntax.lib.cStyleComment);
	language.push(Syntax.lib.cppStyleComment);
	language.push(Syntax.lib.webLink);

	// Strings
	language.push(Syntax.lib.singleQuotedString);
	language.push(Syntax.lib.doubleQuotedString);
	language.push(Syntax.lib.stringEscape);

	language.push(Syntax.lib.decimalNumber);
	language.push(Syntax.lib.hexNumber);
});
