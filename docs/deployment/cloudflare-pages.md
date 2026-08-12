# Cloudflare Pages deployment

This portfolio is designed for a Git-connected Cloudflare Pages project backed by `https://github.com/mmnva/resume`.

## Pages build settings

- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: repository root
- Node version: `22`

Cloudflare Pages should create preview deployments for non-production branches and publish `main` only after the preview is approved.

## Contact environment configuration

Set `CONTACT_FROM` as a Pages environment variable. Store the following as encrypted Pages secrets, never in the repository:

- `CONTACT_TO`
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_EMAIL_API_TOKEN`

Limit the token to **Cloudflare Email Sending Edit** for the relevant account only. The sender domain must be onboarded to Cloudflare Email Sending, and the destination address must be verified.

The contact Function validates the same-origin form, calls Cloudflare Email Sending, and does not persist or log submissions. It intentionally uses no analytics, KV, D1, Durable Objects, or third-party form processor.

## Publication check

Before enabling the public form:

1. Submit a real message from the production deployment.
2. Confirm it reaches the verified destination.
3. Reply to the message and confirm the reply-to address is the visitor's address.
4. Confirm invalid submissions return generic errors without exposing configuration.

Cloudflare Email Sending is currently beta. If it is unavailable for the account, disable the form and retain LinkedIn as the contact fallback. Do not substitute a third-party form backend without a new privacy decision.
