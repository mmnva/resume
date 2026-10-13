# CLAUDE.md

## Testing

Always run the full test suite (and report pass/fail counts) after gating endpoints, splitting test files, or making multi-file changes.

## Git & PR Workflow

Before pushing or opening PRs, verify the gh token has the required scopes (workflow, repo) and that ~/.config is not root-owned; fix permissions before proceeding.

## Docker / Containerization

When containerizing apps, verify static assets and CDN-served images render in the final container, not just text responses, before declaring success.
