import { Test, TestingModule } from '@nestjs/testing';
import { BatchService } from './batch.service';
import { ResendHttpService } from '@/core/http/http.service';
import { RESEND_OPTIONS } from '@/common/constants/tokens';
import { mockResendOptions } from '@/test/test-utils';
import { CreateBatchOptions } from './interfaces';

describe('BatchService', () => {
  let service: BatchService;
  let httpService: ResendHttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BatchService,
        ResendHttpService,
        {
          provide: RESEND_OPTIONS,
          useValue: mockResendOptions,
        },
      ],
    }).compile();

    service = module.get<BatchService>(BatchService);
    httpService = module.get<ResendHttpService>(ResendHttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('send', () => {
    const batchPayload: CreateBatchOptions = [
      {
        from: 'john@example.com',
        to: 'jane@example.com',
        subject: 'Hello World',
        html: '<h1>Hello world</h1>',
      },
      {
        from: 'alice@example.com',
        to: 'bob@example.com',
        subject: 'Hi there',
        html: '<h1>Hi there</h1>',
      },
      {
        from: 'charlie@example.com',
        to: 'dave@example.com',
        subject: 'Greetings',
        html: '<h1>Greetings</h1>',
      },
    ];

    const batchResponse = {
      data: {
        data: [
          { id: 'email_1' },
          { id: 'email_2' },
          { id: 'email_3' },
        ],
      },
      error: null,
    };

    it('should send batch emails', async () => {
      jest.spyOn(httpService, 'post').mockResolvedValue(batchResponse);

      const result = await service.send(batchPayload);

      expect(httpService.post).toHaveBeenCalledWith(
        '/emails/batch',
        batchPayload,
        undefined,
      );
      expect(result).toEqual(batchResponse);
    });

    it('should send batch emails with idempotency key', async () => {
      const idempotencyKey = 'test-key';
      jest.spyOn(httpService, 'post').mockResolvedValue(batchResponse);

      const result = await service.send(batchPayload, { idempotencyKey });

      expect(httpService.post).toHaveBeenCalledWith(
        '/emails/batch',
        batchPayload,
        {
          headers: { 'Idempotency-Key': idempotencyKey },
        },
      );
      expect(result).toEqual(batchResponse);
    });
  });

  describe('create', () => {
    it('should be an alias for send', () => {
      expect(service.create).toBe(service.send);
    });
  });
});
