import { test, expect } from '../../fixtures/test-fixtures';

/**
 * Covers talks rendering and media links configuration.
 */
test.describe('Talks page deep coverage @integration', () => {
  /**
   * Verifies years and talk cards are rendered.
   */
  test('@integration talks page lists years and talk cards', async ({ page, talksPage }) => {
    await test.step('Open talks page', async () => {
      await talksPage.gotoTalks();
      await expect(page).toHaveURL(/\/talks\/?$/);
    });

    await test.step('Validate talks layout and content listing', async () => {
      await talksPage.expectLoaded();
      await talksPage.expectTalksListed();
      await expect(talksPage.pageRoot).toBeVisible();
    });
  });

  /**
   * Validates watch/slides links are properly configured.
   */
  test('@integration talks media links are correctly configured', async ({ page, talksPage }) => {
    await test.step('Open talks page', async () => {
      await talksPage.gotoTalks();
      await expect(page).toHaveURL(/\/talks\/?$/);
    });

    await test.step('Validate watch and slides links', async () => {
      await talksPage.expectMediaLinksConfigured();

      const watchCount = await talksPage.watchLinks.count();
      const slidesCount = await talksPage.slidesLinks.count();
      expect(watchCount + slidesCount).toBeGreaterThan(0);
    });
  });
});
