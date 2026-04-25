<p align="center">
  <img src="https://freecv.org/icon.png" alt="cv.json" width="64" height="64" style="border-radius: 12px" />
</p>

<h1 align="center">cv.json</h1>

<p align="center">
  <strong>The open, machine-readable standard for career data.</strong><br>
  One JSON file. One URL. Always current.<br>
  Built for AI agents, ATS systems, and humans.
</p>

<p align="center">
  <a href="https://freecv.org/open">Spec</a> ·
  <a href="https://freecv.org/schema/cv/v1.json">JSON Schema</a> ·
  <a href="https://freecv.org/builder">Builder</a> ·
  <a href="https://freecv.org/blog/cv-json">Blog Post</a>
</p>

---

## Why

Every day, millions of CVs are uploaded as PDFs — then butchered by ATS parsers. Names become addresses. Job titles merge with dates. Skills vanish. AI recruiting agents need structured data, not guesswork from PDF extraction.

**cv.json** gives every professional a canonical, machine-readable endpoint for their career data.

## Quick Start

### Consume

```bash
curl https://freecv.org/p/ashley/cv.json
```

No API key. No auth. Standard HTTP.

### Discover

Portfolio pages include a `<link>` tag for automated discovery:

```html
<link rel="alternate" type="application/json" href="/p/ashley/cv.json" title="cv.json" />
```

### Validate

```bash
# Schema URL
https://freecv.org/schema/cv/v1.json

# Every cv.json includes a $schema field pointing to this URL
# Use any JSON Schema validator (ajv, zod, etc.)
```

## Schema Overview — v1.2

A complete, structured career data schema — all fields optional except `basics` and `meta`, production-ready. All date fields validated as `YYYY`, `YYYY-MM`, or `YYYY-MM-DD`.

### Core Fields

| Field | Description |
|---|---|
| `basics` | Name, title, photo, summary, location, social profiles |
| `work` | Companies, positions, dates, summary + highlights per entry |
| `education` | Institutions, degrees, fields, scores, summary + highlights |
| `skills` | Flat array of skill names |
| `languages` | Languages with fluency levels |
| `projects` | Portfolio projects with role, URLs, keywords + highlights |
| `certificates` | Professional certifications with issuer, date, verification URL |
| `publications` | Papers, articles, books — with publisher, date, and URL |
| `awards` | Awards, honors, and recognitions with awarder and date |
| `interests` | Personal interests and hobbies as a flat list |
| `volunteer` | Volunteer experience with summary + highlights |
| `references` | Professional references — see also `referencesMode` for visibility control |

### Extended Fields (FreeCV extensions)

| Field | Description |
|---|---|
| `referencesMode` | `"show"` \| `"on-request"` \| `"hide"` — controls how references render. Defaults to `"hide"`. Data stays in `references[]` regardless, so toggling visibility never loses data. |
| `availability` | Job-seeking status, preferred roles, work type, sponsorship |
| `ats` | Auto-generated ATS metadata: keywords, years of experience, seniority. Treat as hints, not authoritative values. |
| `verification` | Trust signals: email verified, platform source |
| `i18n` | Internationalization: primary language, map of translated cv.json URLs |
| `meta` | Schema version, canonical URL, last modified, generator |

### What's New in v1.2

- **`references`** — optional array of professional references with `name`, `title`, `company`, `relationship`, `email`, `phone`
- **`referencesMode`** — enum controlling visibility: `"show"`, `"on-request"`, or `"hide"` (default). The classic "References available upon request" footer is just the `"on-request"` variant

All changes are **non-breaking** — v1.0 and v1.1 documents remain valid. Consumers that don't understand these fields can safely ignore them.

> **Note:** an earlier draft of v1.2 included a `customization` block (template, accentColor, font, etc.). It was dropped before release — cv.json is a pure data interchange format, not a rendering instruction set. Visual presentation belongs to whoever's rendering. Same philosophy as jsonresume.org. If a renderer wants to round-trip its own visual prefs, use a vendor-extension key like `x-yourplatform`.

### What's New in v1.1

- **Date validation** — all date fields enforce `YYYY`, `YYYY-MM`, or `YYYY-MM-DD` patterns
- **`publications`** — papers, articles, books for academics and researchers
- **`awards`** — honors and recognitions
- **`interests`** — personal interests as a flat string array
- **`projects.role`** — your role on the project (e.g., "Lead Developer")
- **`projects.highlights`** — key accomplishments on the project
- **`education.summary`** / **`volunteer.summary`** — consistent with `work.summary`
- **`employmentType`** — added `"temporary"` and `"seasonal"` options
- **`ats` description** — clarified as auto-generated hints

