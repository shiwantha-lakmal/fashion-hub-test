import { Page, Locator, expect } from '@playwright/test';
import { BasePage, HeaderPanel, LoginPage, HomePage } from '@config/page-loader';

/**
 * AccountPage class represents the FashionHub account page.
 * Provides methods to interact with account page elements and verify page state.
 * Reference: https://pocketaces2.github.io/fashionhub/account.html
 */
export class AccountPage extends BasePage {
  public header: HeaderPanel;
  private accountPageHeading = this.page.getByRole('heading', { name: /welcome/i });
  private logoutButton = this.page.locator('logout-button').locator('button');

  /**
   * Creates an instance of AccountPage
   * Page Load Successfully
   * @param page - Playwright Page object
   */
  constructor(page: Page) {
    super(page);
    this.header = new HeaderPanel(page);
  }

  /**
   * Verify that the welcome message is visible and contains expected text.
   * @param expectedText - The text expected to be in the welcome message
   * @returns Current AccountPage instance for method chaining
   */
  async verify_welcomeMessage(expectedText: string) {
    await expect(this.accountPageHeading).toBeVisible();
    await expect(this.accountPageHeading).toContainText(expectedText);
    return this;
  }

  /**
   * Perform logout operation.
   * @returns LoginPage instance after logout
   */
  async step_logout() {
    await this.logoutButton.click();
    return new LoginPage(this.page);
  }

  /**
   * Verify logout button is visible.
   * @returns Current AccountPage instance for method chaining
   */
  async verify_logoutButton() {
    await expect(this.logoutButton).toBeVisible();
    return this;
  }

  /**
   * Navigate to Home page using header menu.
   * @returns HomePage instance after navigation
   */
  async step_navigateToHome() {
    await this.header.step_clickHome();
    return new HomePage(this.page);
  }

  /**
   * Navigate to Clothing page using header menu.
   * @returns Current AccountPage instance for method chaining
   */
  async step_navigateToClothing() {
    await this.header.step_clickClothing();
    return this;
  }

  /**
   * Navigate to Shopping Bag page using header menu.
   * @returns Current AccountPage instance for method chaining
   */
  async step_navigateToShoppingBag() {
    await this.header.step_clickShoppingBag();
    return this;
  }

  /**
   * Navigate to About page using header menu.
   * @returns Current AccountPage instance for method chaining
   */
  async step_navigateToAbout() {
    await this.header.step_clickAbout();
    return this;
  }
}
