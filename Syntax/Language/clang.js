// C/C++/Objective-C language definition
// Supports C, C++, and Objective-C syntax highlighting

import Language from '../Language.js';
import Rule from '../Rule.js';

export default function register(syntax) {
	const language = new Language(syntax, 'clang');

	// Objective-C keywords
	const objcKeywords = [
		'@interface',
		'@implementation',
		'@protocol',
		'@end',
		'@try',
		'@throw',
		'@catch',
		'@finally',
		'@class',
		'@selector',
		'@encode',
		'@synchronized',
		'@property',
		'@synthesize',
		'@dynamic'
	];

	// C/C++ keywords
	const keywords = [
		'struct',
		'break',
		'continue',
		'else',
		'for',
		'switch',
		'case',
		'default',
		'enum',
		'goto',
		'register',
		'sizeof',
		'typedef',
		'volatile',
		'do',
		'extern',
		'if',
		'return',
		'static',
		'union',
		'while',
		'asm',
		'dynamic_cast',
		'namespace',
		'reinterpret_cast',
		'try',
		'explicit',
		'static_cast',
		'typeid',
		'catch',
		'operator',
		'template',
		'class',
		'const_cast',
		'inline',
		'throw',
		'virtual',
		'IBOutlet'
	];

	// Access modifiers
	const access = [
		'@private',
		'@protected',
		'@public',
		'@required',
		'@optional',
		'private',
		'protected',
		'public',
		'friend',
		'using'
	];

	// Type modifiers
	const typeModifiers = [
		'mutable',
		'auto',
		'const',
		'register',
		'typename',
		'abstract'
	];

	// Built-in types
	const types = [
		'double',
		'float',
		'int',
		'short',
		'char',
		'long',
		'signed',
		'unsigned',
		'bool',
		'void',
		'id'
	];

	// Constants
	const constants = ['this', 'true', 'false', 'NULL', 'YES', 'NO', 'nil'];

	// Push constants
	language.push(constants, {type: 'constant'});

	// Push keywords
	language.push([...objcKeywords, ...keywords], {type: 'keyword'});

	// Push type modifiers
	language.push(typeModifiers, {type: 'keyword'});

	// Push types
	language.push(types, {type: 'type'});

	// Push access modifiers
	language.push(access, {type: 'access'});

	// Objective-C properties (before comments so they can contain keywords)
	language.push({
		pattern: /@property\s*\([^)]*\)/g,
		type: 'objective-c-property',
		allow: ['keyword', 'type']
	});

	// Property attributes (only within @property declarations)
	const propertyAttributes = [
		'getter',
		'setter',
		'readwrite',
		'readonly',
		'assign',
		'retain',
		'copy',
		'nonatomic'
	];
	language.push(propertyAttributes, {
		type: 'keyword',
		only: ['objective-c-property']
	});

	// Preprocessor directives
	language.push({
		pattern: /#.*$/gm,
		type: 'preprocessor',
		allow: ['string']
	});

	// Comments
	language.push(Rule.cStyleComment);
	language.push(Rule.cppStyleComment);
	language.push(Rule.webLink);

	// Objective-C string prefix
	language.push({
		pattern: /@(?=")/g,
		type: 'string'
	});

	// Strings
	language.push(Rule.singleQuotedString);
	language.push(Rule.doubleQuotedString);
	language.push(Rule.stringEscape);

	// Types
	language.push(Rule.camelCaseType);
	language.push(Rule.cStyleType);

	// Type declarations (class, struct, enum, namespace)
	language.push({
		pattern: /\b(?:class|struct|enum|namespace)\s+([a-zA-Z_][\w]*)/gi,
		matches: Rule.extractMatches({index: 1, type: 'type'})
	});

	// C++ access modifiers with colon (must come before Objective-C method names)
	language.push({
		pattern: /\b(?:public|private|protected):/g,
		type: 'access'
	});

	// Objective-C method names (selector syntax)
	language.push({
		pattern: /\w+:(?=.*[\];{])/g,
		type: 'function'
	});

	// C-style function calls
	language.push(Rule.cStyleFunction);

	// Operators
	language.push({
		pattern: /[+\-*\/%&|~!<>=]+/g,
		type: 'operator'
	});

	// Numbers
	language.push(Rule.hexNumber);
	language.push(Rule.decimalNumber);

	syntax.register('clang', language);
	syntax.alias('clang', ['c', 'cpp', 'c++', 'objective-c']);

	return language;
}
