// brush: "ruby" aliases: []

//	This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
//	Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>
//	See <jquery.syntax.js> for licensing details.

Syntax.lib.rubyStyleFunction = {
	pattern: /(?:def\s+|\.)([a-z_][a-z0-9_]+)/i,
	matches: Syntax.extractMatches({type: 'function'})
};

// We need to emulate negative lookbehind
Syntax.lib.rubyStyleSymbol = {
	pattern: /([:]?):\w+/,
	type: 'constant',
	matches: function (match, expr) {
		if (match[1] != '') return [];

		return [new Syntax.Match(match.index, match[0].length, expr, match[0])];
	}
};

Syntax.register('ruby', function (brush) {
	var keywords = [
		'alias',
		'and',
		'begin',
		'break',
		'case',
		'class',
		'def',
		'define_method',
		'defined?',
		'do',
		'else',
		'elsif',
		'end',
		'ensure',
		'false',
		'for',
		'if',
		'in',
		'module',
		'next',
		'not',
		'or',
		'raise',
		'redo',
		'rescue',
		'retry',
		'return',
		'then',
		'throw',
		'undef',
		'unless',
		'until',
		'when',
		'while',
		'yield',
		'block_given?'
	];

	var operators = ['+', '*', '/', '-', '&', '|', '~', '!', '%', '<', '=', '>'];
	var values = ['self', 'super', 'true', 'false', 'nil'];

	var access = ['private', 'protected', 'public'];

	language.push(access, {type: 'access'});
	language.push(values, {type: 'constant'});

	// Percent operator statements
	language.push({
		pattern: /(\%[\S])(\{[\s\S]*?\})/,
		matches: Syntax.extractMatches({type: 'function'}, {type: 'constant'})
	});

	language.push({
		pattern: /`[^`]+`/,
		type: 'string'
	});

	language.push({
		pattern: /\#\{([^\}]*)\}/,
		matches: Syntax.extractMatches({
			brush: 'ruby',
			only: ['string']
		})
	});

	// Regular expressions
	language.push(Syntax.lib.rubyStyleRegularExpression);

	language.push({pattern: /(@+|\$)[\w]+/, type: 'variable'});

	language.push(Syntax.lib.camelCaseType);
	language.push(keywords, {type: 'keyword'});
	language.push(operators, {type: 'operator'});

	language.push(Syntax.lib.rubyStyleSymbol);

	// Comments
	language.push(Syntax.lib.perlStyleComment);
	language.push(Syntax.lib.webLink);

	// Strings
	language.push(Syntax.lib.singleQuotedString);
	language.push(Syntax.lib.doubleQuotedString);
	language.push(Syntax.lib.stringEscape);

	// Numbers
	language.push(Syntax.lib.decimalNumber);
	language.push(Syntax.lib.hexNumber);

	// Functions
	language.push(Syntax.lib.rubyStyleFunction);
	language.push(Syntax.lib.cStyleFunction);

	// brush.processes['function'] = Syntax.lib.webLinkProcess("ruby", true);
	// brush.processes['type'] = Syntax.lib.webLinkProcess("ruby", true);
});
