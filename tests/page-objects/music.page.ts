import { expect, type Locator, type Page } from '@playwright/test';

import { BasePage } from './base.page';

export class MusicPage extends BasePage {
  readonly pageRoot: Locator;
  readonly heroSection: Locator;
  readonly embedsSection: Locator;
  readonly monofonicosLink: Locator;
  readonly streamingLinks: Locator;
  readonly spotifyEmbed: Locator;
  readonly bandcampEmbed: Locator;

  constructor(page: Page) {
    super(page);
    this.pageRoot = this.byUi('music-page');
    this.heroSection = this.byUi('music-hero');
    this.embedsSection = this.byUi('music-embeds');
    this.monofonicosLink = this.byUi('music-monofonicos-link');
    this.streamingLinks = this.page.locator('[data-ui^="music-streaming-link-"]');
    this.spotifyEmbed = this.byUi('music-spotify-embed');
    this.bandcampEmbed = this.byUi('music-bandcamp-embed');
  }

  async gotoMusic(): Promise<void> {
    await this.goto('/music');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.pageRoot).toBeVisible();
    await expect(this.heroSection).toBeVisible();
    await expect(this.embedsSection).toBeVisible();
  }

  async expectMonofonicosLinkConfigured(): Promise<void> {
    await expect(this.monofonicosLink).toBeVisible();
    await expect(this.monofonicosLink).toHaveAttribute('href', /monofonicos/i);
    await expect(this.monofonicosLink).toHaveAttribute('target', '_blank');
    await expect(this.monofonicosLink).toHaveAttribute('rel', 'noopener noreferrer');
  }

  async expectStreamingLinksConfigured(): Promise<void> {
    await expect(this.streamingLinks).toHaveCount(7);

    const count = await this.streamingLinks.count();
    for (let i = 0; i < count; i += 1) {
      const link = this.streamingLinks.nth(i);
      await expect(link).toHaveAttribute('href', /^https:\/\//);
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      await expect(link).toHaveAttribute('aria-label', /^Open .+ profile$/);
    }
  }

  async expectEmbedsConfigured(): Promise<void> {
    await expect(this.spotifyEmbed).toBeVisible();
    await expect(this.spotifyEmbed).toHaveAttribute('src', /open\.spotify\.com\/embed\/artist/i);

    await expect(this.bandcampEmbed).toBeVisible();
    await expect(this.bandcampEmbed).toHaveAttribute('src', /bandcamp\.com\/EmbeddedPlayer/i);
  }
}
