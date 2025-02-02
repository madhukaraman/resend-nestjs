import { ErrorResponse } from '@/common/interfaces/error.interface';
import { DomainRecords, DomainRegion } from './domain.interface';

export interface CreateDomainOptions {
  name: string;
  region?: DomainRegion;
}

export interface CreateDomainRequestOptions {
  idempotencyKey?: string;
}

export interface CreateDomainResponseSuccess {
  id: string;
  object: 'domain';
  name: string;
  status: string;
  records: DomainRecords[];
  created_at: string;
  region: DomainRegion;
}

export interface CreateDomainResponse {
  data: CreateDomainResponseSuccess | null;
  error: ErrorResponse | null;
}
