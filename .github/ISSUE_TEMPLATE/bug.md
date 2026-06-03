---
name: Bug report
about: Report a bug in the schema, examples, validator, or docs
title: "[Bug] <short description>"
labels: bug
assignees: ''
---

## What happened

A clear description of the bug.

## What you expected

What you expected to happen instead.

## Reproduction

Minimal steps to reproduce. If it's a schema/validation bug, please include:

```json
{
  "your": "minimal cv.json snippet"
}
```

And the command + output:

```
$ ajv validate -s schema/v1.3-preview.json -d your-file.json
<paste output>
```

## Environment

- Schema version: (e.g. `v1.3-preview`, `v1.0`)
- Validator + version: (e.g. `ajv-cli 5.0.0`)
- Node version (if relevant):
- OS:

## Additional context

Logs, screenshots, links to affected URLs, etc.
