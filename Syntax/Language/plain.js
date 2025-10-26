// brush: "plain" aliases: ["text"]

//	This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
//	Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>
//	See <jquery.syntax.js> for licensing details.

import {Language} from '../Language.js';
import {Rule} from '../Rule.js';

const language = new Language('plain');

language.push(Rule.webLink);

// Process href types as clickable links
language.processes['href'] = function (container, match, options) {
	const anchor = document.createElement('a');
	anchor.className = container.className;
	anchor.textContent = match.value;
	anchor.href = match.value;
	return anchor;
};

export default function register(syntax) {
	syntax.register('plain', language);
	syntax.alias('plain', ['text']);
}
