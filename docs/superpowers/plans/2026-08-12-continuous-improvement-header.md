# Continuous Improvement Header Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the hero-aside copy with Michael McNea's approved continuous-improvement leadership philosophy.

**Architecture:** Keep the existing Astro hero structure and CSS unchanged. Add a built-site contract assertion for the new wording, then replace only the three text lines inside the existing `hero-aside` paragraph.

**Tech Stack:** Astro 5, HTML, Node.js built-in test runner

## Global Constraints

- Approved copy: “I make processes clearer, improve them continuously, and deliver better outcomes.”
- Render the approved sentence across three deliberate lines.
- Preserve the existing hero-aside placement and styling.
- Do not change the adjacent introduction, layout, typography, navigation, evidence tracks, or other page content.

---

### Task 1: Replace and verify the hero-aside copy

**Files:**
- Modify: `tests/built-site.test.mjs`
- Modify: `src/pages/index.astro:38-42`

**Interfaces:**
- Consumes: Astro's existing `hero-aside` markup and the generated `dist/index.html` file.
- Produces: A built homepage containing the exact approved three-part sentence and no legacy hero-aside copy.

- [ ] **Step 1: Add the failing built-site copy contract**

Add these assertions to `hero and identity rail match the approved recruiter-first concept` in `tests/built-site.test.mjs`, immediately after the `View Evidence` assertion:

```js
assert.match(
  html,
  /I make processes clearer,<br>\s*improve them continuously,<br>\s*and deliver better outcomes\./,
);
assert.doesNotMatch(html, /Executive evidence\.|Built for decisions/);
```

- [ ] **Step 2: Build and run the focused test to verify it fails**

Run:

```bash
npm run build && node --test tests/built-site.test.mjs
```

Expected: FAIL in `hero and identity rail match the approved recruiter-first concept` because the generated HTML still contains `Executive evidence.` and does not contain the approved sentence.

- [ ] **Step 3: Replace only the hero-aside wording**

In `src/pages/index.astro`, replace the existing `hero-aside` contents with:

```astro
<p class="hero-aside">
  I make processes clearer,<br />
  improve them continuously,<br />
  and deliver better outcomes.
</p>
```

- [ ] **Step 4: Run the complete test suite**

Run:

```bash
npm test
```

Expected: the Astro production build succeeds and every Node test passes.

- [ ] **Step 5: Verify the production preview in a browser**

Run:

```bash
npm run preview -- --host 127.0.0.1
```

Open `http://127.0.0.1:4321/` in the in-app browser at the desktop breakpoint. Verify that the hero aside displays the approved three lines, the surrounding layout is unchanged, and the browser console contains no errors.

- [ ] **Step 6: Commit the implementation**

```bash
git add src/pages/index.astro tests/built-site.test.mjs
git commit -m "copy: center hero on continuous improvement"
```
