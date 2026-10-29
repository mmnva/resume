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
    'Program, Portfolio &amp; Operations',
    '$1.25M',
    '$17M',
    '40,000+',
  ]) {
    assert.ok(html.includes(copy), `missing built copy: ${copy}`);
  }
});

test('hero and identity rail match the approved recruiter-first concept', () => {
  assert.match(html, /class="identity-rail"/);
  assert.match(html, /Michael McNea, CDMP/);
  assert.match(html, /Data Governance · Legal Technology · Legal Operations/);
  assert.match(html, /View Evidence/);
  assert.match(html, /https:\/\/linkedin\.com\/in\/michaelemcnea/);
  assert.match(html, /https:\/\/github\.com\/mmnva\/resume/);
  assert.doesNotMatch(html, /Michael_McNea_Resume\.pdf/);
});

test('identity rail updates its current section while the page scrolls', () => {
  assert.match(html, /IntersectionObserver/);
});

test('downstream sections are present and source-backed', () => {
  for (const id of ['case-studies', 'career', 'credentials', 'contact']) {
    assert.match(html, new RegExp(`id="${id}"`));
  }

  for (const value of ['$1.25M', '$1.5M', '40,000+', '$17M', 'February 2026']) {
    assert.ok(html.includes(value), `missing downstream proof point: ${value}`);
  }
});

test('public HTML contains no direct email or phone link', () => {
  assert.doesNotMatch(html, /mailto:|tel:/i);
  assert.doesNotMatch(html, /@gmail\.com|703[-\s.]?851[-\s.]?3700/i);
});

test('built page contains no known dead internal routes', () => {
  assert.doesNotMatch(html, /href="\/(track|case-study|contact)\//);
  assert.doesNotMatch(html, /href="\/Michael_McNea_Resume\.pdf"/);
});

test('metadata and footer identify the Cloudflare production target', () => {
  assert.match(html, /https:\/\/michael-mcnea\.pages\.dev\//);
  assert.match(html, /Built with Astro · Hosted on Cloudflare/);
});

test('obsolete public contact details are absent from tracked source', async () => {
  const footerPath = new URL('../src/components/Footer.astro', import.meta.url);
  await assert.rejects(() => readFile(footerPath, 'utf8'));
});
