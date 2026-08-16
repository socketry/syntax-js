import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readdir, readFile} from 'node:fs/promises';

const examplesDirectory = new URL('../examples/', import.meta.url);

test('code examples initialize syntax highlighting', async () => {
	const entries = await readdir(examplesDirectory);

	for (const entry of entries) {
		if (!entry.endsWith('.html')) continue;

		const source = await readFile(new URL(entry, examplesDirectory), 'utf8');
		const containsCode =
			source.includes('<syntax-code') ||
			source.includes('class="language-');

		if (containsCode) {
			assert.match(
				source,
				/Syntax\.highlight|src="application\.js"/,
				`${entry} should initialize syntax highlighting`
			);
		}
	}
});
