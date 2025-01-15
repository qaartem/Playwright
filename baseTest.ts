import { test as base } from "@playwright/test";
import { HomePage } from "./pages/homePage";
import { BlogPage } from "./pages/blogPage";
import { ArticlePage } from "./pages/articlePage";

type PomFixtures = {
  homePage: HomePage;
  blogPage: BlogPage;
  articlePage: ArticlePage;
};

export const test = base.extend<PomFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  blogPage: async ({ page }, use) => {
    const blogPage = new BlogPage(page);
    await use(blogPage);
  },
  articlePage: async ({ page }, use) => {
    const articlePage = new ArticlePage(page);
    await use(articlePage);
  },
});

export { expect } from "@playwright/test";