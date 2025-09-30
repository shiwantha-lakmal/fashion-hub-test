import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { AccountPage } from './AccountPage';

/**
 * LoginPage class represents the FashionHub login page.
 * Provides methods to interact with login functionality using fluent API pattern.
 * Reference: https://pocketaces2.github.io/fashionhub/login.html
 */
export class LoginPage extends BasePage {
  private usernameInput = this.page.locator('input#username');
  private passwordInput = this.page.locator('input#password');
  private loginButton = this.page.getByRole('button', { name: /login/i });
  private errorMessage = this.page.locator('.error-message');
  private pageHeading = this.page.getByRole('heading', { name: /login to fashionhub/i });

  /**
   * Creates an instance of LoginPage.
   * @param page - Playwright Page object
   */
  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to the FashionHub login page.
   * Uses the full baseURL from environment configuration.
   * @returns Current LoginPage instance for method chaining
   */
  async step_navigate(): Promise<this> {
    await this.page.goto('https://pocketaces2.github.io/fashionhub/login.html');
    return this;
  }

  /**
   * Enter username in the username field.
   * @param username - The username to enter
   * @returns Current LoginPage instance for method chaining
   */
  async step_enterUsername(username: string) {
    await this.usernameInput.fill(username);
    return this;
  }

  /**
   * Enter password in the password field.
   * @param password - The password to enter
   * @returns Current LoginPage instance for method chaining
   */
  async step_enterPassword(password: string) {
    await this.passwordInput.fill(password);
    return this;
  }

  /**
   * Click the login button and wait for navigation.
   * @returns AccountPage instance after successful login
   */
  async step_clickLogin() {
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
    return new AccountPage(this.page);
  }

  /**
   * Click the login button for error scenario (stays on login page).
   * @returns Current LoginPage instance for method chaining
   */
  async step_errorLogin() {
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
    return this;
  }

  /**
   * Verify that the user is on the login page by checking the URL.
   * @returns Current LoginPage instance for method chaining
   */
  async verify_onLoginPage() {
    await expect(this.page).toHaveURL(/.*fashionhub\/login\.html/);
    return this;
  }

  /**
   * Verify that the login page heading is visible.
   * Asserts that the "Login to FashionHub" heading is displayed.
   * @returns Current LoginPage instance for method chaining
   */
  async verify_pageHeading() {
    await expect(this.pageHeading).toBeVisible();
    return this;
  }

  /**
   * Verify that error message is displayed.
   * Checks for "Invalid username or password" error.
   * @returns Current LoginPage instance for method chaining
   */
  async verify_errorMessage(errorMessage: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(errorMessage);
    return this;
  }

  /**
   * Verify complete login page state.
   * Checks page URL, heading visibility, and form elements.
   * @returns Current LoginPage instance for method chaining
   */
  async verify_loginPageState() {
    await this.verify_onLoginPage();
    await this.verify_pageHeading();
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
    return this;
  }
}