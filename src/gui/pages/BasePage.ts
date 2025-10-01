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
   * Wait for page to be fully loaded.
   * Waits for network to be idle.
   * @returns Promise that resolves when page is ready
   */
  async waitForPageReady() {
    await this.page.waitForLoadState('networkidle');
    return this;
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

  /**
   * Verify broken links on the page.
   * Validates all links return 200 or 30x status codes, no 40x codes.
   * @returns Current page instance for method chaining
   */
  async verify_brokenLinks() {
    const hrefs = await this.page.$$eval('a[href]', (anchors) =>
      anchors.map((a: any) => a.href).filter((href: string) => href && !href.startsWith('javascript:'))
    );
    const uniqueLinks = [...new Set(hrefs)];

    const results = { valid: 0, redirect: 0, broken: [] as string[] };

    for (const url of uniqueLinks) {
      try {
        const status = (await this.page.request.get(url)).status();
        if (status < 300) results.valid++;
        else if (status < 400) results.redirect++;
        else if (status < 500) results.broken.push(`[${status}] ${url}`);
      } catch (error: any) {
        results.broken.push(`[Error] ${url}`);
      }
    }

    console.log('\n📊 Link Validation Summary');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Total: ${uniqueLinks.length} | Valid: ${results.valid} | Redirects: ${results.redirect} | Broken: ${results.broken.length}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    if (results.broken.length > 0) {
      results.broken.forEach((link, i) => console.log(`  ${i + 1}. ${link}`));
      console.log('');
    }

    expect(results.broken.length, `Found ${results.broken.length} broken link(s)`).toBe(0);
    return this;
  }
}
