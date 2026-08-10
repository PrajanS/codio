/**
 * End-to-end check that the hardened headers actually reach the browser.
 *
 * Needs a running server, so it is opt-in:
 *   npm run build && npm start
 *   TEST_BASE_URL=http://localhost:3000 npm test
 * Without TEST_BASE_URL the suite skips instead of failing.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

const BASE_URL = process.env.TEST_BASE_URL;
const opts = { skip: BASE_URL ? false : 'set TEST_BASE_URL to run HTTP header checks' };

test('served response carries the hardened CSP and Permissions-Policy', opts, async () => {
  const res = await fetch(`${BASE_URL}/`);
  const csp = res.headers.get('content-security-policy') ?? '';

  assert.match(csp, /object-src 'none'/);
  assert.match(csp, /base-uri 'self'/);
  assert.match(csp, /frame-ancestors 'self'/);
  assert.ok(res.headers.get('permissions-policy'), 'Permissions-Policy must be served');
});

test('no endpoint returns a wildcard Access-Control-Allow-Origin', opts, async () => {
  // '/' plus a route that does not exist (renders the 404 page) and a static asset.
  for (const path of ['/', '/billing', '/hitagyana-logo.svg']) {
    const res = await fetch(`${BASE_URL}${path}`);
    assert.notEqual(
      res.headers.get('access-control-allow-origin'),
      '*',
      `${path} must not allow a wildcard origin`,
    );
  }
});
