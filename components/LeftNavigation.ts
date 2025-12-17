import { Page, expect } from '@playwright/test';

/**
 * Reusable component responsible for left-side navigation.
 *
 * This component abstracts navigation through the OrangeHRM left menu
 * and adapts behavior for desktop and mobile viewports.
 */
export class LeftNavigation {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to a menu item by its visible name.
   *
   * On desktop, navigation is performed via UI interaction.
   * On mobile, direct route navigation is used to avoid layout
   * elements intercepting pointer events.
   *
   * @param menuName - Visible name of the menu item (e.g. "My Info")
   */
  async navigateTo(menuName: string): Promise<void> {
    if (this.isMobileViewport()) {
      await this.navigateDirectly(menuName);
      return;
    }

    const menuItem = this.page.getByRole('link', { name: menuName });
    await expect(menuItem).toBeVisible();

    await menuItem.scrollIntoViewIfNeeded();
    await menuItem.click();

    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Determines whether the current viewport should be treated as mobile.
   *
   * Uses viewport width to decide layout behavior.
   */
  private isMobileViewport(): boolean {
    const viewport = this.page.viewportSize();
    return viewport !== null && viewport.width < 768;
  }

  /**
   * Performs direct navigation for mobile layouts.
   *
   * This approach avoids UI overlays that may block pointer events
   * in responsive views.
   */
  private async navigateDirectly(menuName: string): Promise<void> {
    const routes: Record<string, string> = {
      'My Info': '/web/index.php/pim/viewMyDetails',
      'Dashboard': '/web/index.php/dashboard/index',
    };

    const route = routes[menuName];

    if (!route) {
      throw new Error(`No route mapping found for menu: ${menuName}`);
    }

    await this.page.goto(route);
    await this.page.waitForLoadState('networkidle');
  }
}
