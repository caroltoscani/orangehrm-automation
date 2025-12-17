import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ENV } from '../config/env';

test('Login should work and show dashboard', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login(
    ENV.ORANGEHRM_USERNAME,
    ENV.ORANGEHRM_PASSWORD
  );
});
