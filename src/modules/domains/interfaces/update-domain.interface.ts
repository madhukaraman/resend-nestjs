import { ErrorResponse } from '@/common/interfaces/error.interface';

export interface UpdateDomainsOptions {
  id: string;
  clickTracking?: boolean;
  openTracking?: boolean;
  tls?: 'enforced' | 'opportunistic';
}

export interface UpdateDomainsResponseSuccess {
  object: 'domain';
}

export interface UpdateDomainsResponse {
  data: UpdateDomainsResponseSuccess | null;
  error: ErrorResponse | null;
}
