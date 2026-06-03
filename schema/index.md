# cv.json Schemas

This directory holds the JSON Schema definitions for the Open CV Standard maintained by FreeCV.org.

## Files

| File | Version | Status | URL |
|---|---|---|---|
| [`v1.json`](./v1.json) | **1.2** | **STABLE** — pinned, production | https://freecv.org/schema/cv/v1.json |
| [`v1.3-preview.json`](./v1.3-preview.json) | **1.3** | **PREVIEW** — draft, may change | https://freecv.org/schema/cv/v1.3-preview.json |

Both schemas use **JSON Schema draft-07**.

## Versioning policy

- **v1.x is forever backward-compatible.** A document valid against v1.2 is also valid against v1.3, v1.4, and any future v1.x. New fields are additive and optional.
- **v1.json never changes shape.** It is pinned at v1.2 and only receives clarifying-description tweaks. Producers that emit `"version": "1.2"` in `meta` will always validate.
- **`-preview` schemas are not stable.** Fields in `v1.3-preview.json` may be renamed, restructured, or removed before v1.3 is promoted to stable. Do not depend on them in production.
- **Promotion path.** When v1.3 is stamped stable, this file will move to `v1.3.json` and `v1.json` will be updated to re-export the same shape under the latest pin. The preview file remains for diffing purposes during the deprecation window.

## What's new in v1.3 (preview)

Additive only. v1.2 documents stay valid.

- **basics:** `pronouns`, `timezone`, and `profiles[].verified`
- **work:** per-role `workType`, `employmentType`, `stack[]`, and structured `metrics[]` for impact statements
- **education:** `courses[]`
- **skills:** accepts both the v1.2 flat string list AND a new structured/categorized form with `level`, `yearsOfExperience`, `keywords[]`
- **languages:** standardized `cefr` level
- **projects:** dedicated `repository` URL
- **certificates:** `expiryDate`, `credentialId`
- **publications:** `doi`, `authors[]`
- **availability:** `salaryExpectation` range
- **aiContext (new section):** prompt hints, `doNotTrain` opt-out, preferred contact channel
- **verification:** optional `signature` block for cryptographic provenance
- **meta:** `license` for reuse rights

## Validation

```bash
node ../validate.js path/to/your-cv.json
```

The validator auto-selects the right schema based on the `meta.version` field of your document.
