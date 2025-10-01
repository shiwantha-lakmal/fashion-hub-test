import { BaseClient } from './BaseClient';

export interface PullRequest {
  id: number;
  number: number;
  title: string;
  state: 'open' | 'closed';
  user: { login: string };
  created_at: string;
  html_url: string;
}

/**
 * Simplified GitHubClient for pull request analysis
 */
export class GitHubClient extends BaseClient {
  constructor() {
    super('https://api.github.com');
  }

  async initialize(): Promise<void> {
    this.headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'FashionHub-Test-Automation/1.0.0'
    };
  }

  protected async get(endpoint: string, params?: Record<string, string>): Promise<Response> {
    const url = this.normalizeEndpoint(endpoint);
    const queryString = params ? `?${this.buildQueryString(params)}` : '';
    const fullUrl = `${this.baseURL}${url}${queryString}`;
    
    return await fetch(fullUrl, {
      method: 'GET',
      headers: this.headers
    });
  }

  /**
   * Get open pull requests for a repository
   */
  async getOpenPullRequests(owner: string, repo: string): Promise<PullRequest[]> {
    const response = await this.get(`/repos/${owner}/${repo}/pulls`, {
      state: 'open',
      per_page: '100'
    });
    return await this.handleResponse<PullRequest[]>(response);
  }

  /**
   * Get pull request statistics
   */
  async getPullRequestStats(owner: string, repo: string): Promise<{
    totalOpen: number;
    recentPRs: PullRequest[];
  }> {
    const pullRequests = await this.getOpenPullRequests(owner, repo);
    return {
      totalOpen: pullRequests.length,
      recentPRs: pullRequests.slice(0, 5)
    };
  }
}
