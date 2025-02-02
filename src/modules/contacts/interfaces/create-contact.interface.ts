import { ErrorResponse } from '@/common/interfaces/error.interface';

export interface CreateContactOptions {
  audienceId: string;
  email: string;
  unsubscribed?: boolean;
  firstName?: string;
  lastName?: string;
}

export interface CreateContactRequestOptions {
  idempotencyKey?: string;
}

export interface CreateContactResponseSuccess {
  object: 'contact';
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  unsubscribed: boolean;
  created_at: string;
}

export interface CreateContactResponse {
  data: CreateContactResponseSuccess | null;
  error: ErrorResponse | null;
}
