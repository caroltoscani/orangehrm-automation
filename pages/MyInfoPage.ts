import { Page, expect } from '@playwright/test';

export class MyInfoPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    attachmentsTable() {
        return this.page.locator('.oxd-table-body .oxd-table-row');
    }

    async validateDefaultAttachmentExists(): Promise<void> {
        await expect(this.attachmentsTable()).toHaveCount(1);
        await expect(this.page.getByText('test.png')).toBeVisible();
    }

    async uploadAttachment(filePath: string, comment: string): Promise<void> {
        await this.page.getByRole('button', { name: 'Add' }).click();

        const attachmentContainer = this.page.locator('.orangehrm-attachment');
        await attachmentContainer.waitFor({ state: 'visible' });

        const fileInput = attachmentContainer.locator('input[type="file"]');
        await fileInput.setInputFiles(filePath);

        await attachmentContainer
            .getByPlaceholder('Type comment here')
            .fill(comment);

        await attachmentContainer
            .getByRole('button', { name: 'Save' })
            .click();
    }

    async getAttachmentCount(): Promise<number> {
        return this.attachmentsTable().count();
    }

    private attachmentRowByFileName(fileName: string) {
        return this.page
            .locator('.oxd-table-body .oxd-table-row')
            .filter({ hasText: fileName });
    }

    async getAttachmentFileSize(fileName: string): Promise<string> {
        const row = this.attachmentRowByFileName(fileName);
        return row.locator('.oxd-table-cell').nth(3).innerText();
    }

    async deleteAttachment(fileName: string): Promise<void> {
        const row = this.attachmentRowByFileName(fileName);

        await row.locator('i.bi-trash').click();
        await this.page.getByRole('button', { name: 'Yes, Delete' }).click();
    }
}
