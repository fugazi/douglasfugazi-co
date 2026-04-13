import { expect, type Locator, type Page } from '@playwright/test';

import { BasePage } from './base.page';

export class AboutPage extends BasePage {
  readonly pageRoot: Locator;
  readonly overviewSection: Locator;
  readonly highlightsSection: Locator;
  readonly expertiseSection: Locator;
  readonly certificationsSection: Locator;
  readonly ctaSection: Locator;
  readonly emailCta: Locator;
  readonly linkedInCta: Locator;

  constructor(page: Page) {
    super(page);
    this.pageRoot = this.byUi('about-page');
    this.overviewSection = this.byUi('about-overview');
    this.highlightsSection = this.byUi('about-highlights');
    this.expertiseSection = this.byUi('about-expertise');
    this.certificationsSection = this.byUi('about-certifications');
    this.ctaSection = this.byUi('about-cta');
    this.emailCta = this.byUi('about-email-cta');
    this.linkedInCta = this.byUi('about-linkedin-cta');
  }

  async gotoAbout(): Promise<void> {
    await this.goto('/about');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.pageRoot).toBeVisible();
    await expect(this.overviewSection).toBeVisible();
    await expect(this.highlightsSection).toBeVisible();
    await expect(this.expertiseSection).toBeVisible();
    await expect(this.certificationsSection).toBeVisible();
    await expect(this.ctaSection).toBeVisible();
  }

  async expectEmailCtaConfigured(): Promise<void> {
    await expect(this.emailCta).toHaveAttribute('href', /^mailto:/);
  }

  async expectLinkedInCtaConfigured(): Promise<void> {
    await expect(this.linkedInCta).toHaveAttribute('href', /linkedin/i);
  }
}
