import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  CONTENT_SECURITY_POLICY,
  PERMISSIONS_POLICY,
  securityHeaders,
} from '../security-headers.mjs';

const header = (name) =>
  securityHeaders.find((h) => h.key.toLowerCase() === name.toLowerCase())?.value;

/* ---------------------------------------------------------------
   Finding 2 — Content Security Policy weakness (object-src missing)
   --------------------------------------------------------------- */

test("CSP sets object-src 'none' to block plugin content", () => {
  assert.match(CONTENT_SECURITY_POLICY, /object-src 'none'/);
});

test('CSP still declares the directives the site depends on', () => {
  assert.match(CONTENT_SECURITY_POLICY, /default-src 'self'/);
  // The contact form posts to Web3Forms from the browser via fetch().
  assert.match(CONTENT_SECURITY_POLICY, /connect-src [^;]*https:\/\/api\.web3forms\.com/);
});

test('CSP hardens the remaining execution boundaries', () => {
  assert.match(CONTENT_SECURITY_POLICY, /base-uri 'self'/);
  assert.match(CONTENT_SECURITY_POLICY, /form-action 'self'/);
  // Clickjacking control; mirrors the X-Frame-Options: SAMEORIGIN header.
  assert.match(CONTENT_SECURITY_POLICY, /frame-ancestors 'self'/);
});

test('CSP is exposed as a real response header', () => {
  assert.equal(header('Content-Security-Policy'), CONTENT_SECURITY_POLICY);
});

/* ---------------------------------------------------------------
   Finding 6 — Permissions-Policy header missing
   --------------------------------------------------------------- */

test('Permissions-Policy is sent', () => {
  assert.ok(header('Permissions-Policy'), 'Permissions-Policy header must be present');
});

test('Permissions-Policy denies unused high-risk capabilities', () => {
  for (const feature of [
    'camera',
    'microphone',
    'geolocation',
    'payment',
    'fullscreen',
    'accelerometer',
    'gyroscope',
    'magnetometer',
    'usb',
  ]) {
    assert.match(
      PERMISSIONS_POLICY,
      new RegExp(`${feature}=\\(\\)`),
      `${feature} must be denied with an empty allowlist`,
    );
  }
});

/* ---------------------------------------------------------------
   Findings 3 & 5 — CORS wildcard origin
   The app must never emit a wildcard Access-Control-Allow-Origin.
   --------------------------------------------------------------- */

test('no wildcard CORS header is configured by the application', () => {
  const acao = header('Access-Control-Allow-Origin');
  assert.equal(acao, undefined, 'app must not set Access-Control-Allow-Origin at all');
  assert.ok(
    !securityHeaders.some((h) => h.value === '*'),
    'no security header may be set to a wildcard',
  );
});

/* ---------------------------------------------------------------
   Regression guard for the pre-existing headers
   --------------------------------------------------------------- */

test('baseline hardening headers are retained', () => {
  assert.equal(header('X-Content-Type-Options'), 'nosniff');
  assert.equal(header('X-Frame-Options'), 'SAMEORIGIN');
  assert.match(header('Strict-Transport-Security') ?? '', /max-age=\d+/);
  assert.ok(header('Referrer-Policy'));
});
