import { test, expect } from '../../fixtures/test-fixtures';
import { HomePage } from '../../page-objects/home.page';
import { LayoutPage } from '../../page-objects/layout.page';

type Viewport = {
  name: string;
  width: number;
  height: number;
  isMobile: boolean;
};

const viewports: ReadonlyArray<Viewport> = [
  { name: 'Mobile Small', width: 375, height: 667, isMobile: true },
  { name: 'Mobile Medium', width: 414, height: 896, isMobile: true },
  { name: 'Tablet', width: 768, height: 1024, isMobile: false },
  { name: 'Desktop Small', width: 1024, height: 768, isMobile: false },
  { name: 'Desktop Large', width: 1920, height: 1080, isMobile: false },
];

/**
 * Verifies layout and key elements across viewports.
 */
test.describe('Responsive design @visual', () => {
  for (const viewport of viewports) {
    test.describe(`${viewport.name} (${viewport.width}x${viewport.height})`, () => {
      test.use({ viewport: { width: viewport.width, height: viewport.height } });

      /**
       * Checks home and core layout in the current viewport.
       */
      test(`@visual home page renders correctly on ${viewport.name}`, async ({ page }) => {
        const homePage = new HomePage(page);
        const layoutPage = new LayoutPage(page);

        await homePage.gotoHome();
        await homePage.expectLoaded();
        await layoutPage.expectCoreLayout();
        await expect(homePage.heroSection).toBeVisible();
      });

      /**
       * Ensures footer visibility at each resolution.
       */
      test(`@visual footer is visible on ${viewport.name}`, async ({ page }) => {
        const homePage = new HomePage(page);

        await homePage.gotoHome();
        await homePage.expectLoaded();

        const footer = page.locator('[data-ui="site-footer"]');
        await expect(footer).toBeVisible();
      });

      if (viewport.isMobile) {
        /**
         * Validates drawer button presence on mobile.
         */
        test(`@visual mobile drawer button is visible on ${viewport.name}`, async ({ page }) => {
          const homePage = new HomePage(page);

          await homePage.gotoHome();
          await homePage.expectLoaded();

          const drawerButton = page.locator('[data-ui="drawer-open-button"]');
          await expect(drawerButton).toBeVisible();
        });
      }
    });
  }
});

/**
 * Covers real drawer interaction on mobile.
 */
test.describe('Mobile-specific interactions @visual', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  /**
   * Verifies the drawer opens after user interaction.
   */
  test(`@visual mobile drawer opens correctly`, async ({ page }) => {
    await page.goto('/');

    const drawerButton = page.locator('[data-ui="drawer-open-button"]');
    const drawerSide = page.locator('[data-ui="drawer-side"]');
    const drawerToggle = page.locator('#my-drawer');

    // Initially drawer button should be visible
    await expect(drawerButton).toBeVisible();
    // Drawer toggle should be unchecked initially
    await expect(drawerToggle).not.toBeChecked();

    // Open drawer
    await drawerButton.click();

    // Drawer toggle should be checked now
    await expect(drawerToggle).toBeChecked();
    // Drawer side should be visible
    await expect(drawerSide).toBeVisible();
  });

  /**
   * Verifies the improved mobile header and drawer structure.
   */
  test(`@visual mobile header and drawer show compact profile and close control`, async ({ page }) => {
    await page.goto('/');

    const body = page.locator('body');
    const mobileTopBrand = page.locator('[data-ui="mobile-top-brand"]');
    const drawerButton = page.locator('[data-ui="drawer-open-button"]');
    const drawerToggle = page.locator('#my-drawer');
    const drawerCloseButton = page.locator('[data-ui="drawer-close-button"]');
    const sidebarSocialLinks = page.locator('[data-ui="sidebar-social-links"]');

    await expect(mobileTopBrand).toBeVisible();
    await expect(drawerButton).toBeVisible();
    await expect(drawerButton).toHaveAttribute('aria-controls', 'my-drawer');
    await expect(drawerButton).toHaveAttribute('aria-expanded', 'false');
    await expect(drawerToggle).not.toBeChecked();
    await expect(body).not.toHaveClass(/(^|\s)mobile-drawer-open(\s|$)/);

    await drawerButton.click();

    await expect(drawerToggle).toBeChecked();
    await expect(drawerButton).toHaveAttribute('aria-expanded', 'true');
    await expect(body).toHaveClass(/(^|\s)mobile-drawer-open(\s|$)/);
    await expect(drawerCloseButton).toBeVisible();
    await expect(sidebarSocialLinks).toBeVisible();

    await drawerCloseButton.click();
    await expect(drawerToggle).not.toBeChecked();
    await expect(drawerButton).toHaveAttribute('aria-expanded', 'false');
    await expect(body).not.toHaveClass(/(^|\s)mobile-drawer-open(\s|$)/);
  });
});
