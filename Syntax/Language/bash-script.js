// brush: "bash-script" aliases: []

//	This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
//	Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>
//	See <jquery.syntax.js> for licensing details.

Syntax.register('bash-script', function (brush) {
	var operators = ['&&', '|', ';', '{', '}'];
	language.push(operators, {type: 'operator'});

	language.push({
		pattern:
			/(?:^|\||;|&&)\s*((?:"([^"]|\\")+"|'([^']|\\')+'|\\\n|.|[ \t])+?)(?=$|\||;|&&)/im,
		matches: Syntax.extractMatches({brush: 'bash-statement'})
	});
});

Syntax.register('bash-statement', function (brush) {
	var keywords = [
		'break',
		'case',
		'continue',
		'do',
		'done',
		'elif',
		'else',
		'eq',
		'fi',
		'for',
		'function',
		'ge',
		'gt',
		'if',
		'in',
		'le',
		'lt',
		'ne',
		'return',
		'then',
		'until',
		'while'
	];
	language.push(keywords, {type: 'keyword'});

	var operators = ['>', '<', '=', '`', '--', '{', '}', '(', ')', '[', ']'];
	language.push(operators, {type: 'operator'});

	language.push({
		pattern: /\(\((.*?)\)\)/im,
		type: 'expression',
		allow: ['variable', 'string', 'operator', 'constant']
	});

	language.push({
		pattern: /`([\s\S]+?)`/im,
		matches: Syntax.extractMatches({brush: 'bash-script', debug: true})
	});

	language.push(Syntax.lib.perlStyleComment);

	// Probably need to write a real parser here rather than using regular expressions, it is too fragile
	// and misses lots of edge cases (e.g. nested brackets, delimiters).
	language.push({
		pattern:
			/^\s*((?:\S+?=\$?(?:\[[^\]]+\]|\(\(.*?\)\)|"(?:[^"]|\\")+"|'(?:[^']|\\')+'|\S+)\s*)*)((?:(\\ |\S)+)?)/im,
		matches: Syntax.extractMatches(
			{
				type: 'env',
				allow: ['variable', 'string', 'operator', 'constant', 'expression']
			},
			{type: 'function', allow: ['variable', 'string']}
		)
	});

	language.push({
		pattern: /(\S+?)=/im,
		matches: Syntax.extractMatches({type: 'variable'}),
		only: ['env']
	});

	language.push({
		pattern: /\$\w+/,
		type: 'variable'
	});

	language.push({pattern: /\s\-+[\w-]+/, type: 'option'});

	language.push(Syntax.lib.singleQuotedString);
	language.push(Syntax.lib.doubleQuotedString);

	language.push(Syntax.lib.decimalNumber);
	language.push(Syntax.lib.hexNumber);

	language.push(Syntax.lib.webLink);
});
