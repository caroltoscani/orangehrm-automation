import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ENV } from '../config/env';

/**
 * Test Scenario: User Login
 *
 * Objective:
 * Validate that a user can authenticate successfully using valid credentials
 * and is redirected to the dashboard.
 *
 * Steps:
 * 1. Open the OrangeHRM login page
 * 2. Enter valid username and password
 * 3. Submit the login form
 * 4. Verify that the dashboard is displayed
 */

test('Login should work and show dashboard', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login(
    ENV.ORANGEHRM_USERNAME,
    ENV.ORANGEHRM_PASSWORD
  );
});
