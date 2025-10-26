// brush: "xml" aliases: []

//	This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
//	Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>
//	See <jquery.syntax.js> for licensing details.

Syntax.lib.xmlEntity = {pattern: /&\w+;/g, type: 'entity'};
Syntax.lib.xmlPercentEscape = {
	pattern: /(%[0-9a-f]{2})/gi,
	type: 'percent-escape',
	only: ['string']
};

Syntax.register('xml-tag', function (brush) {
	language.push({
		pattern: /<\/?((?:[^:\s>]+:)?)([^\s>]+)(\s[^>]*)?\/?>/g,
		matches: Syntax.extractMatches({type: 'namespace'}, {type: 'tag-name'})
	});

	language.push({
		pattern: /([^=\s]+)=(".*?"|'.*?'|[^\s>]+)/g,
		matches: Syntax.extractMatches(
			{type: 'attribute', only: ['tag']},
			{type: 'string', only: ['tag']}
		)
	});

	language.push(Syntax.lib.xmlEntity);
	language.push(Syntax.lib.xmlPercentEscape);

	language.push(Syntax.lib.singleQuotedString);
	language.push(Syntax.lib.doubleQuotedString);
});

Syntax.register('xml', function (brush) {
	language.push({
		pattern: /(<!(\[CDATA\[)([\s\S]*?)(\]\])>)/gm,
		matches: Syntax.extractMatches(
			{type: 'cdata', allow: ['cdata-content', 'cdata-tag']},
			{type: 'cdata-tag'},
			{type: 'cdata-content'},
			{type: 'cdata-tag'}
		)
	});

	language.push(Syntax.lib.xmlComment);

	language.push({
		pattern: /<[^>\-\s]([^>'"!\/;\?@\[\]^`\{\}\|]|"[^"]*"|'[^']')*[\/?]?>/g,
		brush: 'xml-tag'
	});

	language.push(Syntax.lib.xmlEntity);
	language.push(Syntax.lib.xmlPercentEscape);

	language.push(Syntax.lib.webLink);
});
