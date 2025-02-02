import { ErrorResponse } from '@/common/interfaces/error.interface';
import { Audience } from './audience.interface';

export interface ListAudiencesResponseSuccess {
  object: 'list';
  data: Audience[];
}

export interface ListAudiencesResponse {
  data: ListAudiencesResponseSuccess | null;
  error: ErrorResponse | null;
}
