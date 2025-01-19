import test, { expect, type Locator, type Page } from '@playwright/test';

export class BlogPage {
  readonly page: Page;
  readonly articles: Locator;
  readonly blogCategories: Locator;

  constructor(page: Page) {
    this.page = page;
    this.articles = page.locator('.article-thumb .title a');
    this.blogCategories = page.locator('.entry-module.module-mz_blog_category');
  }

  async clickOnFirstArticle() {
    await this.articles.first().click();
  }

  async verifyBlogPageLoaded() {
    await test.step("Verifying that blog page has loaded", async () => {
    await expect(this.blogCategories).toBeVisible();
  })
}
}