// brush: "html" aliases: []

//	This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
//	Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>
//	See <jquery.syntax.js> for licensing details.

import {Language} from '../Language.js';
import {Rule} from '../Rule.js';

const language = new Language('html');

// Embedded JavaScript in <script> tags
language.push({
	pattern: /<script.*?type\=.?text\/javascript.*?>((.|\n)*?)<\/script>/im,
	matches: Rule.extractMatches({language: 'javascript'})
});

// Embedded CSS in <style> tags
language.push({
	pattern: /<style.*?type=.?text\/css.*?>((.|\n)*?)<\/style>/im,
	matches: Rule.extractMatches({language: 'css'})
});

// Embedded PHP
language.push({
	pattern: /((<\?php)([\s\S]*?)(\?>))/m,
	matches: Rule.extractMatches(
		{type: 'php-tag', allow: ['keyword', 'php-script']},
		{type: 'keyword'},
		{language: 'php-script'},
		{type: 'keyword'}
	)
});

// Embedded Ruby
language.push({
	pattern: /((<\?rb?)([\s\S]*?)(\?>))/m,
	matches: Rule.extractMatches(
		{type: 'ruby-tag', allow: ['keyword', 'ruby']},
		{type: 'keyword'},
		{language: 'ruby'},
		{type: 'keyword'}
	)
});

// ERB-style instructions
language.push({
	pattern: /<%=?(.*?)(%>)/,
	type: 'instruction',
	allow: ['string']
});

// DOCTYPE declarations
language.push({
	pattern: /<\!(DOCTYPE(.*?))>/,
	matches: Rule.extractMatches({type: 'doctype'})
});

// Percent escapes
language.push({
	pattern: /(%[0-9a-f]{2})/i,
	type: 'percent-escape',
	only: ['html']
});

// Derive from XML for tag parsing
language.derives('xml');

export default function register(syntax) {
	syntax.register('html', language);
}
