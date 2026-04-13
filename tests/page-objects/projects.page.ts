import { expect, type Locator, type Page } from '@playwright/test';

import { BasePage } from './base.page';

export const projectsTabs = ['ai-powered-testing', 'e2e-frameworks', 'practice-platforms'] as const;

export type ProjectsTab = (typeof projectsTabs)[number];

export class ProjectsPage extends BasePage {
  readonly pageRoot: Locator;
  readonly tabsContainer: Locator;

  constructor(page: Page) {
    super(page);
    this.pageRoot = this.byUi('projects-page');
    this.tabsContainer = this.byUi('projects-tabs');
  }

  async gotoProjects(): Promise<void> {
    await this.goto('/projects');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.pageRoot).toBeVisible();
    await expect(this.tabsContainer).toBeVisible();
  }

  async openTab(tab: ProjectsTab): Promise<void> {
    const tabButton = this.byUi(`projects-tab-${tab}`);
    await tabButton.click();
    await expect(tabButton).toHaveAttribute('aria-selected', 'true');
  }

  async expectPanelVisible(tab: ProjectsTab): Promise<void> {
    await expect(this.byUi(`projects-panel-${tab}`)).toBeVisible();
  }

  /**
   * Verify that ONLY the specified tab is selected
   * All other tabs should have aria-selected="false"
   */
  async expectOnlyTabSelected(selectedTab: ProjectsTab): Promise<void> {
    for (const tab of projectsTabs) {
      const tabButton = this.byUi(`projects-tab-${tab}`);
      if (tab === selectedTab) {
        await expect(tabButton).toHaveAttribute('aria-selected', 'true');
      } else {
        await expect(tabButton).toHaveAttribute('aria-selected', 'false');
      }
    }
  }

  /**
   * Verify that ONLY the specified panel is visible
   * All other panels should be hidden
   */
  async expectOnlyPanelVisible(visibleTab: ProjectsTab): Promise<void> {
    for (const tab of projectsTabs) {
      const panel = this.byUi(`projects-panel-${tab}`);
      if (tab === visibleTab) {
        await expect(panel).toBeVisible();
      } else {
        await expect(panel).toBeHidden();
      }
    }
  }

  /**
   * Complete tab switching verification:
   * Opens a tab and verifies it's the only one selected and visible
   */
  async switchToTabAndVerify(tab: ProjectsTab): Promise<void> {
    await this.openTab(tab);
    await this.expectOnlyTabSelected(tab);
    await this.expectOnlyPanelVisible(tab);
  }
}
