import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homepage';
import { BlogPage } from '../pages/blogpage';
import { ArticlePage } from '../pages/articklepage';


test('Submit a comment on a blog post and validate the request', async ({ page }) => {
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


