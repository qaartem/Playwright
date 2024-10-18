import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homepage';
import { BlogPage } from '../pages/blogpage';
import { ArticlePage } from '../pages/articlepage';


test('Check a comment functionality on a blog post', async ({ page }) => {
  const name = 'Test';
  const email = 'test@test.com';
  const comment = 'TestTestTestTestTestTestTestTestTestTestTest';
  const successMessage = 'Thank you for your comment. It has been submitted to the webmaster for approval.';

  await page.route('**/maza/blog/article/write&article_id=*', (route) => {
    route.continue();
  });

  const homePage = new HomePage(page);
  const blogPage = new BlogPage(page);
  const articlePage = new ArticlePage(page);

  await homePage.open();
  await homePage.navigateToBlogSection();
  await blogPage.clickOnFirstArticle();
  await articlePage.scrollToCommentForm();
  const [response] = await Promise.all([
    page.waitForResponse(response => response.url().includes('/maza/blog/article/write&article_id=') && response.status() === 200),
    articlePage.fillCommentForm(name, email, comment)
  ]);
  
  const responseBody = await response.json();
  
if (responseBody.success === successMessage) {
  console.log('Success message found:', responseBody.success);
} else {
  console.error('Expected success message not found!');
}
  await expect(articlePage.successMessage).toHaveText(successMessage);
});

test('Check error messages for name and comment inputs for comment on a blog post', async ({ page }) => {
  const errorNameInputMessage = 'Warning: Comment Name must be between 3 and 25 characters!';
  const errorCommentInputMessage = 'Warning: Comment Text must be between 25 and 1000 characters!';

  await page.route('**/maza/blog/article/write&article_id=*', (route) => {
    route.continue();
  });

  const articlePage = new ArticlePage(page);

  await articlePage.open();
  await articlePage.confirmButton.click()
  await expect(articlePage.errorNameInputMessage).toHaveText(errorNameInputMessage);
  await expect(articlePage.errorCommentInputMessage).toHaveText(errorCommentInputMessage);
});


