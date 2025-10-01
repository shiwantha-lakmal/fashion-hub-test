import { Page, expect } from '@playwright/test';

/**
 * BasePage class provides common functionality for all page objects.
 * All page objects should extend this class to inherit base methods.
 */
export class BasePage {
  protected page: Page;

  /**
   * Creates an instance of BasePage.
   * @param page - Playwright Page object
   */
  constructor(page: Page) {
    this.page = page;
    if (!(page as any)._consoleErrors) {
      (page as any)._consoleErrors = [];
      (page as any)._pageErrors = [];
      (page as any)._monitoringStarted = false;
    }
  }

  /**
   * Navigate to a specific URL.
   * @param url - The URL to navigate to
   * @returns Current page instance for method chaining
   */
  async goto(url: string) {
    await this.page.goto(url);
    return this;
  }

  /**
   * Wait for the page to be fully loaded.
   * Waits for 'domcontentloaded' state.
   * @returns Current page instance for method chaining
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
    return this;
  }

  /**
   * Start monitoring console and page errors.
   * Call this before navigation to capture all errors.
   * @returns Current page instance for method chaining
   */
  startConsoleMonitoring() {
    const pageAny = this.page as any;
    
    if (pageAny._monitoringStarted) {
      return this;
    }

    this.page.on('console', (msg) => {
      if (msg.type() === 'error') {
        pageAny._consoleErrors.push(msg.text());
      }
    });

    this.page.on('pageerror', (error) => {
      pageAny._pageErrors.push(`${error.name}: ${error.message}`);
    });

    pageAny._monitoringStarted = true;
    return this;
  }

  /**
   * Verify console logs and display summary.
   * Call this at the end of the test to check for errors.
   * @returns Current page instance for method chaining
   */
  async verifyConsoleLogs() {
    const pageAny = this.page as any;
    const consoleErrors = pageAny._consoleErrors || [];
    const pageErrors = pageAny._pageErrors || [];
    const totalErrors = consoleErrors.length + pageErrors.length;

    console.log('\n📊 Console Error Summary');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Total Errors: ${totalErrors}`);
    console.log(`  • Console Errors: ${consoleErrors.length}`);
    console.log(`  • Unhandled Exceptions: ${pageErrors.length}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    return this;
  }
}
