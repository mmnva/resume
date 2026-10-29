import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  careerStages,
  credentials,
  featuredCases,
  technologyGroups,
  tracks,
} from '../src/data/portfolio.mjs';

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

test('manual process evidence reports the remaining steps accurately', () => {
  const dataGovernance = tracks.find((track) => track.id === 'data-governance');
  const processImprovement = dataGovernance.frames.find((frame) => frame.id === 'data-efficiency');

  assert.deepEqual(processImprovement, {
    id: 'data-efficiency',
    eyebrow: '3. Process improvement',
    title: 'Manual work reduced',
    chart: 'progress',
    metrics: [
      { value: '45 → 15', label: 'manual process steps', amount: 67 },
      { value: '100 → 40', label: 'relative cycle time', amount: 60 },
    ],
    source: {
      company: 'Freddie Mac',
      project: 'Annual records review redesign',
    },
  });
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

test('downstream recruiter content stays concise and source-backed', () => {
  assert.equal(featuredCases.length, 3);
  assert.deepEqual(featuredCases.map(({ track }) => track), [
    'Legal Operations',
    'Data Governance',
    'Program, Portfolio & Operations',
  ]);
  assert.deepEqual(careerStages.map(({ title }) => title), [
    'Early Operations',
    'Process & Systems Builder',
    'Technology & Data Integrator',
    'Strategic Program Leader',
    'Today',
  ]);
  assert.deepEqual(technologyGroups.map(({ name }) => name), [
    'Legal technology and CLM',
    'Data governance and metadata',
    'Workflow automation',
    'Reporting and analytics',
    'Integration and APIs',
  ]);
});

test('program and portfolio evidence includes operations leadership', () => {
  const operationsTrack = tracks.find((track) => track.id === 'program-portfolio');

  assert.equal(operationsTrack.label, 'Program, Portfolio & Operations');
  assert.equal(
    operationsTrack.summary,
    'Program, portfolio, and operations management that delivers financial value, enterprise scale, and dependable execution across industries.',
  );
});

test('today positions operations and governance leadership toward AI engineering', () => {
  assert.deepEqual(careerStages.at(-1), {
    title: 'Today',
    period: '2024–present',
    role: 'Operations | Governance leadership',
    detail:
      'Leading operations, legal technology, and governance programs while building toward AI engineering leadership through AI-assisted workflows, automation, and data platforms.',
  });
});
