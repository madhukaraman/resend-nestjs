/**
 * Standard error response from the Resend API
 */
export interface ErrorResponse {
  /**
   * Error message
   */
  message: string;

  /**
   * Error name/type
   */
  name: string;

  /**
   * HTTP status code
   */
  statusCode: number;
}
