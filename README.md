# E2E Tests - Angular QA Recruitment App

![Playwright Tests](https://github.com/Porkelson/playwright-recruitment/actions/workflows/playwright.yml/badge.svg)

Playwright-based end-to-end test suite for [angular-qa-recruitment-app.netlify.app](https://angular-qa-recruitment-app.netlify.app/), written in TypeScript.

## Requirements

| Tool    | Version  |
|---------|----------|
| Node.js | v22.12.0 |
| npm     | 10.9.0   |

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browsers (first time only)
npx playwright install
```

## Running Tests

| Command                   | Description                              |
|---------------------------|------------------------------------------|
| `npm test`                | Run all tests headlessly (all browsers)  |
| `npm run test:chromium`   | Run only in Chromium                     |
| `npm run test:firefox`    | Run only in Firefox                      |
| `npm run test:headed`     | Run with browser window visible          |
| `npm run test:ui`         | Open Playwright UI mode (interactive)    |
| `npm run test:debug`      | Run in debug mode (step-by-step)         |
| `npm run test:report`     | Open the last HTML report                |

### Run a single file

```bash
npx playwright test tests/hero-form.spec.ts
```

### Run tests matching a keyword

```bash
npx playwright test --grep "Submission summary"
```

## Project Structure

```
.
├── playwright.config.ts      # baseURL, browsers, reporters, expect timeout
├── pages/                    # Page Object Model
│   ├── BasePage.ts           # Shared navigate() and waitForAngular() helpers
│   ├── HeroFormPage.ts       # /form - locators and actions for the Hero form
│   └── StepperPage.ts        # /stepper - locators and actions for the multi-step form
└── tests/
    ├── fixtures.ts           # Extended Playwright fixtures (page objects as test params)
    ├── test-data.ts          # Centralised test constants (hero data, stepper data, powers)
    ├── navigation.spec.ts    # App loads, nav links, Logo link
    ├── welcome.spec.ts       # Next Steps commands (parametrized)
    ├── hero-form.spec.ts     # Validation, power dropdown, submission summary, Edit / New Hero
    └── stepper.spec.ts       # Step 1 validation, step progression, Done summary, Reset
```

## Test Strategy

Tests cover user-facing behaviours. Locators use accessible roles and labels (`getByRole`, `getByLabel`, `getByText`) so they don't break on CSS or markup changes.

### Coverage areas

| Area | What is tested |
|------|----------------|
| **Navigation** | All nav links work and land on the right page |
| **Welcome page** | Each Next Steps button shows the correct CLI command |
| **Hero Form** | Required-field validation, all power options selectable, submission summary shows correct data, Edit preserves values, New Hero resets |
| **Stepper** | Name max-length validation, step-by-step progression, Done summary content, Reset returns to Step 1 |

### Design decisions

- **Playwright fixtures** (`tests/fixtures.ts`) give each test a ready-to-go page object - no boilerplate `beforeEach` needed in every spec.
- **Page Object Model** keeps all locators in one place, so a selector change is a single edit.
- **Centralised test data** (`tests/test-data.ts`) - magic strings live in one file and tests read clearly.
- **Parametrized tests** (`for...of` inside `describe`) used for the power dropdown, so each option shows up as a separate entry in the report.
- `waitForLoadState('load')` handles Angular's rendering without arbitrary timeouts.
- Each spec is fully independent, no shared state between tests.

## CI

Set the `CI` environment variable to `true` to enable:
- `retries: 2` on failure
- Single worker (sequential execution)
- Screenshots, videos, and traces on failure saved to `test-results/`
