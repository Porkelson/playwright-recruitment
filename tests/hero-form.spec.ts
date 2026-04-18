import { expect, test } from './fixtures';
import { HERO, POWERS } from './test-data';

test.describe('Hero Form', () => {
  test.describe('Validation', () => {
    test('shows "Name is required" when the Name field is left empty', async ({ heroFormPage }) => {
      await heroFormPage.nameInput.clear();
      await heroFormPage.alterEgoInput.click();

      await expect(heroFormPage.nameRequiredError).toBeVisible();
    });

  });

  test.describe('Power dropdown', () => {
    for (const power of POWERS) {
      test(`accepts "${power}" as a valid selection`, async ({ heroFormPage }) => {
        await heroFormPage.selectPower(power);

        await expect(heroFormPage.heroPowerSelect).toHaveValue(power);
      });
    }
  });

  test.describe('Submission summary', () => {
    test.beforeEach(async ({ heroFormPage }) => {
      await heroFormPage.fillAndSubmit(HERO.name, HERO.alterEgo, HERO.power);
    });

    test('shows submission summary with all submitted values', async ({ heroFormPage }) => {
      await expect(heroFormPage.submissionHeading).toBeVisible();
      await expect(heroFormPage.submissionName).toBeVisible();
      await expect(heroFormPage.submissionAlterEgo).toBeVisible();
      await expect(heroFormPage.submissionPower).toBeVisible();
    });
  });

  test.describe('Post-submission actions', () => {
    test.beforeEach(async ({ heroFormPage }) => {
      await heroFormPage.fillAndSubmit(HERO.name, HERO.alterEgo, HERO.power);
    });

    test('Edit returns to the form with the previously entered values preserved', async ({ heroFormPage }) => {
      await heroFormPage.editButton.click();
      await heroFormPage.waitForAngular();

      await expect(heroFormPage.nameInput).toBeVisible();
      await expect(heroFormPage.nameInput).toHaveValue(HERO.name);
    });

    test('New Hero resets the form to an empty state', async ({ heroFormPage }) => {
      await heroFormPage.editButton.click();
      await heroFormPage.waitForAngular();
      await heroFormPage.newHeroButton.click();
      await heroFormPage.waitForAngular();

      await expect(heroFormPage.nameInput).toHaveValue('');
      await expect(heroFormPage.alterEgoInput).toHaveValue('');
    });
  });
});
