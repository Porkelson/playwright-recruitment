import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HeroFormPage extends BasePage {
  readonly nameInput: Locator;
  readonly alterEgoInput: Locator;
  readonly heroPowerSelect: Locator;
  readonly submitButton: Locator;
  readonly editButton: Locator;
  readonly newHeroButton: Locator;
  readonly nameRequiredError: Locator;
  readonly submissionHeading: Locator;
  readonly submissionName: Locator;
  readonly submissionAlterEgo: Locator;
  readonly submissionPower: Locator;

  constructor(page: Page) {
    super(page);
    this.nameInput = page.getByRole('textbox', { name: 'Name' });
    this.alterEgoInput = page.getByRole('textbox', { name: 'Alter Ego' });
    this.heroPowerSelect = page.getByLabel('Hero Power');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.editButton = page.getByRole('button', { name: 'Edit' });
    this.newHeroButton = page.getByRole('button', { name: 'New Hero' });
    this.nameRequiredError = page.getByText('Name is required');
    this.submissionHeading = page.getByRole('heading', { name: 'You submitted the following:' });
    this.submissionName = page.locator('div').filter({ hasText: /^Name$/ });
    this.submissionAlterEgo = page.getByText('Alter Ego').nth(1);
    this.submissionPower = page.getByText('Power', { exact: true });
  }

  async goto() {
    await this.navigate('/form');
  }

  async selectPower(power: string) {
    await this.heroPowerSelect.selectOption(power);
  }

  async submit() {
    await this.submitButton.click();
    await this.waitForAngular();
  }

  async fillAndSubmit(name: string, alterEgo: string, power: string) {
    await this.nameInput.fill(name);
    await this.alterEgoInput.fill(alterEgo);
    await this.selectPower(power);
    await this.submit();
  }
}
