# 📘 README.md 

```md
# OrangeHRM Automation Assignment

This repository contains an end-to-end test automation solution for the
OrangeHRM demo application, developed as part of a technical assignment.

The project demonstrates good automation practices such as Page Object Model,
reusable components, cross-browser execution, and mobile testing using
Playwright.

---

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Playwright Test Runner
- Dotenv (environment variables)

---

## Application Under Test

- URL: https://opensource-demo.orangehrmlive.com
- Demo credentials are provided via environment variables.

---

## Project Structure

```
.
├── components
│   ├── LoginComponent.ts
│   └── LeftNavigation.ts
├── pages
│   └── MyInfoPage.ts
├── tests
│   ├── login.spec.ts
│   └── attachment.spec.ts
├── resources
│   └── test-file.txt
├── config
│   └── env.ts
├── playwright.config.ts
├── run-tests.sh
└── README.md
````

---

## Reusable Components

### LoginComponent
- Accepts username and password.
- Performs login and validates successful authentication
  (presence of the dashboard).

### LeftNavigation
- Provides navigation to any left menu item by name.
- Handles both desktop and mobile layouts.
- Uses direct route navigation for mobile viewports where UI layout
  blocks pointer interactions.

### Assertion Handling
- Assertions rely on Playwright’s built-in expect API.
- On failure:
  - Screenshots are automatically captured.
  - Traces are retained for debugging.

---

## Test Scenario — Attachment Management

The following scenario is automated:

1. Login to OrangeHRM.
2. Navigate to **My Info** using the left navigation component.
3. Validate that a default attachment (`test.png`) exists.
4. Upload a new attachment with a comment.
5. Save the attachment.
6. Validate that:
   - The total number of attachments is updated.
   - Attachment fields contain valid values.
7. Extract and store the file size of the newly uploaded attachment.
8. Delete the uploaded attachment.
9. Validate that only the original attachment remains.

---
## Cross-Browser & Mobile Coverage

The project supports execution on multiple environments:

### Desktop Browsers
- Chromium
- Firefox

### Mobile Emulation (Playwright Devices)
- Samsung Galaxy S21
- iPhone 14
- iPhone 14 Pro Max

Mobile execution uses Playwright’s built-in device emulation to validate
responsive behavior without external dependencies.

---

## Environment Setup

Create a `.env` file in the project root:

```env
ORANGEHRM_USERNAME=Admin
ORANGEHRM_PASSWORD=admin123
````

---

## Running the Tests

### Install dependencies

```bash
npm install
```

### Run all tests

```bash
npx playwright test
```

### Run a specific browser or device

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=samsung-galaxy-s21
npx playwright test --project=iphone-14-pro-max
```

### Run tests with UI (headed mode)

```bash
./run.sh chromium headed
```

---

## Notes

* Mobile navigation differs from desktop due to UI layout constraints in the
  OrangeHRM demo application. The navigation component adapts accordingly.
* The solution focuses on stability, readability, and maintainability,
  following best practices expected in real-world test automation projects.

---

## Author

Automation assignment implemented by **Carolina Toscani**.

