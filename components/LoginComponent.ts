import { Page, expect } from '@playwright/test';

/**
 * Reusable component responsible for performing the login interaction.
 *
 * This component encapsulates low-level UI actions related to authentication,
 * such as filling credentials and submitting the login form.
 * It also validates successful login by checking dashboard visibility.
 *
 * Designed to be reused across different pages or flows that require
 * authentication.
 */
export class LoginComponent {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Executes the login flow using provided credentials.
   *
   * This method:
   * - Fills username and password fields
   * - Submits the login form
   * - Validates successful authentication by checking dashboard access
   *
   * @param username - Valid OrangeHRM username
   * @param password - Corresponding password
   */
  async login(username: string, password: string): Promise<void> {
    await this.page.fill('input[name="username"]', username);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('button[type="submit"]');

    await expect(this.page).toHaveURL(/dashboard/);

    await expect(
      this.page.getByRole('heading', { name: 'Dashboard' })
    ).toBeVisible();
  }
}
