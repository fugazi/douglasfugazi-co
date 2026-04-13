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

test.describe('Responsive design @visual', () => {
  for (const viewport of viewports) {
    test.describe(`${viewport.name} (${viewport.width}x${viewport.height})`, () => {
      test.use({ viewport: { width: viewport.width, height: viewport.height } });

      test(`@visual home page renders correctly on ${viewport.name}`, async ({
        page,
      }) => {
        const homePage = new HomePage(page);
        const layoutPage = new LayoutPage(page);

        await homePage.gotoHome();
        await homePage.expectLoaded();
        await layoutPage.expectCoreLayout();
      });

      test(`@visual footer is visible on ${viewport.name}`, async ({ page }) => {
        const homePage = new HomePage(page);

        await homePage.gotoHome();
        await homePage.expectLoaded();

        const footer = page.locator('[data-ui="site-footer"]');
        await expect(footer).toBeVisible();
      });

      if (viewport.isMobile) {
        test(`@visual mobile drawer button is visible on ${viewport.name}`, async ({
          page,
        }) => {
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

test.describe('Mobile-specific interactions @visual', () => {
  test.use({ viewport: { width: 375, height: 667 } });

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
    await page.waitForTimeout(500);

    // Drawer toggle should be checked now
    await expect(drawerToggle).toBeChecked();
    // Drawer side should be visible
    await expect(drawerSide).toBeVisible();
  });
});
