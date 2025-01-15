import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly blogSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.blogSection = page.locator('.navbar-nav.horizontal a[href$="/blog/home"]');
  }

  async open() {
    await this.page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');
  }

  async clickOnBlogButtonOnTheHeaderMenu() {
    await this.blogSection.click();
  }
}