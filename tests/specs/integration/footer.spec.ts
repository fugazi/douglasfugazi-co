import { test, expect } from '../../fixtures/test-fixtures';
import { appRoutes } from '../../config/routes';
import { HomePage } from '../../page-objects/home.page';
import { FooterPage } from '../../page-objects/footer.page';

/**
 * Verifies presence, links, and semantics of the global footer.
 */
test.describe('Footer links @integration', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.gotoHome();
    await homePage.expectLoaded();
  });

  /**
   * Confirms the footer remains visible on all main routes.
   */
  test('@integration footer is visible on all pages', async ({ page }) => {
    const footerPage = new FooterPage(page);

    // Check on home page
    await footerPage.expectVisible();

    // Navigate to other pages and verify footer persists
    const secondaryRoutes = appRoutes.filter((route) => route.path !== '/');

    for (const route of secondaryRoutes) {
      await page.goto(route.path);
      await expect(page.locator(`[data-ui="${route.marker}"]`)).toBeVisible();
      await footerPage.expectVisible();
    }
  });

  /**
   * Validates current year and rendered branding in the footer.
   */
  test('@integration footer contains copyright information', async ({ page }) => {
    const footerPage = new FooterPage(page);

    const currentYear = new Date().getFullYear();
    await footerPage.expectCopyright('Douglas Fugazi', currentYear);
    await expect(footerPage.footer).toBeVisible();
  });

  /**
   * Verifies external link configuration for Astro.
   */
  test('@integration footer Astro link is properly configured', async ({ page }) => {
    const footerPage = new FooterPage(page);

    await footerPage.expectLinkConfigured(footerPage.astroLink, 'https://astro.build/');
    await expect(footerPage.astroLink).toBeVisible();
  });

  /**
   * Verifies external link configuration for Playwright.
   */
  test('@integration footer Playwright link is properly configured', async ({ page }) => {
    const footerPage = new FooterPage(page);

    await footerPage.expectLinkConfigured(footerPage.playwrightLink, 'https://playwright.dev/');
    await expect(footerPage.playwrightLink).toBeVisible();
  });

  /**
   * Ensures external links open safely in a new tab.
   */
  test('@integration footer links open in new tab', async ({ page }) => {
    const footerPage = new FooterPage(page);
    await footerPage.expectExternalLinksOpenInNewTab();
    await expect(footerPage.externalLinks).toHaveCount(2);
  });

  /**
   * Checks for the semantic footer landmark.
   */
  test('@integration footer has proper ARIA attributes', async ({ page }) => {
    const footerPage = new FooterPage(page);

    await footerPage.expectVisible();
    // footer tag is sufficient as a landmark

    // Check for proper landmark
    const landmark = page.locator('footer');
    await expect(landmark).toBeVisible();
  });
});
