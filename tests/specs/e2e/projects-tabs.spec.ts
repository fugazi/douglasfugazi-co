import { test, expect } from '../../fixtures/test-fixtures';
import { projectsTabs } from '../../page-objects/projects.page';

/**
 * Validates tab interactions on the projects page.
 */
test.describe('Projects interactions @e2e', () => {
  /**
   * Iterates all tabs and confirms active state and visible panel.
   */
  test('@e2e users can switch project category tabs', async ({ page, projectsPage }) => {
    await test.step('Open projects page', async () => {
      await projectsPage.gotoProjects();
      await projectsPage.expectLoaded();
    });

    for (const tab of projectsTabs) {
      await test.step(`Switch and verify tab ${tab}`, async () => {
        await projectsPage.switchToTabAndVerify(tab);
      });
    }

    await test.step('Confirm projects page remains visible', async () => {
      await expect(page.locator('[data-ui="projects-page"]')).toBeVisible();
    });
  });
});
