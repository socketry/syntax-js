# @socketry/syntax Examples

This directory contains interactive examples demonstrating the syntax highlighting capabilities of `@socketry/syntax`.

## Examples

### [index.html](index.html)

Main landing page with basic examples of both JavaScript and HTML highlighting.

### [javascript.html](javascript.html)

Comprehensive JavaScript examples including:

- ES6+ features (classes, async/await, arrow functions)
- Template literals
- Regular expressions
- Array methods
- Comments (single-line, multi-line, JSDoc)

### [html.html](html.html)

Complete HTML examples demonstrating:

- Basic HTML5 document structure
- Various attribute formats (quoted, unquoted, boolean)
- HTML entities (named and numeric)
- Forms and input types
- Semantic HTML5 elements
- Comments and CDATA sections
- Media elements (images, video, audio)

### [mixed.html](mixed.html)

Mixed content examples showing:

- HTML with embedded JavaScript in `<script>` tags
- Multiple script blocks
- ES6 modules in HTML
- Web Components
- Async script loading strategies
- Template strings for dynamic HTML generation

## Running the Examples

To view the examples, you'll need to serve them from a local web server (due to ES module restrictions). You can use any of these methods:

### Using Python:

```bash
# Python 3
python -m http.server 8000

# Then open http://localhost:8000/examples/
```

### Using Node.js:

```bash
# Install http-server globally
npm install -g http-server

# Run from the project root
http-server -p 8000

# Then open http://localhost:8000/examples/
```

### Using PHP:

```bash
php -S localhost:8000

# Then open http://localhost:8000/examples/
```

## Features Demonstrated

All examples use the `<syntax-highlight>` Web Component with automatic language detection and highlighting. Key features shown include:

- **Automatic highlighting**: Code blocks are automatically processed and highlighted
- **Shadow DOM**: Each code block is isolated with Shadow DOM for proper style encapsulation
- **Dynamic language loading**: Language modules are loaded on-demand
- **Embedded language support**: JavaScript code inside HTML `<script>` tags is highlighted with JavaScript syntax
- **Theme support**: Examples use the "base" theme with customizable styles

## How It Works

Each example page:

1. Loads the main `Syntax.js` module
2. Calls `Syntax.highlight()` to automatically upgrade `<syntax-highlight>` elements
3. Language modules are loaded dynamically as needed
4. CSS themes are injected automatically via adoptedStyleSheets (or `<link>` tags as fallback)

Example usage:

```html
<syntax-highlight language="javascript">
	// Your code here const greeting = 'Hello, World!'; console.log(greeting);
</syntax-highlight>

<script type="module">
	import Syntax from '../Syntax.js';

	await Syntax.highlight({
		autoUpgrade: true,
		syntax: Syntax.default
	});
</script>
```
