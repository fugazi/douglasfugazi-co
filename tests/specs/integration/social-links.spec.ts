import { test, expect } from '../../fixtures/test-fixtures';
import { HomePage } from '../../page-objects/home.page';
import { AboutPage } from '../../page-objects/about.page';
import { ContactPage } from '../../page-objects/contact.page';

/**
 * Validates availability and format of social links on key pages.
 */
test.describe('Social icons links @integration', () => {
  /**
   * Checks social CTAs visible on home.
   */
  test('@integration social icons are present on home page', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.gotoHome();
    await homePage.expectLoaded();

    // Home page has email and LinkedIn CTAs
    await homePage.expectEmailCtaConfigured();
    await homePage.expectLinkedInCtaConfigured();
    await expect(homePage.emailCta).toBeVisible();
  });

  /**
   * Checks social CTAs visible on about.
   */
  test('@integration social icons are present on about page', async ({ page }) => {
    const aboutPage = new AboutPage(page);

    await aboutPage.gotoAbout();
    await aboutPage.expectLoaded();

    // About page has email and LinkedIn CTAs in the CTA section
    await aboutPage.expectEmailCtaConfigured();
    await aboutPage.expectLinkedInCtaConfigured();
    await expect(aboutPage.emailCta).toBeVisible();
  });

  /**
   * Checks social CTAs visible on contact.
   */
  test('@integration social icons are present on contact page', async ({ page }) => {
    const contactPage = new ContactPage(page);

    await contactPage.gotoContact();
    await contactPage.expectLoaded();

    // Contact page has email and LinkedIn CTAs
    await contactPage.expectEmailCtaConfigured();
    await contactPage.expectLinkedInCtaConfigured();
    await expect(contactPage.emailCta).toBeVisible();
  });

  /**
   * Verifies email links use the mailto scheme.
   */
  test('@integration email links have proper mailto format', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.gotoHome();
    await homePage.expectLoaded();

    const emailLinks = page.locator('a[href^="mailto:"]');
    const count = await emailLinks.count();

    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const link = emailLinks.nth(i);
      await expect(link).toHaveAttribute('href', /^mailto:/);
    }
  });

  /**
   * Verifies LinkedIn links target the expected domain.
   */
  test('@integration LinkedIn links point to correct domain', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.gotoHome();
    await homePage.expectLoaded();

    const linkedInLinks = page.locator('a[href*="linkedin" i]');
    const count = await linkedInLinks.count();

    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const link = linkedInLinks.nth(i);
      await expect(link).toHaveAttribute('href', /linkedin/i);
    }
  });
});
