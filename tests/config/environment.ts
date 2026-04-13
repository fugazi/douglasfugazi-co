/**
 * Test environment configuration
 *
 * Default: Run tests against local preview artifact (server auto-started by Playwright)
 * CI:     Also run against local preview artifact by default.
 *         Set E2E_BASE_URL only when intentionally testing a deployed environment.
 *
 * Usage:
 *   pnpm test                    → localhost (auto server)
 *   E2E_BASE_URL=https://site.com pnpm test  → deployed environment
 */

const IS_CI = Boolean(process.env.CI);

// Local development URL
const LOCAL_URL = 'http://127.0.0.1:4321';

// Always validate the current commit artifact by default (local preview server).
// External URLs are opt-in via E2E_BASE_URL.
const baseUrl = process.env.E2E_BASE_URL?.trim() || LOCAL_URL;

const isLocal = baseUrl.includes('127.0.0.1') || baseUrl.includes('localhost');

export const appConfig = {
  // URLs
  baseUrl,
  isLocal,
  isCI: IS_CI,

  // Playwright will auto-start the server for local testing
  previewCommand: 'pnpm build && pnpm preview --host 127.0.0.1 --port 4321',

  // Timeouts (in milliseconds)
  timeout: 90_000, // Global test timeout
  actionTimeout: 15_000, // Click/type actions
  navigationTimeout: 30_000, // Page navigation
  expectTimeout: 10_000, // Assertions
} as const;
