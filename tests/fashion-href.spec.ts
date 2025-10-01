import { test, expect } from '@playwright/test';
import { HomePage } from '@config/page-loader';
import { getHomeURL } from '@config/env.config';

/**
 * Test Case 2 Answer
 * As a tester, I want to check if a page is returning the expected status code
 * - Fetch each link on https://pocketaces2.github.io/fashionhub/
 * - Verify pages return 200 or 30x status codes (broken links)
 * - Ready use across the all pages putting single line of code
 */

test.describe('FashionHub Broken Link Validation', () => {
  test('should have no broken links on the homepage', async ({ page }) => {
    await page.goto(getHomeURL());
    await new HomePage(page)
      .waitForPageReady()
      .then(homePage => homePage.verify_brokenLinks()); // <- this starts verifying the broken links
  });
});

