import { Page } from '@playwright/test';

export class LeftNavigation {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(menuName: string): Promise<void> {
    const isMobile = this.page.viewportSize()?.width !== undefined &&
                     this.page.viewportSize()!.width < 768;

    if (isMobile && menuName === 'My Info') {
      await this.page.goto('/web/index.php/pim/viewMyDetails');
      await this.page.waitForLoadState('networkidle');
      return;
    }

    const menuItem = this.page.getByRole('link', { name: menuName });
    await menuItem.click();
    await this.page.waitForLoadState('networkidle');
  }
}
