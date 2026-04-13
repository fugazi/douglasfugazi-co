import { expect, type Locator, type Page } from '@playwright/test';

import { BasePage } from './base.page';

export class LayoutPage extends BasePage {
  readonly sidebar: Locator;
  readonly mainContent: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    super(page);
    this.sidebar = this.byUi('sidebar');
    this.mainContent = this.byUi('main-content');
    this.footer = this.byUi('site-footer');
  }

  async expectCoreLayout(): Promise<void> {
    await expect(this.sidebar).toBeVisible();
    await expect(this.mainContent).toBeVisible();
    await expect(this.footer).toBeVisible();
  }

  async openSidebarRoute(navToken: string): Promise<void> {
    await this.byUi(`sidebar-nav-link-${navToken}`).click();
  }
}
