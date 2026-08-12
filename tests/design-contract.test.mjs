import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { test } from 'node:test';

const root = new URL('../', import.meta.url);

test('approved palette is present', async () => {
  const css = await readFile(new URL('src/styles/global.css', root), 'utf8');

  for (const token of [
    '#083B55',
    '#016EA7',
    '#AEB96A',
    '#BCC3CD',
    '#E4DDD3',
    '#F6F7F2',
    '#A23D4D',
  ]) {
    assert.match(css, new RegExp(token, 'i'));
  }
});

test('approved portrait is preserved in the asset pipeline', async () => {
  await access(new URL('src/assets/michael-mcnea-portrait.jpeg', root));
});
