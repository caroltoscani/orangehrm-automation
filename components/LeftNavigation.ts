import { Page, expect } from '@playwright/test';

export class LeftNavigation {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(menuName: string): Promise<void> {

    await this.page.getByRole('link', { name: menuName }).click();

    await this.page.waitForLoadState('networkidle');

  }
}
