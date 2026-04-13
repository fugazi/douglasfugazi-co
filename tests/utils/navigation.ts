import { expect, type Page } from '@playwright/test';

import type { RouteDefinition } from '../config/routes';

export async function visitAndAssertRoute(page: Page, route: RouteDefinition): Promise<void> {
  await page.goto(route.path);
  await expect(page.locator(`[data-ui="${route.marker}"]`)).toBeVisible();
}
