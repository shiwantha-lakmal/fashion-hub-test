import { BaseClient } from './BaseClient';


/**
 * PetClient handles all pet-related API operations
 * API Reference: https://petstore.swagger.io/v2
 */
export class PetClient extends BaseClient {
  private apiKey: string;
  constructor() {
    super('https://petstore.swagger.io/v2');
    this.apiKey = 'special-key';
  }

  /**
   * Initialize the client
   */
  async setup(): Promise<void> {
    await this.initialize();
  }

}
