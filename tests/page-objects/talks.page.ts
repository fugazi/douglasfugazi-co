import { expect, type Page } from '@playwright/test';

import { BasePage } from './base.page';

export class TalksPage extends BasePage {
  readonly pageRoot: Locator;
  readonly heroSection: Locator;

  constructor(page: Page) {
    super(page);
    this.pageRoot = this.byUi('talks-page');
    this.heroSection = this.byUi('talks-hero');
  }

  async gotoTalks(): Promise<void> {
    await this.goto('/talks');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.pageRoot).toBeVisible();
    await expect(this.heroSection).toBeVisible();
  }
}
