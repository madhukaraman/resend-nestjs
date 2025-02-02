import { ErrorResponse } from '@/common/interfaces/error.interface';
import { Domain } from './domain.interface';

export interface ListDomainsResponseSuccess {
  data: Domain[];
}

export interface ListDomainsResponse {
  data: ListDomainsResponseSuccess | null;
  error: ErrorResponse | null;
}
