const JSON_HEADERS = { 'cache-control': 'no-store' };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeLine(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function normalizeMessage(value) {
  return String(value ?? '')
    .replace(/\r\n?/g, '\n')
    .split('\n')
    .map((line) => line.replace(/[ \t]+/g, ' ').trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function respond(request, ok, message, status) {
  const wantsJson = request.headers.get('accept')?.includes('application/json');
  if (wantsJson) {
    return Response.json({ ok, message }, { status, headers: JSON_HEADERS });
  }

  const redirect = new URL('/', request.url);
  redirect.searchParams.set('contact', ok ? 'sent' : 'error');
  redirect.hash = 'contact';
  return Response.redirect(redirect.toString(), 303);
}

export function createContactHandler(fetchImpl = globalThis.fetch) {
  return async ({ request, env }) => {
    if (request.method !== 'POST') {
      return respond(request, false, 'Method not allowed.', 405);
    }

    const contentType = request.headers.get('content-type')?.toLowerCase() ?? '';
    const supported =
      contentType.startsWith('application/x-www-form-urlencoded') ||
      contentType.startsWith('multipart/form-data');

    if (!supported) {
      return respond(request, false, 'Unable to send this message.', 415);
    }

    let form;
    try {
      form = await request.formData();
    } catch {
      return respond(request, false, 'Unable to send this message.', 400);
    }

    const website = normalizeLine(form.get('website'));
    if (website) {
      return respond(request, true, 'Message received.', 200);
    }

    const name = normalizeLine(form.get('name'));
    const email = normalizeLine(form.get('email'));
    const company = normalizeLine(form.get('company'));
    const message = normalizeMessage(form.get('message'));

    const valid =
      name.length >= 1 &&
      name.length <= 80 &&
      email.length >= 3 &&
      email.length <= 160 &&
      EMAIL_PATTERN.test(email) &&
      company.length <= 120 &&
      message.length >= 10 &&
      message.length <= 3000;

    if (!valid) {
      return respond(request, false, 'Please check the form and try again.', 400);
    }

    const requiredConfig = [
      env?.CLOUDFLARE_ACCOUNT_ID,
      env?.CLOUDFLARE_EMAIL_API_TOKEN,
      env?.CONTACT_FROM,
      env?.CONTACT_TO,
    ];
    if (requiredConfig.some((value) => !value)) {
      return respond(request, false, 'Messaging is temporarily unavailable.', 503);
    }

    const payload = {
      to: env.CONTACT_TO,
      from: env.CONTACT_FROM,
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nReply email: ${email}\nCompany or role: ${company || 'Not provided'}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Reply email:</strong> ${escapeHtml(email)}</p><p><strong>Company or role:</strong> ${escapeHtml(company || 'Not provided')}</p><hr><p>${escapeHtml(message).replaceAll('\n', '<br>')}</p>`,
    };

    let delivery;
    try {
      delivery = await fetchImpl(
        `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/email/sending/send`,
        {
          method: 'POST',
          headers: {
            authorization: `Bearer ${env.CLOUDFLARE_EMAIL_API_TOKEN}`,
            'content-type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      );
    } catch {
      return respond(request, false, 'Unable to send this message.', 502);
    }

    if (!delivery.ok) {
      return respond(request, false, 'Unable to send this message.', 502);
    }

    return respond(request, true, 'Message sent.', 200);
  };
}

export const onRequestPost = createContactHandler();
