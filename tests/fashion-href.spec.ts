import { test, expect } from '../src/config/page.config';
import { getHomeURL } from '@config/env.config';

/**
 * Test Case 2
 * As a tester, I want to check if a page is returning the expected status code
 * - Fetch each link on https://pocketaces2.github.io/fashionhub/
 * - Verify pages return 200 or 30x status codes (broken links)
 */

test.describe('FashionHub Broken Link Validation', () => {
  test('should have no broken links on the homepage', async ({ page, homePage }) => {
    await page.goto(getHomeURL());
    await homePage.waitForPageReady()
    await homePage.verify_brokenLinks()
  });
});

