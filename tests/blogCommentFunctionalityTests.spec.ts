import { expect } from '@playwright/test';
import { test } from "../baseTest";
import { NAME, EMAIL, COMMENT, SUCCESS_MESSAGE, ERROR_NAME_INPUT_MESSAGE, ERROR_COMMENT_INPUT_MESSAGE } from "../utils/testData";


test('Check a comment functionality on a blog post', async ({ homePage,
  blogPage, articlePage }) => {
  await homePage.open();
  await homePage.clickOnBlogButtonOnTheHeaderMenu();
  await blogPage.clickOnFirstArticle();
  await articlePage.scrollToCommentForm();
  await articlePage.fillFormAndVerifySuccessMessage(NAME, EMAIL, COMMENT, SUCCESS_MESSAGE);
});

test('Check error messages for name and comment inputs for comment on a blog post', async ({ articlePage }) => {
  await articlePage.openArticlePage();
  await articlePage.clickOnConfirmButton()
  await articlePage.verifyNameErrorMessage(ERROR_NAME_INPUT_MESSAGE)
  await articlePage.verifyCommentErrorMessage(ERROR_COMMENT_INPUT_MESSAGE)
});


