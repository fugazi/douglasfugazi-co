import { e2eNavigationRoutes } from '../../config/routes';
import { test, expect } from '../../fixtures/test-fixtures';

/**
 * Builds a URL matcher tolerant to a trailing slash.
 */
const routePattern = (path: string): RegExp => (path === '/' ? /\/$/ : new RegExp(`${path}/?$`));

/**
 * Covers the site's primary navigation journeys.
 */
test.describe('Navigation journeys @e2e', () => {
  /**
   * Verifies sidebar navigation reaches each registered route.
   */
  test('@e2e sidebar navigation reaches each route', async ({ page, homePage, layoutPage }) => {
    await test.step('Open home route', async () => {
      await homePage.gotoHome();
      await homePage.expectLoaded();
    });

    for (const route of e2eNavigationRoutes) {
      await test.step(`Navigate to ${route.name} from sidebar`, async () => {
        await layoutPage.openSidebarRoute(route.navToken);
        await expect(page).toHaveURL(routePattern(route.path));
        await expect(page.locator(`[data-ui="${route.marker}"]`)).toBeVisible();
      });
    }
  });

  /**
   * Verifies home CTAs point to valid destinations.
   */
  test('@e2e home CTA links are configured', async ({ homePage }) => {
    await test.step('Open home route', async () => {
      await homePage.gotoHome();
      await homePage.expectLoaded();
    });

    await test.step('Validate CTA links configuration', async () => {
      await expect(homePage.emailCta).toHaveAttribute('href', /^mailto:/);
      await expect(homePage.linkedInCta).toHaveAttribute('href', /linkedin/i);
    });
  });
});
