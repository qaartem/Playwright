import { expect, type Locator, type Page } from '@playwright/test';

export class ArticlePage {
  readonly page: Page;
  readonly commentForm: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly commentInput: Locator;
  readonly confirmButton: Locator;
  readonly successMessage: Locator;
  readonly errorNameInputMessage: Locator;
  readonly errorCommentInputMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.commentForm = page.locator('#entry_210911');
    this.nameInput = page.locator('#input-name');
    this.emailInput = page.locator('#input-email');
    this.commentInput = page.locator('#input-comment');
    this.confirmButton = page.locator('#button-comment');
    this.successMessage = page.locator('.alert-success');
    this.errorNameInputMessage = page.locator('body > div:nth-child(1) > div:nth-child(5) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(9) > form:nth-child(2) > div:nth-child(1) > div:nth-child(2)');
    this.errorCommentInputMessage = page.locator('body > div:nth-child(1) > div:nth-child(5) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(9) > form:nth-child(2) > div:nth-child(3) > div:nth-child(2)');
  }

  async open() {
    await this.page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=extension/maza/blog/article&article_id=37');
  }

  async scrollToCommentForm() {
    await this.commentForm.scrollIntoViewIfNeeded();
  }

  async fillCommentForm(name: string, email: string, comment: string) {
    await this.nameInput.fill(name)
    await this.emailInput.fill(email)
    await this.commentInput.fill(comment)
    await this.confirmButton.click()
  }
}