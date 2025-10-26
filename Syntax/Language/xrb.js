// brush: "xrb" aliases: ["trenni"]

//	This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
//	Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>
//	See <jquery.syntax.js> for licensing details.

import {Language} from '../Language.js';
import {Rule} from '../Rule.js';

const language = new Language('xrb');

// Embedded Ruby processing instruction: <?r ... ?>
language.push({
	pattern: /(<\?r)([\s\S]*?)(\?>)/m,
	matches: Rule.extractMatches(
		{type: 'keyword'},
		{language: 'ruby'},
		{type: 'keyword'}
	)
});

// Ruby interpolation within text: #{ ... }
language.push({
	pattern: /(#{)([\s\S]*?)(})/m,
	matches: Rule.extractMatches(
		{type: 'keyword'},
		{language: 'ruby'},
		{type: 'keyword'}
	)
});

// Derive XML so tags/attributes/entities are highlighted around embedded Ruby
language.derives('xml');

export default function register(syntax) {
	syntax.register('xrb', language);
	// Alias 'trenni' if used historically
	syntax.alias('xrb', ['trenni']);
}
