import { test as base } from '@playwright/test';
import { HeroFormPage } from '../pages/HeroFormPage';
import { StepperPage } from '../pages/StepperPage';

type AppFixtures = {
  heroFormPage: HeroFormPage;
  stepperPage: StepperPage;
};

export const test = base.extend<AppFixtures>({
  heroFormPage: async ({ page }, use) => {
    const form = new HeroFormPage(page);
    await form.goto();
    await use(form);
  },
  stepperPage: async ({ page }, use) => {
    const stepper = new StepperPage(page);
    await stepper.goto();
    await use(stepper);
  },
});

export { expect } from '@playwright/test';
