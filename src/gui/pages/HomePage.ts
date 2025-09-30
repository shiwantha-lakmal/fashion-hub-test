import { Page, Locator, expect } from '@playwright/test';
import { BasePage, HeaderPanel, AccountPage } from '@config/page-loader';

/**
 * HomePage class represents the FashionHub home page.
 * Provides methods to interact with home page elements and verify page state.
 * Reference: https://pocketaces2.github.io/fashionhub/
 */
export class HomePage extends BasePage {
  public header: HeaderPanel;
  private heroHeading = this.page.getByRole('heading', { name: /welcome to fashionhub/i });
  private shopNowButton = this.page.getByRole('link', { name: /shop now/i });

  /**
   * Creates an instance of HomePage.
   * @param page - Playwright Page object
   */
  constructor(page: Page) {
    super(page);
    this.header = new HeaderPanel(page);
  }

  /**
   * Verify that the hero heading is visible.
   * Asserts that the "Welcome to FashionHub" heading is displayed.
   * @returns Current HomePage instance for method chaining
   */
  async verify_heroHeading() {
    await expect(this.heroHeading).toBeVisible();
    return this;
  }

  /**
   * Verify that the Shop Now button is visible.
   * Asserts that the CTA button is displayed.
   * @returns Current HomePage instance for method chaining
   */
  async verify_shopNowButton() {
    await expect(this.shopNowButton).toBeVisible();
    return this;
  }

  /**
   * Click the Shop Now button.
   * @returns Current HomePage instance for method chaining
   */
  async step_clickShopNow() {
    await this.shopNowButton.click();
    return this;
  }

  /**
   * Verify complete home page state.
   * Checks hero heading, description, and Shop Now button.
   * @returns Current HomePage instance for method chaining
   */
  async verify_homePageState() {
    await this.verify_heroHeading();
    await this.verify_shopNowButton();
    return this;
  }

  /**
   * Navigate to Account page using header menu.
   * @returns AccountPage instance after navigation
   */
  async step_navigateToAccount() {
    await this.header.step_clickAccount();
    return new AccountPage(this.page);
  }

  /**
   * Navigate to Clothing page using header menu.
   * @returns Current HomePage instance for method chaining
   */
  async step_navigateToClothing() {
    await this.header.step_clickClothing();
    return this;
  }

  /**
   * Navigate to Shopping Bag page using header menu.
   * @returns Current HomePage instance for method chaining
   */
  async step_navigateToShoppingBag() {
    await this.header.step_clickShoppingBag();
    return this;
  }

  /**
   * Navigate to About page using header menu.
   * @returns Current HomePage instance for method chaining
   */
  async step_navigateToAbout() {
    await this.header.step_clickAbout();
    return this;
  }
}