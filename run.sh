#!/bin/bash

echo "▶ Installing dependencies..."
npm install

echo "▶ Running Playwright tests..."
npx playwright test

echo "✔ Tests finished"
