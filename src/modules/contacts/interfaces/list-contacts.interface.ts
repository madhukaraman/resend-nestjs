import { ErrorResponse } from '@/common/interfaces/error.interface';
import { Contact } from './contact.interface';

export interface ListContactsOptions {
  audienceId: string;
}

export interface ListContactsResponseSuccess {
  object: 'list';
  data: Contact[];
}

export interface ListContactsResponse {
  data: ListContactsResponseSuccess | null;
  error: ErrorResponse | null;
}
