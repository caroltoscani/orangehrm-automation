import { Page } from '@playwright/test';

/**
 * Wrapper utility for assertions with automatic screenshot capture on failure.
 *
 * This helper executes a given assertion and, in case of failure,
 * captures a full-page screenshot with a timestamped filename.
 * The screenshot path is logged to assist debugging.
 *
 * Designed to centralize failure handling logic and improve
 * test diagnostics without polluting test code.
 *
 * @param page - Playwright Page instance used to capture screenshots
 * @param assertion - Async assertion callback to be executed
 * @param name - Logical name used to identify the screenshot
 */
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
