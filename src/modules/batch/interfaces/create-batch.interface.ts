import { ErrorResponse } from '@/common/interfaces/error.interface';
import { CreateEmailOptions } from '@/modules/emails/interfaces/create-email.interface';

export type CreateBatchOptions = CreateEmailOptions[];

export interface CreateBatchRequestOptions {
  idempotencyKey?: string;
}

export interface CreateBatchSuccessResponse {
  data: {
    /** The ID of the newly created email. */
    id: string;
  }[];
}

export interface CreateBatchResponse {
  data: CreateBatchSuccessResponse | null;
  error: ErrorResponse | null;
}
