import { ErrorResponse } from '@/common/interfaces/error.interface';

interface EmailRenderOptions {
  react?: React.ReactNode;
  html?: string;
  text?: string;
}

export interface CreateBroadcastBaseOptions {
  /**
   * The name of the broadcast
   */
  name?: string;

  /**
   * The id of the audience you want to send to
   */
  audienceId: string;

  /**
   * A short snippet of text displayed as a preview in recipients' inboxes, often shown below or beside the subject line.
   */
  previewText?: string;

  /**
   * Sender email address. To include a friendly name, use the format "Your Name <sender@domain.com>"
   */
  from: string;

  /**
   * The subject line of the email
   */
  subject: string;

  /**
   * The email address to reply to
   */
  replyTo?: string[];
}

export interface CreateBroadcastOptions extends CreateBroadcastBaseOptions, EmailRenderOptions {}

export interface CreateBroadcastRequestOptions {
  idempotencyKey?: string;
}

export interface CreateBroadcastResponseSuccess {
  id: string;
}

export interface CreateBroadcastResponse {
  data: CreateBroadcastResponseSuccess | null;
  error: ErrorResponse | null;
}
