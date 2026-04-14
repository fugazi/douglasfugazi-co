import { test, expect } from '../../fixtures/test-fixtures';

/**
 * Validates functional and accessible behavior of the theme toggle.
 */
test.describe('Dark mode toggle @integration', () => {
  /**
   * Confirms the toggle is available on all key pages.
   */
  test('@integration theme toggle is visible on all pages', async ({
    page,
    homePage,
    themePage,
  }) => {
    await test.step('Open home and validate theme toggle', async () => {
      await homePage.gotoHome();
      await homePage.expectLoaded();
      await themePage.expectToggleVisible();
    });

    // Navigate to different pages and verify toggle is always visible
    const pages = ['/about', '/projects', '/talks', '/music', '/contact'];

    for (const path of pages) {
      await test.step(`Validate toggle visibility on ${path}`, async () => {
        await page.goto(path);
        await themePage.expectToggleVisible();
      });
    }

    await expect(themePage.themeToggleLabel).toBeVisible();
  });

  /**
   * Verifies that theme state changes after interaction.
   */
  test('@integration user can toggle between light and dark themes', async ({
    homePage,
    themePage,
  }) => {
    await test.step('Open home and capture current state', async () => {
      await homePage.gotoHome();
      await homePage.expectLoaded();
      await themePage.expectToggleVisible();
    });

    const isCheckedBefore = await themePage.themeToggleInput.isChecked();

    await test.step('Toggle theme and verify state changed', async () => {
      await themePage.toggleTheme();
      await expect.poll(async () => themePage.themeToggleInput.isChecked()).toBe(!isCheckedBefore);
    });
  });

  /**
   * Checks that the toggle can be switched on and off.
   */
  test('@integration theme toggle is clickable', async ({ homePage, themePage }) => {
    await test.step('Open home page', async () => {
      await homePage.gotoHome();
      await homePage.expectLoaded();
      await themePage.expectToggleVisible();
    });

    const initialState = await themePage.themeToggleInput.isChecked();

    await test.step('Toggle once and verify state changed', async () => {
      await themePage.toggleTheme();
      await expect.poll(async () => themePage.themeToggleInput.isChecked()).toBe(!initialState);
    });

    await test.step('Toggle again and verify state restored', async () => {
      await themePage.toggleTheme();
      await expect.poll(async () => themePage.themeToggleInput.isChecked()).toBe(initialState);
    });
  });

  /**
   * Validates essential ARIA attributes of the theme control.
   */
  test('@integration theme toggle has proper ARIA attributes', async ({ homePage, themePage }) => {
    await test.step('Open home page', async () => {
      await homePage.gotoHome();
      await homePage.expectLoaded();
    });

    await test.step('Validate ARIA attributes', async () => {
      await expect(themePage.themeToggleInput).toHaveAttribute('role', 'switch');
      await expect(themePage.themeToggleLabel).toHaveAttribute('aria-label', 'Toggle color theme');
    });
  });
});
