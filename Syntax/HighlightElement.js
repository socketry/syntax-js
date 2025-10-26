/**
 * Syntax Highlighting Web Component
 * A modern, framework-agnostic syntax highlighter using Web Components and Shadow DOM
 *
 * @package @socketry/syntax
 * @author Samuel G. D. Williams
 * @license MIT
 */

import Syntax from '../Syntax.js';

const supportsAdopted =
	typeof CSSStyleSheet !== 'undefined' &&
	'adoptedStyleSheets' in Document.prototype;

/**
 * HighlightElement - Web Component for syntax highlighting with isolated styles
 *
 * Usage:
 *   <syntax-highlight language="javascript">const x = 1;</syntax-highlight>
 *   <syntax-highlight lang="html"><div>...</div></syntax-highlight>
 *   <syntax-highlight class="language-ruby">puts "Hello"</syntax-highlight>
 */
export class HighlightElement extends HTMLElement {
	static get observedAttributes() {
		return ['language', 'lang', 'theme'];
	}

	#syntax = null;
	#shadow;
	#adoptedHrefs = new Set();
	#highlighted = false;

	constructor() {
		super();
	}

	get syntax() {
		return this.#syntax || Syntax.default;
	}

	set syntax(value) {
		this.#syntax = value;
		// Re-render with new syntax instance if already connected:
		if (this.isConnected && !this.#highlighted) {
			this.#render();
		}
	}

	get language() {
		return (
			this.getAttribute('language') ||
			this.getAttribute('lang') ||
			this.#detectLanguageFromClass()
		);
	}

	set language(value) {
		if (value == null) {
			this.removeAttribute('language');
		} else {
			this.setAttribute('language', value);
		}
	}

	get theme() {
		return this.getAttribute('theme') || this.syntax.defaultOptions.theme;
	}

	set theme(value) {
		if (value == null) {
			this.removeAttribute('theme');
		} else {
			this.setAttribute('theme', value);
		}
	}

	connectedCallback() {
		// Don't re-highlight if already done
		if (this.#highlighted) {
			return;
		}

		if (!this.#shadow) {
			this.#shadow = this.attachShadow({mode: 'open'});
		}

		this.#render();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue === newValue) {
			return;
		}

