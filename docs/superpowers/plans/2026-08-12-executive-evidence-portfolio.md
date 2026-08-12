# Executive Evidence Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the approved recruiter-first Executive Evidence Desk portfolio, its privacy-conscious Cloudflare contact flow, and a production-ready Cloudflare Pages build.

**Architecture:** Keep Astro as a static-first renderer and use focused Astro components plus a small framework-free enhancement script for tabs, disclosures, and form feedback. Keep all quantified evidence in one importable JavaScript data module so Node's built-in test runner can validate the same objects the UI consumes. Handle contact through one Cloudflare Pages Function that validates form data and calls Cloudflare Email Sending's REST API without persisting or logging submissions.

**Tech Stack:** Astro 5, Tailwind CSS 4, semantic HTML, CSS, inline SVG, framework-free JavaScript, Node built-in tests, Cloudflare Pages Functions, Cloudflare Email Sending REST API

## Global Constraints

- Preserve the approved palette exactly: Deep Blue `#083B55`, Blue Chip `#016EA7`, Lime Rickey `#AEB96A`, Daydream `#BCC3CD`, Aesthetic White `#E4DDD3`, UltraWhite `#F6F7F2`, Cranberry `#A23D4D`.
- Present exactly three evidence frames per track; expose exact values in visible text and a programmatic text equivalent.
- Use the supplied portrait without AI retouching, background replacement, facial reshaping, or filters.
- Publish no phone number or email address in rendered HTML or tracked source.
- LinkedIn is `https://linkedin.com/in/michaelemcnea`; GitHub is `https://github.com/mmnva/resume`.
- CDMP was achieved in February 2026; remove the stale `expected Jan 2026` copy.
- Do not add a chart library, client framework, remote font, analytics, CMS, database, or third-party form processor.
- The contact application must not persist or log names, addresses, message bodies, or raw payloads.
- Cloudflare Pages build command is `npm run build`; output directory is `dist`.
- Keep JavaScript optional for core reading and standard form submission.
- The workspace has no Git repository; do not initialize one or claim commits. Use passing test/build checkpoints instead.

---

## File map

### Create

- `src/assets/michael-mcnea-portrait.jpeg` — preserved source portrait consumed by Astro image optimization.
- `src/data/portfolio.mjs` — track evidence, selected case-study summaries, career stages, credentials, and technology groups.
- `src/components/SiteIcon.astro` — consistent outline SVG icon family used by navigation and controls.
- `src/components/IdentityRail.astro` — portrait, positioning, navigation, and social links.
- `src/components/EvidenceDesk.astro` — tabs and exactly three accessible chart frames per track.
- `src/components/FeaturedCases.astro` — three source-backed expandable case-study summaries.
- `src/components/CareerStrip.astro` — horizontal desktop and vertical mobile career progression.
- `src/components/CredentialsPanel.astro` — confirmed credentials and technology groups.
- `src/components/ContactPanel.astro` — privacy copy, form, no-JavaScript behavior, and enhanced status feedback.
- `functions/api/contact.js` — Cloudflare Pages contact endpoint.
- `tests/portfolio-data.test.mjs` — evidence-count and source-integrity tests.
- `tests/contact-function.test.mjs` — endpoint validation, privacy, and outbound-payload tests.
- `tests/built-site.test.mjs` — production HTML privacy, copy, links, and accessibility smoke tests.
- `docs/deployment/cloudflare-pages.md` — exact project, build, environment, and end-to-end verification steps.
- `public/robots.txt` — public crawl policy.

### Modify

- `src/styles/global.css` — approved design tokens, responsive shell, component families, focus, motion, and print rules.
- `src/layouts/BaseLayout.astro` — metadata and slot-only site shell without the obsolete header/footer.
- `src/pages/index.astro` — compose the approved single-page evidence flow.
- `astro.config.mjs` — Cloudflare-ready canonical URL override and sitemap configuration.
- `package.json` — build-then-test and source-test scripts.

### Delete after replacement

- `src/components/Header.astro`
- `src/components/Footer.astro`
- `src/components/CapabilityHeatmap.astro`
- `src/components/ImpactTimeline.astro`
- `src/components/ProjectScatterplot.astro`
- `src/layouts/TrackLayout.astro`
- `src/pages/track/legal-ops.astro`

