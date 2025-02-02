import { Injectable } from '@nestjs/common';
import { ResendHttpService } from '@/core/http/http.service';
import {
  CreateAudienceOptions,
  CreateAudienceRequestOptions,
  CreateAudienceResponse,
  GetAudienceResponse,
  ListAudiencesResponse,
  RemoveAudienceResponse,
} from './interfaces';

@Injectable()
export class AudiencesService {
  constructor(private readonly httpService: ResendHttpService) {}

  async create(
    payload: CreateAudienceOptions,
    options: CreateAudienceRequestOptions = {},
  ): Promise<CreateAudienceResponse> {
    const headers = options.idempotencyKey
      ? { 'Idempotency-Key': options.idempotencyKey }
      : undefined;

    const requestOptions = headers ? { headers } : undefined;
    return this.httpService.post<CreateAudienceResponse>(
      '/audiences',
      payload,
      requestOptions,
    );
  }

  async list(): Promise<ListAudiencesResponse> {
    return this.httpService.get<ListAudiencesResponse>('/audiences');
  }

  async get(id: string): Promise<GetAudienceResponse> {
    return this.httpService.get<GetAudienceResponse>(`/audiences/${id}`);
  }

  async remove(id: string): Promise<RemoveAudienceResponse> {
    return this.httpService.delete<RemoveAudienceResponse>(`/audiences/${id}`);
  }
}
