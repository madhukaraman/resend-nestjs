import { ErrorResponse } from '@/common/interfaces/error.interface';

export interface RemoveAudienceResponseSuccess {
  object: 'audience';
  deleted: boolean;
}

export interface RemoveAudienceResponse {
  data: RemoveAudienceResponseSuccess | null;
  error: ErrorResponse | null;
}
