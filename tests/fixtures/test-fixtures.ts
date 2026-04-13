import { test as base, expect } from '@playwright/test';

type TestFixtures = {
  env: {
    baseUrl: string;
  };
};

export const test = base.extend<TestFixtures>({
  env: async ({}, use) => {
    const { appConfig } = await import('../config/environment');
    await use({
      baseUrl: appConfig.baseUrl,
    });
  },
});

export { expect };
