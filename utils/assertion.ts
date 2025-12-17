import { Page } from '@playwright/test';

export async function assertWithScreenshot(
  page: Page,
  assertion: () => Promise<void>,
  name: string
): Promise<void> {
  try {
    await assertion();
  } catch (error) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotPath = `screenshots/${name}-${timestamp}.png`;

    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.error(`Assertion failed. Screenshot saved at: ${screenshotPath}`);

    throw error;
  }
}
