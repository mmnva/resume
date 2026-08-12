# Executive Evidence Desk — Portfolio Design Specification

Date: August 12, 2026  
Status: Visual direction approved; implementation specification pending final approval

## Objective

Create a focused, recruiter-first portfolio for Michael McNea, CDMP that communicates fit for three related tracks within a short scan:

1. Legal Operations
2. Data Governance
3. Program and Portfolio Management

The experience should read as an executive evidence dossier with selective dashboard elements. It should demonstrate scope and outcomes without becoming a long resume, an analytics dashboard, or a generic personal-brand landing page.

## Success criteria

- A recruiter can identify Michael's three target tracks and strongest quantified outcomes within 15 seconds.
- Each track presents exactly three visual evidence frames: impact, scale, and efficiency or delivery quality.
- Every chart exposes its exact values in visible text and has a concise source caption.
- All content remains readable and usable on mobile without horizontal page scrolling.
- The site publishes as a primarily static Astro build on Cloudflare Pages.
- The supplied portrait is presented crisply without AI alteration and remains well cropped across breakpoints.
- Contact submissions are handled by a Cloudflare Pages Function, emailed to a verified destination, and not written to application storage or logs.
- No public phone number or email address appears in rendered HTML.
- LinkedIn points to `https://linkedin.com/in/michaelemcnea` and GitHub points to the portfolio source repository at `https://github.com/mmnva/resume`.
- CDMP is described as achieved in February 2026 everywhere it appears.

## Approved visual direction

### Composition

The desktop experience uses two primary regions:

- A persistent identity rail containing the `MM` monogram, name, positioning statement, anchor navigation, LinkedIn, and GitHub.
- A broad evidence canvas containing the hero, track selector, evidence frames, case studies, career timeline, credentials, and contact close.

The rail supports orientation but does not compete with the evidence. It becomes a compact top header on smaller screens; it must never consume a fixed desktop-width column on mobile.

### Palette

The palette is locked to the approved visual concept and the Sherwin-Williams reference supplied by the user.

| Token | Value | Primary use |
| --- | --- | --- |
| Deep Blue | `#083B55` | Identity rail, headings, primary text |
| Blue Chip | `#016EA7` | Active navigation, chart structure, links |
| Lime Rickey | `#AEB96A` | Positive outcomes, completed states |
| Daydream | `#BCC3CD` | Secondary surfaces, inactive states |
| Aesthetic White | `#E4DDD3` | Warm alternate section backgrounds |
| UltraWhite | `#F6F7F2` | Main reading surface |
| Cranberry | `#A23D4D` | Primary calls to action, one standout metric |

Color use is semantic and restrained. Cranberry should not become a general-purpose decoration. Charts must remain understandable without relying on color alone.

### Typography

- Large editorial headings use the existing system-serif stack to retain the approved dossier character without adding a font download.
- Body copy, navigation, controls, and chart labels use the existing system sans-serif stack.
- Monospace is reserved for short data labels only when it improves scanning.
- Type must not be baked into raster assets; all meaningful text remains real HTML.

### Surface treatment

- Warm, flat backgrounds with fine rules and modest borders.
- Square-to-softly-rounded corners; avoid glossy floating-card styling.
- No gradients, glassmorphism, 3D decoration, or stock photography.

### Portrait treatment

- Use the supplied `IMG_1854.jpeg` as Michael's authentic profile portrait without generative editing, background replacement, facial retouching, or reshaping.
- Preserve the original file and generate optimized responsive derivatives during the Astro build.
- Desktop uses a restrained 4:5 crop in the identity rail with a fine Aesthetic White border and `object-position` tuned to keep the face centered.
- Mobile uses a compact square crop of the same image. The `MM` typographic monogram remains available as a compact fallback rather than a competing second identity mark.
- Use the alt text `Michael McNea` and avoid repeating a visible `Portrait of` caption.
- Do not apply color filters. The existing blue clothing naturally connects the photograph to the approved palette, while the warm background supplies visual contrast.

## Information architecture

The portfolio is a single primary landing page with anchor navigation. This removes the current dead routes and lets recruiters stay in one evidence flow.

1. Identity rail and anchor navigation
2. Executive hero
3. Role-track selector
4. Selected-track summary and three evidence frames
5. Three featured case studies, one representative project per track
6. Compressed career timeline
7. Credentials and technology
8. Privacy-conscious contact close

The primary navigation anchors are Overview, Evidence, Case Studies, Career Timeline, Credentials, and Contact. LinkedIn and GitHub are external links and clearly indicated as such.

## Hero

### Required copy hierarchy

- Name: `Michael McNea, CDMP`
- Track line: `Data Governance · Legal Technology · Legal Operations`
- Value statement: concise language connecting systems, stakeholder alignment, and measurable outcomes at the intersection of data, technology, and the business of law.
- Primary action: `View Evidence`
- Secondary action: `Download Resume`

