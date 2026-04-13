import { expect, type Locator, type Page } from '@playwright/test';

import { BasePage } from './base.page';

export type Theme = 'light' | 'dark';

export class ThemePage extends BasePage {
  readonly htmlRoot: Locator;
  readonly themeToggleLabel: Locator;
  readonly themeToggleInput: Locator;

  constructor(page: Page) {
    super(page);
    this.htmlRoot = this.page.locator('html');
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
    const isCheckedBefore = await this.themeToggleInput.isChecked();
    await this.themeToggleLabel.click();
    await expect.poll(async () => this.themeToggleInput.isChecked()).toBe(!isCheckedBefore);
  }

  /**
   * Set theme to specific value
   */
  async setTheme(theme: Theme): Promise<void> {
    const currentTheme = await this.getCurrentTheme();
    if (currentTheme !== theme) {
      await this.toggleTheme();
    }
    await this.expectTheme(theme);
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
    const isDarkExpected = theme === 'dark';

    if (isDarkExpected) {
      await expect(this.themeToggleInput).toBeChecked();
    } else {
      await expect(this.themeToggleInput).not.toBeChecked();
    }

    await expect
      .poll(async () => {
        const dataTheme = await this.htmlRoot.getAttribute('data-theme');
        const classAttr = await this.htmlRoot.getAttribute('class');
        const hasDarkClass = classAttr?.split(/\s+/).includes('dark') ?? false;
        return dataTheme === 'dark' || hasDarkClass;
      })
      .toBe(isDarkExpected);
  }

  /**
   * Expect theme persistence after navigation
   */
  async expectThemePersistsAfterNavigation(theme: Theme, path: string): Promise<void> {
    await this.expectTheme(theme);

    await this.page.goto(path);
    await expect(this.themeToggleInput).toBeVisible();
    await this.expectTheme(theme);
  }
}
