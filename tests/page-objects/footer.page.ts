import { expect, type Locator, type Page } from '@playwright/test';

import { BasePage } from './base.page';

export class FooterPage extends BasePage {
  readonly footer: Locator;
  readonly astroLink: Locator;
  readonly playwrightLink: Locator;
  readonly externalLinks: Locator;

  constructor(page: Page) {
    super(page);
    this.footer = this.byUi('site-footer');
    this.astroLink = this.byUi('footer-link-astro');
    this.playwrightLink = this.byUi('footer-link-playwright');
    this.externalLinks = this.footer.locator('a[href^="http"]');
  }

  async expectVisible(): Promise<void> {
    await expect(this.footer).toBeVisible();
  }

  async expectCopyright(brandName: string, year: number): Promise<void> {
    await expect(this.footer).toContainText(year.toString());
    await expect(this.footer).toContainText(brandName);
  }

  async expectLinkConfigured(link: Locator, href: string): Promise<void> {
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', href);
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  }

  async expectExternalLinksOpenInNewTab(): Promise<void> {
    const count = await this.externalLinks.count();

    for (let i = 0; i < count; i += 1) {
      const link = this.externalLinks.nth(i);
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  }
}
