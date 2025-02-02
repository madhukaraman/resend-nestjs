import { ErrorResponse } from '@/common/interfaces/error.interface';
import { Broadcast } from './broadcast.interface';

export interface GetBroadcastResponseSuccess {
  object: 'broadcast';
  data: Broadcast;
}

export interface GetBroadcastResponse {
  data: GetBroadcastResponseSuccess | null;
  error: ErrorResponse | null;
}
