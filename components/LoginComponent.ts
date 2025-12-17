import { Page, expect } from '@playwright/test';

export class LoginComponent {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.fill('input[name="username"]', username);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('button[type="submit"]');

    await expect(this.page.locator('h6')).toHaveText('Dashboard');
  }
}
