/**
 * Test environment configuration
 *
 * Default: Run tests on localhost (server auto-started by Playwright)
 * CI:     Run tests on production URL (set E2E_BASE_URL env var)
 *
 * Usage:
 *   pnpm test                    → localhost (auto server)
 *   E2E_BASE_URL=https://site.com pnpm test  → production
 */

const IS_CI = Boolean(process.env.CI);

// Production URL for CI/CD
const PRODUCTION_URL = 'https://www.douglasfugazi.co';

// Local development URL
const LOCAL_URL = 'http://127.0.0.1:4321';

// Determine which URL to use
const baseUrl = IS_CI
  ? PRODUCTION_URL
  : (process.env.E2E_BASE_URL?.trim() || LOCAL_URL);

const isLocal = baseUrl.includes('127.0.0.1') || baseUrl.includes('localhost');

export const appConfig = {
  // URLs
  baseUrl,
  isLocal,
  isCI: IS_CI,

  // Playwright will auto-start the server for local testing
  previewCommand: 'pnpm build && pnpm preview --host 127.0.0.1 --port 4321',

  // Timeouts (in milliseconds)
  timeout: 90_000,      // Global test timeout
  actionTimeout: 15_000,  // Click/type actions
  navigationTimeout: 30_000, // Page navigation
  expectTimeout: 10_000,    // Assertions
} as const;
