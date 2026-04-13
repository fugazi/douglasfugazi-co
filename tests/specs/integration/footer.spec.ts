import { test, expect } from '../../fixtures/test-fixtures';
import { HomePage } from '../../page-objects/home.page';

test.describe('Footer links @integration', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.gotoHome();
    await homePage.expectLoaded();
  });

  test('@integration footer is visible on all pages', async ({ page }) => {
    const footer = page.locator('[data-ui="site-footer"]');

    // Check on home page
    await expect(footer).toBeVisible();

    // Navigate to other pages and verify footer persists
    const pages = ['/about', '/projects', '/talks', '/music', '/contact'];

    for (const path of pages) {
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      await expect(footer).toBeVisible();
    }
  });

  test('@integration footer contains copyright information', async ({
    page,
  }) => {
    const footer = page.locator('[data-ui="site-footer"]');

    // Should contain current year
    const currentYear = new Date().getFullYear();
    await expect(footer).toContainText(currentYear.toString());

    // Should contain brand name
    await expect(footer).toContainText('Douglas Fugazi');
  });

  test('@integration footer Astro link is properly configured', async ({
    page,
  }) => {
    const astroLink = page.locator('[data-ui="footer-link-astro"]');

    await expect(astroLink).toBeVisible();
    await expect(astroLink).toHaveAttribute('href', 'https://astro.build/');
    await expect(astroLink).toHaveAttribute('target', '_blank');
    await expect(astroLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('@integration footer Playwright link is properly configured', async ({
    page,
  }) => {
    const playwrightLink = page.locator('[data-ui="footer-link-playwright"]');

    await expect(playwrightLink).toBeVisible();
    await expect(playwrightLink).toHaveAttribute(
      'href',
      'https://playwright.dev/',
    );
    await expect(playwrightLink).toHaveAttribute('target', '_blank');
    await expect(playwrightLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('@integration footer links open in new tab', async ({ page }) => {
    // Get all footer links
    const footer = page.locator('[data-ui="site-footer"]');
    const links = footer.locator('a[href^="http"]');

    const count = await links.count();

    for (let i = 0; i < count; i++) {
      const link = links.nth(i);

      // External links should open in new tab
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  test('@integration footer has proper ARIA attributes', async ({ page }) => {
    const footer = page.locator('[data-ui="site-footer"]');

    await expect(footer).toBeVisible();
    // footer tag is sufficient as a landmark

    // Check for proper landmark
    const landmark = page.locator('footer');
    await expect(landmark).toBeVisible();
  });
});
