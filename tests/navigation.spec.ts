import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('load');
  });

  test('loads the home page with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/RecruitmentApp/i);
  });

  test('navigates to the Form page', async ({ page }) => {
    await page.getByRole('link', { name: 'Form' }).click();
    await page.waitForLoadState('load');

    await expect(page.getByRole('textbox', { name: 'Name' })).toBeVisible();
  });

  test('navigates to the Stepper page', async ({ page }) => {
    await page.getByRole('link', { name: 'Stepper' }).click();
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('button', { name: 'Next' })).toBeVisible();
  });

  test('navigates back to Welcome from the Form page via nav link', async ({ page }) => {
    await page.getByRole('link', { name: 'Form' }).click();
    await page.getByRole('link', { name: 'Welcome' }).click();
    await page.waitForLoadState('load');

    await expect(page.getByText('Recruitment app is running!')).toBeVisible();
  });

});