These files are removed because they create dead routes, duplicate the approved one-page architecture, or retain public contact data.

---

### Task 1: Lock the design tokens and portrait asset

**Files:**
- Create: `src/assets/michael-mcnea-portrait.jpeg`
- Create: `tests/design-contract.test.mjs`
- Modify: `src/styles/global.css`
- Modify: `package.json`

**Interfaces:**
- Consumes: approved palette and supplied 2048-by-2560 sRGB JPEG.
- Produces: CSS custom properties used by all later components and a stable `portrait` asset import path.

- [ ] **Step 1: Write the failing source-contract test**

```js
// tests/design-contract.test.mjs
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { test } from 'node:test';

const root = new URL('../', import.meta.url);

test('approved palette and portrait are present', async () => {
  const css = await readFile(new URL('src/styles/global.css', root), 'utf8');
  for (const token of ['#083B55', '#016EA7', '#AEB96A', '#BCC3CD', '#E4DDD3', '#F6F7F2', '#A23D4D']) {
    assert.match(css, new RegExp(token, 'i'));
  }
  await access(new URL('src/assets/michael-mcnea-portrait.jpeg', root));
});
```

- [ ] **Step 2: Add deterministic test scripts and verify failure**

```json
"scripts": {
  "dev": "astro dev",
  "build": "astro build",
  "preview": "astro preview",
  "test:source": "node --test tests/design-contract.test.mjs tests/portfolio-data.test.mjs tests/contact-function.test.mjs",
  "test": "npm run build && node --test tests/*.test.mjs",
  "astro": "astro"
}
```

Run: `node --test tests/design-contract.test.mjs`  
Expected: FAIL because the seven approved tokens and workspace portrait do not yet exist.

- [ ] **Step 3: Preserve the source portrait in the project**

Copy the user-approved file byte-for-byte:

```bash
cp '/private/var/folders/_5/b3k0lm0s4yx_c6p91q6n6w3w0000gn/T/TemporaryItems/com.apple.Photos.NSItemProvider/uuid=A8B9C78E-5B7F-4FA7-A7C6-370742C0E650&code=001&library=1&type=1&mode=1&loc=true&cap=true.jpeg/IMG_1854.jpeg' src/assets/michael-mcnea-portrait.jpeg
```

- [ ] **Step 4: Replace the old tokens with the approved design system**

Define these exact roots in `src/styles/global.css`, then add the shell, type, surface, control, and responsive component rules described in the approved spec:

```css
:root {
  --deep-blue: #083b55;
  --blue-chip: #016ea7;
  --lime-rickey: #aeb96a;
  --daydream: #bcc3cd;
  --aesthetic-white: #e4ddd3;
  --ultrawhite: #f6f7f2;
  --cranberry: #a23d4d;
  --ink: #082c41;
  --muted-ink: #52636c;
  --rule: color-mix(in srgb, var(--deep-blue) 18%, transparent);
  --font-heading: Charter, "Iowan Old Style", Georgia, serif;
  --font-body: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
  --rail-width: 15rem;
  --content-max: 80rem;
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --motion-fast: 160ms;
}
```

The file must include `prefers-reduced-motion`, visible `:focus-visible`, a skip link, `min-width: 0` on grid children, and a breakpoint that replaces the fixed rail with a compact header below `64rem`.

- [ ] **Step 5: Verify the first checkpoint**

Run: `node --test tests/design-contract.test.mjs`  
Expected: PASS.

---

### Task 2: Create the evidence data contract and tabbed visualization

**Files:**
- Create: `src/data/portfolio.mjs`
- Create: `tests/portfolio-data.test.mjs`
- Create: `src/components/SiteIcon.astro`
- Create: `src/components/EvidenceDesk.astro`

**Interfaces:**
- Produces: `tracks`, `featuredCases`, `careerStages`, `credentials`, and `technologyGroups` named exports.
- `tracks` shape: `{ id, label, summary, frames: [{ id, eyebrow, title, chart, metrics, source }] }[]`.
- `EvidenceDesk.astro` consumes `tracks` and emits one `tablist`, three `tab` buttons, and three corresponding `tabpanel` elements.

- [ ] **Step 1: Write failing evidence-integrity tests**