The current-employer detail may appear later as evidence context, but the hero should not lead with a long present-role biography. The first screen is about fit and outcomes.

The resume action must only render when an actual PDF is present in `public`; there must be no placeholder or broken download link.

## Track selector and evidence system

The selector is a keyboard-operable tab interface with three choices. Legal Operations is selected initially because it connects the broadest mix of legal, technology, data, and program evidence. Changing tracks updates the summary, the three chart frames, and their captions without navigating away.

Progressive enhancement rules:

- The initial Legal Operations evidence is fully present and readable without JavaScript.
- JavaScript enhances the selector into tabs and swaps the other track panels.
- Tabs use the correct `tablist`, `tab`, and `tabpanel` relationships and support arrow-key navigation.
- The URL may update with a fragment or query value so a selected track can be shared, but no route is required.

### Legal Operations

1. **Impact — value comparison**
   - `$1.25M` portfolio
   - `$50K+` licensing avoided
   - Sources: Micron legal technology portfolio; Micron NDA self-service solution

2. **Scale — dot or unit matrix**
   - `12` systems
   - `4` CLM proofs of concept
   - `20` NDAs per month
   - Sources: Micron legal technology portfolio; Micron NDA self-service solution

3. **Efficiency — before/after bars**
   - `60%` records-review cycle reduction
   - `75%` faster NDA turnaround
   - `6 → 1.5 months` AI-assisted migration
   - Sources: Freddie Mac annual records review; Micron NDA self-service; Freddie Mac iManage migration

### Data Governance

1. **Impact — adoption and discovery comparison**
   - `95%+` global platform adoption
   - `~60%` faster data discovery
   - Source: Micron metadata management platform

2. **Scale — coverage ladder**
   - `$3T` GSE environment
   - `1,000+` databases cataloged
   - `16` stakeholder groups aligned
   - Sources: Freddie Mac CDE lineage; Micron metadata platform; Freddie Mac annual records review

3. **Efficiency — process collapse**
   - `45 → 0` manual steps
   - `100 → 40` relative cycle time
   - Source: Freddie Mac annual records review redesign

### Program and Portfolio Management

1. **Impact — financial bars**
   - `$17M` inventory reduction
   - `$1.5M` platform delivery
   - `$1.25M` portfolio ownership
   - Sources: Micron silicon-wafer inventory reduction; Micron metadata platform; Micron legal technology portfolio

2. **Scale — graduated bands**
   - `40,000+` documents
   - `800+` SharePoint sites
   - `164` Senate offices
   - Sources: Micron Ariba/SharePoint migration; U.S. Senate installations program

3. **Delivery quality — outcome ledger**
   - `0` data-loss incidents across `40,000+` migrated documents
   - `95%+` platform adoption
   - `3-year` roadmap completed
   - Sources: Micron Ariba/SharePoint migration; Micron metadata platform; Micron legal technology portfolio

### Chart rules

- Exactly three frames appear for each selected track.
- Use semantic HTML and lightweight inline SVG or CSS; do not add a charting library.
- Always show exact values and plain-language labels.
- Provide an adjacent text equivalent for screen readers.
- Captions identify company, project, and outcome context.
- Blue Chip defines structure; Lime Rickey indicates achieved outcomes; Cranberry highlights at most one top result per panel.
- Entry animation is subtle, occurs once, and is disabled by `prefers-reduced-motion`.
- Mobile frames stack vertically and fit the viewport without an internal horizontal scroller.
- Do not use subjective skill percentages, radial gauges, or decorative axes.

## Featured case studies

Show three concise cards on the landing page, one per track. Each card contains the business problem, intervention, measurable outcome, company, and period. The cards may expand in place with native `details` elements or a small accessible disclosure; they should not link to missing pages.

Recommended representatives:

- Legal Operations: `$1.25M legal technology portfolio` or `NDA self-service Power Platform solution`
- Data Governance: `$1.5M metadata management platform launch`
- Program and Portfolio Management: `Ariba + SharePoint migration`

Only source-backed content from `src/data/caseStudies.ts` is used. Existing reflections can appear inside expanded detail, not in the initial scan view.

## Career timeline

Replace the current long impact timeline with a compressed career progression that communicates increasing scope:

- Early operations foundation
- Process and systems builder
- Technology and data integrator
- Strategic program leader
- Current executive-evidence positioning

Desktop uses a horizontal line with five milestones. Mobile uses a vertical list. Dates, companies, and titles remain available as concise supporting text. This section is context, not a duplicate resume.

## Credentials and technology

Credentials lead with:

- Certified Data Management Professional (CDMP) — achieved February 2026
- APICS Certified Supply Chain Professional (CSCP) — 2008
- LUMA Practitioner — Human-Centered Design

Technology is grouped by hiring relevance rather than rendered as a large skills matrix:

- Legal technology and CLM
- Data governance and metadata
- Workflow automation
- Reporting and analytics
- Integration and APIs

