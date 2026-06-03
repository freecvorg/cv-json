# Security Policy

## Scope

This policy covers security issues in:

- The cv.json **schema** itself — e.g. constraints that allow malicious payloads, type definitions that mislead validators, fields that encourage unsafe practices.
- The **reference validator** (`validate.js`) and example tooling in this repository.
- The **documentation site** at `freecv.org/cv-json` insofar as it serves files from this repo.

It does NOT cover:

- Third-party tools that consume or produce cv.json. Report those to their respective maintainers.
- FreeCV's main product (freecv.org). Report those issues via `https://freecv.org/security`.

## Reporting a vulnerability

We ask that you report security issues **privately** before disclosing them publicly. Two channels:

### Preferred: GitHub Security Advisories

Open a private advisory at:

`https://github.com/freecv/cv-json/security/advisories/new`

This creates a private discussion thread visible only to repo maintainers and you. You can request a CVE through this flow.

### Email

If you cannot use GitHub Security Advisories, email:

**security@freecv.org**

PGP key available at `https://freecv.org/.well-known/pgp-key.txt`.

Please include:

- A description of the issue and its impact.
- Steps to reproduce.
- The affected file(s) and version(s).
- Your name/handle for credit (or a note that you'd prefer to remain anonymous).

## What to expect

- **Acknowledgement within 3 business days.** If you don't hear back, email again — your first message may have been lost.
- **Initial assessment within 7 days.** We'll let you know whether we consider the report a security issue, a bug, or out of scope.
- **Fix and disclosure timeline** depends on severity:
  - **Critical** (allows code execution, data exfiltration via the validator, etc.): patched within 7 days, advisory published.
  - **High** (denial of service, validator bypass that lets malformed documents claim compliance): patched within 30 days.
  - **Medium / Low**: patched in the next scheduled release.
- **Credit.** We will name you in the advisory and CHANGELOG unless you ask us not to.

## Coordinated disclosure

We follow a **90-day** coordinated disclosure window by default. If a fix is taking longer, we'll communicate. We do not retaliate against good-faith researchers and will not pursue legal action for reports made under this policy.

## Out-of-scope examples

These are not security issues:

- A cv.json document containing false information about a person. The schema is structured data, not a truth oracle. Verification (see `docs/verification.md`) is the layer that addresses this.
- A consumer tool that mis-renders a valid cv.json. Report to the tool.
- Theoretical privacy concerns about publishing a cv.json publicly — that's a user choice. The `privacy` section (v1.3+) is the mechanism for scoping visibility.

## Past advisories

Published advisories are listed at `https://github.com/freecv/cv-json/security/advisories`. None at time of writing.
