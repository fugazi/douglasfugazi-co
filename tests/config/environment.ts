import { URL } from 'node:url';

const DEFAULT_BASE_URL = 'http://127.0.0.1:4321';
const DEFAULT_PREVIEW_COMMAND = 'pnpm build && pnpm preview --host 127.0.0.1 --port 4321';

const parsePositiveNumber = (
  rawValue: string | undefined,
  fallback: number,
  label: string,
): number => {
  if (!rawValue) {
    return fallback;
  }

  const parsedValue = Number(rawValue);
  if (!Number.isFinite(parsedValue) || parsedValue <= 0) {
    throw new Error(`${label} must be a positive number. Received "${rawValue}".`);
  }

  return parsedValue;
};

const normalizeBaseUrl = (input: string): string => {
  const parsedUrl = new URL(input);
  const normalizedPath = parsedUrl.pathname === '/' ? '' : parsedUrl.pathname.replace(/\/$/, '');
  return `${parsedUrl.origin}${normalizedPath}`;
};

const configuredBaseUrl = process.env.E2E_BASE_URL?.trim() || DEFAULT_BASE_URL;
const baseUrl = normalizeBaseUrl(configuredBaseUrl);
const parsedBaseUrl = new URL(baseUrl);

export const appConfig = {
  baseUrl,
  isCI: Boolean(process.env.CI),
  isLocalBaseUrl: ['localhost', '127.0.0.1'].includes(parsedBaseUrl.hostname),
  previewCommand: process.env.E2E_PREVIEW_COMMAND?.trim() || DEFAULT_PREVIEW_COMMAND,
  globalTimeoutMs: parsePositiveNumber(
    process.env.E2E_GLOBAL_TIMEOUT_MS,
    90_000,
    'E2E_GLOBAL_TIMEOUT_MS',
  ),
  expectTimeoutMs: parsePositiveNumber(
    process.env.E2E_EXPECT_TIMEOUT_MS,
    10_000,
    'E2E_EXPECT_TIMEOUT_MS',
  ),
  actionTimeoutMs: parsePositiveNumber(
    process.env.E2E_ACTION_TIMEOUT_MS,
    15_000,
    'E2E_ACTION_TIMEOUT_MS',
  ),
  navigationTimeoutMs: parsePositiveNumber(
    process.env.E2E_NAVIGATION_TIMEOUT_MS,
    30_000,
    'E2E_NAVIGATION_TIMEOUT_MS',
  ),
  authStorageStatePath: process.env.E2E_AUTH_STORAGE_STATE?.trim() || undefined,
} as const;
