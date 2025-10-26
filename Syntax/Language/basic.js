// brush: "basic" aliases: ['vb']

//	This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
//	Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>
//	See <jquery.syntax.js> for licensing details.

Syntax.lib.vbStyleComment = {
	pattern: /' .*$/gm,
	type: 'comment',
	allow: ['href']
};

Syntax.register('basic', function (brush) {
	var keywords = [
		'AddHandler',
		'AddressOf',
		'Alias',
		'And',
		'AndAlso',
		'Ansi',
		'As',
		'Assembly',
		'Auto',
		'ByRef',
		'ByVal',
		'Call',
		'Case',
		'Catch',
		'Declare',
		'Default',
		'Delegate',
		'Dim',
		'DirectCast',
		'Do',
		'Each',
		'Else',
		'ElseIf',
		'End',
		'Enum',
		'Erase',
		'Error',
		'Event',
		'Exit',
		'Finally',
		'For',
		'Function',
		'Get',
		'GetType',
		'GoSub',
		'GoTo',
		'Handles',
		'If',
		'Implements',
		'Imports',
		'In',
		'Inherits',
		'Interface',
		'Is',
		'Let',
		'Lib',
		'Like',
		'Loop',
		'Mod',
		'Module',
		'MustOverride',
		'Namespace',
		'New',
		'Next',
		'Not',
		'On',
		'Option',
		'Optional',
		'Or',
		'OrElse',
		'Overloads',
		'Overridable',
		'Overrides',
		'ParamArray',
		'Preserve',
		'Property',
		'RaiseEvent',
		'ReadOnly',
		'ReDim',
		'REM',
		'RemoveHandler',
		'Resume',
		'Return',
		'Select',
		'Set',
		'Static',
		'Step',
		'Stop',
		'Structure',
		'Sub',
		'SyncLock',
		'Then',
		'Throw',
		'To',
		'Try',
		'TypeOf',
		'Unicode',
		'Until',
		'When',
		'While',
		'With',
		'WithEvents',
		'WriteOnly',
		'Xor',
		'ExternalSource',
		'Region',
		'Print',
		'Class'
	];

	var operators = [
		'-',
		'&',
		'&=',
		'*',
		'*=',
		'/',
		'/=',
		'\\',
		'\=',
		'^',
		'^=',
		'+',
		'+=',
		'=',
		'-='
	];

	var types = [
		'CBool',
		'CByte',
		'CChar',
		'CDate',
		'CDec',
		'CDbl',
		'Char',
		'CInt',
		'CLng',
		'CObj',
		'Const',
		'CShort',
		'CSng',
		'CStr',
		'CType',
		'Date',
		'Decimal',
		'Variant',
		'String',
		'Short',
		'Long',
		'Single',
		'Double',
		'Object',
		'Integer',
		'Boolean',
		'Byte',
		'Char'
	];

	var operators = [
		'+',
		'-',
		'*',
		'/',
		'+=',
		'-=',
		'*=',
		'/=',
		'=',
		':=',
		'==',
		'!=',
		'!',
		'%',
		'?',
		'>',
		'<',
		'>=',
		'<=',
		'&&',
		'||',
		'&',
		'|',
		'^',
		'.',
		'~',
		'..',
		'>>',
		'<<',
		'>>>',
		'<<<',
		'>>=',
		'<<=',
		'>>>=',
		'<<<=',
		'%=',
		'^=',
		'@'
	];

	var values = [
		'Me',
		'MyClass',
		'MyBase',
		'super',
		'True',
		'False',
		'Nothing',
		/[A-Z][A-Z0-9_]+/g
	];

	var access = [
		'Public',
		'Protected',
		'Private',
		'Shared',
		'Friend',
		'Shadows',
		'MustInherit',
		'NotInheritable',
		'NotOverridable'
	];

	language.push(types, {type: 'type'});
	language.push(keywords, {type: 'keyword', options: 'gi'});
	language.push(operators, {type: 'operator'});
	language.push(access, {type: 'access'});
	language.push(values, {type: 'constant'});

	language.push(Syntax.lib.decimalNumber);

	// ClassNames (CamelCase)
	language.push(Syntax.lib.camelCaseType);

	language.push(Syntax.lib.vbStyleComment);

	language.push(Syntax.lib.webLink);

	// Strings
	language.push(Syntax.lib.doubleQuotedString);
	language.push(Syntax.lib.stringEscape);

	brush.postprocess = function (options, html, container) {
		var queryURI = 'http://social.msdn.microsoft.com/Search/en-us?query=';

		jQuery('.function', html).each(function () {
			var text = jQuery(this).text();
			jQuery(this).replaceWith(
				jQuery('<a>')
					.attr('href', queryURI + encodeURIComponent(text))
					.text(text)
			);
		});

		return html;
	};
});
