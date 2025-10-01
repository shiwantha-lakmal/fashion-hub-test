import { test, expect } from '../src/config/page.config';
import { GitHubClient } from '../src/api/GitHubClient';
import { DataExportUtil } from '../src/config/util.config';

/**
 * Test Case 4
 * As a product owner, I want to see how many open pull requests are there for our product.
 * You can use https://github.com/appwrite/appwrite/pulls as an example product
 */

test.describe('FashionHub Pull Request Analysis', () => {
  let githubClient: GitHubClient;

  test.beforeAll(async () => {
    githubClient = new GitHubClient();
    await githubClient.initialize();
  });

  test('should get open pull requests count for Appwrite repository', async () => {
    const stats = await githubClient.getPullRequestStats('appwrite', 'appwrite');
    
    DataExportUtil.formatPullRequestConsoleOutput(stats, 'appwrite', 'appwrite');
    const csvPath = await DataExportUtil.generatePullRequestCSV(stats, 'appwrite', 'appwrite');
    DataExportUtil.logCSVGeneration(csvPath, stats.recentPRs.length);
    
    expect(stats.totalOpen).toBeGreaterThanOrEqual(0);
    expect(stats.recentPRs.length).toBeLessThanOrEqual(5);
  });
});
