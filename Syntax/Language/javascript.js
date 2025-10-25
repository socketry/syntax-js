/**
 * JavaScript Language Definition
 *
 * @package @socketry/syntax
 * @author Samuel G. D. Williams
 * @license MIT
 */

import {Language} from '../Language.js';

/**
 * Register the JavaScript language with a Syntax instance
 */
export default function register(syntax) {
	const language = new Language(syntax, 'javascript');

	const keywords = [
		'async',
		'await',
		'break',
		'case',
		'catch',
		'class',
		'const',
		'continue',
		'debugger',
		'default',
		'delete',
		'do',
		'else',
		'export',
		'extends',
		'finally',
		'for',
		'function',
		'if',
		'import',
		'in',
		'instanceof',
		'let',
		'new',
		'return',
		'super',
		'switch',
		'this',
		'throw',
		'try',
		'typeof',
		'var',
		'void',
		'while',
		'with',
		'yield'
	];

	const operators = ['+', '*', '/', '-', '&', '|', '~', '!', '%', '<', '=', '>'];
	const values = ['this', 'true', 'false', 'null', 'undefined'];
	const access = [
		'implements',
		'package',
		'protected',
		'interface',
		'private',
		'public'
	];

	// Push rules to the language
	language.push(values, {type: 'constant'});
	language.push(keywords, {type: 'keyword'});
	language.push(operators, {type: 'operator'});
	language.push(access, {type: 'access'});

	// Regular expressions
	language.push({
		pattern: /\b\/([^\\\/]|\\.)*\/[gimsuvy]*/,
		type: 'constant'
	});

	// Camel case types (e.g., String, Array, MyClass)
	language.push({
		pattern: /\b[A-Z][\w]*/,
		type: 'type'
	});

	// Comments
	language.push({
		pattern: /\/\*[\s\S]*?\*\//m,
		type: 'comment'
	});

	language.push({
		pattern: /\/\/.*$/m,
		type: 'comment'
	});

	// Strings
	language.push({
		pattern: /"([^\\"\n]|\\.)*"/,
		type: 'string'
	});

	language.push({
		pattern: /'([^\\'\n]|\\.)*'/,
		type: 'string'
	});

	// Template literals
	language.push({
		pattern: /`([^\\`]|\\.)*`/,
		type: 'string'
	});

	// String escapes
	language.push({
		pattern: /\\./,
		type: 'escape',
		only: ['string']
	});

	// Numbers
	language.push({
		pattern: /\b[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/,
		type: 'constant'
	});

	language.push({
		pattern: /\b0x[0-9a-fA-F]+/,
		type: 'constant'
	});

	// Functions
	language.push({
		pattern: /\b([a-z_][a-z0-9_]*)\s*\(/i,
		type: 'function'
	});

	// Register aliases
	syntax.alias('javascript', ['js', 'jsx']);

	// Register the language
	syntax.register('javascript', language);

	return language;
}
