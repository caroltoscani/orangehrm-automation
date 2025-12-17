import path from 'path';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MyInfoPage } from '../pages/MyInfoPage';
import { LeftNavigation } from '../components/LeftNavigation';
import { ENV } from '../config/env';

test('Attachment Management - My Info', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const leftNav = new LeftNavigation(page);
  const myInfoPage = new MyInfoPage(page);

  const filePath = path.resolve(
    process.cwd(),
    'resources',
    'test-file.txt'
  );

  await loginPage.open();
  await loginPage.login(
    ENV.ORANGEHRM_USERNAME,
    ENV.ORANGEHRM_PASSWORD
  );

  await leftNav.navigateTo('My Info');

  await myInfoPage.validateDefaultAttachmentExists();

  await myInfoPage.uploadAttachment(
    filePath,
    'automation upload file'
  );

  await expect(
    page.getByRole('cell', { name: 'test.png' })
  ).toBeVisible();

  await expect(
    page.getByRole('cell', { name: 'test-file.txt' })
  ).toBeVisible();

  const uploadedFileSize =
    await myInfoPage.getAttachmentFileSize('test-file.txt');

  expect(uploadedFileSize).toBeTruthy();

  await myInfoPage.deleteAttachmentByFileName('test-file.txt');
  await expect(
    page.getByRole('cell', { name: 'test-file.txt' })
  ).not.toBeVisible();

  await expect(
    page.getByRole('cell', { name: 'test.png' })
  ).toBeVisible();


});
