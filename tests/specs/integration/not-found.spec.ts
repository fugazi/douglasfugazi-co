import { test, expect } from '../../fixtures/test-fixtures';

/**
 * Covers content, navigation, and metadata of the 404 page.
 */
test.describe('404 Not Found page @integration', () => {
  /**
   * Verifies correct rendering when accessing a non-existent route.
   */
  test('@integration navigating to non-existent route shows 404 page', async ({
    page,
    notFoundPage,
  }) => {
    await notFoundPage.gotoNotFound();
    await expect(page).toHaveURL(/this-page-does-not-exist\/?$/);
    await notFoundPage.expectLoaded();
  });

  /**
   * Validates heading hierarchy and guidance message.
   */
  test('@integration 404 page has proper heading and content', async ({ page, notFoundPage }) => {
    await notFoundPage.gotoNotFound();
    await notFoundPage.expectLoaded();

    // Verify the 404 heading
    await expect(notFoundPage.heading).toContainText('404');

    // Verify the sub-heading
    await expect(notFoundPage.subHeading).toContainText('Page Not Found');

    // Verify helpful message is shown
    await expect(page.getByText(/coffee break/i)).toBeVisible();
  });

  /**
   * Checks that the primary CTA redirects correctly to home.
   */
  test('@integration 404 page home button navigates to home', async ({
    page,
    notFoundPage,
    homePage,
  }) => {
    await notFoundPage.gotoNotFound();
    await notFoundPage.expectLoaded();

    // Click home button
    await notFoundPage.clickHomeButton();

    // Should navigate to home
    await expect(page).toHaveURL('/');
    await homePage.expectLoaded();
  });

  /**
   * Verifies that the back button respects browser history.
   */
  test('@integration 404 page back button returns to previous page', async ({
    page,
    notFoundPage,
    homePage,
  }) => {
    // First go to home page
    await homePage.gotoHome();
    await homePage.expectLoaded();

    // Then navigate to 404
    await notFoundPage.gotoNotFound();
    await notFoundPage.expectLoaded();

    // Click back button (uses JavaScript history.back())
    await notFoundPage.clickBackButton();

    // Should return to home page
    await expect(page).toHaveURL('/');
  });

  /**
   * Confirms visibility of essential interactive elements.
   */
  test('@integration 404 page is accessible', async ({ notFoundPage }) => {
    await notFoundPage.gotoNotFound();
    await notFoundPage.expectLoaded();

    // Check for proper 404 heading
    await expect(notFoundPage.heading).toBeVisible();
    await expect(notFoundPage.heading).toContainText('404');

    // Check for sub-heading
    await expect(notFoundPage.subHeading).toBeVisible();

    // Check interactive elements are visible
    await expect(notFoundPage.homeLink).toBeVisible();
    await expect(notFoundPage.backButton).toBeVisible();
  });

  /**
   * Validates expected SEO metadata for not found pages.
   */
  test('@integration 404 page has proper meta tags', async ({ page, notFoundPage }) => {
    await notFoundPage.gotoNotFound();

    // Check for proper robots meta tag (should be noindex)
    const robotsMeta = page.locator('meta[name="robots"]');
    await expect(robotsMeta).toHaveAttribute('content', /noindex|nofollow|noarchive/);

    // Check for proper title
    await expect(page).toHaveTitle(/404|not found/i);
  });
});
