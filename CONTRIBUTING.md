# Contributing to cv.json

Thanks for your interest in improving the cv.json standard. This document explains what we accept, what we don't, and the bar a proposal needs to clear.

## TL;DR

- Typo / clarification / example fix → open a PR.
- New field or new section → open an **issue first** describing the use case. Don't write code yet.
- Process matters here because the schema is consumed by other people's tools. Once a field ships, removing it breaks them.

---

## What we accept

1. **Bug fixes** — schema errors, broken examples, doc typos, validator bugs.
2. **Clarifications** — better field descriptions, more examples, tighter type constraints (as long as they don't reject previously-valid documents).
3. **Additive new fields** — optional fields that solve a real, demonstrated problem.
4. **New sections** — entire new top-level sections, when justified.

## What we don't accept

- Proposals backed by a single use case ("I want this for my own site"). The bar is **two or more independent implementer requests**, documented in the issue thread. Link them.
- Renames of existing fields. Ever. Aliases yes, renames no.
- Removal of fields, even deprecated ones, outside a major version bump.
- Sections that overlap heavily with existing ones (e.g. "another way to express work history"). One canonical shape per concept.
- Fields that encode opinions about formatting, color, layout, or rendering. cv.json is data. Rendering lives in tooling.
- Vendor-specific extensions in the core schema. Use `x-*` prefixed fields in your own documents — those are reserved for implementer extensions and won't conflict with future official fields.

---

## How to propose a new field or section

### Step 1 — Open a GitHub issue

Title format: `Proposal: <field-name> in <section>`

The issue must include:

- **Use case** — what problem does this solve? Be concrete. "Recruiters need X" is not concrete. "ATS vendor Foo currently parses raw text out of `summary` to extract Y; a structured field would let them skip that step" is concrete.
- **At least two implementer requests** — links to issues/discussions/emails from people who would consume this field. Screenshots fine. If you can't show two, the proposal will be closed with a note to come back when you can.
- **Proposed shape** — JSON snippet showing the field's structure and a realistic example value.
- **Alternatives considered** — why doesn't an existing field work? Why not put this in `meta` or in an `x-*` extension?
- **Backward compatibility statement** — confirm the field is optional and doesn't change semantics of existing fields.

### Step 2 — Discussion

A maintainer will label the issue `proposal` and leave it open for **at least 14 days** to gather feedback. Expect questions. Expect pushback. Expect requests to simplify.

If the proposal is rejected, the maintainer will write why. Rejected proposals can be reopened with new information (e.g. more implementer interest later on).

### Step 3 — Open a PR

Once a proposal is accepted (labeled `accepted`), open a PR against `schema/cv-v1.x-draft.json`:

- Update the JSON Schema with the new field.
- Update **at least one example** in `examples/` to demonstrate the field in realistic context. PRs without examples will not be merged.
- Update `docs/principles.md` if the field touches a principle.
- Add a CHANGELOG entry under the next unreleased version.
- Run `node validate.js examples/*.json` and confirm all pass.

### Step 4 — Review

PRs are reviewed within roughly one week. Expect one round of revision.

---

## What good proposals look like

A good proposal:

- Cites two or more existing tools or users who want the field.
- Proposes the smallest possible shape.
- Explains what happens when the field is absent (default behavior).
- Doesn't try to also fix three other things.

A bad proposal:

- "I think it would be nice if cv.json had X."
- "My company uses X internally so the spec should support it."
- "Here's a 400-line schema diff."

---

## Validation

Before submitting:

```bash
node validate.js examples/your-file.json
```

CI will run validation on all examples on every PR.

---

## Code of conduct

Be respectful. We're building something other people will depend on. Unconstructive criticism, spam, and off-topic issues will be closed without discussion.

---

## License

By contributing, you agree that your contributions are licensed under the MIT License (see LICENSE).