```js
// tests/portfolio-data.test.mjs
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { tracks, credentials } from '../src/data/portfolio.mjs';

test('each role track exposes exactly three evidence frames', () => {
  assert.deepEqual(tracks.map(({ id, frames }) => [id, frames.length]), [
    ['legal-operations', 3],
    ['data-governance', 3],
    ['program-portfolio', 3],
  ]);
});

test('all metrics are visibly labeled and source-backed', () => {
  for (const track of tracks) {
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

test('certification date is current', () => {
  assert.ok(credentials.some((item) => item.name === 'CDMP' && item.detail.includes('February 2026')));
  assert.ok(credentials.every((item) => !item.detail.includes('expected Jan 2026')));
});
```

Run: `node --test tests/portfolio-data.test.mjs`  
Expected: FAIL with module-not-found.

- [ ] **Step 2: Implement the source-backed data module**

Use the approved metrics verbatim. The top-level structure must begin:

```js
export const tracks = [
  {
    id: 'legal-operations',
    label: 'Legal Operations',
    summary: 'Legal operations outcomes that reduce cost, accelerate work, and increase control.',
    frames: [
      {
        id: 'legal-value',
        eyebrow: '1. Value delivered',
        title: 'Portfolio value and avoided cost',
        chart: 'comparison',
        metrics: [
          { value: '$1.25M', label: 'legal technology portfolio', tone: 'cranberry' },
          { value: '$50K+', label: 'CLM licensing avoided', tone: 'positive' },
        ],
        source: { company: 'Micron Technology', project: 'Legal technology portfolio and NDA self-service' },
      },
      {
        id: 'legal-scale',
        eyebrow: '2. Scale achieved',
        title: 'Systems and workflow coverage',
        chart: 'units',
        metrics: [
          { value: '12', label: 'systems managed' },
          { value: '4', label: 'CLM proofs of concept' },
          { value: '20', label: 'NDAs per month' },
        ],
        source: { company: 'Micron Technology', project: 'Legal technology portfolio and NDA self-service' },
      },
      {
        id: 'legal-efficiency',
        eyebrow: '3. Efficiency improvement',
        title: 'Cycle-time reductions',
        chart: 'progress',
        metrics: [
          { value: '60%', label: 'faster records review', amount: 60 },
          { value: '75%', label: 'faster NDA turnaround', amount: 75 },
          { value: '6 → 1.5', suffix: 'months', label: 'AI-assisted migration', amount: 75 },
        ],
        source: { company: 'Freddie Mac and Micron Technology', project: 'Records review, NDA self-service, and iManage migration' },
      },
    ],
  },
  {
    id: 'data-governance',
    label: 'Data Governance',
    summary: 'Governance programs that improve adoption, discovery, lineage, and regulatory confidence.',
    frames: [
      {
        id: 'data-impact', eyebrow: '1. Impact delivered', title: 'Adoption and discovery', chart: 'comparison',
        metrics: [{ value: '95%+', label: 'global platform adoption', tone: 'positive' }, { value: '~60%', label: 'faster data discovery' }],
        source: { company: 'Micron Technology', project: 'Metadata management platform' },
      },
      {
        id: 'data-scale', eyebrow: '2. Scale governed', title: 'Enterprise coverage', chart: 'units',
        metrics: [{ value: '$3T', label: 'GSE environment' }, { value: '1,000+', label: 'databases cataloged' }, { value: '16', label: 'stakeholder groups aligned' }],
        source: { company: 'Freddie Mac and Micron Technology', project: 'CDE lineage, metadata platform, and records review' },
      },
      {
        id: 'data-efficiency', eyebrow: '3. Process improvement', title: 'Manual work removed', chart: 'progress',
        metrics: [{ value: '45 → 0', label: 'manual process steps', amount: 100 }, { value: '100 → 40', label: 'relative cycle time', amount: 60 }],
        source: { company: 'Freddie Mac', project: 'Annual records review redesign' },
      },
    ],
  },
  {
    id: 'program-portfolio',
    label: 'Program & Portfolio',
    summary: 'Programs and portfolios that deliver financial value, enterprise scale, and dependable execution.',
    frames: [
      {
        id: 'ppm-impact', eyebrow: '1. Financial impact', title: 'Value delivered', chart: 'comparison',
        metrics: [{ value: '$17M', label: 'inventory reduction', tone: 'cranberry' }, { value: '$1.5M', label: 'platform delivery' }, { value: '$1.25M', label: 'portfolio ownership' }],
        source: { company: 'Micron Technology', project: 'Silicon-wafer inventory, metadata platform, and legal technology portfolio' },
      },
      {
        id: 'ppm-scale', eyebrow: '2. Scale delivered', title: 'Enterprise reach', chart: 'units',
        metrics: [{ value: '40,000+', label: 'documents migrated' }, { value: '800+', label: 'SharePoint sites' }, { value: '164', label: 'Senate offices' }],
        source: { company: 'Micron Technology and Veridian IT Services', project: 'Ariba/SharePoint migration and Senate installations' },
      },
      {
        id: 'ppm-quality', eyebrow: '3. Delivery quality', title: 'Controlled outcomes', chart: 'progress',
        metrics: [{ value: '0', label: 'data-loss incidents', amount: 100 }, { value: '95%+', label: 'platform adoption', amount: 95 }, { value: '3-year', label: 'roadmap completed', amount: 100 }],
        source: { company: 'Micron Technology', project: 'Ariba/SharePoint migration, metadata platform, and legal technology portfolio' },
      },
    ],
  },
];

export const credentials = [
  { name: 'CDMP', detail: 'Certified Data Management Professional — achieved February 2026' },
  { name: 'APICS CSCP', detail: 'Certified Supply Chain Professional — earned 2008' },
  { name: 'LUMA Practitioner', detail: 'Human-Centered Design' },
];
```

