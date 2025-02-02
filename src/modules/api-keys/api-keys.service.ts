import { Injectable } from '@nestjs/common';
import { ResendHttpService } from '@/core/http/http.service';
import {
  CreateApiKeyOptions,
  CreateApiKeyRequestOptions,
  CreateApiKeyResponse,
  ListApiKeysResponse,
  RemoveApiKeyResponse,
} from './interfaces';

@Injectable()
export class ApiKeysService {
  constructor(private readonly httpService: ResendHttpService) {}

  async create(
    payload: CreateApiKeyOptions,
    options: CreateApiKeyRequestOptions = {},
  ): Promise<CreateApiKeyResponse> {
    const headers = options.idempotencyKey
      ? { 'Idempotency-Key': options.idempotencyKey }
      : undefined;

    const requestOptions = headers ? { headers } : undefined;
    return this.httpService.post<CreateApiKeyResponse>(
      '/api-keys',
      payload,
      requestOptions,
    );
  }

  async list(): Promise<ListApiKeysResponse> {
    return this.httpService.get<ListApiKeysResponse>('/api-keys');
  }

  async remove(id: string): Promise<RemoveApiKeyResponse> {
    return this.httpService.delete<RemoveApiKeyResponse>(`/api-keys/${id}`);
  }
}
