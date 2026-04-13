import { test, expect } from '../../fixtures/test-fixtures';
import { NotFoundPage } from '../../page-objects/not-found.page';
import { HomePage } from '../../page-objects/home.page';

test.describe('404 Not Found page @integration', () => {
  test('@integration navigating to non-existent route shows 404 page', async ({
    page,
  }) => {
    const notFoundPage = new NotFoundPage(page);

    await notFoundPage.gotoNotFound();
    await notFoundPage.expectLoaded();
  });

  test('@integration 404 page has proper heading and content', async ({
    page,
  }) => {
    const notFoundPage = new NotFoundPage(page);

    await notFoundPage.gotoNotFound();
    await notFoundPage.expectLoaded();

    // Verify the 404 heading
    await expect(notFoundPage.heading).toContainText('404');

    // Verify the sub-heading
    await expect(notFoundPage.subHeading).toContainText('Page Not Found');

    // Verify helpful message is shown
    await expect(page.getByText(/coffee break/i)).toBeVisible();
  });

  test('@integration 404 page home button navigates to home', async ({
    page,
  }) => {
    const notFoundPage = new NotFoundPage(page);
    const homePage = new HomePage(page);

    await notFoundPage.gotoNotFound();
    await notFoundPage.expectLoaded();

    // Click home button
    await notFoundPage.clickHomeButton();

    // Should navigate to home
    await expect(page).toHaveURL('/');
    await homePage.expectLoaded();
  });

  test('@integration 404 page back button returns to previous page', async ({
    page,
  }) => {
    const notFoundPage = new NotFoundPage(page);
    const homePage = new HomePage(page);

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

  test('@integration 404 page is accessible', async ({ page }) => {
    const notFoundPage = new NotFoundPage(page);

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

  test('@integration 404 page has proper meta tags', async ({ page }) => {
    const notFoundPage = new NotFoundPage(page);

    await notFoundPage.gotoNotFound();

    // Check for proper robots meta tag (should be noindex)
    const robotsMeta = page.locator('meta[name="robots"]');
    await expect(robotsMeta).toHaveAttribute(
      'content',
      /noindex|nofollow|noarchive/,
    );

    // Check for proper title
    await expect(page).toHaveTitle(/404|not found/i);
  });
});
