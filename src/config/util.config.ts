import * as fs from 'fs';
import * as path from 'path';

export interface PullRequestData {
  number: number;
  title: string;
  user: { login: string };
  state: string;
  created_at: string;
  html_url: string;
}

export interface PullRequestStats {
  totalOpen: number;
  recentPRs: PullRequestData[];
}

/**
 * Utility functions for data export and formatting
 */
export class DataExportUtil {
  /**
   * Generate CSV file for pull request data
   * @param stats - Pull request statistics
   * @param owner - Repository owner
   * @param repo - Repository name
   * @param filename - CSV filename (default: 'pull-request.csv')
   */
  static async generatePullRequestCSV(
    stats: PullRequestStats, 
    owner: string, 
    repo: string, 
    filename: string = 'pull-request.csv'
  ): Promise<string> {
    const csvPath = path.join(process.cwd(), filename);
    
    // CSV headers
    const headers = ['PR Number', 'Title', 'Author', 'State', 'Created Date', 'URL'];
    
    // CSV data rows
    const rows = stats.recentPRs.map((pr) => [
      pr.number,
      `"${pr.title.replace(/"/g, '""')}"`, // Escape quotes in title
      pr.user.login,
      pr.state,
      new Date(pr.created_at).toISOString().split('T')[0], // Format as YYYY-MM-DD
      pr.html_url
    ]);
    
    // Combine headers and data
    const csvContent = [headers, ...rows]
      .map(row => row.join(','))
      .join('\n');
    
    // Write to file
    fs.writeFileSync(csvPath, csvContent, 'utf8');
    
    return csvPath;
  }

  /**
   * Format pull request data for console display
   * @param stats - Pull request statistics
   * @param owner - Repository owner
   * @param repo - Repository name
   */
  static formatPullRequestConsoleOutput(stats: PullRequestStats, owner: string, repo: string): void {
    console.log('\n📊 Pull Request Analysis');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Repository: ${owner}/${repo}`);
    console.log(`Total Open PRs: ${stats.totalOpen}`);
    
    if (stats.recentPRs.length > 0) {
      console.log('\n📋 Recent Pull Requests:');
      stats.recentPRs.forEach((pr, index) => {
        console.log(`   ${index + 1}. #${pr.number} - ${pr.title}`);
        console.log(`      Author: ${pr.user.login}`);
      });
    }
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  }

  /**
   * Log CSV generation confirmation
   * @param csvPath - Path to generated CSV file
   * @param recordCount - Number of records in CSV
   */
  static logCSVGeneration(csvPath: string, recordCount: number): void {
    console.log(`📄 CSV file generated: ${csvPath}`);
    console.log(`   Contains ${recordCount} pull requests`);
  }
}
