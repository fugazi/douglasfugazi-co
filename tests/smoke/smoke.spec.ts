import { smokeRoutes } from '../config/routes';
import { test, expect } from '../fixtures/test-fixtures';
import { LayoutPage } from '../page-objects/layout.page';
import { visitAndAssertRoute } from '../utils/navigation';

test.describe('Smoke coverage @smoke', () => {
  for (const route of smokeRoutes) {
    test(`@smoke ${route.name} renders with core layout`, async ({ page }) => {
      const layoutPage = new LayoutPage(page);

      await visitAndAssertRoute(page, route);
      await layoutPage.expectCoreLayout();
      await expect(page.locator(`[data-ui="${route.marker}"]`)).toBeVisible();
    });
  }
});
