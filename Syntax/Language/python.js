// brush: "python" aliases: []

//	This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
//	Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>
//	See <jquery.syntax.js> for licensing details.

Syntax.register('python', function (brush) {
	var keywords = [
		'and',
		'as',
		'assert',
		'break',
		'class',
		'continue',
		'def',
		'del',
		'elif',
		'else',
		'except',
		'exec',
		'finally',
		'for',
		'from',
		'global',
		'if',
		'import',
		'in',
		'is',
		'lambda',
		'not',
		'or',
		'pass',
		'print',
		'raise',
		'return',
		'try',
		'while',
		'with',
		'yield'
	];

	var operators = [
		'!=',
		'%',
		'%=',
		'&',
		'&=',
		'(',
		')',
		'*',
		'**',
		'**=',
		'*=',
		'+',
		'+=',
		',',
		'-',
		'-=',
		'.',
		'/',
		'//',
		'//=',
		'/=',
		':',
		';',
		'<',
		'<<',
		'<<=',
		'<=',
		'<>',
		'=',
		'==',
		'>',
		'>=',
		'>>',
		'>>=',
		'@',
		'[',
		']',
		'^',
		'^=',
		'`',
		'`',
		'{',
		'|',
		'|=',
		'}',
		'~'
	];

	// Extracted from http://docs.python.org/library/functions.html
	var builtinFunctions = [
		'abs',
		'all',
		'any',
		'basestring',
		'bin',
		'bool',
		'callable',
		'chr',
		'classmethod',
		'cmp',
		'compile',
		'complex',
		'delattr',
		'dict',
		'dir',
		'divmod',
		'enumerate',
		'eval',
		'execfile',
		'file',
		'filter',
		'float',
		'format',
		'frozenset',
		'getattr',
		'globals',
		'hasattr',
		'hash',
		'help',
		'hex',
		'id',
		'input',
		'int',
		'isinstance',
		'issubclass',
		'iter',
		'len',
		'list',
		'locals',
		'long',
		'map',
		'max',
		'min',
		'next',
		'object',
		'oct',
		'open',
		'ord',
		'pow',
		'print',
		'property',
		'range',
		'raw_input',
		'reduce',
		'reload',
		'repr',
		'reversed',
		'round',
		'set',
		'setattr',
		'slice',
		'sorted',
		'staticmethod',
		'str',
		'sum',
		'super',
		'tuple',
		'type',
		'type',
		'unichr',
		'unicode',
		'vars',
		'xrange',
		'zip',
		'__import__',
		'apply',
		'buffer',
		'coerce',
		'intern'
	];

	var values = ['self', 'True', 'False', 'None'];

	language.push({pattern: /^\s*@\w+/m, type: 'decorator'});
	language.push(values, {type: 'constant'});
	language.push(keywords, {type: 'keyword'});
	language.push(operators, {type: 'operator'});
	language.push(builtinFunctions, {type: 'builtin'});

	// ClassNames (CamelCase)
	language.push(Syntax.lib.camelCaseType);
	language.push(Syntax.lib.cStyleFunction);

	language.push(Syntax.lib.perlStyleComment);
	language.push({pattern: /(['\"]{3})([^\1])*?\1/m, type: 'comment'});
	language.push(Syntax.lib.webLink);

	// Strings
	language.push(Syntax.lib.singleQuotedString);
	language.push(Syntax.lib.doubleQuotedString);
	language.push(Syntax.lib.stringEscape);

	// Numbers
	language.push(Syntax.lib.decimalNumber);
	language.push(Syntax.lib.hexNumber);

	brush.processes['function'] = Syntax.lib.webLinkProcess(
		'http://docs.python.org/search.html?q='
	);
	brush.processes['type'] = Syntax.lib.webLinkProcess(
		'http://docs.python.org/search.html?q='
	);
	brush.processes['builtin'] = Syntax.lib.webLinkProcess(
		'http://docs.python.org/search.html?q='
	);
});
