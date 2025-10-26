// brush: "ocaml" aliases: ["ml", "sml", "fsharp"]

//	This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
//	Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>
//	See <jquery.syntax.js> for licensing details.

// This brush is based loosely on the following documentation:
// http://msdn.microsoft.com/en-us/library/dd233230.aspx

Syntax.register('ocaml', function (brush) {
	var keywords = [
		'abstract',
		'and',
		'as',
		'assert',
		'begin',
		'class',
		'default',
		'delegate',
		'do',
		'done',
		'downcast',
		'downto',
		'elif',
		'else',
		'end',
		'exception',
		'extern',
		'finally',
		'for',
		'fun',
		'function',
		'if',
		'in',
		'inherit',
		'inline',
		'interface',
		'internal',
		'lazy',
		'let',
		'match',
		'member',
		'module',
		'mutable',
		'namespace',
		'new',
		'null',
		'of',
		'open',
		'or',
		'override',
		'rec',
		'return',
		'static',
		'struct',
		'then',
		'to',
		'try',
		'type',
		'upcast',
		'use',
		'val',
		'when',
		'while',
		'with',
		'yield',
		'asr',
		'land',
		'lor',
		'lsl',
		'lsr',
		'lxor',
		'mod',
		'sig',
		'atomic',
		'break',
		'checked',
		'component',
		'const',
		'constraint',
		'constructor',
		'continue',
		'eager',
		'event',
		'external',
		'fixed',
		'functor',
		'global',
		'include',
		'method',
		'mixin',
		'object',
		'parallel',
		'process',
		'protected',
		'pure',
		'sealed',
		'trait',
		'virtual',
		'volatile',
		'val'
	];

	var types = [
		'bool',
		'byte',
		'sbyte',
		/\bu?int\d*\b/,
		'nativeint',
		'unativeint',
		'char',
		'string',
		'decimal',
		'unit',
		'void',
		'float32',
		'single',
		'float64',
		'double',
		'list',
		'array',
		'exn',
		'format',
		'fun',
		'option',
		'ref'
	];

	var operators = [
		'!',
		'<>',
		'%',
		'&',
		'*',
		'+',
		'-',
		'->',
		'/',
		'::',
		':=',
		':>',
		':?',
		':?>',
		'<',
		'=',
		'>',
		'?',
		'@',
		'^',
		'_',
		'`',
		'|',
		'~',
		"'",
		'[<',
		'>]',
		'<|',
		'|>',
		'[|',
		'|]',
		'(|',
		'|)',
		'(*',
		'*)',
		'in'
	];

	var values = ['true', 'false'];

	var access = ['private', 'public'];

	language.push(access, {type: 'access'});
	language.push(values, {type: 'constant'});
	language.push(types, {type: 'type'});
	language.push(keywords, {type: 'keyword'});
	language.push(operators, {type: 'operator'});

	// http://caml.inria.fr/pub/docs/manual-ocaml/manual011.html#module-path
	// open [module-path], new [type]
	language.push({
		pattern: /(?:open|new)\s+((?:\.?[a-z][a-z0-9]*)+)/i,
		matches: Syntax.extractMatches({type: 'type'})
	});

	// Functions
	language.push({
		pattern: /(?:\.)([a-z_][a-z0-9_]+)/i,
		matches: Syntax.extractMatches({type: 'function'})
	});

	// Avoid highlighting keyword arguments as camel-case types.
	language.push({
		pattern: /(?:\(|,)\s*(\w+\s*=)/,
		matches: Syntax.extractMatches({
			type: 'keyword-argument'
		})
	});

	// We need to modify cStyleFunction because "(*" is a comment token.
	language.push({
		pattern: /([a-z_][a-z0-9_]*)\s*\((?!\*)/i,
		matches: Syntax.extractMatches({type: 'function'})
	});

	// Types
	language.push(Syntax.lib.camelCaseType);

	// Web Links
	language.push(Syntax.lib.webLink);

	// Comments
	language.push({
		pattern: /\(\*[\s\S]*?\*\)/,
		type: 'comment'
	});

	// Strings
	language.push(Syntax.lib.doubleQuotedString);
	language.push(Syntax.lib.stringEscape);

	// Numbers
	language.push(Syntax.lib.decimalNumber);
	language.push(Syntax.lib.hexNumber);
});
