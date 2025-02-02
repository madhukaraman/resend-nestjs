import { ErrorResponse } from '@/common/interfaces/error.interface';
import { Contact } from './contact.interface';

export interface GetContactOptions {
  audienceId: string;
  id: string;
}

export interface GetContactResponseSuccess {
  object: 'contact';
  data: Contact;
}

export interface GetContactResponse {
  data: GetContactResponseSuccess | null;
  error: ErrorResponse | null;
}
