# Design Principles

The cv.json schema is shaped by a small set of principles. When proposals conflict with these, the principles win. When the principles themselves are wrong, we change them deliberately (an RFC; see GOVERNANCE.md), not by accident in a PR.

---

## 1. Backward compatibility is non-negotiable within a major version

Once a field ships in v1.x, it stays. We don't rename it, we don't change its type, we don't change its semantics. Consumers depend on this.

If a field turns out to be poorly named or poorly designed, we can:

- Add a new, better field alongside it.
- Mark the old field as deprecated in documentation.
- Plan removal for the next major version (v2.0+).

We do not remove fields in minor versions. Period.

This is annoying. It means we ship things we'd undo if we could. We accept that as the cost of being a stable target.

---

## 2. Privacy by default

A cv.json document often contains personal information — name, location, employment history, contact details. The schema must make it easy to scope visibility, not punish people for publishing.

Concretely:

- The `privacy` section (v1.3+) lets each section be marked public, authenticated, private, or redacted.
- Sensitive fields (phone, address detail, date of birth) are optional and discouraged in public documents.
- We document privacy-preserving patterns (e.g. publishing a redacted public version and a full authenticated version).
- The schema never requires personally identifying information beyond what's needed to identify the person (name).

We do not collect telemetry from the reference validator. The validator runs locally.

---

## 3. Real verification, not booleans

A `verified: true` boolean is meaningless. Anyone can write it.

Real verification means:

- Naming **who** verified the claim.
- Naming **how** they verified it (method: linkedin, email-domain, DNS TXT, OAuth, W3C VC, etc.).
- Providing a **proof** or **credential** that a third party can independently check.
- Letting consumers decide whether the verifier is trustworthy for their purpose.

The `verification` section (v1.2+) and its v1.3 W3C VC extension exist to make this concrete. See `docs/verification.md`.

We will not add boolean "verified" flags to other sections. Either it's verifiable or it isn't.

---

## 4. Audience scoping is a first-class concern

A single cv.json should be able to serve multiple audiences:

- The public web (light biographical info, no contact details).
- Authenticated recruiters (full work history, contact info, compensation).
- Specific named parties (full document with private notes).

The schema reflects this with the `privacy` section and per-field visibility hints. We resist features that assume one-document-one-audience, because that forces people to maintain multiple copies that drift.

---

## 5. No LLM-training opt-out as a fake control

The `policy.noLLMTraining` field (v1.3+) exists, but we are honest about what it is and isn't:

- It is a **declared preference**, like `robots.txt`. Consumers may honor it. They are not technically prevented from ignoring it.
- It is not a technical access control. If you publish a cv.json publicly, assume it may be scraped.
- We add it because some consumers do honor declared preferences, and a standardized field is better than ad-hoc text in `meta.notes`.

We will not pretend the schema can prevent training. We will provide the field for those who want to express the preference.

---

## 6. Human-authored provenance, honestly disclosed

If an LLM helped write part of a CV, that fact is interesting to recruiters. Some will care; some won't. The schema should let people disclose it.

The `provenance` section (v1.3+) records, per section, whether content was authored by a human, with LLM assistance, or imported from another source. We expect tooling to fill this in honestly. We expect people not to lie. We can't enforce that — but we provide the field so honesty has a place to live.

We will not add fields that try to detect AI-authored content. That's a different problem with different tools.

---

## 7. Data, not rendering

cv.json is structured data. It says nothing about fonts, colors, layout, page breaks, or order of sections in a rendered document.

Proposals that encode rendering decisions are rejected. Rendering belongs in tooling. The same cv.json should produce dramatically different visual CVs in different tools, and that's fine.

The one exception: `meta.profileImage` is a URL to an image. That's data (a pointer to a file), not rendering (how to display it).

---

## 8. Smallest possible shape

Every field is a maintenance burden — for us, for implementers, for consumers. New fields must justify their existence with concrete use cases backed by multiple implementers (see CONTRIBUTING.md).

When two shapes can express the same thing, we pick the simpler one. When a field can live inside an existing structure, we don't make a new top-level section.

Flat beats nested. Optional beats required. Strings beat enums beat objects, unless structure clearly helps consumers.

---

## 9. Interop where possible, divergence where it matters

We deliberately mirror [JSON Resume](https://jsonresume.org/) shapes for sections that overlap (work, education, skills, languages, projects). Adoption is easier when migration is mechanical.

We diverge where JSON Resume doesn't address what we care about — verification, privacy, ATS hints, provenance, policy. We don't apologize for the divergence; we document it.

---

## 10. The spec is a contract, not a wishlist

Every section in the schema should be implementable today, by someone with normal engineering resources, in a normal stack. We avoid speculative features that require infrastructure that doesn't exist.

When a section depends on emerging technology (e.g. W3C Verifiable Credentials), we ship it as optional and additive — never required — so implementers can adopt at their own pace.
