import { ErrorResponse } from '@/common/interfaces/error.interface';

export interface VerifyDomainsResponseSuccess {
  object: 'domain';
}

export interface VerifyDomainsResponse {
  data: VerifyDomainsResponseSuccess | null;
  error: ErrorResponse | null;
}
