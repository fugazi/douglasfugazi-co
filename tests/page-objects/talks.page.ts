import { expect, type Locator, type Page } from '@playwright/test';

import { BasePage } from './base.page';

export class TalksPage extends BasePage {
  readonly pageRoot: Locator;
  readonly heroSection: Locator;
  readonly yearSections: Locator;
  readonly talkCards: Locator;
  readonly watchLinks: Locator;
  readonly slidesLinks: Locator;

  constructor(page: Page) {
    super(page);
    this.pageRoot = this.byUi('talks-page');
    this.heroSection = this.byUi('talks-hero');
    this.yearSections = this.page.locator('[data-ui^="talks-year-"]');
    this.talkCards = this.page.locator('[data-ui^="talk-card-"]');
    this.watchLinks = this.page.locator('[data-ui^="talk-watch-"]');
    this.slidesLinks = this.page.locator('[data-ui^="talk-slides-"]');
  }

  async gotoTalks(): Promise<void> {
    await this.goto('/talks');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.pageRoot).toBeVisible();
    await expect(this.heroSection).toBeVisible();
  }

  async expectTalksListed(): Promise<void> {
    const yearCount = await this.yearSections.count();
    const cardCount = await this.talkCards.count();

    expect(yearCount).toBeGreaterThan(0);
    expect(cardCount).toBeGreaterThan(0);
  }

  async expectMediaLinksConfigured(): Promise<void> {
    const watchCount = await this.watchLinks.count();
    const slidesCount = await this.slidesLinks.count();

    expect(watchCount + slidesCount).toBeGreaterThan(0);

    for (let i = 0; i < watchCount; i += 1) {
      const link = this.watchLinks.nth(i);
      await expect(link).toHaveAttribute('href', /^https?:\/\//);
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }

    for (let i = 0; i < slidesCount; i += 1) {
      const link = this.slidesLinks.nth(i);
      await expect(link).toHaveAttribute('href', /^https?:\/\//);
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  }
}
