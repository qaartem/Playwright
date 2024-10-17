import { test, expect } from '@playwright/test';

test('Submit a comment on a blog post and validate the request', async ({ page }) => {
  await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');
  await page.click('.navbar-nav.horizontal .icon-left.both.nav-link .title:has-text("Blog")');
  await page.locator('.article-thumb.image-top .text-ellipsis-2').first().click();
  await page.locator('#entry_210911').scrollIntoViewIfNeeded();
  await page.fill('#input-name', 'example');
  await page.fill('#input-email', 'example@example.com');
  await page.fill('#input-comment', 'exampleexampleexampleexampleexampleexampleexampleexample');
  await page.route('**/maza/blog/article/write&article_id=*', (route) => {
    route.continue();
  });
  await page.click('#button-comment');
  
  const [response] = await Promise.all([
    page.waitForResponse(response => response.status() === 200),
  ]);
  const responseBody = await response.json();
  expect(responseBody).toHaveProperty('success', true);

  await expect(page.locator('.alert-success:has-text(" Thank you for your comment. It has been submitted to the webmaster for approval.")')).toBeVisible();
});


