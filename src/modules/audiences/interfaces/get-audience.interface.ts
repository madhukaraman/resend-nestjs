import { ErrorResponse } from '@/common/interfaces/error.interface';
import { Audience } from './audience.interface';

export interface GetAudienceResponseSuccess {
  object: 'audience';
  data: Audience;
}

export interface GetAudienceResponse {
  data: GetAudienceResponseSuccess | null;
  error: ErrorResponse | null;
}
