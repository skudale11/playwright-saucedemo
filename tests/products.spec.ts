import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('valid login navigates to products page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory/);
});

test('invalid login shows error message', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('wrong_user', 'wrong_password');
  const error = await loginPage.getErrorMessage();
  await expect(error).toBeVisible();
});

test('locked out user sees error', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('locked_out_user', 'secret_sauce');
  const error = await loginPage.getErrorMessage();
  await expect(error).toBeVisible();
});