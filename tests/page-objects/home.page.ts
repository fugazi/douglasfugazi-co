import { expect, type Locator, type Page } from '@playwright/test';

import { BasePage } from './base.page';

export class HomePage extends BasePage {
  readonly heroSection: Locator;
  readonly skillsSection: Locator;
  readonly contactSection: Locator;
  readonly emailCta: Locator;
  readonly linkedInCta: Locator;

  constructor(page: Page) {
    super(page);
    this.heroSection = this.byUi('home-hero-section');
    this.skillsSection = this.byUi('home-core-skills-section');
    this.contactSection = this.byUi('home-cta-section');
    this.emailCta = this.byUi('home-email-cta');
    this.linkedInCta = this.byUi('home-linkedin-cta');
  }

  async gotoHome(): Promise<void> {
    await this.goto('/');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.heroSection).toBeVisible();
    await expect(this.skillsSection).toBeVisible();
    await expect(this.contactSection).toBeVisible();
  }
}
