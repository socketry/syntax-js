// brush: "php" aliases: []

//	This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
//	Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>
//	See <jquery.syntax.js> for licensing details.

import {Language} from '../Language.js';
import {Rule} from '../Rule.js';

const language = new Language('php');

// Don't derive from php-script - we only want it inside the tags
// language.derives('php-script');

language.push({
	pattern: /(<\?(php)?)([\s\S]*?)(\?>)/m,
	matches: Rule.extractMatches(
		{type: 'keyword'},
		null,
		{language: 'php-script'},
		{type: 'keyword'}
	)
});

export default function register(syntax) {
	syntax.register('php', language);
}
