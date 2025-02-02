import { Test, TestingModule } from '@nestjs/testing';
import { ApiKeysService } from './api-keys.service';
import { ResendHttpService } from '@/core/http/http.service';
import { RESEND_OPTIONS } from '@/common/constants/tokens';
import { mockResendOptions } from '@/test/test-utils';

describe('ApiKeysService', () => {
  let service: ApiKeysService;
  let httpService: ResendHttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiKeysService,
        ResendHttpService,
        {
          provide: RESEND_OPTIONS,
          useValue: mockResendOptions,
        },
      ],
    }).compile();

    service = module.get<ApiKeysService>(ApiKeysService);
    httpService = module.get<ResendHttpService>(ResendHttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createApiKeyPayload = {
      name: 'Test API Key',
      permission: 'sending_access' as const,
      domain_id: 'domain_123',
    };

    const createApiKeyResponse = {
      data: {
        id: 'api_key_123',
        token: 're_123456789',
      },
      error: null,
    };

    it('should create an API key', async () => {
      jest.spyOn(httpService, 'post').mockResolvedValue(createApiKeyResponse);

      const result = await service.create(createApiKeyPayload);

      expect(httpService.post).toHaveBeenCalledWith(
        '/api-keys',
        createApiKeyPayload,
        undefined,
      );
      expect(result).toEqual(createApiKeyResponse);
    });

    it('should create an API key with idempotency key', async () => {
      const idempotencyKey = 'test-key';
      jest.spyOn(httpService, 'post').mockResolvedValue(createApiKeyResponse);

      const result = await service.create(createApiKeyPayload, { idempotencyKey });

      expect(httpService.post).toHaveBeenCalledWith(
        '/api-keys',
        createApiKeyPayload,
        {
          headers: { 'Idempotency-Key': idempotencyKey },
        },
      );
      expect(result).toEqual(createApiKeyResponse);
    });
  });

  describe('list', () => {
    const listApiKeysResponse = {
      data: {
        object: 'list',
        data: [
          {
            id: 'api_key_123',
            name: 'Test API Key',
            created_at: '2024-01-01T00:00:00.000Z',
          },
        ],
      },
      error: null,
    };

    it('should list API keys', async () => {
      jest.spyOn(httpService, 'get').mockResolvedValue(listApiKeysResponse);

      const result = await service.list();

      expect(httpService.get).toHaveBeenCalledWith('/api-keys');
      expect(result).toEqual(listApiKeysResponse);
    });
  });

  describe('remove', () => {
    const apiKeyId = 'api_key_123';
    const removeApiKeyResponse = {
      data: {
        object: 'api_key',
        deleted: true,
      },
      error: null,
    };

    it('should remove an API key', async () => {
      jest.spyOn(httpService, 'delete').mockResolvedValue(removeApiKeyResponse);

      const result = await service.remove(apiKeyId);

      expect(httpService.delete).toHaveBeenCalledWith(`/api-keys/${apiKeyId}`);
      expect(result).toEqual(removeApiKeyResponse);
    });
  });
});
