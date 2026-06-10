# cv.json

> An open schema for publishing a CV as a single JSON document at a stable URL — so AI agents, ATS systems, and other tools can read career data without parsing a PDF.

[Spec](https://freecv.org/cv-json) · [Validator](https://freecv.org/validate) · [Schema (v1)](https://freecv.org/schema/cv/v1.json) · [`/.well-known/cv.json`](https://freecv.org/.well-known/cv.json) ([discovery](#discovery))

---

## Status

**Emerging.** cv.json is not a ratified standard. It is a small, opinionated schema currently maintained by [FreeCV](https://freecv.org) and used in production on the FreeCV portfolio platform. We're publishing the schema, validator, and examples here so other tools can adopt it and so the schema can evolve in the open. If you ship a CV product and want a say in v2, [open an issue](https://github.com/freecvorg/cv-json/issues).

cv.json keeps the top-level field names of `basics`, `work`, `education`, `skills`, `projects`, `languages`, `publications`, `awards`, `volunteer`, `interests`, `references`, and `meta` familiar — anyone who has touched a JSON-shaped CV before should feel at home. It adds fields the rest of the ecosystem doesn't have (`availability`, `ats`, `verification`, `referencesMode`, `i18n`, the v1.3 hiring-signal block, and `x-customSections` for user-defined sections) and pins down date formats and a discovery convention.

---

## 60-second demo

Every published cv.json lives at a stable URL. No auth, no API key, plain HTTP:

```bash
$ curl -s https://freecv.org/p/ashley/cv.json | jq '.basics.name, .work[0].company'
"Ashley Chen"
"Stripe"
```

The response advertises its schema in headers:

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
X-CV-Version: 1.2
Link: <https://freecv.org/schema/cv/v1.json>; rel="describedby"
Access-Control-Allow-Origin: *
Cache-Control: public, max-age=300
```

Sites that host a CV can also declare it in HTML for crawlers:

```html
<link rel="alternate" type="application/json"
      href="/p/ashley/cv.json" title="cv.json" />
```

…or expose a site-wide discovery manifest at `/.well-known/cv.json` listing all CVs hosted on the domain.

---

## Schema at a glance

Only `basics` and `meta` are required. Everything else is optional and consumers MUST ignore unknown fields.

| Section | Type | Purpose |
|---|---|---|
| `basics` | object | Name, label, image, summary, location, contact, social profiles |
| `work` | array | Roles: company, position, dates, summary, highlights |
| `education` | array | Institution, degree, area, dates, score, summary, highlights |
| `projects` | array | Name, role, description, URL, keywords, highlights |
| `skills` | array of strings | Flat list of skill names |
| `languages` | array | Language + fluency level |
| `certificates` | array | Name, issuer, date, verification URL |
| `publications` | array | Papers, articles, books |
| `awards` | array | Honors and recognitions |
| `volunteer` | array | Volunteer roles, same shape as `work` |
| `interests` | array of strings | Flat list of interests |
| `references` | array | Name, title, company, relationship, email, phone |
| `referencesMode` | enum | `"show"` \| `"on-request"` \| `"hide"` (default `"hide"`) |
| `availability` | object | Job-seeking status, preferred roles, work type, sponsorship |
| `ats` | object | Auto-generated keywords, years of experience, seniority — **hints, not authoritative** |
| `verification` | object | Trust signals: email verified, source platform |
| `i18n` | object | Primary language + map of translated cv.json URLs |
| `meta` | object | `version`, `canonical`, `lastModified`, `generator` |

Date fields accept `YYYY`, `YYYY-MM`, or `YYYY-MM-DD`. The full schema is at [`schema/v1.json`](./schema/v1.json).

---

## Why cv.json exists

Three problems, one schema.

**1. PDFs are unparseable in practice.** Every CV in the world eventually meets an ATS. ATS parsers are notorious for merging job titles into dates, putting names in the address field, and silently dropping skills. The fix isn't a better parser — it's not parsing in the first place.

**2. Existing JSON CV schemas have stalled.** The shape of a JSON résumé has been a solved problem for years, but nothing in the space has moved meaningfully — no discovery convention, no version negotiation, no availability or ATS signals, no references-mode. cv.json picks up the parts that haven't been touched and ships them under a real versioning policy.

**3. AI agents need structured career data.** Recruiting agents, candidate-search tools, and matching systems are being built right now against scraped PDFs and HTML. A canonical JSON endpoint at a known URL is the cheapest way to feed them — same role HTML played for browsers, robots.txt played for crawlers, OpenAPI plays for APIs.

cv.json is the file. The URL is the contract.

---

## Quick start

### Option 1 — Publish via FreeCV (easiest)

1. Sign up at [freecv.org](https://freecv.org), build your CV in the editor.
2. Enable the public endpoint in Dashboard → Settings → Public cv.json.
3. Your endpoint goes live at `https://freecv.org/p/{your-slug}/cv.json`.

That's the whole thing. Update your CV once, every consumer fetching the URL gets the new version.

### Option 2 — Self-host

You don't need FreeCV. Any web server can serve a cv.json. Minimal recipe:

1. Write a JSON file conforming to [`schema/v1.json`](./schema/v1.json). Start from [`examples/minimal.json`](./examples/minimal.json).
2. Serve it at a stable URL with `Content-Type: application/json` and (ideally) `Access-Control-Allow-Origin: *`.
3. Add a discovery `<link>` to the HTML page that "represents" you (portfolio, personal site).
4. Validate before publishing:

```bash
npx -y ajv-cli validate \
  -s https://freecv.org/schema/cv/v1.json \
  -d my-cv.json
```

Or paste it into [freecv.org/validate](https://freecv.org/validate).

### Recommended response headers

```
Content-Type: application/json; charset=utf-8
X-CV-Version: 1.2
Link: <https://freecv.org/schema/cv/v1.json>; rel="describedby"
Access-Control-Allow-Origin: *
Cache-Control: public, max-age=300
```

`X-CV-Version` lets consumers branch behavior without parsing the body. `Access-Control-Allow-Origin: *` is what makes the file usable from browser tools — please set it.

---

## Minimal example

```json
{
  "$schema": "https://freecv.org/schema/cv/v1.json",
  "basics": {
    "name": "Jane Smith",
    "label": "Software Engineer",
    "location": "London, UK",
    "summary": "Full-stack developer with 3 years building web apps."
  },
  "work": [{
    "company": "Acme Corp",
    "position": "Software Engineer",
    "startDate": "2022-03",
    "current": true,
    "highlights": ["Cut deploy time by 40% with new CI pipeline"]
  }],
  "skills": ["TypeScript", "React", "Node.js", "PostgreSQL"],
  "education": [{
    "institution": "University of London",
    "degree": "BSc Computer Science",
    "endDate": "2022"
  }],
  "meta": {
    "version": "1.2",
    "canonical": "https://example.com/cv.json",
    "lastModified": "2026-06-01",
    "generator": "hand-written"
  }
}
```

See [`examples/`](./examples) for a fuller document, a references-mode demo, and edge cases.

---

## Discovery

Two complementary mechanisms:

**Per-page link.** On any HTML page that represents a person, add:

```html
<link rel="alternate" type="application/json"
      href="/cv.json" title="cv.json" />
```

This is the same pattern RSS used. Crawlers and agents can find a person's CV from any page they're mentioned on.

**Site-wide manifest.** A platform hosting many CVs (job board, agency, talent network) can publish a discovery manifest at `/.well-known/cv.json`:

```json
{
  "version": "1.0",
  "platform": "example.com",
  "endpoints": [
    { "slug": "ashley", "url": "https://example.com/p/ashley/cv.json" },
    { "slug": "jane",   "url": "https://example.com/p/jane/cv.json" }
  ]
}
```

This lets one HTTP request enumerate every CV a site is willing to expose. FreeCV serves this at [`https://freecv.org/.well-known/cv.json`](https://freecv.org/.well-known/cv.json).

---

## Adopters

If you publish or consume cv.json, add yourself here via PR.

### Publishers

| Platform | Endpoint pattern | Notes |
|---|---|---|
| [FreeCV](https://freecv.org) | `https://freecv.org/p/{slug}/cv.json` | Free tier, schema v1.2 |
| [LiveLink.cv](https://livelink.cv) | `https://livelink.cv/{slug}/cv.json` | Custom-domain tier |
| _your tool here_ | | |

### Consumers

| Tool | What it does |
|---|---|
| [freecv.org/validate](https://freecv.org/validate) | Web validator against the published schema |
| _your tool here_ | |

PRs welcome. Be honest about implementation status (production, beta, prototype).

---

## Versioning policy

cv.json follows **semver at the schema level**.

| Version | Status | What changes |
|---|---|---|
| `v1.0` | Stable (frozen) | Original release. Documents remain valid forever. |
| `v1.1` | Stable | Date validation, `publications`, `awards`, `interests`, `projects.role/highlights`, `education.summary`, `volunteer.summary`, employment types, `ats` clarified. |
| `v1.2` | **Current stable** | `references`, `referencesMode`. |
| `v1.3-preview` | Preview | Hiring-side signal block — see [stability tiers](#v13-stability-tiers) below. Schema published as [`schema/v1.3-preview.json`](./schema/v1.3-preview.json). |
| `v2.0` | Future | Reserved for breaking changes. No timeline. |

**Rules within v1.x:**

- New fields are additive and optional. Consumers MUST ignore unknown fields.
- No field is renamed or removed within v1.x — even when we know the name isn't great. (For example, `basics.label` vs the more obvious `basics.jobTitle` stays as-is for JSON Resume interop; it changes in v2.)
- Validation rules only get **stricter** within a minor bump if it's a clarification, never a real tightening that invalidates documents in the wild.

**Declaring the version.** Producers should set `meta.version` to the highest minor version whose fields they use, and serve `X-CV-Version` matching. Consumers should branch on `X-CV-Version` for cheap version checks.

---

## v1.3 stability tiers

v1.3 adds a sizeable hiring-signal block on top of stable v1.2. To stay honest about which of those fields are usable today vs. which depend on platform work that hasn't shipped yet, every v1.3 field falls into one of three tiers:

**Tier 1 — Ready today.** Fields a producer can fill in by hand and an ATS or agent can act on immediately. No platform infrastructure required. These are: `compensation`, `workAuthorization`, `locationPreferences`, `intentions`, `outreachControls`, `highlights`, `provenance`, `x-customSections`.

`x-customSections` is the one vendor extension in v1.3: an `x-`-prefixed array for user-defined sections that have no standard home (e.g. "Speaking Engagements", "Patents"), shaped `[{ name, items: [{ name, summary?, highlights?, date?, endDate?, url? }] }]`. Producers fold standard-named sections (Awards, Volunteering, Publications, Interests) into their canonical arrays instead, so only genuinely novel sections land here. The `x-` prefix follows the JSON Schema vendor-annotation convention, so consumers that don't understand it ignore it and the document stays valid. Already emitted in production by FreeCV.

**Tier 2 — Needs platform.** Fields whose *shape* is stable, but whose *value* is only useful if a publisher (FreeCV or another) auto-populates and refreshes them. Hand-written values go stale fast. These are: `signals` (GitHub, speaking, writing), `researchSignals` (Google Scholar, OpenReview, ORCID), `credentials` (W3C Verifiable Credentials).

**Tier 3 — Future-looking.** Fields whose semantics are real but whose enforcement depends on consumer behavior — they only matter if recruiters, ATSs, and agents honor them. These are: `privacy` (audience-scoped visibility), `policy` (consumer obligations).

If you're publishing a CV by hand, fill in Tier 1 fields where they apply, skip Tier 2 unless you genuinely keep the numbers fresh, and treat Tier 3 fields as a signal of intent rather than a guarantee. The full schema accepts all three tiers — the tiering is editorial guidance, not a validation rule.

---

## Repository layout

```
schema/
  v1.json                  JSON Schema (Draft 2020-12) for stable v1.x (v1.0–v1.2)
  v1.3-preview.json        JSON Schema for the v1.3 preview, additive over v1.json
examples/
  minimal.json             Smallest valid document — basics + meta only
  typical.json             What most people publish — work, education, skills, languages
  full-v1.2.json           Every section of stable v1.2 populated
  full-v1.3.json           Every section of v1.3 populated, including all tier-1 hiring signals
  academic.json            Researcher CV: publications, awards, researchSignals, degree credentials
  with-references.json     Demonstrates referencesMode
  with-privacy.json        Demonstrates privacy.excludeAudience (block current employer)
  with-credentials.json    Demonstrates W3C VerifiableCredential pattern across roles
validate.js                CLI validator (node validate.js path/to/cv.json)
CONTRIBUTING.md            How to propose changes
LICENSE                    MIT
```

---

## Badge

If you publish a cv.json, drop this badge in your README or portfolio so it's visible:

```markdown
[![cv.json](https://freecv.org/badge/cv-json.svg)](https://freecv.org/cv-json)
```

Renders as: [![cv.json](https://freecv.org/badge/cv-json.svg)](https://freecv.org/cv-json)

The badge links to the spec. The badge SVG is served from `freecv.org/badge/cv-json.svg` and is free to embed.

---

## License

- **Schema** (this repository, including `schema/v1.json`, examples, validator, docs): [MIT](./LICENSE). Fork it, embed it, ship it.
- **"cv.json"** as a name: trademark of FreeCV, licensed for free use by any implementation that conforms to the published schema. We're not going to chase anyone — the only thing we'll push back on is a fork that diverges from the schema while still calling itself "cv.json." Call your fork something else and we're good.

---

## Links

- Spec page — https://freecv.org/cv-json
- JSON Schema (v1) — https://freecv.org/schema/cv/v1.json
- Validator — https://freecv.org/validate
- Discovery manifest — https://freecv.org/.well-known/cv.json
- Builder (reference implementation) — https://freecv.org/builder
- Issues / proposals — https://github.com/freecvorg/cv-json/issues
- Background post — https://freecv.org/blog/cv-json
