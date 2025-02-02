export interface SendEmailOptions {
  from: string;
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  cc?: string | string[];
  bcc?: string | string[];
  reply_to?: string;
  tags?: Array<{ name: string; value: string }>;
}

export interface SendEmailResponse {
  id: string;
}

export interface GetEmailResponse {
  id: string;
  object: string;
  from: string;
  to: string[];
  created_at: string;
  subject: string;
  html: string | null;
  text: string | null;
  reply_to: string | null;
  cc: string[] | null;
  bcc: string[] | null;
  last_event: string;
}
