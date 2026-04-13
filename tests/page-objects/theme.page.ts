import { expect, type Locator, type Page } from '@playwright/test';

import { BasePage } from './base.page';

export type Theme = 'light' | 'dark';

export class ThemePage extends BasePage {
  readonly themeToggleLabel: Locator;
  readonly themeToggleInput: Locator;

  constructor(page: Page) {
    super(page);
    this.themeToggleLabel = this.byUi('theme-toggle-label');
    this.themeToggleInput = this.byUi('theme-toggle');
  }

  /**
   * Get the current theme from the checkbox state
   * Note: This assumes the checkbox value matches dark theme state
   */
  async getCurrentTheme(): Promise<Theme> {
    const isChecked = await this.themeToggleInput.isChecked();
    return isChecked ? 'dark' : 'light';
  }

  /**
   * Toggle the theme (light <-> dark)
   */
  async toggleTheme(): Promise<void> {
    await this.themeToggleLabel.click();
    // Wait for theme transition
    await this.page.waitForTimeout(300);
  }

  /**
   * Set theme to specific value
   */
  async setTheme(theme: Theme): Promise<void> {
    const currentTheme = await this.getCurrentTheme();
    if (currentTheme !== theme) {
      await this.toggleTheme();
    }
  }

  /**
   * Expect the theme toggle to be visible
   */
  async expectToggleVisible(): Promise<void> {
    await expect(this.themeToggleLabel).toBeVisible();
  }

  /**
   * Expect the page to have the specified theme
   * This checks the HTML class or data attribute
   */
  async expectTheme(theme: Theme): Promise<void> {
    const html = this.page.locator('html');

    if (theme === 'dark') {
      // Check for common dark theme indicators
      const hasDarkClass = await html.evaluate((el) =>
        el.classList.contains('dark'),
      );
      const hasDarkData =
        (await html.getAttribute('data-theme')) === 'dark';

      // At least one should be true for dark theme
      const isDark = hasDarkClass || hasDarkData;
      expect(isDark).toBeTruthy();
    } else {
      // For light theme, expect not dark
      const hasDarkClass = await html.evaluate((el) =>
        el.classList.contains('dark'),
      );
      const hasDarkData =
        (await html.getAttribute('data-theme')) === 'dark';

      const isDark = hasDarkClass || hasDarkData;
      expect(isDark).toBeFalsy();
    }
  }

  /**
   * Expect theme persistence after navigation
   */
  async expectThemePersistsAfterNavigation(
    theme: Theme,
    path: string,
  ): Promise<void> {
    const currentTheme = await this.getCurrentTheme();
    expect(currentTheme).toBe(theme);

    await this.page.goto(path);
    await this.page.waitForLoadState('networkidle');

    const newTheme = await this.getCurrentTheme();
    expect(newTheme).toBe(theme);
  }
}
