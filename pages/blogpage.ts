import { expect, type Locator, type Page } from '@playwright/test';

export class BlogPage {
  readonly page: Page;
  readonly articles: Locator;

  constructor(page: Page) {
    this.page = page;
    this.articles = page.locator('.article-thumb .title a');
  }

  async clickOnFirstArticle() {
    await this.articles.first().click();
  }

}