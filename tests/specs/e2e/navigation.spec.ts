import { e2eNavigationRoutes } from '../../config/routes';
import { test, expect } from '../../fixtures/test-fixtures';
import { HomePage } from '../../page-objects/home.page';
import { LayoutPage } from '../../page-objects/layout.page';

const routePattern = (path: string): RegExp => (path === '/' ? /\/$/ : new RegExp(`${path}/?$`));

test.describe('Navigation journeys @e2e', () => {
  test('@e2e sidebar navigation reaches each route', async ({ page }) => {
    const homePage = new HomePage(page);
    const layoutPage = new LayoutPage(page);

    await homePage.gotoHome();
    await homePage.expectLoaded();

    for (const route of e2eNavigationRoutes) {
      await layoutPage.openSidebarRoute(route.navToken);
      await expect(page).toHaveURL(routePattern(route.path));
      await expect(page.locator(`[data-ui="${route.marker}"]`)).toBeVisible();
    }
  });

  test('@e2e home CTA links are configured', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.gotoHome();
    await homePage.expectLoaded();

    await expect(homePage.emailCta).toHaveAttribute('href', /^mailto:/);
    await expect(homePage.linkedInCta).toHaveAttribute('href', /linkedin/i);
  });
});
