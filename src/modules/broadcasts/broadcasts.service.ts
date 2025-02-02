import { Injectable } from '@nestjs/common';
import { ResendHttpService } from '@/core/http/http.service';
import {
  CreateBroadcastOptions,
  CreateBroadcastRequestOptions,
  CreateBroadcastResponse,
  GetBroadcastResponse,
  ListBroadcastsResponse,
  RemoveBroadcastResponse,
  SendBroadcastOptions,
  SendBroadcastRequestOptions,
  SendBroadcastResponse,
} from './interfaces';

@Injectable()
export class BroadcastsService {
  constructor(private readonly httpService: ResendHttpService) {}

  async create(
    payload: CreateBroadcastOptions,
    options: CreateBroadcastRequestOptions = {},
  ): Promise<CreateBroadcastResponse> {
    const { audienceId, ...data } = payload;
    const headers = options.idempotencyKey
      ? { 'Idempotency-Key': options.idempotencyKey }
      : undefined;

    const requestOptions = headers ? { headers } : undefined;
    return this.httpService.post<CreateBroadcastResponse>(
      `/audiences/${audienceId}/broadcasts`,
      data,
      requestOptions,
    );
  }

  async send(
    id: string,
    payload?: SendBroadcastOptions,
    options: SendBroadcastRequestOptions = {},
  ): Promise<SendBroadcastResponse> {
    const headers = options.idempotencyKey
      ? { 'Idempotency-Key': options.idempotencyKey }
      : undefined;

    const requestOptions = headers ? { headers } : undefined;
    return this.httpService.post<SendBroadcastResponse>(
      `/broadcasts/${id}/send`,
      payload,
      requestOptions,
    );
  }

  async list(): Promise<ListBroadcastsResponse> {
    return this.httpService.get<ListBroadcastsResponse>('/broadcasts');
  }

  async get(id: string): Promise<GetBroadcastResponse> {
    return this.httpService.get<GetBroadcastResponse>(`/broadcasts/${id}`);
  }

  async remove(id: string): Promise<RemoveBroadcastResponse> {
    return this.httpService.delete<RemoveBroadcastResponse>(`/broadcasts/${id}`);
  }
}
