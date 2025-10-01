import { test as base, expect } from '@playwright/test';
import { LoginPage, HomePage, AccountPage, HeaderPanel } from '@config/page-loader';

type MyFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  accountPage: AccountPage;
  headerPanel: HeaderPanel;
};

// Extend the base test with our fixtures
const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  accountPage: async ({ page }, use) => {
    const accountPage = new AccountPage(page);
    await use(accountPage);
  },        
  
  headerPanel: async ({ page }, use) => {
    const headerPanel = new HeaderPanel(page);
    await use(headerPanel);
  }
});

export { test, expect };
