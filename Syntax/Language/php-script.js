// brush: "php-script" aliases: []

//	This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
//	Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>
//	See <jquery.syntax.js> for licensing details.

Syntax.register('php-script', function (brush) {
	var keywords = [
		'abstract',
		'and',
		'as',
		'break',
		'case',
		'cfunction',
		'class',
		'const',
		'continue',
		'declare',
		'default',
		'die',
		'do',
		'echo',
		'else',
		'elseif',
		'enddeclare',
		'endfor',
		'endforeach',
		'endif',
		'endswitch',
		'endwhile',
		'extends',
		'extends',
		'for',
		'foreach',
		'function',
		'global',
		'if',
		'implements',
		'include',
		'include_once',
		'interface',
		'old_function',
		'or',
		'require',
		'require_once',
		'return',
		'static',
		'switch',
		'throw',
		'use',
		'var',
		'while',
		'xor'
	];

	var access = ['private', 'protected', 'public'];

	var operators = [
		'+',
		'*',
		'/',
		'-',
		'&',
		'|',
		'~',
		'!',
		'%',
		'<',
		'=',
		'>',
		'[',
		']',
		'new'
	];

	var values = ['this', 'true', 'false'];

	language.push(values, {type: 'constant'});
	language.push(keywords, {type: 'keyword'});
	language.push(operators, {type: 'operator'});
	language.push(access, {type: 'access'});

	// Variables
	language.push({
		pattern: /\$[a-z_][a-z0-9]*/gi,
		type: 'variable'
	});

	// ClassNames (CamelCase)
	language.push(Syntax.lib.camelCaseType);
	language.push(Syntax.lib.cStyleFunction);

	// Comments
	language.push(Syntax.lib.cStyleComment);
	language.push(Syntax.lib.cppStyleComment);
	language.push(Syntax.lib.perlStyleComment);
	language.push(Syntax.lib.webLink);

	// Strings
	language.push(Syntax.lib.singleQuotedString);
	language.push(Syntax.lib.doubleQuotedString);
	language.push(Syntax.lib.stringEscape);

	// Numbers
	language.push(Syntax.lib.decimalNumber);
	language.push(Syntax.lib.hexNumber);

	brush.processes['function'] = Syntax.lib.webLinkProcess(
		'http://www.php.net/manual-lookup.php?pattern='
	);
});
