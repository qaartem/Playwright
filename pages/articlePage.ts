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
  private BLOG_URL = "/index.php?route=extension/maza/blog/article&article_id=37";

  constructor(page: Page) {
    this.page = page;
    this.commentForm = page.locator('.content #form-comment');
    this.nameInput = page.locator('#input-name');
    this.emailInput = page.locator('#input-email');
    this.commentInput = page.locator('#input-comment');
    this.confirmButton = page.locator('#button-comment');
    this.successMessage = page.locator('.alert-success');
    this.errorNameInputMessage = page.locator('//input[@name="name"]/following-sibling::*[@class="invalid-feedback"]');
    this.errorCommentInputMessage = page.locator('//textarea[@name="text"]/following-sibling::*[@class="invalid-feedback"]');
  }


  async openArticlePage() {
    await this.page.goto(this.BLOG_URL);
  }

  async scrollToCommentForm() {
    await this.commentForm.scrollIntoViewIfNeeded();
  }



  async fillFormAndVerifySuccessMessage(name: string, email: string, comment: string, successMessage: string) {
    const [response] = await Promise.all([
      this.page.waitForResponse(response => response.url().includes('/maza/blog/article/write&article_id=') && response.status() === 200),
      this.nameInput.fill(name, { timeout: 5000 }),
      await expect(this.nameInput).toHaveValue(name, { timeout: 5000 }),
      this.emailInput.fill(email),
      await expect(this.emailInput).toHaveValue(email),
      this.commentInput.fill(comment),
      await expect(this.commentInput).toHaveValue(comment),
      this.confirmButton.click(),
      await expect(this.successMessage).toHaveText(successMessage),
    ]);
    return response;
    
  }

  

}
