import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

/**
 * HeaderPanel class represents the navigation header panel.
 * Provides methods to interact with navigation elements across all pages.
 * Reference: https://pocketaces2.github.io/fashionhub/
 */
export class HeaderPanel extends BasePage {
  private homeLink = this.page.getByRole('link', { name: /^home$/i });
  private accountLink = this.page.getByRole('link', { name: /^account$/i });
  private clothingLink = this.page.getByRole('link', { name: /^clothing$/i });
  private shoppingBagLink = this.page.getByRole('link', { name: /^shopping bag$/i });
  private aboutLink = this.page.getByRole('link', { name: /^about$/i });

  /**
   * Creates an instance of HeaderPanel.
   * @param page - Playwright Page object
   */
  constructor(page: Page) {
    super(page);
  }

  /**
   * Click on Home navigation link.
   * @returns Current HeaderPanel instance for method chaining
   */
  async step_clickHome() {
    await this.homeLink.click();
    return this;
  }

  /**
   * Click on Account navigation link.
   * @returns Current HeaderPanel instance for method chaining
   */
  async step_clickAccount() {
    await this.accountLink.click();
    return this;
  }

  /**
   * Click on Clothing navigation link.
   * @returns Current HeaderPanel instance for method chaining
   */
  async step_clickClothing() {
    await this.clothingLink.click();
    return this;
  }

  /**
   * Click on Shopping Bag navigation link.
   * @returns Current HeaderPanel instance for method chaining
   */
  async step_clickShoppingBag() {
    await this.shoppingBagLink.click();
    return this;
  }

  /**
   * Click on About navigation link.
   * @returns Current HeaderPanel instance for method chaining
   */
  async step_clickAbout() {
    await this.aboutLink.click();
    return this;
  }
}
