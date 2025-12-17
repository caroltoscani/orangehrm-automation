import { Page } from '@playwright/test';
import { LoginComponent } from '../components/LoginComponent';

export class LoginPage {
  private page: Page;
  private loginComponent: LoginComponent;

  constructor(page: Page) {
    this.page = page;
    this.loginComponent = new LoginComponent(page);
  }

  async open(): Promise<void> {
    await this.page.goto('/web/index.php/auth/login');
  }

  async login(username: string, password: string): Promise<void> {
    await this.loginComponent.login(username, password);
  }
}
