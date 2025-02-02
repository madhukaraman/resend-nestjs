import { ErrorResponse } from '@/common/interfaces/error.interface';
import { ApiKey } from './api-key.interface';

export interface ListApiKeysResponseSuccess {
  object: 'list';
  data: ApiKey[];
}

export interface ListApiKeysResponse {
  data: ListApiKeysResponseSuccess | null;
  error: ErrorResponse | null;
}
