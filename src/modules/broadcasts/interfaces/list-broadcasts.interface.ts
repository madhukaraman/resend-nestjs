import { ErrorResponse } from '@/common/interfaces/error.interface';
import { Broadcast } from './broadcast.interface';

export interface ListBroadcastsResponseSuccess {
  object: 'list';
  data: Pick<
    Broadcast,
    | 'id'
    | 'name'
    | 'audience_id'
    | 'status'
    | 'created_at'
    | 'scheduled_at'
    | 'sent_at'
  >[];
}

export interface ListBroadcastsResponse {
  data: ListBroadcastsResponseSuccess | null;
  error: ErrorResponse | null;
}
