import { ErrorResponse } from '@/common/interfaces/error.interface';

export interface CreateAudienceOptions {
  name: string;
}

export interface CreateAudienceRequestOptions {
  idempotencyKey?: string;
}

export interface CreateAudienceResponseSuccess {
  object: 'audience';
  id: string;
  name: string;
  created_at: string;
}

export interface CreateAudienceResponse {
  data: CreateAudienceResponseSuccess | null;
  error: ErrorResponse | null;
}
