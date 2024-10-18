import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly blogSection: Locator;
  readonly articles: Locator;
  readonly pomLink: Locator;
  readonly tocList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.blogSection = page.locator('.navbar-nav.horizontal .icon-left.both.nav-link .title', { hasText: 'Blog' });
    this.articles = page.locator('.article-thumb.image-top .text-ellipsis-2');
    this.pomLink = page.locator('li', {
      hasText: 'Guides',
    }).locator('a', {
      hasText: 'Page Object Model',
    });
    this.tocList = page.locator('article div.markdown ul > li > a');
  }

  async open() {
    await this.page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');
  }

  async navigateToBlogSection() {
    await this.blogSection.click();
  }
}