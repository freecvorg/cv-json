# Verifying a cv.json

This document explains how the `verification` section works, what each verification method means, and how a consumer should evaluate verification claims.

## Why verification exists

A cv.json document is just JSON. Anyone can write any claim into it. "Worked at Google 2018-2024" is a string, not a fact.

The `verification` section lets a third party attest that a specific claim in the document is true, by a specific method, at a specific time. Consumers can then decide whether to trust the verifier and the method.

A document with no verification entries is not "invalid" — it's just unverified. Most cv.json documents in the wild will be unverified, and that's fine. Verification is opt-in.

---

## Shape

```json
{
  "verification": [
    {
      "section": "work[0]",
      "claim": "employment",
      "method": "email-domain",
      "verifier": "hr@example.com",
      "verifiedAt": "2026-03-15T10:00:00Z",
      "expiresAt": "2027-03-15T10:00:00Z",
      "proof": {
        "type": "email-receipt",
        "messageId": "<abc123@example.com>"
      }
    }
  ]
}
```

### Fields

- **`section`** (required) — JSON pointer to the section being verified. Examples: `work[0]`, `education[1]`, `basics.email`, `skills[2].name`.
- **`claim`** (required) — short string describing what's being verified. Common values: `employment`, `education`, `email-ownership`, `domain-ownership`, `identity`, `skill-assessment`.
- **`method`** (required) — how the verification was performed. See **Methods** below.
- **`verifier`** (required) — identity of the verifying party. Format depends on method (email address, DID, organization name, etc.).
- **`verifiedAt`** (required) — ISO 8601 timestamp when verification occurred.
- **`expiresAt`** (optional) — when this verification should no longer be trusted. Absent = no expiry.
- **`proof`** (optional but recommended) — method-specific evidence a consumer can independently check. Shape varies by method.
- **`credential`** (v1.3+, optional) — embedded W3C Verifiable Credential. Used with methods `vc-jwt` and `vc-ld`. See **W3C VC** below.

---

## Methods

### `linkedin`

The verifier confirms via LinkedIn that the cv.json subject is who they claim to be and that a specific claim (typically employment) is reflected on their LinkedIn profile.

- `verifier` — LinkedIn profile URL of the verifier (usually the subject themselves, in OAuth flows).
- `proof.linkedinId` — the LinkedIn member ID confirmed.
- Trust model: as strong as LinkedIn's account verification. Useful for "this profile is owned by the same person".

### `email-domain`

A representative of the company at the claimed domain has confirmed the employment or affiliation, typically by sending a signed receipt or replying to a verification request.

- `verifier` — email address at the domain (e.g. `hr@acme.com`).
- `proof.messageId` — Message-ID of the confirming email.
- `proof.dkimDomain` — the domain that signed the confirming email (for DKIM validation).
- Trust model: as strong as the consumer's confidence that the verifier email represents the org.

### `email-ownership`

The subject demonstrated control of an email address by responding to a verification message.

- `verifier` — the email address verified.
- `proof.nonce` — the challenge string the subject returned.
- Trust model: proves email control at `verifiedAt`. Says nothing about anything else.

### `pgp`

The subject signed a canonical form of the section (or document hash) with a PGP key.

- `verifier` — PGP key fingerprint.
- `proof.signature` — ASCII-armored signature.
- `proof.signedHash` — hash that was signed.
- Trust model: proves the holder of the private key signed the content. Consumer must independently establish that the key belongs to the claimed person.

### `dns-txt`

The subject controls a domain and has published a TXT record linking the domain to the cv.json document or to a key.

- `verifier` — the domain name.
- `proof.txtRecord` — the TXT record value.
- `proof.lookupAt` — when the record was last confirmed.
- Trust model: proves domain control. Useful for personal-domain CVs (`alice.dev`).

### `oauth`

The subject completed an OAuth flow with an identity provider (Google, GitHub, Microsoft, etc.) and the provider's identity is recorded.

- `verifier` — provider name (e.g. `github`).
- `proof.subject` — the OAuth `sub` claim returned.
- `proof.issuer` — the OAuth issuer URL.
- Trust model: as strong as the underlying provider's identity assurance for the claimed `sub`.

### `vc-jwt` (v1.3+)

The verification is backed by a W3C Verifiable Credential serialized as a JWT.

- `verifier` — issuer DID (e.g. `did:web:example.com`).
- `credential` — the JWT string.
- Trust model: cryptographically verifiable per [W3C VC spec](https://www.w3.org/TR/vc-data-model-2.0/). Consumer resolves the issuer DID, fetches the verification method, and validates the JWT signature.

### `vc-ld` (v1.3+)

Same as `vc-jwt` but the credential is a JSON-LD Verifiable Credential with an embedded proof.

- `verifier` — issuer DID.
- `credential` — the JSON-LD document.
- Trust model: same as `vc-jwt`. Choice between JWT and JSON-LD is implementation preference.

---

## W3C Verifiable Credentials (v1.3+)

cv.json v1.3 introduces optional support for [W3C Verifiable Credentials (VC) Data Model 2.0](https://www.w3.org/TR/vc-data-model-2.0/).

A VC-backed verification entry embeds (or links) a credential issued by some authority. Example:

```json
{
  "section": "education[0]",
  "claim": "degree",
  "method": "vc-ld",
  "verifier": "did:web:mit.edu",
  "verifiedAt": "2026-05-01T00:00:00Z",
  "credential": {
    "@context": ["https://www.w3.org/ns/credentials/v2"],
    "type": ["VerifiableCredential", "DegreeCredential"],
    "issuer": "did:web:mit.edu",
    "credentialSubject": {
      "id": "did:web:alice.dev",
      "degree": {
        "type": "BachelorDegree",
        "name": "B.S. Computer Science"
      }
    },
    "proof": { "...": "..." }
  }
}
```

A consumer that trusts `did:web:mit.edu` for educational credentials can validate the embedded proof and treat the claim as verified. A consumer that does not trust the issuer is free to ignore it.

We chose W3C VC because it's the standard with the most institutional adoption (universities, governments) and tooling. We do not commit to other credential formats unless a similar level of adoption appears.

---

## How a consumer should evaluate verification

1. **Parse the document.** If the `verification` array is empty or missing, treat all claims as unverified.
2. **For each verification entry:**
   - Check `verifiedAt` is not in the future and `expiresAt` is not in the past.
   - Confirm the `section` path resolves to an actual section in the document.
   - Look up the `method`. If unknown, skip the entry.
   - Validate the `proof` per the method's rules.
   - Decide whether you trust the `verifier` for this `claim`. This is your policy, not the schema's.
3. **Surface verification status per section** in your UI. Don't aggregate to a single "verified" badge; that hides which claims are backed and by whom.

Verification claims that fail validation should be displayed differently from claims that aren't verified at all. A failed proof is more suspicious than no proof.

---

## What verification does not do

- It does not make claims more truthful. It records that someone said they're true.
- It does not establish the verifier's authority. A consumer must decide who they trust.
- It does not protect against a verifier and subject colluding to lie. The system assumes the verifier is independent.

Use verification as a signal, not a decision.

---

## Implementer notes

- Never silently strip or rewrite the `verification` section when transforming a cv.json document. If you modify the underlying section, the verification entry becomes stale and consumers need to see that.
- When generating a new verification entry, sign the canonical form of the section being verified, not the whole document. This lets the rest of the document evolve without invalidating the proof.
- Cache external lookups (DID resolution, DNS TXT, OAuth verification) but respect TTLs.
