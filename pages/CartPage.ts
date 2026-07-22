import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.locator('.shopping_cart_link').click();
  }

  async removeFirstItem() {
    await this.page.locator('.cart_button').first().click();
  }

  async proceedToCheckout() {
    await this.page.locator('[data-test="checkout"]').click();
  }
}