import { Injectable } from '@nestjs/common';
import { ResendHttpService } from '@/core/http/http.service';
import {
  CreateDomainOptions,
  CreateDomainRequestOptions,
  CreateDomainResponse,
  GetDomainResponse,
  ListDomainsResponse,
  RemoveDomainsResponse,
  UpdateDomainsOptions,
  UpdateDomainsResponse,
  VerifyDomainsResponse,
} from './interfaces';

@Injectable()
export class DomainsService {
  constructor(private readonly httpService: ResendHttpService) {}

  async create(
    payload: CreateDomainOptions,
    options: CreateDomainRequestOptions = {},
  ): Promise<CreateDomainResponse> {
    const headers = options.idempotencyKey
      ? { 'Idempotency-Key': options.idempotencyKey }
      : undefined;

    const requestOptions = headers ? { headers } : undefined;
    return this.httpService.post<CreateDomainResponse>('/domains', payload, requestOptions);
  }

  async list(): Promise<ListDomainsResponse> {
    return this.httpService.get<ListDomainsResponse>('/domains');
  }

  async get(id: string): Promise<GetDomainResponse> {
    return this.httpService.get<GetDomainResponse>(`/domains/${id}`);
  }

  async update(payload: UpdateDomainsOptions): Promise<UpdateDomainsResponse> {
    const { id, ...data } = payload;
    return this.httpService.patch<UpdateDomainsResponse>(`/domains/${id}`, data);
  }

  async remove(id: string): Promise<RemoveDomainsResponse> {
    return this.httpService.delete<RemoveDomainsResponse>(`/domains/${id}`);
  }

  async verify(id: string): Promise<VerifyDomainsResponse> {
    return this.httpService.post<VerifyDomainsResponse>(`/domains/${id}/verify`);
  }
}
