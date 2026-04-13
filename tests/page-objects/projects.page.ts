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
}
