---
name: obsidian-session-memory
description: Use for every substantive Codex session to retrieve relevant Obsidian memory before forming an answer and to record durable, redacted lessons when the session closes.
---

# Obsidian session memory

Use the vault at `/Users/michael_mcnea/Documents/ObsidianVault/mmnva` as the
user's durable memory. Its `CLAUDE.md` is the authoritative memory contract;
this skill makes that contract usable from Codex.

## Before a substantive answer

1. Read `Knowledge Base/_index/ACTIVE.md`, then `Knowledge Base/_index/MAP.md`.
   If ACTIVE's `updated` date is more than seven days old, say so before
   advising.
2. Read the newest dated note in `Knowledge Base/09 Daily/`. If none exists,
   say so; do not treat the template as a daily record.
3. Use MAP's routing table to retrieve only task-relevant notes. For strategic
   or architectural guidance, also search `Knowledge Base/06 Decisions/`.
4. Evaluate the intended answer against the retrieved notes:
   - Apply active constraints and decisions unless a recorded reversal trigger
     has fired.
   - Surface conflicts, stale state, and missing memory rather than guessing.
   - Separate **stored** facts from **inferred** conclusions. Cite stored facts
     with Obsidian wikilinks when the answer draws on the vault.
   - Treat the vault as context, not live verification; re-check facts that can
     change outside the vault.

Use `obsidian` CLI when the app is open; otherwise retrieve only the needed
files directly. Never scan the entire vault.

## At session close

1. Summarize only durable lessons: verified outcomes, decisions actually made,
   remaining open loops, and practical constraints discovered.
2. Append the summary to `Knowledge Base/09 Daily/YYYY-MM-DD.md`, following
   `_TEMPLATE Daily.md`: add outcomes to `What happened`, discoveries to
   `Lessons learned`, and unresolved work to `Open loops`. Create that day's
   note only when the session has something worth retaining. Never overwrite
   an existing daily note.
3. Promote genuine decisions, open loops, and project state changes according
   to the vault's `session-end` workflow. Do not invent a decision or promote
   discussion as one.
4. Never write credentials, tokens, personal financial/medical/legal material,
   or copied private conversation content. Preserve uncertainty.
5. If the vault repository has unrelated or untracked changes, do not commit
   or stage them. Report the uncommitted update instead.

## Scope

This is a response-quality check, not permission to modify unrelated notes.
Layer 2 agent notes may be updated; Layer 1 human notes are append-only or
require approval, as defined in the vault contract.
