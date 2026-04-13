import { smokeRoutes } from '../../config/routes';
import { test, expect } from '../../fixtures/test-fixtures';
import { LayoutPage } from '../../page-objects/layout.page';

/**
 * Ensures each core route renders its marker and base layout.
 */
test.describe('Smoke coverage @smoke', () => {
  for (const route of smokeRoutes) {
    /**
     * Validates minimal route load to catch quick regressions.
     */
    test(`@smoke ${route.name} renders with core layout`, async ({ page }) => {
      const layoutPage = new LayoutPage(page);

      // Navigate to route
      await page.goto(route.path);

      // Verify page loaded and core layout is present
      await expect(page.locator(`[data-ui="${route.marker}"]`)).toBeVisible();
      await layoutPage.expectCoreLayout();
    });
  }
});
