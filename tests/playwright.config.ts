import { defineConfig, devices } from '@playwright/test';

import { appConfig } from './config/environment';

export default defineConfig({
  testDir: './',
  fullyParallel: true,
  forbidOnly: appConfig.isCI,
  retries: appConfig.isCI ? 2 : 1,
  workers: appConfig.isCI ? 2 : undefined,
  timeout: appConfig.globalTimeoutMs,
  expect: {
    timeout: appConfig.expectTimeoutMs,
  },
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: './playwright-report' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],
  outputDir: 'test-results/artifacts',
  use: {
    baseURL: appConfig.baseUrl,
    headless: true,
    actionTimeout: appConfig.actionTimeoutMs,
    navigationTimeout: appConfig.navigationTimeoutMs,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: appConfig.isLocalBaseUrl
    ? {
        command: appConfig.previewCommand,
        url: appConfig.baseUrl,
        reuseExistingServer: !appConfig.isCI,
        timeout: 180_000,
      }
    : undefined,
});
