import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Login should work and show dashboard', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login(
    process.env.ORANGEHRM_USERNAME!,
    process.env.ORANGEHRM_PASSWORD!
  );
});
