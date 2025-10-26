# @socketry/syntax

A modern, framework-agnostic syntax highlighter using Web Components. This is a reimplementation of [jQuery.Syntax](https://github.com/ioquatix/jquery-syntax) without jQuery dependencies.

## Features

- 🎨 **Modern Web Components** - Uses autonomous custom elements
- 📦 **Dynamic Loading** - Loads language definitions on-demand
- 🔒 **No Dependencies** - Pure JavaScript, no jQuery required
- 🎯 **Framework Agnostic** - Works with React, Vue, vanilla JS, etc.
- 🌲 **Clean Architecture** - Well-structured classes with clear responsibilities
- 🔐 **Private Fields** - Modern JavaScript with proper encapsulation

## Installation

```bash
npm install @socketry/syntax
```

## Usage

### Basic Usage with Web Components

```html
<script type="module">
	import '@socketry/syntax';
	import registerJavaScript from '@socketry/syntax/Language/javascript.js';
	import {Syntax} from '@socketry/syntax';

	// Register the JavaScript language
	registerJavaScript(Syntax.default);
</script>

<!-- Use the web component -->
<syntax-highlight language="javascript">
	const hello = "world"; console.log(hello);
</syntax-highlight>
```

### Programmatic Usage

```javascript
import Syntax from '@socketry/syntax';
import registerJavaScript from '@socketry/syntax/Language/javascript.js';

// Create a Syntax instance
const syntax = new Syntax();
registerJavaScript(syntax);

// Get the JavaScript language and process code
const language = await syntax.getLanguage('javascript');
const code = 'const x = 10;';
const html = await language.process(code);
document.body.appendChild(html);
```

### Custom Instance

```javascript
import {Syntax} from '@socketry/syntax';

// Create a custom instance
const customSyntax = new Syntax({
	theme: 'dark',
	root: '/assets/syntax/',
	cacheScripts: false
});

// Use with web component
const element = document.createElement('syntax-highlight');
element.syntax = customSyntax;
element.setAttribute('language', 'javascript');
element.textContent = 'const hello = "world";';
document.body.appendChild(element);
```

## Error handling

Syntax is resilient by default and won’t break rendering if something goes wrong (missing languages, a bad rule, or a stylesheet issue). You can opt into strict behavior to fail fast during development or testing:

```js
import Syntax from '@socketry/syntax';

const syntax = new Syntax();
syntax.defaultOptions.strict = true; // throw on errors instead of warning/fallback

try {
	await syntax.getLanguage('javascript');
} catch (error) {
	// Handle specific errors if needed
	// import {LanguageLoadError, LanguageNotFoundError} from '@socketry/syntax/Errors'
}
```

For the web component, you can listen for recoverable errors:

```html
<syntax-highlight id="code" language="javascript">const x = 1</syntax-highlight>
<script type="module">
	const el = document.getElementById('code');
	el.addEventListener('syntax-error', event => {
		console.warn('Highlighting failed:', event.detail.error);
	});
</script>
```

## Architecture

- **`Syntax`** - Core class for configuration and resource management
- **`Match`** - Represents a matched token/region in the syntax tree
- **`Language`** - Language definition with pattern matching rules
- **`Rule`** - Pattern matching and extraction helpers
- **`Loader`** - Handles dynamic loading of language modules and stylesheets with caching
- **`CodeElement`** - Web component (`<syntax-highlight>`) for declarative usage

## Migrating from jQuery.Syntax

This is a modern reimplementation with breaking changes:

### Key Differences

- **No jQuery dependency** - Uses vanilla JavaScript and Web Components
- **ES modules** - Use `import` instead of `<script>` tags
- **Async API** - `getLanguage()` returns a Promise
- **`Language` not `Brush`** - Terminology updated to match common usage
- **`type` not `klass`** - Token properties use `type` for semantic clarity
- **Modern registration** - Language modules export a `register()` function

### Migration Example

**jQuery.Syntax (old):**

```javascript
$.syntax.brush('javascript', function () {
	// language definition
});

$('.code').syntax({brush: 'javascript'});
```

**@socketry/syntax (new):**

```javascript
import Syntax from '@socketry/syntax';
import registerJavaScript from '@socketry/syntax/Language/javascript.js';

const syntax = new Syntax();
registerJavaScript(syntax);

// Use web component
<syntax-highlight language="javascript">...</syntax-highlight>;

// Or programmatic
const language = await syntax.getLanguage('javascript');
const html = await language.process(code);
```

## Testing

```bash
# Install dependencies
npm install

# Run tests
npm test
```

## Creating a Language Definition

```javascript
import {Language} from '@socketry/syntax';

export default function register(syntax) {
	const language = new Language(syntax, 'mylanguage');

	// Define keywords
	language.push(['if', 'else', 'while'], {type: 'keyword'});

	// Define patterns
	language.push({
		pattern: /"([^\\"]|\\.)*"/,
		type: 'string'
	});

	// Register aliases
	syntax.alias('mylanguage', ['ml', 'my-lang']);

	// Register the language
	syntax.register('mylanguage', language);

	return language;
}
```

## License

Released under the MIT license.

Copyright, 2025, by Samuel G. D. Williams.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
