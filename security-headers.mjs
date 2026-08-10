/**
 * Single source of truth for the response security headers.
 *
 * Kept as plain ESM (not .ts) so `next.config.ts` and the Node test runner can
 * both import it without a TypeScript loader. Types live in
 * `security-headers.d.mts`.
 */

/**
 * Content-Security-Policy directives.
 *
 * `object-src 'none'` blocks <object>/<embed>/<applet> plugin content, which is
 * never used here and is a classic CSP bypass vector.
 * `base-uri 'self'` stops an injected <base> tag from re-pointing relative URLs.
 * `frame-ancestors 'self'` is the CSP equivalent of the X-Frame-Options
 * SAMEORIGIN header we also send (modern browsers prefer this one).
 * `form-action 'self'` limits where <form> submissions can be sent; the contact
 * form posts to Web3Forms via fetch(), which is governed by connect-src.
 */
export const CSP_DIRECTIVES = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://api.web3forms.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
];

export const CONTENT_SECURITY_POLICY = `${CSP_DIRECTIVES.join('; ')};`;

/**
 * Browser capabilities this marketing site never uses. Denying them with an
 * empty allowlist `()` means no origin (including our own) can invoke them.
 */
export const PERMISSIONS_POLICY = [
  'accelerometer=()',
  'autoplay=()',
  'camera=()',
  'display-capture=()',
  'encrypted-media=()',
  'fullscreen=()',
  'geolocation=()',
  'gyroscope=()',
  'magnetometer=()',
  'microphone=()',
  'midi=()',
  'payment=()',
  'usb=()',
  'xr-spatial-tracking=()',
].join(', ');

/** Headers applied to every response. */
export const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
  { key: 'Content-Security-Policy', value: CONTENT_SECURITY_POLICY },
  { key: 'Permissions-Policy', value: PERMISSIONS_POLICY },
];
