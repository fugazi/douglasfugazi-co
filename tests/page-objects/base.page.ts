import type { Locator, Page } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  protected byUi(token: string): Locator {
    return this.page.locator(`[data-ui="${token}"]`);
  }

  async goto(path: string): Promise<void> {
    await this.page.goto(path);
  }
}
