import { ErrorResponse } from '@/common/interfaces/error.interface';

export interface CreateApiKeyOptions {
  name: string;
  permission?: 'full_access' | 'sending_access';
  domain_id?: string;
}

export interface CreateApiKeyRequestOptions {
  idempotencyKey?: string;
}

export interface CreateApiKeyResponseSuccess {
  token: string;
  id: string;
}

export interface CreateApiKeyResponse {
  data: CreateApiKeyResponseSuccess | null;
  error: ErrorResponse | null;
}
