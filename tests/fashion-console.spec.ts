import { test, expect } from '../src/config/page.config';
import { getCredentials } from '@config/env.config';

/**
 * Test Case 1
 * As a tester, I want to make sure there are no console errors when you visit
 * https://pocketaces2.github.io/fashionhub/
 */

test.describe('FashionHub Console Error Validation', () => {
  test('should have no console errors when navigating to About page after login', async ({ loginPage, accountPage }) => {
    const user = getCredentials();
    
    await loginPage.step_navigate()
    await loginPage.startConsoleMonitoring()
    await loginPage.step_enterUsername(user.username)
    await loginPage.step_enterPassword(user.password)
    await loginPage.step_clickLogin()
    await accountPage.step_navigateToAbout()
    await accountPage.verifyConsoleLogs()
  });
});

