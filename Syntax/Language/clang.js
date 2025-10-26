// brush: "clang" aliases: ["cpp", "c++", "c", "objective-c"]

//	This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
//	Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>
//	See <jquery.syntax.js> for licensing details.

Syntax.register('clang', function (brush) {
	var keywords = [
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
		'@dynamic',
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

	var access = [
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

	var typeModifiers = [
		'mutable',
		'auto',
		'const',
		'register',
		'typename',
		'abstract'
	];
	var types = [
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
		'new',
		'delete',
		'in'
	];

	var values = ['this', 'true', 'false', 'NULL', 'YES', 'NO', 'nil'];

	language.push(values, {type: 'constant'});
	language.push(typeModifiers, {type: 'keyword'});
	language.push(types, {type: 'type'});
	language.push(keywords, {type: 'keyword'});
	language.push(operators, {type: 'operator'});
	language.push(access, {type: 'access'});

	// Objective-C properties
	language.push({
		pattern: /@property\((.*)\)[^;]+;/gim,
		type: 'objective-c-property',
		allow: '*'
	});

	var propertyAttributes = [
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

	// Objective-C strings

	language.push({
		pattern: /@(?=")/g,
		type: 'string'
	});

	// Objective-C classes, C++ classes, C types, etc.
	language.push(Syntax.lib.camelCaseType);
	language.push(Syntax.lib.cStyleType);
	language.push({
		pattern: /(?:class|struct|enum|namespace)\s+([^{;\s]+)/gim,
		matches: Syntax.extractMatches({type: 'type'})
	});

	language.push({
		pattern: /#.*$/gim,
		type: 'preprocessor',
		allow: ['string']
	});

	language.push(Syntax.lib.cStyleComment);
	language.push(Syntax.lib.cppStyleComment);
	language.push(Syntax.lib.webLink);

	// Objective-C style functions
	language.push({pattern: /\w+:(?=.*(\]|;|\{))(?!:)/g, type: 'function'});

	language.push({
		pattern: /[^:\[]\s+(\w+)(?=\])/g,
		matches: Syntax.extractMatches({type: 'function'})
	});

	language.push({
		pattern: /-\s*(\([^\)]+?\))?\s*(\w+)\s*\{/g,
		matches: Syntax.extractMatches({index: 2, type: 'function'})
	});

	// Strings
	language.push(Syntax.lib.singleQuotedString);
	language.push(Syntax.lib.doubleQuotedString);
	language.push(Syntax.lib.stringEscape);

	// Numbers
	language.push(Syntax.lib.decimalNumber);
	language.push(Syntax.lib.hexNumber);

	language.push(Syntax.lib.cStyleFunction);
});
