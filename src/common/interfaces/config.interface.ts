export interface ResendOptions {
  /**
   * Resend API key
   */
  apiKey: string;

  /**
   * Base URL for the Resend API
   * @default 'https://api.resend.com'
   */
  baseUrl?: string;

  /**
   * Custom user agent string
   */
  userAgent?: string;
}

export interface ResendAsyncOptions {
  /**
   * Factory function to create ResendOptions
   */
  useFactory: (...args: any[]) => Promise<ResendOptions> | ResendOptions;

  /**
   * Factory function dependencies
   */
  inject?: any[];

  /**
   * Optional imports needed for configuration
   */
  imports?: any[];
}
