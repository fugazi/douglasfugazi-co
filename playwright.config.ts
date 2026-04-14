import { defineConfig, devices } from '@playwright/test';

import { appConfig } from './tests/config/environment';

export default defineConfig({
  testDir: './tests/specs',
  fullyParallel: true,
  forbidOnly: appConfig.isCI,
  retries: appConfig.isCI ? 2 : 1,
  workers: appConfig.isCI ? 2 : undefined,
  timeout: appConfig.timeout,
  expect: {
    timeout: appConfig.expectTimeout,
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
    actionTimeout: appConfig.actionTimeout,
    navigationTimeout: appConfig.navigationTimeout,
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
  webServer: appConfig.isLocal
    ? {
        command: appConfig.previewCommand,
        url: appConfig.baseUrl,
        reuseExistingServer: !appConfig.isCI,
        timeout: 180_000,
      }
    : undefined,
});
