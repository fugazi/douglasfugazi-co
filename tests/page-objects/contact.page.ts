import { expect, type Locator, type Page } from '@playwright/test';

import { BasePage } from './base.page';

export class ContactPage extends BasePage {
  readonly pageRoot: Locator;
  readonly heroSection: Locator;
  readonly emailCta: Locator;
  readonly linkedInCta: Locator;
  readonly expectationsSection: Locator;

  constructor(page: Page) {
    super(page);
    this.pageRoot = this.byUi('contact-page');
    this.heroSection = this.byUi('contact-hero');
    this.emailCta = this.byUi('contact-email-cta');
    this.linkedInCta = this.byUi('contact-linkedin-cta');
    this.expectationsSection = this.byUi('contact-expectations');
  }

  async gotoContact(): Promise<void> {
    await this.goto('/contact');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.pageRoot).toBeVisible();
    await expect(this.heroSection).toBeVisible();
    await expect(this.expectationsSection).toBeVisible();
  }

  async expectEmailCtaConfigured(): Promise<void> {
    await expect(this.emailCta).toBeVisible();
    await expect(this.emailCta).toHaveAttribute('href', /^mailto:/);
  }

  async expectLinkedInCtaConfigured(): Promise<void> {
    await expect(this.linkedInCta).toBeVisible();
    await expect(this.linkedInCta).toHaveAttribute('href', /linkedin/i);
  }
}
