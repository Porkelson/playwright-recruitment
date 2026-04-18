import { test, expect } from '@playwright/test';

test.describe('Welcome Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Next Steps commands', () => {
    const steps = [
      { button: 'New Component',        command: 'ng generate component xyz' },
      { button: 'Run and Watch Tests',  command: 'ng test'                   },
      { button: 'Build for Production', command: 'ng build'                  },
    ] as const;

    for (const { button, command } of steps) {
      test(`"${button}" displays the "${command}" command`, async ({ page }) => {
        await page.getByRole('button', { name: button }).click();

        await expect(page.locator('pre')).toContainText(command);
      });
    }
  });

});
