import { test, expect } from '../../fixtures/test-fixtures';
import { MusicPage } from '../../page-objects/music.page';

/**
 * Covers structure, links, and embeds on the music page.
 */
test.describe('Music page deep coverage @integration', () => {
  /**
   * Validates loading of key sections and profile reference link.
   */
  test('@integration music page loads with key sections and profile link', async ({ page }) => {
    const musicPage = new MusicPage(page);

    await test.step('Open music page', async () => {
      await musicPage.gotoMusic();
      await expect(page).toHaveURL(/\/music\/?$/);
    });

    await test.step('Validate page shell and profile link', async () => {
      await musicPage.expectLoaded();
      await musicPage.expectMonofonicosLinkConfigured();
      await expect(musicPage.pageRoot).toBeVisible();
    });
  });

  /**
   * Verifies count and configuration of platform links.
   */
  test('@integration music streaming links are correctly configured', async ({ page }) => {
    const musicPage = new MusicPage(page);

    await test.step('Open music page', async () => {
      await musicPage.gotoMusic();
      await expect(page).toHaveURL(/\/music\/?$/);
    });

    await test.step('Validate all streaming links', async () => {
      await musicPage.expectStreamingLinksConfigured();
      await expect(musicPage.streamingLinks).toHaveCount(7);
    });
  });

  /**
   * Confirms presence and source of embedded iframes.
   */
  test('@integration music embeds are present and configured', async ({ page }) => {
    const musicPage = new MusicPage(page);

    await test.step('Open music page', async () => {
      await musicPage.gotoMusic();
      await expect(page).toHaveURL(/\/music\/?$/);
    });

    await test.step('Validate embed iframes', async () => {
      await musicPage.expectEmbedsConfigured();
      await expect(musicPage.spotifyEmbed).toBeVisible();
      await expect(musicPage.bandcampEmbed).toBeVisible();
    });
  });
});
