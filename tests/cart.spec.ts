import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('user can remove item from cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  const productPage = new ProductPage(page);
  await productPage.addFirstProductToCart();
  const cartPage = new CartPage(page);
  await cartPage.goto();
  await cartPage.removeFirstItem();
  await expect(page.locator('.cart_item')).toHaveCount(0);
});

test('user can complete full checkout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  const productPage = new ProductPage(page);
  await productPage.addFirstProductToCart();
  const cartPage = new CartPage(page);
  await cartPage.goto();
  await cartPage.proceedToCheckout();
  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.fillDetails('Suchit', 'Kudale', '1234AB');
  await checkoutPage.finish();
  const confirmation = await checkoutPage.getConfirmationMessage();
  await expect(confirmation).toHaveText('Thank you for your order!');
});

test('checkout with missing fields shows error', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  const productPage = new ProductPage(page);
  await productPage.addFirstProductToCart();
  const cartPage = new CartPage(page);
  await cartPage.goto();
  await cartPage.proceedToCheckout();
  await page.locator('[data-test="continue"]').click();
  await expect(page.locator('[data-test="error"]')).toBeVisible();
});