Avoid proficiency ratings and visual heatmaps.

## Contact and privacy

### Public presentation

- LinkedIn: `https://linkedin.com/in/michaelemcnea`
- GitHub: `https://github.com/mmnva/resume`
- No public phone number
- No public email address
- Contact fields: name, reply email, company or role (optional), and message
- Submit label: `Send a private message`
- Privacy note: `Sent directly. Not stored by this site.`

### Cloudflare-native flow

1. The browser posts the form to a same-origin `/api/contact` Pages Function.
2. The Function accepts `POST` only and rejects unexpected content types.
3. It validates required fields, normalized lengths, and the reply-email format.
4. A hidden honeypot field rejects basic bot submissions.
5. It sends a plain-text and minimal HTML message through Cloudflare Email Sending's REST API to a verified destination. The REST path is used because the current Pages Functions binding list does not expose the newer `send_email` binding directly.
6. It returns a generic success or failure response; it does not echo the submitted message.

Privacy requirements:

- Do not write submissions to KV, D1, Durable Objects, analytics, or any third-party form provider.
- Do not log names, email addresses, message bodies, or raw form payloads.
- Keep the destination and sender addresses, Cloudflare account ID, and narrowly scoped Email Sending API token in Cloudflare environment configuration, not source code.
- Avoid client-side analytics and tracking pixels.
- State accurately that the application does not store submissions; do not claim that infrastructure providers retain no operational metadata.
- The no-JavaScript form submission remains functional. JavaScript may enhance the result message but must not be required.

Cloudflare Email Sending is currently a beta capability. Publishing verification must therefore include a real end-to-end submission to the verified destination. If the beta is unavailable for the account at deployment time, publication may proceed with the contact form disabled and a LinkedIn contact fallback rather than silently routing data to a third-party service.

## Responsive behavior

### Desktop

- Identity rail stays visible while the evidence canvas scrolls.
- Hero and evidence fill the first meaningful viewport without squeezing chart labels.
- Evidence frames use three equal columns.

### Tablet

- Rail becomes a compact top identity/header region.
- Track selector remains a single row only while labels fit comfortably.
- Evidence frames use two columns plus one full-width frame or a single column, based on measured fit.

### Mobile

- Identity becomes a concise header with an accessible menu or wrapped anchor list.
- Hero actions stack or wrap at full readable width.
- Track controls become a three-item segmented list with adequate touch targets; they must not force page overflow.
- Evidence, case studies, and credentials use a single column.
- Timeline becomes vertical.
- Form fields and actions use full width.

Breakpoint decisions must be content-driven. Fixed heights are prohibited for content regions.

## Accessibility

- Meet WCAG 2.2 AA contrast for text and controls using the approved pairings.
- Preserve the existing skip link and give the main region a stable target.
- Use one `h1` and a logical heading outline.
- All controls have visible focus states and at least 44-by-44-pixel touch targets where practical.
- Tabs and disclosure controls are keyboard operable and convey their states.
- Charts expose visible values and programmatic text equivalents.
- External links state their destination and use safe `rel` values when opening a new tab; opening a new tab is not required.
- Status messages from the contact form use an appropriate live region without moving focus unexpectedly.
- Reduced-motion users receive no chart drawing or scrolling animation.

## Performance and resilience

- Prefer Astro-rendered HTML, CSS, and inline SVG over client frameworks.
- Do not ship a charting dependency, icon package, or remote font dependency.
- Use only small progressive-enhancement scripts for tabs, disclosures, and form feedback.
- The page remains navigable and the initial evidence remains readable if JavaScript fails.
- No generated concept image is shipped as page content; the design is rebuilt as responsive HTML and CSS.
- Production output remains compatible with Cloudflare Pages' Astro static build: `npm run build`, output directory `dist`.

## Metadata and publishing

- Update the canonical site URL only when the final Cloudflare Pages or custom-domain URL is known.
- Provide accurate page title, description, canonical URL, Open Graph metadata, and a generated share image before final publication.
- Add robots and sitemap output suitable for a public recruiter portfolio.
- Cloudflare Pages is the recommended free host because the project is static-first, receives native preview deployments, and can colocate the required contact Function.
- Publication is not considered complete until the production build, deployed page, all external links, resume download, and a real contact submission are verified.

## Out of scope

- CMS, blog, authentication, visitor analytics, testimonials, and mailing lists
- Public contact details beyond LinkedIn, GitHub, and the form
- Separate pages for every track or case study unless a later user request adds them
- Unverified or inferred metrics
- Paid form services or a persistent submissions database
- Automatic application, messaging, or recruiter-outreach workflows

## Implementation boundary

This specification intentionally keeps the build small: a single primary Astro page, reusable data-driven components for three evidence panels, concise data objects for content, one Cloudflare Pages Function, and no client framework. Existing components may be replaced where they directly conflict with the approved information architecture; unrelated project files are not refactored.
