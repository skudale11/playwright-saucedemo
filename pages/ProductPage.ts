import { Page } from '@playwright/test';

export class ProductPage {
  constructor(private page: Page) {}

  async sortBy(option: string) {
    await this.page.locator('[data-test="product-sort-container"]').selectOption(option);
  }

  async addFirstProductToCart() {
    await this.page.locator('.btn_add_to_cart').first().click();
  }

  async getCartCount() {
    return this.page.locator('.shopping_cart_badge');
  }
}