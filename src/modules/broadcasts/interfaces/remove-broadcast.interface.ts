import { ErrorResponse } from '@/common/interfaces/error.interface';

export interface RemoveBroadcastResponseSuccess {
  object: 'broadcast';
  deleted: boolean;
}

export interface RemoveBroadcastResponse {
  data: RemoveBroadcastResponseSuccess | null;
  error: ErrorResponse | null;
}
