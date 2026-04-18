import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async waitForAngular() {
    await this.page.waitForLoadState('load');
  }

  async navigate(path: string = '/') {
    await this.page.goto(path);
    await this.waitForAngular();
  }
}
