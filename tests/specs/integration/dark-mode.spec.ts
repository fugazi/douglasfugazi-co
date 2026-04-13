import { test, expect } from '../../fixtures/test-fixtures';
import { HomePage } from '../../page-objects/home.page';
import { ThemePage } from '../../page-objects/theme.page';

test.describe('Dark mode toggle @integration', () => {
  test('@integration theme toggle is visible on all pages', async ({ page }) => {
    const themePage = new ThemePage(page);
    const homePage = new HomePage(page);

    await homePage.gotoHome();
    await homePage.expectLoaded();
    await themePage.expectToggleVisible();

    // Navigate to different pages and verify toggle is always visible
    const pages = ['/about', '/projects', '/talks', '/music', '/contact'];

    for (const path of pages) {
      await page.goto(path);
      await page.waitForLoadState('domcontentloaded');
      await themePage.expectToggleVisible();
    }
  });

  test('@integration user can toggle between light and dark themes', async ({
    page,
  }) => {
    const themePage = new ThemePage(page);
    const homePage = new HomePage(page);

    await homePage.gotoHome();
    await homePage.expectLoaded();
    await themePage.expectToggleVisible();

    // Toggle theme and verify toggle interaction works
    const isCheckedBefore = await themePage.themeToggleInput.isChecked();
    await themePage.toggleTheme();
    await page.waitForTimeout(500); // Wait for theme transition

    const isCheckedAfter = await themePage.themeToggleInput.isChecked();

    // The checkbox state should change
    expect(isCheckedAfter).not.toBe(isCheckedBefore);
  });

  test('@integration theme toggle is clickable', async ({ page }) => {
    const themePage = new ThemePage(page);
    const homePage = new HomePage(page);

    await homePage.gotoHome();
    await homePage.expectLoaded();

    // Verify the toggle can be clicked
    await themePage.themeToggleLabel.click();
    await page.waitForTimeout(300);

    // Verify it can be clicked again
    await themePage.themeToggleLabel.click();
    await page.waitForTimeout(300);

    // No errors thrown
    await expect(themePage.themeToggleLabel).toBeVisible();
  });

  test('@integration theme toggle has proper ARIA attributes', async ({
    page,
  }) => {
    const themePage = new ThemePage(page);
    const homePage = new HomePage(page);

    await homePage.gotoHome();
    await homePage.expectLoaded();

    // Check for proper ARIA attributes
    await expect(themePage.themeToggleInput).toHaveAttribute('role', 'switch');
    await expect(themePage.themeToggleLabel).toHaveAttribute(
      'aria-label',
      'Toggle color theme',
    );
  });
});
