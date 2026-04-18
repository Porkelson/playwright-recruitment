import { expect, test } from './fixtures';
import { STEPPER } from './test-data';

test.describe('Stepper', () => {
  test.describe('Step 1 - Name', () => {
    test('shows a max-length error when the name is too long', async ({ stepperPage }) => {
      await stepperPage.nameInput.fill(STEPPER.tooLongName);

      await expect(stepperPage.maxLengthError).toBeVisible();
    });

    test('advances to Step 2 after submitting a valid name', async ({ stepperPage }) => {
      await stepperPage.completeStep1(STEPPER.validName);

      await expect(stepperPage.addressInput).toBeVisible();
    });
  });

  test.describe('Step 2 - Address', () => {
    test.beforeEach(async ({ stepperPage }) => {
      await stepperPage.completeStep1(STEPPER.validName);
    });

    test('advances to the Done step after submitting an address', async ({ stepperPage }) => {
      await stepperPage.completeStep2(STEPPER.address);

      await expect(stepperPage.doneStep).toBeVisible();
    });
  });

  test.describe('Step 3 - Done', () => {
    test.beforeEach(async ({ stepperPage }) => {
      await stepperPage.completeStep1(STEPPER.validName);
      await stepperPage.completeStep2(STEPPER.address);
    });

    test('shows the completion message', async ({ stepperPage }) => {
      await expect(stepperPage.doneStep).toContainText('You are now done!');
    });

    test('displays the entered Name and Address in the summary', async ({ stepperPage }) => {
      await expect(stepperPage.doneStep).toContainText(`Name: ${STEPPER.validName}`);
      await expect(stepperPage.doneStep).toContainText(`Address: ${STEPPER.address}`);
    });

    test('Reset clears all steps and returns to Step 1', async ({ stepperPage }) => {
      await stepperPage.resetButton.click();
      await stepperPage.waitForAngular();

      await expect(stepperPage.nameInput).toBeVisible();
      await expect(stepperPage.nameInput).toHaveValue('');
    });
  });

});
