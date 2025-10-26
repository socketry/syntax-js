// brush: "protobuf" aliases: []

//	This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
//	Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>
//	See <jquery.syntax.js> for licensing details.

Syntax.register('protobuf', function (brush) {
	var keywords = [
		'enum',
		'extend',
		'extensions',
		'group',
		'import',
		'max',
		'message',
		'option',
		'package',
		'returns',
		'rpc',
		'service',
		'syntax',
		'to',
		'default'
	];
	language.push(keywords, {type: 'keyword'});

	var values = ['true', 'false'];
	language.push(values, {type: 'constant'});

	var types = [
		'bool',
		'bytes',
		'double',
		'fixed32',
		'fixed64',
		'float',
		'int32',
		'int64',
		'sfixed32',
		'sfixed64',
		'sint32',
		'sint64',
		'string',
		'uint32',
		'uint64'
	];
	language.push(types, {type: 'type'});

	var access = ['optional', 'required', 'repeated'];
	language.push(access, {type: 'access'});

	language.push(Syntax.lib.camelCaseType);

	// Highlight names of fields
	language.push({
		pattern: /\s+(\w+)\s*=\s*\d+/g,
		matches: Syntax.extractMatches({
			type: 'variable'
		})
	});

	// Comments
	language.push(Syntax.lib.cStyleComment);
	language.push(Syntax.lib.webLink);

	// Strings
	language.push(Syntax.lib.singleQuotedString);
	language.push(Syntax.lib.doubleQuotedString);
	language.push(Syntax.lib.stringEscape);

	// Numbers
	language.push(Syntax.lib.decimalNumber);
	language.push(Syntax.lib.hexNumber);
});