Add the `featuredCases`, `careerStages`, and `technologyGroups` exports in Task 4 using the exact strings specified there.

- [ ] **Step 3: Implement consistent code-native icons**

`SiteIcon.astro` accepts `name`, `size = 20`, and `strokeWidth = 1.7`. It renders an `aria-hidden="true"` SVG with `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`, round caps, and only the exact supported names used in the page: `overview`, `evidence`, `cases`, `timeline`, `credentials`, `contact`, `linkedin`, `github`, `download`, `arrow`, and `lock`.

- [ ] **Step 4: Implement the evidence desk with progressive enhancement**

The server-rendered structure must expose every panel to assistive technology while showing Legal Operations initially:

```astro
<section id="evidence" class="evidence-desk" aria-labelledby="evidence-title" data-evidence-desk>
  <h2 id="evidence-title" class="sr-only">Evidence by role track</h2>
  <div class="track-tabs" role="tablist" aria-label="Role tracks">
    {tracks.map((track, index) => (
      <button id={`tab-${track.id}`} role="tab" aria-selected={index === 0 ? 'true' : 'false'} aria-controls={`panel-${track.id}`} tabindex={index === 0 ? 0 : -1} data-track-tab={track.id}>
        {track.label}
      </button>
    ))}
  </div>
  {tracks.map((track, index) => (
    <section id={`panel-${track.id}`} role="tabpanel" aria-labelledby={`tab-${track.id}`} hidden={index !== 0} data-track-panel={track.id}>
      <p class="track-summary">{track.summary}</p>
      <div class="evidence-grid">
        {track.frames.map((frame) => (
          <article class={`evidence-frame chart-${frame.chart}`} aria-labelledby={`${frame.id}-title`}>
            <p class="frame-eyebrow">{frame.eyebrow}</p>
            <h3 id={`${frame.id}-title`}>{frame.title}</h3>
            <div class="metric-list" role="list">
              {frame.metrics.map((metric) => (
                <div class={`metric metric-${metric.tone ?? 'default'}`} role="listitem">
                  <strong>{metric.value}{metric.suffix && <small>{metric.suffix}</small>}</strong>
                  <span>{metric.label}</span>
                  {metric.amount && <span class="metric-bar" style={`--amount:${metric.amount}%`} aria-hidden="true"></span>}
                </div>
              ))}
            </div>
            <p class="source-caption">Source: {frame.source.company} · {frame.source.project}</p>
          </article>
        ))}
      </div>
    </section>
  ))}
</section>
```

Add a small inline module script that updates `aria-selected`, `tabindex`, and `hidden`; supports Left, Right, Home, and End keys; and restores a valid `?track=` selection on load. It must not alter the content strings.

- [ ] **Step 5: Verify data and production compilation**

Run: `node --test tests/portfolio-data.test.mjs`  
Expected: PASS.  
Run: `npm run build`  
Expected: Astro build succeeds with no missing imports.

---