All changes are **non-breaking** — v1.0 documents remain valid.

### Field naming — FreeCV builder vs cv.json schema

FreeCV's editor uses slightly friendlier names than the JSONResume-compatible schema. When generating or consuming cv.json, the mapping is:

| Builder name | cv.json field | Notes |
|---|---|---|
| `personal.jobTitle` | `basics.label` | Same concept |
| `personal.photo` | `basics.image` | Same concept |
| `experience.bullets` | `work[].highlights` | Same semantics |
| `language.level` | `languages[].fluency` | Same semantics |
| `project.tech` | `projects[].keywords` | Same semantics, `tech` is more specific intent |

Renaming was considered for v1.2 but rejected to preserve JSONResume interop and keep v1.x non-breaking. The names will unify in v2.0.

## Example

```json
{
  "$schema": "https://freecv.org/schema/cv/v1.json",

  "basics": {
    "name": "Ashley Chen",
    "label": "Senior Product Manager",
    "location": "San Francisco, CA",
    "summary": "10+ years leading cross-functional teams...",
    "profiles": [{ "network": "LinkedIn", "url": "..." }]
  },

  "work": [{
    "company": "Stripe",
    "position": "Senior PM",
    "startDate": "2021-06",
    "current": true,
    "highlights": ["Increased developer adoption by 34%"]
  }],

  "skills": ["Product Strategy", "SQL", "Figma"],
  "education": [{ "institution": "Stanford", "degree": "MBA" }],
  "certificates": [{ "name": "PMP", "issuer": "PMI" }],
  "interests": ["AI Ethics", "Open Source"],

  "availability": {
    "status": "open",
    "workType": ["remote", "hybrid"],
    "roles": ["Product Manager", "Head of Product"]
  },

  "ats": {
    "keywords": ["Product Strategy", "SQL"],
    "yearsOfExperience": 10,
    "seniority": "senior"
  },

  "verification": { "email": true, "platform": "freecv.org" },

  "meta": {
    "version": "1.2",
    "canonical": "https://freecv.org/p/ashley/cv.json",
    "lastModified": "2026-04-25T10:00:00Z",
    "generator": "FreeCV"
  }
}
```

## Live URL Pattern

Unlike static file exports, cv.json is served from a **live endpoint**:

```
https://freecv.org/p/{slug}/cv.json    # Free tier
https://livelink.cv/{slug}/cv.json     # Pro (custom domain)
```

Update your CV once → every system that fetches your endpoint gets the latest version.

### Response Headers

```
Content-Type: application/json; charset=utf-8
Link: <https://freecv.org/schema/cv/v1.json>; rel="describedby"
X-CV-Version: 1.2
Access-Control-Allow-Origin: *
Cache-Control: public, max-age=300
```

## Privacy

- **Off by default** — cv.json returns 404 until explicitly enabled
- **Email hidden by default** — opt-in to include contact info
- **Phone hidden by default** — opt-in to include phone number  
- **One-click disable** — turn off your endpoint anytime from Dashboard → Settings
- **Guest users** — no cv.json endpoint (requires account + slug)

## Use Cases

| Who | How |
|---|---|
| **AI Recruiting Agents** | Fetch, compare, and rank candidates from structured JSON |
| **ATS Platforms** | Ingest pre-parsed career data — no PDF parsing needed |
| **Job Boards** | Auto-populate profiles from a cv.json URL |
| **Career Tools** | Build on top of portable, standardized career data |
| **Individuals** | Own your career data in a universal, portable format |

## Implementations

### Generate cv.json

- [FreeCV Builder](https://freecv.org/builder) — Build and export cv.json (free)
- [FreeCV Portfolio](https://freecv.org/live-cv) — Live endpoint at `/p/{slug}/cv.json`

### Consume cv.json

_Your tool here — [open an issue](https://github.com/freecvorg/cv-json/issues) to be listed._

## Contributing

We welcome contributions:

- **Schema improvements** — propose new fields via [Issues](https://github.com/freecvorg/cv-json/issues)
- **Implementations** — build generators, parsers, validators in any language
- **Documentation** — improve examples, add tutorials

## License

MIT — use cv.json in any project, commercial or otherwise.

---

<p align="center">
  <strong>Built by <a href="https://freecv.org">FreeCV</a></strong> · 
  Used by job seekers in 180+ countries
</p>
