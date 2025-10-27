import {Language} from '../Language.js';
import {Rule} from '../Rule.js';

const language = new Language('markdown');

// Headers
language.push({
	pattern: /^#{1,6}\s+.+$/m,
	type: 'keyword'
});

// Bold
language.push({
	pattern: /\*\*(.+?)\*\*/,
	type: 'keyword'
});

language.push({
	pattern: /__(.+?)__/,
	type: 'keyword'
});

// Italic
language.push({
	pattern: /\*(.+?)\*/,
	type: 'string'
});

language.push({
	pattern: /_(.+?)_/,
	type: 'string'
});

// Code blocks with language
language.push({
	pattern: /^```[\w-]*\n[\s\S]*?\n```$/m,
	type: 'constant'
});

// Inline code
language.push({
	pattern: /`([^`]+)`/,
	type: 'constant'
});

// Links - make them clickable
language.push({
	pattern: /\[([^\]]+)\]\(([^)]+)\)/,
	type: 'function',
	matches: Rule.extractMatches(
		{type: 'string'}, // Link text
		{
			type: 'function',
			process: function (container, match) {
				const anchor = document.createElement('a');
				anchor.className = container.className;
				anchor.textContent = container.textContent;
				anchor.href = match.value;
				return anchor;
			}
		} // URL
	)
});

// Images
language.push({
	pattern: /!\[([^\]]*)\]\(([^)]+)\)/,
	type: 'function'
});

// Blockquotes
language.push({
	pattern: /^>\s+.+$/m,
	type: 'comment'
});

// Unordered lists
language.push({
	pattern: /^[\s]*[-*+]\s+/m,
	type: 'operator'
});

// Ordered lists
language.push({
	pattern: /^[\s]*\d+\.\s+/m,
	type: 'operator'
});

// Horizontal rules
language.push({
	pattern: /^(?:[-*_]){3,}$/m,
	type: 'operator'
});

// URLs - make them clickable
language.push({
	...Rule.webLink,
	process: function (container, match) {
		const anchor = document.createElement('a');
		anchor.className = container.className;
		anchor.textContent = match.value;
		anchor.href = match.value;
		return anchor;
	}
});

export default function register(syntax) {
	syntax.register('markdown', language);
	syntax.alias('markdown', ['md']);
}
