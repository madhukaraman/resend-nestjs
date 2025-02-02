import { Injectable } from '@nestjs/common';
import { ResendHttpService } from '@/core/http/http.service';
import {
  CreateBatchOptions,
  CreateBatchRequestOptions,
  CreateBatchResponse,
} from './interfaces';

@Injectable()
export class BatchService {
  constructor(private readonly httpService: ResendHttpService) {}

  async send(
    payload: CreateBatchOptions,
    options: CreateBatchRequestOptions = {},
  ): Promise<CreateBatchResponse> {
    const headers = options.idempotencyKey
      ? { 'Idempotency-Key': options.idempotencyKey }
      : undefined;

    const requestOptions = headers ? { headers } : undefined;
    return this.httpService.post<CreateBatchResponse>(
      '/emails/batch',
      payload,
      requestOptions,
    );
  }

  /**
   * Alias for send method to maintain compatibility with Node.js SDK
   */
  create = this.send;
}
