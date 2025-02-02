import { ErrorResponse } from '@/common/interfaces/error.interface';

export interface RemoveByOptions {
  id?: string;
  email?: string;
}

export interface RemoveContactOptions extends RemoveByOptions {
  audienceId: string;
}

export interface RemoveContactsResponseSuccess {
  object: 'contact';
  deleted: boolean;
  contact: string;
}

export interface RemoveContactsResponse {
  data: RemoveContactsResponseSuccess | null;
  error: ErrorResponse | null;
}
