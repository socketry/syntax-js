// brush: "haskell" aliases: []

//	This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
//	Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>
//	See <jquery.syntax.js> for licensing details.

Syntax.register('haskell', function (brush) {
	var keywords = [
		'as',
		'case',
		'of',
		'class',
		'data',
		'data family',
		'data instance',
		'default',
		'deriving',
		'deriving instance',
		'do',
		'forall',
		'foreign',
		'hiding',
		'if',
		'then',
		'else',
		'import',
		'infix',
		'infixl',
		'infixr',
		'instance',
		'let',
		'in',
		'mdo',
		'module',
		'newtype',
		'proc',
		'qualified',
		'rec',
		'type',
		'type family',
		'type instance',
		'where'
	];

	var operators = [
		'`',
		'|',
		'\\',
		'-',
		'-<',
		'-<<',
		'->',
		'*',
		'?',
		'??',
		'#',
		'<-',
		'@',
		'!',
		'::',
		'_',
		'~',
		'>',
		';',
		'{',
		'}'
	];

	var values = ['True', 'False'];

	language.push(values, {type: 'constant'});
	language.push(keywords, {type: 'keyword'});
	language.push(operators, {type: 'operator'});

	// Camelcase Types
	language.push(Syntax.lib.camelCaseType);

	// Comments
	language.push({
		pattern: /\-\-.*$/gm,
		type: 'comment',
		allow: ['href']
	});

	language.push({
		pattern: /\{\-[\s\S]*?\-\}/gm,
		type: 'comment',
		allow: ['href']
	});

	language.push(Syntax.lib.webLink);

	// Numbers
	language.push(Syntax.lib.decimalNumber);
	language.push(Syntax.lib.hexNumber);

	// Strings
	language.push(Syntax.lib.singleQuotedString);
	language.push(Syntax.lib.doubleQuotedString);
	language.push(Syntax.lib.stringEscape);
});
