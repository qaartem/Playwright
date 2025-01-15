import { expect } from '@playwright/test';
import { test } from "../baseTest";
import { getValidComment } from "../helpers/testDataHelpers";


test('Check a comment functionality on a blog post', async ({ homePage,
  blogPage, articlePage }) => {
  const name = 'Test';
  const email = 'test@test.com';
  const comment = 'TestTestTestTestTestTestTestTestTestTestTest';
  const commentData = getValidComment();
  const successMessage = 'Thank you for your comment. It has been submitted to the webmaster for approval.';

  // const homePage = new HomePage(page);
  // const blogPage = new BlogPage(page);
  // const articlePage = new ArticlePage(page);

  await homePage.open();
  await homePage.clickOnBlogButtonOnTheHeaderMenu();
  await blogPage.clickOnFirstArticle();
  await articlePage.scrollToCommentForm();
  const [response] = await Promise.all([
    articlePage.waitForResponse(response => response.url().includes('/maza/blog/article/write&article_id=') && response.status() === 200),
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

test('Check error messages for name and comment inputs for comment on a blog post', async ({ articlePage }) => {
  const errorNameInputMessage = 'Warning: Comment Name must be between 3 and 25 characters!';
  const errorCommentInputMessage = 'Warning: Comment Text must be between 25 and 1000 characters!';

  await articlePage.open();
  await articlePage.confirmButton.click()
  await expect(articlePage.errorNameInputMessage).toHaveText(errorNameInputMessage);
  await expect(articlePage.errorCommentInputMessage).toHaveText(errorCommentInputMessage);
});


