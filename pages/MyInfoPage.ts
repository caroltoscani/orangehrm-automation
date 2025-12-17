import { Page, expect } from '@playwright/test';

/**
 * Page Object representing the "My Info" section.
 * Handles attachment management actions and validations.
 */
export class MyInfoPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Returns all attachment rows.
   */
  private attachmentRows() {
    return this.page.locator('.oxd-table-body .oxd-table-row');
  }

  /**
   * Returns the attachment row matching the given file name.
   */
  private attachmentRowByFileName(fileName: string) {
    return this.attachmentRows().filter({ hasText: fileName });
  }

  /**
   * Validates that the default attachment exists.
   */
  async validateDefaultAttachmentExists(): Promise<void> {
    await this.expectAttachmentExists('test.png');
  }

  /**
   * Uploads a new attachment with a comment.
   */
  async uploadAttachment(
    filePath: string,
    comment: string
  ): Promise<void> {
    await this.page.getByRole('button', { name: 'Add' }).click();

    const attachmentContainer =
      this.page.locator('.orangehrm-attachment');

    await expect(attachmentContainer).toBeVisible();

    await attachmentContainer
      .locator('input[type="file"]')
      .setInputFiles(filePath);

    await attachmentContainer
      .getByPlaceholder('Type comment here')
      .fill(comment);

    await attachmentContainer
      .getByRole('button', { name: 'Save' })
      .click();
  }

  /**
   * Validates that an attachment exists by file name.
   */
  async expectAttachmentExists(fileName: string): Promise<void> {
    const row = this.attachmentRowByFileName(fileName);
    await expect(row).toBeVisible();
  }

  /**
   * Validates that an attachment does not exist by file name.
   */
  async expectAttachmentNotExists(fileName: string): Promise<void> {
    const row = this.attachmentRowByFileName(fileName);
    await expect(row).toHaveCount(0);
  }

  /**
   * Returns the file size of a specific attachment.
   */
  async getAttachmentFileSize(fileName: string): Promise<string> {
    const row = this.attachmentRowByFileName(fileName);
    await expect(row).toBeVisible();

    return row.locator('.oxd-table-cell').nth(3).innerText();
  }

  /**
   * Deletes an attachment by file name.
   */
  async deleteAttachmentByFileName(
    fileName: string
  ): Promise<void> {
    const row = this.attachmentRowByFileName(fileName);
    await expect(row).toBeVisible();

    await row.locator('i.bi-trash').click();
    await this.page
      .getByRole('button', { name: 'Yes, Delete' })
      .click();
  }
}
