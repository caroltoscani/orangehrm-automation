# OrangeHRM Automation Assignment

This repository contains an end-to-end test automation solution for the
OrangeHRM demo application, developed as part of a technical assignment.

The project demonstrates professional automation practices such as:
- Page Object Model (POM)
- Reusable components
- Centralized assertions
- Cross-browser execution
- Mobile testing
- CI execution using GitHub Actions

---

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Playwright Test Runner
- Dotenv (environment variables)
- GitHub Actions (CI)

---

## Application Under Test

- URL: https://opensource-demo.orangehrmlive.com
- Credentials are provided via environment variables.

---

## Project Structure

```text
.
├── .github
│   └── workflows
│       └── playwright.yml
├── components
│   ├── LoginComponent.ts
│   └── LeftNavigation.ts
├── config
│   └── env.ts
├── pages
│   ├── LoginPage.ts
│   └── MyInfoPage.ts
├── tests
│   ├── login.spec.ts
│   └── attachment.spec.ts
├── utils
│   └── assertion.ts
├── resources
│   └── test-file.txt
├── playwright.config.ts
├── run.sh
└── README.md
```

---

## Reusable Components

### LoginComponent
- Encapsulates low-level login interactions.
- Handles credential input and form submission.
- Validates successful authentication via dashboard visibility.

### LeftNavigation
- Provides navigation to left menu items by name.
- Adapts behavior for desktop and mobile layouts.
- Uses direct routing on mobile to avoid UI overlay issues.

### Assertion Utility
- Centralized assertion wrapper with automatic screenshot capture.
- On failure:
  - A full-page screenshot is generated with a timestamp.
  - The screenshot path is logged for debugging.

---

## Test Scenarios

### Login Scenario
1. Open the login page
2. Enter valid credentials
3. Submit the login form
4. Validate that the dashboard is displayed

This is a critical smoke test and a prerequisite for all authenticated flows.

---

### Attachment Management – My Info

1. Login to OrangeHRM
2. Navigate to **My Info**
3. Validate that the default attachment (`test.png`) exists
4. Upload a new attachment with a comment
5. Save the attachment
6. Validate that the attachment list is updated
7. Extract and store the file size of the uploaded attachment
8. Delete the uploaded attachment
9. Validate that only the original attachment remains

This scenario validates a full CRUD flow involving file handling and UI state.

---

## Cross-Browser & Mobile Coverage

### Desktop Browsers
- Chromium
- Firefox

### Mobile Emulation
- Samsung Galaxy S21
- iPhone 14
- iPhone 14 Pro Max

Mobile execution uses Playwright device emulation and includes
navigation adaptations for responsive layouts.

---

## Environment Setup

Create a `.env` file in the project root:

```env
ORANGEHRM_USERNAME=XXXX
ORANGEHRM_PASSWORD=XXXX
```

---

## Running the Tests (Local)

All executions are handled through a shell script to simplify usage
and abstract Playwright commands.

Install dependencies:

```bash
npm install
```

Run all tests:

```bash
./run.sh all
```

Run only desktop browsers:

```bash
./run.sh desktop
```

Run only mobile devices:

```bash
./run.sh mobile
```

Run a specific browser or device:

```bash
./run.sh chromium
./run.sh iphone-14-pro-max
```

Run tests with UI (headed mode):

```bash
./run.sh chromium headed
```

---

## Continuous Integration (GitHub Actions)

This project includes a GitHub Actions pipeline that automatically runs
the Playwright test suite on every push or pull request to the `main` branch.

### CI Workflow Overview

- Triggered on:
  - `push` to `main`
  - `pull_request` to `main`
- Installs dependencies
- Installs Playwright browsers
- Executes the full test suite using `run.sh`

### Required GitHub Secrets

The following secrets must be configured in the repository settings:

- `ORANGEHRM_USERNAME`
- `ORANGEHRM_PASSWORD`

### Workflow File Location

```text
.github/workflows/playwright.yml
```

---

## Notes

- Mobile navigation differs from desktop due to UI layout constraints.
- Direct route navigation is used on mobile to improve stability.
- The project prioritizes readability, maintainability, and reliability.

---

## Author

Automation assignment implemented by **Carolina Toscani**.

---

## License

This project is licensed under the MIT License.
