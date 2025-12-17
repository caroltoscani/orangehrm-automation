import path from 'path';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MyInfoPage } from '../pages/MyInfoPage';
import { LeftNavigation } from '../components/LeftNavigation';
import { assertWithScreenshot } from '../utils/assertion';
import { ENV } from '../config/env';

test('Attachment Management - My Info', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const leftNav = new LeftNavigation(page);
  const myInfoPage = new MyInfoPage(page);

  // 👉 AQUI é onde você cria o filePath
  const filePath = path.resolve(
    __dirname,
    'resources',
    'test-file.txt'
  );

  // Login
  await loginPage.open();
  await loginPage.login(
    ENV.ORANGEHRM_USERNAME,
    ENV.ORANGEHRM_PASSWORD
  );

  // Navigate
  await leftNav.navigateTo('My Info');

  // Upload attachment
  await myInfoPage.uploadAttachment(
    filePath,
    'automation upload'
  );

  // (continua o teste depois...)
});