		if (
			(name === 'language' || name === 'lang' || name === 'theme') &&
			this.isConnected &&
			this.#shadow
		) {
			// Reset highlighted flag to allow re-rendering
			this.#highlighted = false;
			this.#adoptedHrefs.clear();
			this.#render();
		}
	}

	/**
	 * Detect language from class names (e.g., language-javascript, brush-ruby)
	 */
	#detectLanguageFromClass() {
		const classes = this.className.split(/\s+/);

		for (const cls of classes) {
			// Match language-* or brush-* patterns
			const match = cls.match(/^(?:language|brush)-(.+)$/);
			if (match) {
				return match[1];
			}
		}

		return null;
	}

	/**
	 * Get the code content to highlight
	 */
	#getCodeContent() {
		// Check if there's a <code> child element
		const codeElement = this.querySelector('code');
		if (codeElement) {
			return codeElement.textContent;
		}

		return this.textContent;
	}

	/**
	 * Load theme CSS into shadow root
	 */
	async #loadStylesheets(languageName) {
		// Guard: ensure shadow root exists
		if (!this.#shadow) {
			return;
		}

		const themeRoot = new URL(
			this.syntax.themeRoot,
			typeof document !== 'undefined' ? document.baseURI : import.meta.url
		);

		const urls = [
			new URL('syntax.css', themeRoot),
			new URL(`${languageName}.css`, themeRoot)
		];

		if (supportsAdopted && this.#shadow.adoptedStyleSheets !== undefined) {
			const sheets = Array.from(this.#shadow.adoptedStyleSheets);
			for (const url of urls) {
				const href = url.toString();
				if (this.#adoptedHrefs.has(href)) continue;
				try {
					const result = await this.syntax.getStyleSheet(url);
					if (result.sheet) {
						sheets.push(result.sheet);
						this.#adoptedHrefs.add(href);
					}
				} catch (error) {
					console.warn(`Failed to load ${href}:`, error);
				}
			}
			this.#shadow.adoptedStyleSheets = sheets;
		} else {
			// Fallback: inline <style> tags in shadow root
			for (const url of urls) {
				const href = url.toString();
				if (this.#adoptedHrefs.has(href)) continue;
				try {
					const result = await this.syntax.getStyleSheet(url);
					const style = document.createElement('style');
					style.textContent = result.cssText;
					this.#shadow.appendChild(style);
					this.#adoptedHrefs.add(href);
				} catch (error) {
					console.warn(`Failed to load ${href}:`, error);
				}
			}
		}
	}

	/**
	 * Perform syntax highlighting and render into shadow DOM
	 */
	async #render() {
		try {
			const languageName = this.language;

			if (!languageName) {
				console.warn('<syntax-highlight>: No language specified');
				return;
			}

			// Get or auto-load the language
			const language = await this.syntax.getLanguage(languageName);

			if (!language) {
				console.warn(
					`<syntax-highlight>: Language '${languageName}' not found and could not be loaded`
				);
				return;
			}

			// Load theme CSS into shadow root using the language's canonical name
			await this.#loadStylesheets(language.name);

			const code = this.#getCodeContent();

			// Build shadow DOM structure without clearing the light DOM until success
			this.#shadow.innerHTML = '';
			const pre = document.createElement('pre');
			const codeEl = document.createElement('code');
			codeEl.className = `syntax ${languageName}`;
			pre.appendChild(codeEl);
			this.#shadow.appendChild(pre);

			// Highlight and append
			const highlighted = await language.process(this.syntax, code);
			codeEl.appendChild(highlighted);

			// Clear light DOM only after successful render to avoid losing content on errors
			this.textContent = '';

			this.#highlighted = true;
			this.classList.add('highlighted', 'syntax');
			this.setAttribute('data-language', languageName);
		} catch (error) {
			this.classList.add('syntax-error');
			this.setAttribute('data-error', error?.name || 'render-error');
			this.dispatchEvent(
				new CustomEvent('syntax-error', {
					detail: {error, language: this.language, element: this}
				})
			);
			console.warn('<syntax-highlight> render failed:', error);
		}
	}
}

/**
 * Auto-register the custom element
 */
if (
	typeof customElements !== 'undefined' &&
	!customElements.get('syntax-highlight')
) {
	customElements.define('syntax-highlight', HighlightElement);
}

/**
 * Compatibility layer - auto-upgrade existing code blocks
 */
export function autoUpgrade(
	selector = 'code[lang], code[class*="language-"], code[class*="brush-"]',
	syntax = null
) {
	const elements = document.querySelectorAll(selector);

	for (const element of elements) {
		// Skip if already highlighted or is inside a syntax-highlight
		if (
			element.classList.contains('highlighted') ||
			element.closest('syntax-highlight')
		) {
			continue;
		}

		// Create a syntax-highlight wrapper
		const wrapper = document.createElement('syntax-highlight');
		if (syntax) {
			wrapper.syntax = syntax;
		}

		// Try to detect language from various sources
		let language =
			element.getAttribute('lang') || element.getAttribute('language');

		if (!language) {
			// Check class names
			const classes = element.className.split(/\s+/);
			for (const cls of classes) {
				const match = cls.match(/^(?:language|brush)-(.+)$/);
				if (match) {
					language = match[1];
					break;
				}
			}
		}

		if (language) {
			wrapper.setAttribute('language', language);
		}

		// Move the code content
		wrapper.textContent = element.textContent;

		// Replace the element
		element.parentNode.replaceChild(wrapper, element);
	}
}

export {Syntax};
export default HighlightElement;
