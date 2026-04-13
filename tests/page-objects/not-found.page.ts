import { expect, type Locator, type Page } from '@playwright/test';

import { BasePage } from './base.page';

export class NotFoundPage extends BasePage {
  readonly pageRoot: Locator;
  readonly heading: Locator;
  readonly subHeading: Locator;
  readonly homeLink: Locator;
  readonly backButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageRoot = this.byUi('not-found-page');
    this.heading = this.page.getByRole('heading', { level: 1 }).filter({
      hasText: '404',
    });
    this.subHeading = this.page.getByRole('heading', { level: 2 });
    this.homeLink = this.byUi('not-found-home-link');
    this.backButton = this.byUi('not-found-back-button');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.pageRoot).toBeVisible();
    await expect(this.heading).toContainText('404');
    await expect(this.subHeading).toContainText('Page Not Found');
    await expect(this.homeLink).toBeVisible();
    await expect(this.backButton).toBeVisible();
  }

  /**
   * Navigate to a non-existent route to trigger 404
   */
  async gotoNotFound(): Promise<void> {
    await this.goto('/this-page-does-not-exist');
  }

  /**
   * Click the home button and expect navigation to home
   */
  async clickHomeButton(): Promise<void> {
    await this.homeLink.click();
  }

  /**
   * Click the back button
   * Note: This uses JavaScript history.back()
   */
  async clickBackButton(): Promise<void> {
    await this.backButton.click();
  }
}
