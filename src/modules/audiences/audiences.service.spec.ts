import { Test, TestingModule } from '@nestjs/testing';
import { AudiencesService } from './audiences.service';
import { ResendHttpService } from '@/core/http/http.service';
import { RESEND_OPTIONS } from '@/common/constants/tokens';
import { mockResendOptions } from '@/test/test-utils';

describe('AudiencesService', () => {
  let service: AudiencesService;
  let httpService: ResendHttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AudiencesService,
        ResendHttpService,
        {
          provide: RESEND_OPTIONS,
          useValue: mockResendOptions,
        },
      ],
    }).compile();

    service = module.get<AudiencesService>(AudiencesService);
    httpService = module.get<ResendHttpService>(ResendHttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createAudiencePayload = {
      name: 'Test Audience',
    };

    const createAudienceResponse = {
      data: {
        object: 'audience',
        id: 'aud_123',
        name: 'Test Audience',
        created_at: '2024-01-01T00:00:00.000Z',
      },
      error: null,
    };

    it('should create an audience', async () => {
      jest.spyOn(httpService, 'post').mockResolvedValue(createAudienceResponse);

      const result = await service.create(createAudiencePayload);

      expect(httpService.post).toHaveBeenCalledWith(
        '/audiences',
        createAudiencePayload,
        undefined,
      );
      expect(result).toEqual(createAudienceResponse);
    });

    it('should create an audience with idempotency key', async () => {
      const idempotencyKey = 'test-key';
      jest.spyOn(httpService, 'post').mockResolvedValue(createAudienceResponse);

      const result = await service.create(createAudiencePayload, { idempotencyKey });

      expect(httpService.post).toHaveBeenCalledWith(
        '/audiences',
        createAudiencePayload,
        {
          headers: { 'Idempotency-Key': idempotencyKey },
        },
      );
      expect(result).toEqual(createAudienceResponse);
    });
  });

  describe('list', () => {
    const listAudiencesResponse = {
      data: {
        object: 'list',
        data: [
          {
            id: 'aud_123',
            name: 'Test Audience',
            created_at: '2024-01-01T00:00:00.000Z',
          },
        ],
      },
      error: null,
    };

    it('should list audiences', async () => {
      jest.spyOn(httpService, 'get').mockResolvedValue(listAudiencesResponse);

      const result = await service.list();

      expect(httpService.get).toHaveBeenCalledWith('/audiences');
      expect(result).toEqual(listAudiencesResponse);
    });
  });

  describe('get', () => {
    const audienceId = 'aud_123';
    const getAudienceResponse = {
      data: {
        object: 'audience',
        data: {
          id: audienceId,
          name: 'Test Audience',
          created_at: '2024-01-01T00:00:00.000Z',
        },
      },
      error: null,
    };

    it('should get an audience', async () => {
      jest.spyOn(httpService, 'get').mockResolvedValue(getAudienceResponse);

      const result = await service.get(audienceId);

      expect(httpService.get).toHaveBeenCalledWith(`/audiences/${audienceId}`);
      expect(result).toEqual(getAudienceResponse);
    });
  });

  describe('remove', () => {
    const audienceId = 'aud_123';
    const removeAudienceResponse = {
      data: {
        object: 'audience',
        deleted: true,
      },
      error: null,
    };

    it('should remove an audience', async () => {
      jest.spyOn(httpService, 'delete').mockResolvedValue(removeAudienceResponse);

      const result = await service.remove(audienceId);

      expect(httpService.delete).toHaveBeenCalledWith(`/audiences/${audienceId}`);
      expect(result).toEqual(removeAudienceResponse);
    });
  });
});
