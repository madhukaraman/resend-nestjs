import { ErrorResponse } from '@/common/interfaces/error.interface';

export interface RemoveApiKeyResponseSuccess {
  object: 'api_key';
  deleted: boolean;
}

export interface RemoveApiKeyResponse {
  data: RemoveApiKeyResponseSuccess | null;
  error: ErrorResponse | null;
}
