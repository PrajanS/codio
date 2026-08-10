# Security notes — codio.co.in

Response security headers live in [`security-headers.mjs`](./security-headers.mjs) (imported by
`next.config.ts`) and are covered by `npm test`.

The items below **cannot be fixed in this repository** — they are DNS-zone or hosting-platform
settings. They are recorded here so the required values are not lost.

---

## 1. DMARC record missing (high)

`codio.co.in` publishes MX records but no DMARC policy, so receivers have no instruction for
handling spoofed mail claiming to be from the domain.

Add this TXT record at the DNS provider:

| Field | Value |
|---|---|
| Name / host | `_dmarc` (i.e. `_dmarc.codio.co.in`) |
| Type | `TXT` |
| Value | `v=DMARC1; p=none; rua=mailto:dmarc@codio.co.in; ruf=mailto:dmarc@codio.co.in; fo=1; adkim=s; aspf=s; pct=100` |

Rollout, in order:

1. **Monitor** — publish with `p=none` (above) and collect aggregate reports for 2–4 weeks.
2. **Verify** SPF and DKIM pass for every legitimate sender (mailbox provider, and any
   transactional/marketing sender). Note: the contact form sends through Web3Forms, which
   delivers from its own domain, so it does not need to pass DMARC for `codio.co.in`.
3. **Enforce** — move to `p=quarantine; pct=25`, raise to `pct=100`, then `p=reject`.
4. **Retest** after propagation: `dig +short TXT _dmarc.codio.co.in`, and confirm aggregate
   reports are arriving at the `rua` mailbox.

Confirm SPF and DKIM exist before enforcing, or legitimate mail will start failing:

```
dig +short TXT codio.co.in        # expect a v=spf1 record
dig +short TXT _dmarc.codio.co.in # expect the record above
```

## 2. DNSSEC not enabled (medium)

No DS or DNSKEY records are published for `codio.co.in`, so resolvers cannot detect forged
answers for the zone.

1. Enable DNSSEC signing in the authoritative DNS provider's dashboard.
2. Copy the generated DS record to the **registrar** for `codio.co.in` (the DS must sit in the
   parent `.co.in` zone — signing alone does nothing until the DS is published).
3. Retest after propagation:

```
dig +short DS codio.co.in
dig +short DNSKEY codio.co.in
dig +dnssec codio.co.in | grep -i ad   # expect the AD (authenticated data) flag
```

Changing DNS providers later requires an unsign/re-sign cycle, or the zone will fail validation.

## 3. Administrative subdomain — `admin-codio.codio.co.in` (review)

This host is **not part of this codebase**: there is no `admin` route, no authentication layer,
and no server-side session handling in this repository. It resolves from the DNS zone to
something managed elsewhere.

Actions for whoever owns that host:

- Confirm what it serves and whether it is still needed.
- If unused, delete the DNS record — an unused admin hostname is free attack surface.
- If used, require authentication (SSO or strong credentials plus MFA), restrict by IP or
  VPN where practical, ensure HTTPS, and keep it out of search indexes.

## 4. CORS wildcard reports — `/billing`, `/_not-found`

Assessed and **not reproducible in application code**:

- There is no `/billing` route in this app. That path renders the standard 404 page.
- This application never sets an `Access-Control-Allow-Origin` header. There is no middleware,
  no route handler, and no CORS configuration; verified against a production build:

```
curl -sI https://codio.co.in/            | grep -i access-control   # no output
curl -sI https://codio.co.in/billing     | grep -i access-control   # no output
```

Any wildcard `Access-Control-Allow-Origin` observed in production is therefore emitted by the
hosting/CDN edge (Vercel adds it to static assets under `/_next/static/*`, which are public,
immutable, versioned build artifacts — no credentials or user data are exposed by that).

Because the app sends no CORS header, there is nothing to restrict here. `tests/` asserts that
the application never introduces a wildcard origin, so a future regression would fail the suite.
If the header must be removed from static assets as well, that is a hosting-layer change
(`vercel.json` / CDN config), not an application change.
