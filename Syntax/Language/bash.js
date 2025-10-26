// This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
// Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>

import {Language} from '../Language.js';
import {Rule} from '../Rule.js';

const language = new Language('bash');

language.push({
	pattern: /^([\w@:~ ]*?[\$|\#])\s+(.*?)$/m,
	matches: Rule.extractMatches({type: 'prompt'}, {language: 'bash-script'})
});

language.push({
	pattern: /^\-\- .*$/m,
	type: 'comment',
	allow: ['href']
});

// Strings
language.push(Rule.singleQuotedString);
language.push(Rule.doubleQuotedString);
language.push(Rule.stringEscape);

// URLs
language.push(Rule.webLink);

language.push({
	type: 'stderr',
	allow: ['string', 'comment', 'constant', 'href']
});

export default function register(syntax) {
	syntax.register('bash', language);
}
