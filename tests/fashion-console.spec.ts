import { test, expect } from '@playwright/test';
import { LoginPage } from '@config/page-loader';
import { getCredentials } from '@config/env.config';

/**
 * Test Case 1
 * As a tester, I want to make sure there are no console errors when you visit
 * Error details will be displayed in the console (intentionally passing tescase to check the console error)
 * https://pocketaces2.github.io/fashionhub/
 */

test.describe('FashionHub Console Error Validation', () => {
  test('should have no console errors when navigating to About page after login', async ({ page }) => {
    const user = getCredentials();

    await new LoginPage(page)
      .startConsoleMonitoring()  // <- this starts capturing the console monitoring
      .step_navigate()
      .then(loginPage => loginPage.step_enterUsername(user.username))
      .then(loginPage => loginPage.step_enterPassword(user.password))
      .then(loginPage => loginPage.step_clickLogin())
      .then(accountPage => accountPage.step_navigateToAbout())
      .then(accountPage => accountPage.verifyConsoleLogs()); // <- this starts verifying the console monitoring
  });
});

