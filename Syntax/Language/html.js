// HTML language definition
// Supports HTML tags, attributes, entities, comments, DOCTYPE, CDATA sections, and embedded JavaScript

import Language from '../Language.js';
import Match from '../Match.js';
import Rule from '../Rule.js';

export default function register(syntax) {
	const language = new Language(syntax, 'html');

	// Embedded JavaScript in <script> tags
	// Captures: opening tag (group 1), content (group 2), closing tag (group 3)
	language.push({
		pattern: /(<script(?:\s+[^>]*)?>)([\s\S]*?)(<\/script>)/i,
		matches: Rule.extractMatches({index: 2, language: 'javascript'})
	});

	// CDATA sections: <![CDATA[...]]>
	language.push({
		pattern: /(<!(\[CDATA\[)([\s\S]*?)(\]\])>)/,
		type: 'cdata',
		allow: ['cdata-content', 'cdata-tag']
	});

	// HTML Comments: <!-- ... -->
	language.push({
		pattern: /<!--[\s\S]*?-->/,
		type: 'comment'
	});

	// DOCTYPE declaration
	language.push({
		pattern: /<!DOCTYPE[^>]*>/i,
		type: 'doctype'
	});

	// HTML tags with attributes
	// This matches opening tags, closing tags, and self-closing tags
	language.push({
		pattern: /<\/?[\w-]+(?:\s+[\w-]+(?:=(?:"[^"]*"|'[^']*'|[^\s>]+))?)*\s*\/?>/,
		type: 'tag',
		allow: ['tag-name', 'attribute', 'string']
	});

	// Tag names (for highlighting within tags)
	language.push({
		pattern: /<\/?([a-zA-Z][\w-]*)/,
		matches: match => {
			return [
				new Match(
					match.index + 1 + (match[0][1] === '/' ? 1 : 0),
					match[1].length,
					{type: 'tag-name'},
					match[1]
				)
			];
		}
	});

	// Attribute names and values (only inside tags)
	// Matches both key=value and boolean attributes
	language.push({
		pattern:
			/\s([\w-]+)(?:=("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|[^\s>]+))?(?=\s|\/?>)/,
		matches: match => {
			const matches = [];
			// Attribute name
			matches.push(
				new Match(match.index + 1, match[1].length, {type: 'attribute'}, match[1])
			);
			// Attribute value (if present)
			if (match[2]) {
				matches.push(
					new Match(
						match.index + 1 + match[1].length + 1,
						match[2].length,
						{type: 'string'},
						match[2]
					)
				);
			}
			return matches;
		},
		only: ['tag']
	});

	// HTML entities: &nbsp; &lt; &gt; &#123; &#xAB; etc.
	language.push({
		pattern: /&(?:[a-zA-Z][a-zA-Z0-9]*|#[0-9]+|#x[0-9a-fA-F]+);/,
		type: 'entity'
	});

	// Percent encoding in URLs: %20, %3A, etc.
	language.push({
		pattern: /%[0-9a-fA-F]{2}/,
		type: 'percent-escape',
		only: ['string']
	});

	syntax.register('html', language);
	syntax.alias('html', ['htm']);

	return language;
}
