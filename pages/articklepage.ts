import { expect, type Locator, type Page } from '@playwright/test';

export class ArticlePage {
  readonly page: Page;
  readonly commentForm: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly commentInput: Locator;
  readonly confirmButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.commentForm = page.locator('#entry_210911');
    this.nameInput = page.locator('#input-name');
    this.emailInput = page.locator('#input-email');
    this.commentInput = page.locator('#input-comment');
    this.confirmButton = page.locator('#button-comment');
    this.successMessage = page.locator('.alert-success');
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