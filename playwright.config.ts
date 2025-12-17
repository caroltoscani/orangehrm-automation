import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,

  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    // 🖥 Desktop
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },

    // 📱 Android
    {
      name: 'samsung-galaxy-s21',
      use: {
        ...devices['Galaxy S21'],
      },
    },

    // 📱 iOS
    {
      name: 'iphone-14',
      use: {
        ...devices['iPhone 14'],
      },
    },
    {
      name: 'iphone-14-pro-max',
      use: {
        ...devices['iPhone 14 Pro Max'],
      },
    },
  ],
});
