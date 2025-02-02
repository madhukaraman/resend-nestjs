import { ErrorResponse } from '@/common/interfaces/error.interface';

export interface Attachment {
  /**
   * Base64 encoded content of the attachment
   */
  content: string;

  /**
   * Filename of the attachment
   */
  filename: string;

  /**
   * Path to the file (alternative to content)
   */
  path?: string;
}

export interface Tag {
  /**
   * Name of the tag
   */
  name: string;

  /**
   * Value of the tag
   */
  value: string;
}

/**
 * Options for creating and sending an email
 */
export interface CreateEmailOptions {
  /**
   * Sender's email address
   */
  from: string;

  /**
   * Recipient's email address or array of addresses
   */
  to: string | string[];

  /**
   * Email subject
   */
  subject: string;

  /**
   * Email content in HTML format
   */
  html?: string;

  /**
   * Plain text version of the email
   */
  text?: string;

  /**
   * Carbon copy recipients
   */
  cc?: string | string[];

  /**
   * Blind carbon copy recipients
   */
  bcc?: string | string[];

  /**
   * Reply-to email address
   */
  reply_to?: string;

  /**
   * List of attachments
   */
  attachments?: Attachment[];

  /**
   * List of tags for the email
   */
  tags?: Tag[];
}

export interface CreateEmailRequestOptions {
  /**
   * Idempotency key to prevent duplicate sends
   */
  idempotencyKey?: string;
}

export interface CreateEmailResponseSuccess {
  /**
   * Unique identifier of the sent email
   */
  id: string;
}

export interface CreateEmailResponse {
  data: CreateEmailResponseSuccess | null;
  error: ErrorResponse | null;
}
