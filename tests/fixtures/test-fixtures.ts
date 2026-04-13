import { test as base, expect, type BrowserContext, type Page } from '@playwright/test';

import { appConfig } from '../config/environment';
import { testData } from '../config/test-data';

type AuthSession = {
  isConfigured: boolean;
  storageStatePath?: string;
};

type TestFixtures = {
  env: typeof appConfig;
  data: typeof testData;
  authSession: AuthSession;
  authenticatedContext: BrowserContext;
  authenticatedPage: Page;
};

export const test = base.extend<TestFixtures>({
  env: async ({}, use) => {
    await use(appConfig);
  },
  data: async ({}, use) => {
    await use(testData);
  },
  authSession: async ({}, use) => {
    await use({
      isConfigured: Boolean(appConfig.authStorageStatePath),
      storageStatePath: appConfig.authStorageStatePath,
    });
  },
  authenticatedContext: async ({ browser, authSession }, use) => {
    if (!authSession.storageStatePath) {
      throw new Error(
        'E2E_AUTH_STORAGE_STATE must be configured before using authenticated fixtures.',
      );
    }

    const context = await browser.newContext({
      storageState: authSession.storageStatePath,
    });
    await use(context);
    await context.close();
  },
  authenticatedPage: async ({ authenticatedContext }, use) => {
    const page = await authenticatedContext.newPage();
    await use(page);
    await page.close();
  },
});

export { expect };
