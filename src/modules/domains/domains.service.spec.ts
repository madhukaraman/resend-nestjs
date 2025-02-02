import { Test, TestingModule } from '@nestjs/testing';
import { DomainsService } from './domains.service';
import { ResendHttpService } from '@/core/http/http.service';
import { RESEND_OPTIONS } from '@/common/constants/tokens';
import { mockResendOptions } from '@/test/test-utils';

describe('DomainsService', () => {
  let service: DomainsService;
  let httpService: ResendHttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DomainsService,
        ResendHttpService,
        {
          provide: RESEND_OPTIONS,
          useValue: mockResendOptions,
        },
      ],
    }).compile();

    service = module.get<DomainsService>(DomainsService);
    httpService = module.get<ResendHttpService>(ResendHttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createDomainPayload = {
      name: 'example.com',
      region: 'us-east-1' as const,
    };

    const createDomainResponse = {
      data: {
        id: 'domain_123',
        object: 'domain',
        name: 'example.com',
        status: 'pending',
        records: [],
        created_at: '2023-01-01T00:00:00.000Z',
        region: 'us-east-1',
      },
      error: null,
    };

    it('should create a domain', async () => {
      jest.spyOn(httpService, 'post').mockResolvedValue(createDomainResponse);

      const result = await service.create(createDomainPayload);

      expect(httpService.post).toHaveBeenCalledWith('/domains', createDomainPayload, undefined);
      expect(result).toEqual(createDomainResponse);
    });

    it('should create a domain with idempotency key', async () => {
      const idempotencyKey = 'test-key';
      jest.spyOn(httpService, 'post').mockResolvedValue(createDomainResponse);

      const result = await service.create(createDomainPayload, { idempotencyKey });

      expect(httpService.post).toHaveBeenCalledWith('/domains', createDomainPayload, {
        headers: { 'Idempotency-Key': idempotencyKey },
      });
      expect(result).toEqual(createDomainResponse);
    });
  });

  describe('list', () => {
    const listDomainsResponse = {
      data: {
        data: [
          {
            id: 'domain_123',
            name: 'example.com',
            status: 'verified',
            created_at: '2023-01-01T00:00:00.000Z',
            region: 'us-east-1',
          },
        ],
      },
      error: null,
    };

    it('should list domains', async () => {
      jest.spyOn(httpService, 'get').mockResolvedValue(listDomainsResponse);

      const result = await service.list();

      expect(httpService.get).toHaveBeenCalledWith('/domains');
      expect(result).toEqual(listDomainsResponse);
    });
  });

  describe('get', () => {
    const getDomainResponse = {
      data: {
        object: 'domain',
        records: [],
      },
      error: null,
    };

    it('should get a domain', async () => {
      const domainId = 'domain_123';
      jest.spyOn(httpService, 'get').mockResolvedValue(getDomainResponse);

      const result = await service.get(domainId);

      expect(httpService.get).toHaveBeenCalledWith(`/domains/${domainId}`);
      expect(result).toEqual(getDomainResponse);
    });
  });

  describe('update', () => {
    const updateDomainPayload = {
      id: 'domain_123',
      clickTracking: true,
      openTracking: true,
    };

    const updateDomainResponse = {
      data: {
        object: 'domain',
      },
      error: null,
    };

    it('should update a domain', async () => {
      jest.spyOn(httpService, 'patch').mockResolvedValue(updateDomainResponse);

      const result = await service.update(updateDomainPayload);

      expect(httpService.patch).toHaveBeenCalledWith(
        `/domains/${updateDomainPayload.id}`,
        {
          clickTracking: updateDomainPayload.clickTracking,
          openTracking: updateDomainPayload.openTracking,
        },
      );
      expect(result).toEqual(updateDomainResponse);
    });
  });

  describe('remove', () => {
    const removeDomainResponse = {
      data: {
        object: 'domain',
        deleted: true,
      },
      error: null,
    };

    it('should remove a domain', async () => {
      const domainId = 'domain_123';
      jest.spyOn(httpService, 'delete').mockResolvedValue(removeDomainResponse);

      const result = await service.remove(domainId);

      expect(httpService.delete).toHaveBeenCalledWith(`/domains/${domainId}`);
      expect(result).toEqual(removeDomainResponse);
    });
  });

  describe('verify', () => {
    const verifyDomainResponse = {
      data: {
        object: 'domain',
      },
      error: null,
    };

    it('should verify a domain', async () => {
      const domainId = 'domain_123';
      jest.spyOn(httpService, 'post').mockResolvedValue(verifyDomainResponse);

      const result = await service.verify(domainId);

      expect(httpService.post).toHaveBeenCalledWith(`/domains/${domainId}/verify`);
      expect(result).toEqual(verifyDomainResponse);
    });
  });
});
