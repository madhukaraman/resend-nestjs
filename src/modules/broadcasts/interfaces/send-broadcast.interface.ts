import { ErrorResponse } from '@/common/interfaces/error.interface';

export interface SendBroadcastBaseOptions {
  scheduledAt?: string;
}

export interface SendBroadcastOptions extends SendBroadcastBaseOptions {}

export interface SendBroadcastRequestOptions {
  idempotencyKey?: string;
}

export interface SendBroadcastResponseSuccess {
  id: string;
}

export interface SendBroadcastResponse {
  data: SendBroadcastResponseSuccess | null;
  error: ErrorResponse | null;
}