### Task 3: Build the shell, portrait identity rail, and hero

**Files:**
- Create: `src/components/IdentityRail.astro`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- `IdentityRail.astro` imports `portrait` and `SiteIcon`; it receives no public contact details.
- `BaseLayout.astro` exposes a single page slot inside the document and accepts `title`, `description`, and optional `ogImage`.
- `index.astro` composes the rail and evidence canvas.

- [ ] **Step 1: Add the failing built-page hero contract**

Add to `tests/built-site.test.mjs`:

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');

test('hero and identity links match the approved concept', () => {
  assert.match(html, /Michael McNea, CDMP/);
  assert.match(html, /Data Governance · Legal Technology · Legal Operations/);
  assert.match(html, />View Evidence</);
  assert.match(html, /https:\/\/linkedin\.com\/in\/michaelemcnea/);
  assert.match(html, /https:\/\/github\.com\/mmnva/);
});
```

Run: `npm run build && node --test tests/built-site.test.mjs`  
Expected: FAIL because the approved hero labels are not present.

- [ ] **Step 2: Implement the slot-only metadata layout**

Remove `Header` and `Footer` imports from `BaseLayout.astro`. Retain the skip link and `main#main`, update the theme color to `#083B55`, and ensure Open Graph and Twitter metadata use absolute URLs derived from `Astro.site`.

- [ ] **Step 3: Implement the identity rail**

Use Astro's image component:

```astro
---
import { Image } from 'astro:assets';
import portrait from '../assets/michael-mcnea-portrait.jpeg';
import SiteIcon from './SiteIcon.astro';

const navigation = [
  ['overview', 'Overview', 'overview'],
  ['evidence', 'Evidence', 'evidence'],
  ['case-studies', 'Case Studies', 'cases'],
  ['career', 'Career Timeline', 'timeline'],
  ['credentials', 'Credentials', 'credentials'],
  ['contact', 'Contact', 'contact'],
];
---
<aside class="identity-rail" aria-label="Profile and section navigation">
  <a class="portrait-link" href="#overview" aria-label="Michael McNea — return to overview">
    <Image src={portrait} alt="Michael McNea" widths={[96, 160, 240]} sizes="(max-width: 63.99rem) 48px, 160px" class="portrait" loading="eager" />
    <span class="monogram" aria-hidden="true">MM</span>
  </a>
  <p class="rail-name">Michael McNea, CDMP</p>
  <p class="rail-role">Strategic operator<br />Data · Technology · People</p>
  <nav aria-label="Portfolio sections">
    {navigation.map(([id, label, icon]) => <a href={`#${id}`}><SiteIcon name={icon} />{label}</a>)}
  </nav>
  <div class="rail-socials">
    <a href="https://linkedin.com/in/michaelemcnea"><SiteIcon name="linkedin" />LinkedIn</a>
    <a href="https://github.com/mmnva/resume"><SiteIcon name="github" />GitHub</a>
  </div>
</aside>
```

Desktop uses the 4:5 image; mobile uses a 48-pixel square crop. The monogram appears only if the image cannot occupy the compact layout or under the explicit compact CSS fallback.

- [ ] **Step 4: Compose the approved hero and first viewport**

`index.astro` begins with the identity rail and this exact visible hierarchy:

```astro
<section id="overview" class="hero" aria-labelledby="page-title">
  <div class="hero-copy">
    <h1 id="page-title">Michael McNea, CDMP</h1>
    <p class="hero-tracks">Data Governance · Legal Technology · Legal Operations</p>
    <p class="hero-statement">I design systems, align stakeholders, and deliver measurable outcomes at the intersection of data, technology, and the business of law.</p>
    <div class="hero-actions">
      <a class="button button-primary" href="#evidence">View Evidence <SiteIcon name="arrow" /></a>
    </div>
  </div>
  <p class="hero-aside">Executive evidence.<br />Built for decisions<br />that move the business forward.</p>
