import { Injectable } from '@nestjs/common';
import { ResendHttpService } from '@/core/http/http.service';
import {
  SendEmailOptions,
  SendEmailResponse,
  GetEmailResponse,
} from './interfaces/email.interface';

@Injectable()
export class EmailsService {
  constructor(private readonly httpService: ResendHttpService) {}

  /**
   * Send an email
   * @param options Email options including from, to, subject, and content
   */
  async send(options: SendEmailOptions): Promise<SendEmailResponse> {
    return this.httpService.post<SendEmailResponse>('/emails', options);
  }

  /**
   * Get email by ID
   * @param id Email ID
   */
  async get(id: string): Promise<GetEmailResponse> {
    return this.httpService.get<GetEmailResponse>(`/emails/${id}`);
  }

  /**
   * List all emails
   */
  async list(): Promise<{ data: GetEmailResponse[] }> {
    return this.httpService.get<{ data: GetEmailResponse[] }>('/emails');
  }
}
