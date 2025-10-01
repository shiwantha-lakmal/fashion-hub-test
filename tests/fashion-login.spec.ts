import { test, expect } from '../src/config/page.config';
import { getCredentials } from '@config/env.config';

/**
   * Test Case 3 Answer
   * As a customer, I want to verify I can log in to fashionhub app
*/

test.describe('FashionHub Login Functionality', () => {
  test('should login successfully with valid credentials', async ({ loginPage, homePage, accountPage }) => {
    const user = getCredentials();
    
    await loginPage.step_navigate()
    await loginPage.step_enterUsername(user.username)
    await loginPage.step_enterPassword(user.password)
    await loginPage.step_clickLogin()
    await accountPage.verify_welcomeMessage(user.account)
    await accountPage.verify_logoutButton()
    await accountPage.step_logout()
    await loginPage.verify_onLoginPage()
  });

  
  test('should apear error message with invalid credentials', async ({ loginPage }) => {
    const user = getCredentials();
    
    await loginPage.step_navigate()
    await loginPage.step_enterUsername(user.username+"x")
    await loginPage.step_enterPassword(user.password)
    await loginPage.step_errorLogin()
    await loginPage.verify_errorMessage('Invalid username or password.')
  });
});
