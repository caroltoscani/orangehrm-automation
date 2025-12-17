import { Page } from '@playwright/test';
import { LoginComponent } from '../components/LoginComponent';

/**
 * Page Object responsible for authentication-related actions.
 *
 * This page abstracts navigation to the login screen and delegates
 * the authentication logic to the LoginComponent.
 * It represents the login flow from a user perspective.
 */
export class LoginPage {
  private readonly page: Page;
  private readonly loginComponent: LoginComponent;

  constructor(page: Page) {
    this.page = page;
    this.loginComponent = new LoginComponent(page);
  }

  /**
   * Navigates to the OrangeHRM login page.
   *
   * This method should be called before attempting any authentication
   * action and ensures the application is in the correct initial state.
   */
  async open(): Promise<void> {
    await this.page.goto('/web/index.php/auth/login');
  }

  /**
   * Performs login using provided credentials.
   *
   * This method delegates the interaction logic to the LoginComponent
   * and validates successful authentication (dashboard visibility).
   *
   * @param username - Valid OrangeHRM username
   * @param password - Corresponding password
   */
  async login(username: string, password: string): Promise<void> {
    await this.loginComponent.login(username, password);
  }
}
