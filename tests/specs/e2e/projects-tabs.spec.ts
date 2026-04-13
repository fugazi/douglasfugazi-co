import { test, expect } from '../../fixtures/test-fixtures';
import { ProjectsPage, projectsTabs } from '../../page-objects/projects.page';

test.describe('Projects interactions @e2e', () => {
  test('@e2e users can switch project category tabs', async ({ page }) => {
    const projectsPage = new ProjectsPage(page);

    await projectsPage.gotoProjects();
    await projectsPage.expectLoaded();

    for (const tab of projectsTabs) {
      await projectsPage.switchToTabAndVerify(tab);
    }

    await expect(page.locator('[data-ui="projects-page"]')).toBeVisible();
  });
});
