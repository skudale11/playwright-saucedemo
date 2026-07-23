# Playwright Sauce Demo: E2E Test Suite + AI QA Agent

A production-grade end-to-end test automation suite for Sauce Demo, built with Playwright and TypeScript. Includes an autonomous QA agent that detects test failures, generates bug reports using the Claude AI API, and files them automatically to Jira.

## CI Status
![CI](https://github.com/skudale11/playwright-saucedemo/actions/workflows/playwright.yml/badge.svg)

## Live Test Report
[View latest test report](https://skudale11.github.io/playwright-saucedemo/)

## What Makes This Different
Most test automation portfolios stop at running tests. This project goes further: when a test fails, an AI agent automatically generates a human-readable bug report and files it to Jira without any manual intervention.

## Tech Stack
- Playwright with TypeScript
- Claude AI API for bug report generation
- Jira REST API for automatic ticket filing
- GitHub Actions CI/CD
- Page Object Model
- GitHub Pages for live test reports

## What Is Tested
- Login flows: valid credentials, invalid credentials, locked out user
- Product listing: page loads, sort by price
- Cart: add product, remove product, cart badge count
- Checkout: full flow end-to-end, missing fields validation

## Project Structure

    pages/
      LoginPage.ts        Login page interactions
      ProductPage.ts      Product page interactions
      CartPage.ts         Cart page interactions
      CheckoutPage.ts     Checkout page interactions
    tests/
      auth.spec.ts        Authentication tests
      products.spec.ts    Product listing tests
      cart.spec.ts        Cart and checkout tests
    agent/
      index.ts            Main agent entry point
      parseResults.ts     Parses Playwright JSON output for failures
      generateBugReport.ts  Calls Claude API to write bug reports
      fileJiraTicket.ts   Calls Jira REST API to create tickets

## How the QA Agent Works

    Test run completes
         |
         v
    Failures detected?
         |
       Yes --> Claude API generates bug report
                    |
                    v
              Jira ticket filed automatically
                    |
                    v
              Team notified via Jira

## Getting Started from Scratch

    git clone https://github.com/skudale11/playwright-saucedemo.git
    cd playwright-saucedemo
    npm install
    npx playwright install chromium

Set environment variables:

    ANTHROPIC_API_KEY=your-key
    JIRA_URL=https://yourname.atlassian.net
    JIRA_EMAIL=your-email
    JIRA_API_TOKEN=your-token
    JIRA_PROJECT_KEY=your-project-key

Run the full agent:

    npx tsx agent/index.ts

Run tests only:

    npx playwright test --project=chromium

## Author
Suchit Kudale
GitHub: https://github.com/skudale11
LinkedIn: https://www.linkedin.com/in/stilekar
