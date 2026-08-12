import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createContactHandler } from '../functions/api/contact.js';

const env = {
  CLOUDFLARE_ACCOUNT_ID: 'account-id',
  CLOUDFLARE_EMAIL_API_TOKEN: 'token',
  CONTACT_FROM: 'portfolio@example.com',
  CONTACT_TO: 'verified@example.com',
};

function request(fields, accept = 'application/json') {
  const body = new URLSearchParams(fields);
  return new Request('https://portfolio.example/api/contact', {
    method: 'POST',
    headers: { accept, 'content-type': 'application/x-www-form-urlencoded' },
    body,
  });
}

test('valid submissions send a replyable Cloudflare email', async () => {
  let outbound;
  const handler = createContactHandler(async (url, init) => {
    outbound = { url, init, body: JSON.parse(init.body) };
    return Response.json({ success: true });
  });
  const response = await handler({
    request: request({
      name: 'Recruiter',
      email: 'recruiter@example.com',
      company: 'Example',
      message: 'Let us talk.',
      website: '',
    }),
    env,
  });

  assert.equal(response.status, 200);
  assert.equal(outbound.body.replyTo, 'recruiter@example.com');
  assert.equal(outbound.body.to, env.CONTACT_TO);
  assert.match(outbound.url, /accounts\/account-id\/email\/sending\/send$/);
  assert.equal(outbound.init.headers.authorization, 'Bearer token');
});

test('invalid and bot submissions do not call email delivery', async () => {
  let calls = 0;
  const handler = createContactHandler(async () => {
    calls += 1;
    return Response.json({ success: true });
  });
  const invalid = await handler({
    request: request({ name: '', email: 'bad', message: '', website: '' }),
    env,
  });
  assert.equal(invalid.status, 400);
  const bot = await handler({
    request: request({
      name: 'Bot',
      email: 'bot@example.com',
      message: 'Spam message',
      website: 'filled',
    }),
    env,
  });
  assert.equal(bot.status, 200);
  assert.equal(calls, 0);
});

test('HTML output escapes submitted values', async () => {
  let outbound;
  const handler = createContactHandler(async (_url, init) => {
    outbound = JSON.parse(init.body);
    return Response.json({ success: true });
  });
  await handler({
    request: request({
      name: '<Recruiter>',
      email: 'recruiter@example.com',
      company: 'A & B',
      message: '<script>alert(1)</script>',
      website: '',
    }),
    env,
  });

  assert.match(outbound.html, /&lt;Recruiter&gt;/);
  assert.match(outbound.html, /A &amp; B/);
  assert.doesNotMatch(outbound.html, /<script>/);
});

test('unsupported content types are rejected before parsing', async () => {
  const handler = createContactHandler(async () => Response.json({ success: true }));
  const response = await handler({
    request: new Request('https://portfolio.example/api/contact', {
      method: 'POST',
      headers: { accept: 'application/json', 'content-type': 'application/json' },
      body: '{}',
    }),
    env,
  });
  assert.equal(response.status, 415);
});

test('missing Cloudflare configuration fails without attempting delivery', async () => {
  let calls = 0;
  const handler = createContactHandler(async () => {
    calls += 1;
    return Response.json({ success: true });
  });
  const response = await handler({
    request: request({
      name: 'Recruiter',
      email: 'recruiter@example.com',
      message: 'Let us talk.',
      website: '',
    }),
    env: {},
  });
  assert.equal(response.status, 503);
  assert.equal(calls, 0);
});

test('standard form submissions redirect back to contact status', async () => {
  const handler = createContactHandler(async () => Response.json({ success: true }));
  const response = await handler({
    request: request(
      {
        name: 'Recruiter',
        email: 'recruiter@example.com',
        message: 'Let us talk.',
        website: '',
      },
      'text/html',
    ),
    env,
  });
  assert.equal(response.status, 303);
  assert.equal(response.headers.get('location'), 'https://portfolio.example/?contact=sent#contact');
});
