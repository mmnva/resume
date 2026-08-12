import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');

test('role selector renders three accessible tabs and panels', () => {
  assert.equal((html.match(/role="tab"/g) ?? []).length, 3);
  assert.equal((html.match(/role="tabpanel"/g) ?? []).length, 3);
  assert.equal((html.match(/data-evidence-frame/g) ?? []).length, 9);
  assert.match(html, /aria-selected="true"[^>]*aria-controls="panel-legal-operations"/);
});

test('approved track labels and strongest proof points are rendered', () => {
  for (const copy of [
    'Legal Operations',
    'Data Governance',
    'Program &amp; Portfolio',
    '$1.25M',
    '$17M',
    '40,000+',
  ]) {
    assert.ok(html.includes(copy), `missing built copy: ${copy}`);
  }
});
