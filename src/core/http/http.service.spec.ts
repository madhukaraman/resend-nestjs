import { Test, TestingModule } from '@nestjs/testing';
import { ResendHttpService } from './http.service';
import { RESEND_OPTIONS } from '@/common/constants/tokens';
import { mockResendOptions, MockFetch } from '@/test/test-utils';

describe('ResendHttpService', () => {
  let service: ResendHttpService;
  const originalFetch = global.fetch;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResendHttpService,
        {
          provide: RESEND_OPTIONS,
          useValue: mockResendOptions,
        },
      ],
    }).compile();

    service = module.get<ResendHttpService>(ResendHttpService);
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('GET requests', () => {
    it('should make a successful GET request', async () => {
      const mockData = { test: 'data' };
      global.fetch = jest.fn().mockImplementation(() => MockFetch.success(mockData));

      const result = await service.get('/test');
      
      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.test.com/test',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            Authorization: 'Bearer test_api_key',
            'User-Agent': 'test-agent',
          }),
        }),
      );
    });

    it('should handle query parameters correctly', async () => {
      const mockData = { test: 'data' };
      global.fetch = jest.fn().mockImplementation(() => MockFetch.success(mockData));

      await service.get('/test', { param: 'value' });
      
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.test.com/test?param=value',
        expect.any(Object),
      );
    });

    it('should handle error responses', async () => {
      global.fetch = jest.fn().mockImplementation(() => 
        MockFetch.error(400, 'Bad Request')
      );

      await expect(service.get('/test')).rejects.toEqual({
        name: 'error',
        message: 'Bad Request',
      });
    });
  });

  describe('POST requests', () => {
    it('should make a successful POST request', async () => {
      const mockData = { id: 'created' };
      const payload = { test: 'data' };
      global.fetch = jest.fn().mockImplementation(() => MockFetch.success(mockData));

      const result = await service.post('/test', payload);
      
      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.test.com/test',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(payload),
        }),
      );
    });
  });

  describe('PUT requests', () => {
    it('should make a successful PUT request', async () => {
      const mockData = { updated: true };
      const payload = { test: 'data' };
      global.fetch = jest.fn().mockImplementation(() => MockFetch.success(mockData));

      const result = await service.put('/test', payload);
      
      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.test.com/test',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(payload),
        }),
      );
    });
  });

  describe('DELETE requests', () => {
    it('should make a successful DELETE request', async () => {
      const mockData = { deleted: true };
      global.fetch = jest.fn().mockImplementation(() => MockFetch.success(mockData));

      const result = await service.delete('/test');
      
      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.test.com/test',
        expect.objectContaining({
          method: 'DELETE',
        }),
      );
    });
  });

  describe('PATCH requests', () => {
    it('should make a successful PATCH request', async () => {
      const mockData = { patched: true };
      const payload = { test: 'data' };
      global.fetch = jest.fn().mockImplementation(() => MockFetch.success(mockData));

      const result = await service.patch('/test', payload);
      
      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.test.com/test',
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify(payload),
        }),
      );
    });
  });
});
