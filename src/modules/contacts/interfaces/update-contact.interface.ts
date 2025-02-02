import { ErrorResponse } from '@/common/interfaces/error.interface';

export interface UpdateContactBaseOptions {
  id?: string;
  email?: string;
}

export interface UpdateContactOptions extends UpdateContactBaseOptions {
  audienceId: string;
  unsubscribed?: boolean;
  firstName?: string;
  lastName?: string;
}

export interface UpdateContactResponseSuccess {
  object: 'contact';
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  unsubscribed: boolean;
  created_at: string;
}

export interface UpdateContactResponse {
  data: UpdateContactResponseSuccess | null;
  error: ErrorResponse | null;
}
