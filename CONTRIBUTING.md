# Contributing to cv.json

Thanks for your interest in improving the cv.json standard.

## How to Propose Changes

### Bug fixes (typos, schema errors)
Open a PR directly.

### New fields or structural changes
1. **Open an Issue first** describing the use case
2. Explain: what problem does this field solve? Who needs it?
3. Include a JSON example showing the proposed structure
4. Wait for discussion before submitting a PR

### Rules for schema changes

- **Backward compatible** — new fields must be optional. Never remove or rename existing fields in a minor version.
- **Minimal** — every field must justify its existence with a real use case.
- **Typed** — every field must have a clear type (string, array, object, number, boolean).
- **Flat where possible** — prefer flat structures over deeply nested objects.

## Validation

Before submitting examples, validate them:

```bash
node validate.js examples/your-file.json
```

## Code of Conduct

Be respectful. We're building something useful. Unconstructive criticism, spam, and off-topic issues will be closed.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
