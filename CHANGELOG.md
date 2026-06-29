# Changelog

All notable changes to the cv.json schema are documented here.

This project follows [Semantic Versioning](https://semver.org/):
- **MAJOR** — breaking changes (none yet; reserved for v2.0)
- **MINOR** — additive, backward-compatible field/section additions
- **PATCH** — clarifications, typo fixes, example updates

---

## [1.3.0-preview] — UNRELEASED (target: 2026 Q3)

**Status:** PREVIEW. Schema published at [`schema/v1.3-preview.json`](./schema/v1.3-preview.json). Subject to change before final release.

**Breaking changes:** None. Fully additive. v1.2 documents remain valid v1.3 documents.

### Added — Tier 1 (Ready today)

Fields a producer can fill in by hand and a consumer can act on immediately.

- **`compensation`** — structured salary expectations (currency, min/max base + total, period, equity preference, visibility hint). Replaces ad-hoc free-text in summary.
- **`workAuthorization`** — country, status (citizen / permanent-resident / work-permit / requires-sponsorship), expiry, and additional countries. Lets ATS filter without illegal questions.
- **`locationPreferences`** — current base, willingness to relocate, allowed countries, remote-only acceptable, preferred timezone overlap.
- **`intentions`** — what the candidate is looking for in their own words: free-form summary, IC/management track, openToManagement, interested/avoid domains, interested stages.
- **`outreachControls`** — opt-in recruiter contact rules: acceptingInbound, preferredChannel, minimum-viable-offer, anti-spray/anti-crypto filters, response SLA.
- **`highlights`** — top-level array of 3–7 career highlights with type tag (shipped-product, open-source, talk, etc.). Powers tl;dr renderings.
- **`provenance`** — authorship and AI-assistance disclosure: authoredBy (human / human+ai / ai), aiAssisted, scope of assistance, last human review timestamp.
- **`x-customSections`** — vendor extension (the `x-` prefix means consumers ignore what they don't understand) for user-defined sections with no standard home (e.g. "Speaking Engagements", "Patents"). Each is `{ name, items: [{ name, summary?, highlights?, date?, endDate?, url? }] }`. Standard-named sections fold into their canonical arrays (awards/volunteer/publications/interests) instead, so only novel sections land here. Already emitted in production by FreeCV.

### Added — Tier 2 (Needs platform)

Fields whose shape is stable but whose values are only useful if a publisher auto-populates and refreshes them.

- **`signals`** — quantitative third-party signals: `github` (repos, stars, followers, contributions, lastSynced), `speaking` (events with URLs), and similar attestable counters.
- **`researchSignals`** — academic equivalent: Google Scholar (citations, h-index, i10-index, lastSynced), OpenReview profile, ORCID, reviewing venues.
- **`credentials`** — array of W3C Verifiable Credentials issued by employers, schools, certification bodies (`type`, `claim`, `subject`, `issuer` DID, `issuanceDate`, `proof` URL). Replaces "trust me bro" with cryptographic attestation when the issuer participates.

### Added — Tier 3 (Future-looking)

Fields whose semantics are real but whose enforcement depends on consumer behavior.

- **`privacy`** — audience-scoped visibility: `mode`, per-audience field allowlists (`showToPublic`, `showToRecruiter`, `showToAgent`), `excludeAudience` (block specific domains), `anonymousMode`, `blockReason`.
- **`policy`** — machine-readable document usage policy: `noLLMTraining`, `noResale`, `attributionRequired`, `contactBeforeUse`.

### Changed

- `meta.version` recommended value bumped to `"1.3"` when any v1.3 field is present.
- Examples reorganized from profession-based files to a completeness-based set: `minimal.json`, `typical.json`, `full-v1.2.json`, `full-v1.3.json`, `academic.json`, `with-references.json`, `with-privacy.json`, `with-credentials.json`.

### Migration notes

No migration required. Implementers consuming v1.2 will read v1.3 documents without changes; new sections are simply ignored.

---

## [1.2.1] — 2026-06-29

**Breaking changes:** None. A documentation/clarification patch — no field renamed or removed; every v1.2 document is a valid v1.2.1 document and vice versa.

### Added

- **`x-customSections`** — now formally documented in the **stable v1 schema** (previously declared only in `v1.3-preview`). A vendor extension (the `x-` prefix means consumers ignore what they don't understand) for user-defined sections with no standard home, shaped `[{ name, items: [{ name, summary?, highlights?, date?, endDate?, url? }] }]`. FreeCV already emits this in production — v1.2.1 simply makes the published v1 schema match what producers send.
- Root **`additionalProperties: true`** — makes `x-` vendor extensions standards-valid (they were always meant to be ignored-not-rejected).

### Notes

Standard-named custom sections (Awards / Volunteering / Publications / Interests / Certifications / Projects / Languages / Skills) fold into their canonical arrays; only genuinely novel sections land in `x-customSections`. FreeCV serves this as `X-CV-Version: 1.2.1`.

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
