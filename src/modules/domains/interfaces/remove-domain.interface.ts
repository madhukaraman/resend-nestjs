import { ErrorResponse } from '@/common/interfaces/error.interface';

export interface RemoveDomainsResponseSuccess {
  object: 'domain';
  deleted: boolean;
}

export interface RemoveDomainsResponse {
  data: RemoveDomainsResponseSuccess | null;
  error: ErrorResponse | null;
}