</section>
```

Render `Download Resume` only after an actual resume file exists in `public`; the initial build must not produce a broken action.

- [ ] **Step 5: Verify hero contract and responsive asset generation**

Run: `npm run build && node --test tests/built-site.test.mjs`  
Expected: PASS, and `dist/_astro/` contains optimized portrait derivatives.

---

### Task 4: Build the recruiter evidence flow below the charts

**Files:**
- Create: `src/components/FeaturedCases.astro`
- Create: `src/components/CareerStrip.astro`
- Create: `src/components/CredentialsPanel.astro`
- Create: `src/components/ContactPanel.astro`
- Modify: `src/data/portfolio.mjs`
- Modify: `src/pages/index.astro`
- Modify: `tests/built-site.test.mjs`

**Interfaces:**
- `FeaturedCases` consumes `featuredCases` and uses native `details` disclosure.
- `CareerStrip` consumes `careerStages`.
- `CredentialsPanel` consumes `credentials` and `technologyGroups`.
- `ContactPanel` posts to `/api/contact` and does not receive a destination address prop.

- [ ] **Step 1: Add failing downstream-content and privacy tests**

```js
test('downstream sections are present and source-backed', () => {
  for (const id of ['case-studies', 'career', 'credentials', 'contact']) assert.match(html, new RegExp(`id="${id}"`));
  for (const value of ['$1.25M', '$1.5M', '40,000+', '$17M', 'February 2026']) assert.ok(html.includes(value));
});

test('public HTML contains no direct email or phone link', () => {
  assert.doesNotMatch(html, /mailto:|tel:/i);
  assert.doesNotMatch(html, /@gmail\.com|703[-\s.]?851[-\s.]?3700/i);
});
```

Run: `npm run build && node --test tests/built-site.test.mjs`  
Expected: FAIL because the sections and privacy cleanup are incomplete.

- [ ] **Step 2: Implement exactly three featured case studies**

Render one card per track using `details` so the scan state shows company, period, outcome, and a short intervention; the expanded state adds problem and method. Use only:

```js
export const featuredCases = [
  { id: 'legal-tech-portfolio', track: 'Legal Operations', title: '$1.25M legal technology portfolio', company: 'Micron Technology', period: '2023–2024', outcome: '12 systems governed through a three-year technology roadmap.', intervention: 'Centralized ownership, vendor evaluation, spend visibility, and roadmap planning.' },
  { id: 'metadata-platform', track: 'Data Governance', title: '$1.5M metadata platform launch', company: 'Micron Technology', period: '2016–2017', outcome: '1,000+ databases cataloged with 95%+ adoption at scale.', intervention: 'Selected the platform, established stewardship, and led global adoption.' },
  { id: 'ariba-migration', track: 'Program & Portfolio', title: 'Ariba and SharePoint migration', company: 'Micron Technology', period: '2013–2016', outcome: '40,000+ documents and 800+ sites migrated with zero data loss.', intervention: 'Directed information architecture, permissions, migration, and reporting.' },
];
```

- [ ] **Step 3: Implement the compressed five-stage career strip**

Desktop renders an ordered list on one horizontal rule; the mobile media query turns it into a vertical rule. Keep exact stage names: Early Operations, Process & Systems Builder, Technology & Data Integrator, Strategic Program Leader, Today.

- [ ] **Step 4: Implement confirmed credentials and grouped technology**

Render CDMP first with `Achieved February 2026`, then APICS CSCP and LUMA Practitioner. Technology headings are Legal technology and CLM, Data governance and metadata, Workflow automation, Reporting and analytics, and Integration and APIs. Do not render levels, stars, percentages, or the old heatmap.

- [ ] **Step 5: Implement the privacy-conscious contact panel**

The static form markup is:

```astro
<form class="contact-form" action="/api/contact" method="post" data-contact-form>
  <label>Name <input name="name" autocomplete="name" maxlength="80" required /></label>
  <label>Reply email <input type="email" name="email" autocomplete="email" maxlength="160" required /></label>
  <label>Company or role <span>(optional)</span><input name="company" autocomplete="organization" maxlength="120" /></label>
  <label>Message <textarea name="message" rows="5" maxlength="3000" required></textarea></label>
  <label class="honeypot" aria-hidden="true">Website <input name="website" tabindex="-1" autocomplete="off" /></label>
  <button class="button button-primary" type="submit">Send a private message</button>
  <p class="form-privacy"><SiteIcon name="lock" /> Sent directly. Not stored by this site.</p>
  <p class="form-status" role="status" aria-live="polite" data-form-status></p>
