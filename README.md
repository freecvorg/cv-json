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

## Schema Overview

A complete, structured career data schema — all fields optional, production-ready.

### Core Fields

| Field | Description |
|---|---|
| `basics` | Name, title, photo, summary, location, social profiles |
| `work` | Companies, positions, dates, highlights |
| `education` | Institutions, degrees, fields, scores |
| `skills` | Flat array of skill names |
| `languages` | Languages with fluency levels |
| `projects` | Portfolio projects with URLs and keywords |
| `certificates` | Professional certifications |
| `volunteer` | Volunteer experience |

### Extended Fields

| Field | Description |
|---|---|
| `availability` | Job-seeking status, preferred roles, work type, salary range, sponsorship |
| `ats` | Auto-generated ATS metadata: keywords, years of experience, seniority |
| `verification` | Trust signals: email verified, platform source |
| `meta` | Schema version, canonical URL, last modified, generator |

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
    "current": true,
    "highlights": ["Increased developer adoption by 34%"]
  }],

  "skills": ["Product Strategy", "SQL", "Figma"],
  "education": [{ "institution": "Stanford", "degree": "MBA" }],

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

  "verification": { "email": true, "platform": "freecv.org" }
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
X-CV-Version: 1.0
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
