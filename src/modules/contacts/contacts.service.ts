import { Injectable } from '@nestjs/common';
import { ResendHttpService } from '@/core/http/http.service';
import {
  CreateContactOptions,
  CreateContactRequestOptions,
  CreateContactResponse,
  GetContactOptions,
  GetContactResponse,
  ListContactsOptions,
  ListContactsResponse,
  RemoveContactOptions,
  RemoveContactsResponse,
  UpdateContactOptions,
  UpdateContactResponse,
} from './interfaces';

@Injectable()
export class ContactsService {
  constructor(private readonly httpService: ResendHttpService) {}

  async create(
    payload: CreateContactOptions,
    options: CreateContactRequestOptions = {},
  ): Promise<CreateContactResponse> {
    const { audienceId, ...data } = payload;
    const headers = options.idempotencyKey
      ? { 'Idempotency-Key': options.idempotencyKey }
      : undefined;

    const requestOptions = headers ? { headers } : undefined;
    return this.httpService.post<CreateContactResponse>(
      `/audiences/${audienceId}/contacts`,
      data,
      requestOptions,
    );
  }

  async list(options: ListContactsOptions): Promise<ListContactsResponse> {
    const { audienceId } = options;
    return this.httpService.get<ListContactsResponse>(
      `/audiences/${audienceId}/contacts`,
    );
  }

  async get(options: GetContactOptions): Promise<GetContactResponse> {
    const { audienceId, id } = options;
    return this.httpService.get<GetContactResponse>(
      `/audiences/${audienceId}/contacts/${id}`,
    );
  }

  async update(payload: UpdateContactOptions): Promise<UpdateContactResponse> {
    const { audienceId, id, email, ...data } = payload;
    const identifier = id || email;

    if (!identifier) {
      throw new Error('Either id or email must be provided');
    }

    return this.httpService.patch<UpdateContactResponse>(
      `/audiences/${audienceId}/contacts/${identifier}`,
      data,
    );
  }

  async remove(payload: RemoveContactOptions): Promise<RemoveContactsResponse> {
    const { audienceId, id, email } = payload;
    const identifier = id || email;

    if (!identifier) {
      throw new Error('Either id or email must be provided');
    }

    return this.httpService.delete<RemoveContactsResponse>(
      `/audiences/${audienceId}/contacts/${identifier}`,
    );
  }
}
