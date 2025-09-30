import { test } from '@playwright/test';
import { LoginPage } from '@config/page-loader';
import { getCredentials } from '@config/env.config';

/**
   * Test Case 3 Answer
   * As a customer, I want to verify I can log in to fashionhub app
*/

test.describe('FashionHub Login Functionality', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    const user = getCredentials();
    
    await new LoginPage(page)
      .step_navigate()
      .then(loginPage => loginPage.step_enterUsername(user.username))
      .then(loginPage => loginPage.step_enterPassword(user.password))
      .then(loginPage => loginPage.step_clickLogin())
      .then(accountPage => accountPage.verify_welcomeMessage(user.account))
      .then(accountPage => accountPage.verify_logoutButton())
      .then(accountPage => accountPage.step_logout())
      .then(loginPage => loginPage.verify_onLoginPage());
  });

  
  test('should apear error message with invalid credentials', async ({ page }) => {
    const user = getCredentials();
    
    await new LoginPage(page)
      .step_navigate()
      .then(loginPage => loginPage.step_enterUsername(user.username+"x"))
      .then(loginPage => loginPage.step_enterPassword(user.password))
      .then(loginPage => loginPage.step_errorLogin())
      .then(loginPage => loginPage.verify_errorMessage('Invalid username or password.'));
  });
});
