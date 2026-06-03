---
name: Schema field proposal
about: Propose a new field or change to the cv.json schema
title: "[Schema] <short description>"
labels: schema-proposal
assignees: ''
---

## Use case

> A field is only added to cv.json if **two or more independent implementers** want it. Please describe the concrete use case, and link to the second implementer (issue, repo, or public statement of intent).

- Implementer 1 (you):
- Implementer 2 (link required):
- What problem does this field solve that existing fields can't?

## Proposed field name

- Field path (e.g. `basics.pronouns`, `work[].remote`):
- Naming rationale (why this name vs alternatives):

## Schema shape

```json
{
  "fieldName": "example value"
}
```

JSON Schema fragment:

```json
{
  "type": "...",
  "description": "..."
}
```

## Backward compatibility check

- [ ] Field is **optional** (does not break existing consumers)
- [ ] Does not rename or remove any existing field
- [ ] Does not change the type of any existing field
- [ ] Existing `examples/*.json` still validate against the proposed schema

If any of the above are unchecked, explain the migration path:

## Privacy implications

- Does this field encourage publishing PII that isn't already in cv.json today? (yes / no)
- If yes, what's the justification, and should it be marked as sensitive in the docs?
- Could this field be used for fingerprinting or de-anonymization?

## Prior art

- jsonresume.org equivalent (if any):
- Schema.org / hresume equivalent (if any):
- Other portfolio/CV formats:
