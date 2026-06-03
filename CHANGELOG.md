# Changelog

All notable changes to the cv.json schema are documented here.

This project follows [Semantic Versioning](https://semver.org/):
- **MAJOR** — breaking changes (none yet; reserved for v2.0)
- **MINOR** — additive, backward-compatible field/section additions
- **PATCH** — clarifications, typo fixes, example updates

---

## [1.3.0-preview] — UNRELEASED (target: 2026 Q3)

**Status:** PREVIEW. Schema draft at `schema/cv-v1.3-draft.json`. Subject to change before final release.

**Breaking changes:** None. Fully additive. v1.2 documents remain valid v1.3 documents.

### Added

- **`compensation`** — structured salary expectations (currency, min/max, period, equity preference, notes). Replaces ad-hoc free-text in `meta.notes`.
- **`workAuthorization`** — array of jurisdictions with status (citizen / permanent_resident / work_visa / requires_sponsorship) and expiry where applicable. Lets ATS filter without illegal questions.
- **`outreach`** — opt-in recruiter contact preferences: roles of interest, role levels, remote/hybrid/onsite, geographies, contact channel preference, response SLA.
- **`privacy`** — per-section visibility map. Each top-level section can be marked `public`, `authenticated`, `private`, or `redacted-from-public`. Lets one cv.json serve a public profile and a recruiter-only view.
- **`verification` (v2)** — extends v1.2 verification with W3C Verifiable Credentials support. Each verification entry can now carry a `credential` object (JWT-VC or JSON-LD VC) and an `issuer` DID. Old `verified: true` booleans still accepted but discouraged.
- **`provenance`** — per-section authorship trail. Records who/what generated each section (`human`, `llm-assisted`, `imported-from`) with timestamps. Discloses AI assistance honestly.
- **`highlights`** — top-level array of 3-7 cross-section highlight pointers ("see basics.summary", "see work[0].achievements[2]"). Powers tl;dr renderings.
- **`intentions`** — what the person is actually looking for, separate from `outreach`. Free-form but structured: `seeking` (array of goal strings), `notSeeking` (array), `timeframe`.
- **`signals`** — quantitative signals other systems may want (years of experience computed, primary language, location radius). Computed/derived, not authored.
- **`policy`** — machine-readable usage policy for the document: `noLLMTraining` (boolean), `noResale` (boolean), `attributionRequired` (boolean), `contactBeforeUse` (boolean).

### Changed

- `verification[].method` enum expanded with `vc-jwt` and `vc-ld`.
- `meta.version` recommended value bumped to `"1.3"`.

### Migration notes

No migration required. Implementers consuming v1.2 will read v1.3 documents without changes; new sections are simply ignored.

---

## [1.2.0] — 2026-04-12

**Breaking changes:** None. Additive.

### Added

- **`availability`** — current status (open / casually-looking / not-looking), earliest start date, notice period in weeks, hours-per-week preference.
- **`ats`** — ATS-friendly hints: canonical job titles, normalized skill list, years-of-experience hints. Separate from human-facing content.
- **`verification`** — array of section-level verification claims. Each entry links a section path (e.g. `work[0]`) to a verification method (`linkedin`, `email-domain`, `pgp`, `dns-txt`, `oauth`) and a verifier identity.
- **`meta` extended** — added `meta.canonical` (canonical URL), `meta.locale`, `meta.generator` (tool name + version), `meta.profileImage`.

### Changed

- `basics.email` clarified as a single string (not array). Use `basics.profiles` for additional contact channels.

---

## [1.1.0] — 2026-02-20

**Breaking changes:** None. Additive.

### Added

- **`publications`** — array of papers, articles, books. Fields: name, publisher, releaseDate, url, summary, authors.
- **`awards`** — array of awards, honors, recognition. Fields: title, date, awarder, summary.
- **`interests`** — array of interests with optional keywords. Useful for cultural-fit signals and conversation starters.
- **`volunteer`** — array of volunteer positions, structured like `work` (organization, position, startDate, endDate, summary, highlights, url).

### Notes

These four sections mirror the [JSON Resume](https://jsonresume.org/) shape intentionally — adoption was easier than divergence. Diverged where it mattered (verification, ats, privacy) in later versions.

---

## [1.0.0] — 2026-01-15

Initial public release.

### Included sections

- `basics` — name, label, email, phone, url, summary, location, profiles
- `work` — array of employment entries
- `education` — array of degrees and courses
- `skills` — array of skill groups with level and keywords
- `languages` — array of spoken languages with fluency
- `projects` — array of projects (personal, open-source, side)
- `references` — array of professional references
- `meta` — version, lastModified, canonical URL

### Notes

v1.0 was scoped narrowly on purpose: a structured CV that a human or machine can read. Everything beyond that — verification, scheduling, compensation — was deferred to later versions so the core could stabilize.

---

## Versioning policy

- **Patch releases** ship anytime — typo fixes, example improvements, JSON Schema constraint tightening that doesn't reject previously-valid docs.
- **Minor releases** ship roughly quarterly when there are enough additive changes to warrant a bump.
- **Major releases** (v2.0+) will go through a public RFC process — see GOVERNANCE.md.

All releases are tagged in git and announced at `https://freecv.org/cv-json/changelog`.