</form>
```

Enhancement intercepts the form, posts `FormData` with `Accept: application/json`, disables only the submit button during transit, resets after success, and shows concise success/failure text. Standard submission continues to work without JavaScript.

- [ ] **Step 6: Verify content and privacy checkpoint**

Run: `npm run build && node --test tests/built-site.test.mjs`  
Expected: PASS.

---

### Task 5: Implement and test the Cloudflare-native contact endpoint

**Files:**
- Create: `functions/api/contact.js`
- Create: `tests/contact-function.test.mjs`
- Create: `docs/deployment/cloudflare-pages.md`

**Interfaces:**
- Exports: `createContactHandler(fetchImpl = globalThis.fetch)` and `onRequestPost`.
- Environment keys: `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_EMAIL_API_TOKEN`, `CONTACT_FROM`, `CONTACT_TO`.
- JSON response shape: `{ ok: boolean, message: string }`.

- [ ] **Step 1: Write failing endpoint tests**

```js
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
  const response = await handler({ request: request({ name: 'Recruiter', email: 'recruiter@example.com', company: 'Example', message: 'Let us talk.', website: '' }), env });
  assert.equal(response.status, 200);
  assert.equal(outbound.body.replyTo, 'recruiter@example.com');
  assert.equal(outbound.body.to, env.CONTACT_TO);
  assert.match(outbound.url, /accounts\/account-id\/email\/sending\/send$/);
});

