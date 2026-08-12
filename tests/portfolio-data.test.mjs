import assert from 'node:assert/strict';
import { test } from 'node:test';
import { credentials, tracks } from '../src/data/portfolio.mjs';

test('each role track exposes exactly three evidence frames', () => {
  assert.deepEqual(
    tracks.map(({ id, frames }) => [id, frames.length]),
    [
      ['legal-operations', 3],
      ['data-governance', 3],
      ['program-portfolio', 3],
    ],
  );
});

test('all evidence metrics are visibly labeled and source-backed', () => {
  for (const track of tracks) {
    assert.ok(track.label);
    assert.ok(track.summary);

    for (const frame of track.frames) {
      assert.ok(frame.source.company);
      assert.ok(frame.source.project);
      assert.ok(frame.metrics.length >= 2);

      for (const metric of frame.metrics) {
        assert.ok(metric.value);
        assert.ok(metric.label);
      }
    }
  }
});

test('approved proof points are preserved verbatim', () => {
  const values = tracks.flatMap((track) =>
    track.frames.flatMap((frame) => frame.metrics.map((metric) => metric.value)),
  );

  for (const value of ['$1.25M', '$50K+', '95%+', '$3T', '$17M', '40,000+']) {
    assert.ok(values.includes(value), `missing approved metric ${value}`);
  }
});

test('certification date is current and only confirmed credentials are shown', () => {
  assert.deepEqual(credentials.map(({ name }) => name), ['CDMP', 'APICS CSCP', 'LUMA Practitioner']);
  assert.ok(
    credentials.some(
      (item) => item.name === 'CDMP' && item.detail.includes('February 2026'),
    ),
  );
  assert.ok(credentials.every((item) => !item.detail.includes('expected Jan 2026')));
});
