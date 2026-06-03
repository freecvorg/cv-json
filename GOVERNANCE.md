# Governance

This document explains who decides what about the cv.json schema.

## Steward

**FreeCV** (freecv.org) is the steward of the cv.json schema. FreeCV maintains the canonical schema, the reference validator, the documentation site, and this repository.

Stewardship means:

- We host the spec.
- We cut releases.
- We resolve disputes when they arise.
- We do not own the schema content — the MIT license makes the schema free for anyone to use, fork, or redistribute.

## Decision making

### Day-to-day decisions

Made by the maintainer (currently the FreeCV lead). This covers:

- Merging PRs that fix bugs, typos, examples.
- Cutting patch releases.
- Triaging and labeling issues.
- Closing off-topic or duplicate issues.

### Minor version additions (v1.x)

Made by the maintainer, informed by GitHub issues and the contribution process documented in CONTRIBUTING.md. The bar for accepting new fields is documented there: two or more independent implementer requests, a clear use case, and an additive (backward-compatible) shape.

When a proposal is contentious, the maintainer will:

1. Leave the issue open for at least 14 days for discussion.
2. Summarize the arguments on both sides.
3. Make a decision and document the reasoning.

Maintainer decisions on minor additions are final for the release cycle, but proposals can be reopened with new information for a future release.

### Major versions (v2.0+)

Major versions are different. They are allowed to break backward compatibility, so they go through an **RFC process**:

1. A maintainer or contributor opens an RFC issue with the proposed v2 shape.
2. The RFC is announced on the FreeCV blog and at least one community channel.
3. The RFC stays open for public comment for **at least 60 days**.
4. The maintainer summarizes feedback and either accepts, rejects, or revises.
5. Accepted RFCs go into a v2 draft branch with a public timeline.

There is no plan for v2.0 today. v1.x is intended to last several years.

## What if you disagree?

The schema is MIT licensed. If you disagree with a decision and feel strongly enough to do something about it:

- **Fork it.** Take the schema, change what you want, publish your own variant under a different name. We won't be offended.
- **Implement an extension.** Use the reserved `x-*` field prefix in your own documents. These won't conflict with future official fields, and you can ship your own functionality without waiting for us.
- **Make the case publicly.** A well-written blog post arguing for a change has moved more decisions than long issue threads.

What we ask: if you fork, don't call your fork "cv.json compliant" — see NOTICE.md for trademark details. Use a distinct name.

## Conflict of interest

The maintainer is paid by FreeCV. FreeCV operates a commercial product that consumes cv.json. To keep this honest:

- Schema decisions are made in the open on this repo.
- Any change that benefits FreeCV more than other implementers must be flagged in the issue.
- If a maintainer benefits commercially from a decision, that's disclosed in the PR description.

## Transferring stewardship

If FreeCV ever steps back from stewardship, this document will be updated to name a successor. The MIT-licensed schema will remain free regardless.
