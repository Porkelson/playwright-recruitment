import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class StepperPage extends BasePage {
  readonly nameInput: Locator;
  readonly addressInput: Locator;
  readonly resetButton: Locator;
  readonly doneStep: Locator;
  readonly maxLengthError: Locator;

  constructor(page: Page) {
    super(page);
    this.nameInput = page.getByRole('textbox', { name: 'Name' });
    this.addressInput = page.getByRole('textbox', { name: 'Address' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.doneStep = page.getByLabel('3Done');
    this.maxLengthError = page.getByText('The maximum length for this');
  }

  private nextButtonIn(anchor: Locator): Locator {
    return this.page
      .getByRole('tabpanel')
      .filter({ has: anchor })
      .getByRole('button', { name: 'Next' });
  }

  async goto() {
    await this.navigate('/stepper');
  }

  async completeStep1(name: string) {
    await this.nameInput.fill(name);
    await this.nextButtonIn(this.nameInput).click();
    await this.waitForAngular();
  }

  async completeStep2(address: string) {
    await this.addressInput.fill(address);
    await this.nextButtonIn(this.addressInput).click();
    await this.waitForAngular();
  }
}
