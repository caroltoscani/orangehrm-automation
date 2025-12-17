import path from 'node:path';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MyInfoPage } from '../pages/MyInfoPage';
import { LeftNavigation } from '../components/LeftNavigation';
import { ENV } from '../config/env';

/**
 * Test Scenario: Attachment Management – My Info
 *
 * Objective:
 * Validate that a user can manage attachments in the "My Info" section,
 * including uploading a new file, verifying its details, and removing it.
 *
 * Steps:
 * 1. Login to OrangeHRM with valid credentials
 * 2. Navigate to the "My Info" section using the left navigation
 * 3. Validate that the default attachment (test.png) exists
 * 4. Upload a new valid attachment with a comment
 * 5. Save the attachment
 * 6. Verify that the attachment list is updated:
 *    - Total number of attachments increases
 *    - Uploaded file is displayed with correct details
 * 7. Extract and store the file size of the uploaded attachment
 * 8. Delete the newly uploaded attachment
 * 9. Validate that only the original attachment remains
 */

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
