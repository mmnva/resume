# Job Pipeline Dashboard

At-a-glance metrics from the Notion **Job Pipeline** database: funnel (Found → Passed fit screen → Applied → Interview → Offer) with step conversions, weekly activity, speed, per-source and per-resume-track conversion, status/fit distributions, upcoming interviews, data-quality gaps.

## Run (Docker Desktop)
1. Create an internal integration at https://www.notion.so/profile/integrations (read-only is enough) and copy its secret.
2. In Notion open **Job Pipeline** → `•••` → **Connections** → add the integration.
3. `cp .env.example .env` and paste the secret into `NOTION_TOKEN`.
4. `docker compose up -d --build` → http://localhost:8787

Port is `8787` (override with `HOST_PORT=9000 docker compose up -d`). Run it on the same machine as Docker Desktop, after cloning this branch.

Troubleshooting: `docker compose ps` (should show *healthy*), `docker compose logs`, `curl localhost:8787/healthz`. A page that loads but shows an error banner means the Notion token/connection step needs attention.

`?refresh=1` on `/api/metrics` (or the **refresh** link) bypasses the cache. If Notion is unreachable the last good data keeps showing with a banner.

## How stages are counted
`Status` is a current state (an *Archived* job may have been interviewed), so a row counts as having reached a stage if its status **or** its date field says so, and later stages imply earlier ones:
- Applied = Applied Date set, or status Applied/Interviewing/Offer/Accepted
- Interview = Interview Date set, or status Interviewing/Offer/Accepted
- Passed fit screen = anything not *Low Fit* (or null status) that isn't already applied
- Offer = status Offer/Accepted

## Tests
`python3 -m unittest discover -s tests -v` (stdlib only). Offline demo: `FIXTURE_FILE=... python3 app/server.py`.