test('invalid and bot submissions do not call email delivery', async () => {
  let calls = 0;
  const handler = createContactHandler(async () => { calls += 1; return Response.json({ success: true }); });
  const invalid = await handler({ request: request({ name: '', email: 'bad', message: '', website: '' }), env });
  assert.equal(invalid.status, 400);
  const bot = await handler({ request: request({ name: 'Bot', email: 'bot@example.com', message: 'Spam', website: 'filled' }), env });
  assert.equal(bot.status, 200);
  assert.equal(calls, 0);
});
```

Run: `node --test tests/contact-function.test.mjs`  
Expected: FAIL with module-not-found.

- [ ] **Step 2: Implement the minimal endpoint**

`createContactHandler` must:

1. Accept only `application/x-www-form-urlencoded` and `multipart/form-data`.
2. Normalize whitespace and enforce name 1–80, email 3–160, company 0–120, and message 10–3000 characters.
3. Return a generic success response for a populated `website` honeypot without sending.
4. HTML-escape all submitted values before building the HTML body.
5. Call `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/email/sending/send` with bearer authorization and this body:

```js
{
  to: env.CONTACT_TO,
  from: env.CONTACT_FROM,
  replyTo: email,
  subject: `Portfolio contact from ${name}`,
  text: `Name: ${name}\nReply email: ${email}\nCompany or role: ${company || 'Not provided'}\n\n${message}`,
  html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Reply email:</strong> ${escapeHtml(email)}</p><p><strong>Company or role:</strong> ${escapeHtml(company || 'Not provided')}</p><hr><p>${escapeHtml(message).replaceAll('\n', '<br>')}</p>`,
}
```

6. Never invoke `console.*` with submission or delivery contents.
7. Return JSON for `Accept: application/json`; otherwise redirect success to `/?contact=sent#contact` and failures to `/?contact=error#contact`.

- [ ] **Step 3: Run endpoint tests**

Run: `node --test tests/contact-function.test.mjs`  
Expected: PASS.

- [ ] **Step 4: Document deploy-time setup without secrets in source**

`docs/deployment/cloudflare-pages.md` must state:

- Git-connected Pages project build command: `npm run build`
- Output directory: `dist`
- Root directory: repository root
- Non-secret variable: `CONTACT_FROM`
- Encrypted secrets: `CONTACT_TO`, `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_EMAIL_API_TOKEN`
- Token scope: Cloudflare Email Sending Edit for the relevant account only
- Sender domain must be onboarded; destination must be verified
- Run a live submission and reply-to check before enabling the public form
- If Email Sending is unavailable, disable the form and retain LinkedIn as the contact fallback; do not add a third-party form backend

---

### Task 6: Remove obsolete public surfaces and finish metadata

**Files:**
- Delete the seven obsolete components/layout/page listed in the file map.
- Modify: `astro.config.mjs`
- Modify: `src/layouts/BaseLayout.astro`
- Create: `public/robots.txt`
- Modify: `tests/built-site.test.mjs`

**Interfaces:**
- `SITE_URL` build environment variable overrides the default Cloudflare Pages canonical base.
- No route links may point to deleted track, contact, case-study, or resume paths.

- [ ] **Step 1: Add failing dead-link and privacy-source tests**

```js
test('built page contains no known dead internal routes', () => {
  assert.doesNotMatch(html, /href="\/(track|case-study|contact)\//);
  assert.doesNotMatch(html, /href="\/Michael_McNea_Resume\.pdf"/);
});

test('obsolete public contact details are absent from tracked source', async () => {
  const footerPath = new URL('../src/components/Footer.astro', import.meta.url);
  await assert.rejects(() => readFile(footerPath, 'utf8'));
});
```

- [ ] **Step 2: Delete replaced surfaces**

Use `apply_patch` deletion for the seven text files. Confirm `rg` finds no imports of their names before deletion.

- [ ] **Step 3: Configure canonical metadata without a Vercel reference**

```js
const site = process.env.SITE_URL ?? 'https://michael-mcnea.pages.dev';

export default defineConfig({
  site,
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
```

Update the footer copyright text in the new one-page composition to say `Built with Astro · Hosted on Cloudflare` and add `public/robots.txt`:

```text
User-agent: *
Allow: /
```

- [ ] **Step 4: Verify the full automated suite**

Run: `npm test`  
Expected: build succeeds and every Node test passes.

---

### Task 7: Browser fidelity, responsive, accessibility, and production verification

**Files:**
- Modify only files implicated by observed mismatches.
- Create temporarily, then remove: browser screenshots and QA-only artifacts.

**Interfaces:**
- Accepted concept: `/Users/michael_mcnea/.codex/generated_images/019ff658-70b6-7bd2-8c8c-b697e174817d/exec-be0af508-ce9a-47ed-91c3-0c26b2860c7d.png`.
- Required implementation captures: 1536-by-1024 desktop and 390-by-844 mobile.

- [ ] **Step 1: Start the production preview**

Run: `npm run build && npm run preview -- --host 127.0.0.1`  
Expected: preview server starts and serves the production build.

- [ ] **Step 2: Verify the core interaction path in Browser/IAB**

Check:

1. Skip link reaches `main`.
2. Every anchor lands on its section without content hidden behind the compact header.
3. Arrow keys move between the three role tabs; each selected panel still contains exactly three frames.
4. Case-study disclosures expand and collapse with keyboard input.
5. Contact validation works; local submission reaches the expected generic unavailable state when production secrets are absent.
6. LinkedIn and GitHub resolve to the approved URLs.

- [ ] **Step 3: Capture desktop and mobile renders**

Use the Browser/IAB screenshot path first. Use Playwright Chromium only if Browser/IAB is unavailable or cannot capture the full viewport; record that fallback. Capture the desktop at the accepted concept's 1536-by-1024 size and the mobile at 390-by-844.

- [ ] **Step 4: Perform the mandatory `view_image` comparison**

Open both the accepted concept and latest desktop screenshot with `view_image`. Record and repair at least these comparison points:

- first-viewport proportions and rail width
- exact palette and absence of gradients
- hero type scale, line wrapping, and CTA labels
- selected tab geometry and exactly three chart frames
- portrait crop and lack of overlay/filter
- card, timeline, credential, and contact density
- border weight, radius, and whitespace rhythm

Repeat screenshot and inspection until no agency-signoff mismatch remains.

- [ ] **Step 5: Audit mobile and accessibility**

Verify no horizontal page overflow, fixed-height clipping, or internal chart scroller. Confirm one `h1`, logical headings, visible focus, `aria` tab relationships, text equivalents for metrics, reduced-motion behavior, labeled inputs, live form status, and at least 44-pixel primary touch targets.

- [ ] **Step 6: Run final production checks**

Run: `npm test`  
Expected: PASS.  
Run: `rg -n -i 'mailto:|tel:|@gmail\.com|703[- .]?851[- .]?3700|expected Jan 2026|vercel|formspree|web3forms' src public functions dist`  
Expected: no matches.  
Run: `find dist -type f -size +25M -print`  
Expected: no output.

- [ ] **Step 7: Remove QA artifacts and prepare handoff**

Stop the preview server, remove temporary screenshots not needed for evidence, retain only the final comparison capture if useful, and report the fidelity ledger, build/test result, Cloudflare setup that remains account-bound, and any intentional deviations.
