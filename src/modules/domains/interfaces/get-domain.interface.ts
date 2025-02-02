import { ErrorResponse } from '@/common/interfaces/error.interface';
import { DomainRecords } from './domain.interface';

export interface GetDomainResponseSuccess {
  object: 'domain';
  records: DomainRecords[];
}

export interface GetDomainResponse {
  data: GetDomainResponseSuccess | null;
  error: ErrorResponse | null;
}
