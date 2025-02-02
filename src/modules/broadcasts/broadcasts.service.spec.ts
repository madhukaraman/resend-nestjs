import { Test, TestingModule } from '@nestjs/testing';
import { BroadcastsService } from './broadcasts.service';
import { ResendHttpService } from '@/core/http/http.service';
import { RESEND_OPTIONS } from '@/common/constants/tokens';
import { mockResendOptions } from '@/test/test-utils';

describe('BroadcastsService', () => {
  let service: BroadcastsService;
  let httpService: ResendHttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BroadcastsService,
        ResendHttpService,
        {
          provide: RESEND_OPTIONS,
          useValue: mockResendOptions,
        },
      ],
    }).compile();

    service = module.get<BroadcastsService>(BroadcastsService);
    httpService = module.get<ResendHttpService>(ResendHttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createBroadcastPayload = {
      audienceId: 'aud_123',
      name: 'Test Broadcast',
      from: 'test@example.com',
      subject: 'Test Subject',
      html: '<p>Test content</p>',
    };

    const createBroadcastResponse = {
      data: {
        id: 'broadcast_123',
      },
      error: null,
    };

    it('should create a broadcast', async () => {
      jest.spyOn(httpService, 'post').mockResolvedValue(createBroadcastResponse);

      const result = await service.create(createBroadcastPayload);

      expect(httpService.post).toHaveBeenCalledWith(
        `/audiences/${createBroadcastPayload.audienceId}/broadcasts`,
        {
          name: createBroadcastPayload.name,
          from: createBroadcastPayload.from,
          subject: createBroadcastPayload.subject,
          html: createBroadcastPayload.html,
        },
        undefined,
      );
      expect(result).toEqual(createBroadcastResponse);
    });

    it('should create a broadcast with idempotency key', async () => {
      const idempotencyKey = 'test-key';
      jest.spyOn(httpService, 'post').mockResolvedValue(createBroadcastResponse);

      const result = await service.create(createBroadcastPayload, { idempotencyKey });

      expect(httpService.post).toHaveBeenCalledWith(
        `/audiences/${createBroadcastPayload.audienceId}/broadcasts`,
        {
          name: createBroadcastPayload.name,
          from: createBroadcastPayload.from,
          subject: createBroadcastPayload.subject,
          html: createBroadcastPayload.html,
        },
        {
          headers: { 'Idempotency-Key': idempotencyKey },
        },
      );
      expect(result).toEqual(createBroadcastResponse);
    });
  });

  describe('send', () => {
    const broadcastId = 'broadcast_123';
    const sendBroadcastPayload = {
      scheduledAt: '2024-01-01T00:00:00Z',
    };

    const sendBroadcastResponse = {
      data: {
        id: broadcastId,
      },
      error: null,
    };

    it('should send a broadcast', async () => {
      jest.spyOn(httpService, 'post').mockResolvedValue(sendBroadcastResponse);

      const result = await service.send(broadcastId, sendBroadcastPayload);

      expect(httpService.post).toHaveBeenCalledWith(
        `/broadcasts/${broadcastId}/send`,
        sendBroadcastPayload,
        undefined,
      );
      expect(result).toEqual(sendBroadcastResponse);
    });

    it('should send a broadcast with idempotency key', async () => {
      const idempotencyKey = 'test-key';
      jest.spyOn(httpService, 'post').mockResolvedValue(sendBroadcastResponse);

      const result = await service.send(broadcastId, sendBroadcastPayload, { idempotencyKey });

      expect(httpService.post).toHaveBeenCalledWith(
        `/broadcasts/${broadcastId}/send`,
        sendBroadcastPayload,
        {
          headers: { 'Idempotency-Key': idempotencyKey },
        },
      );
      expect(result).toEqual(sendBroadcastResponse);
    });
  });

  describe('list', () => {
    const listBroadcastsResponse = {
      data: {
        object: 'list',
        data: [
          {
            id: 'broadcast_123',
            name: 'Test Broadcast',
            audience_id: 'aud_123',
            status: 'draft',
            created_at: '2024-01-01T00:00:00Z',
            scheduled_at: null,
            sent_at: null,
          },
        ],
      },
      error: null,
    };

    it('should list broadcasts', async () => {
      jest.spyOn(httpService, 'get').mockResolvedValue(listBroadcastsResponse);

      const result = await service.list();

      expect(httpService.get).toHaveBeenCalledWith('/broadcasts');
      expect(result).toEqual(listBroadcastsResponse);
    });
  });

  describe('get', () => {
    const broadcastId = 'broadcast_123';
    const getBroadcastResponse = {
      data: {
        object: 'broadcast',
        data: {
          id: broadcastId,
          name: 'Test Broadcast',
          audience_id: 'aud_123',
          from: 'test@example.com',
          subject: 'Test Subject',
          reply_to: null,
          preview_text: null,
          status: 'draft',
          created_at: '2024-01-01T00:00:00Z',
          scheduled_at: null,
          sent_at: null,
        },
      },
      error: null,
    };

    it('should get a broadcast', async () => {
      jest.spyOn(httpService, 'get').mockResolvedValue(getBroadcastResponse);

      const result = await service.get(broadcastId);

      expect(httpService.get).toHaveBeenCalledWith(`/broadcasts/${broadcastId}`);
      expect(result).toEqual(getBroadcastResponse);
    });
  });

  describe('remove', () => {
    const broadcastId = 'broadcast_123';
    const removeBroadcastResponse = {
      data: {
        object: 'broadcast',
        deleted: true,
      },
      error: null,
    };

    it('should remove a broadcast', async () => {
      jest.spyOn(httpService, 'delete').mockResolvedValue(removeBroadcastResponse);

      const result = await service.remove(broadcastId);

      expect(httpService.delete).toHaveBeenCalledWith(`/broadcasts/${broadcastId}`);
      expect(result).toEqual(removeBroadcastResponse);
    });
  });
});
