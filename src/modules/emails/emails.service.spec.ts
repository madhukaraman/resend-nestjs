import { Test, TestingModule } from '@nestjs/testing';
import { EmailsService } from './emails.service';
import { ResendHttpService } from '@/core/http/http.service';
import { mockEmailResponse } from '@/test/test-utils';

describe('EmailsService', () => {
  let service: EmailsService;
  let httpService: ResendHttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailsService,
        {
          provide: ResendHttpService,
          useValue: {
            post: jest.fn(),
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EmailsService>(EmailsService);
    httpService = module.get<ResendHttpService>(ResendHttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('send', () => {
    it('should send an email successfully', async () => {
      const emailOptions = {
        from: 'test@example.com',
        to: 'recipient@example.com',
        subject: 'Test Email',
        html: '<p>Test content</p>',
      };

      const expectedResponse = { id: 'email_123' };
      jest.spyOn(httpService, 'post').mockResolvedValue(expectedResponse);

      const result = await service.send(emailOptions);

      expect(result).toEqual(expectedResponse);
      expect(httpService.post).toHaveBeenCalledWith('/emails', emailOptions);
    });

    it('should handle errors when sending email', async () => {
      const emailOptions = {
        from: 'test@example.com',
        to: 'recipient@example.com',
        subject: 'Test Email',
        html: '<p>Test content</p>',
      };

      const error = new Error('Failed to send email');
      jest.spyOn(httpService, 'post').mockRejectedValue(error);

      await expect(service.send(emailOptions)).rejects.toThrow(error);
    });
  });

  describe('get', () => {
    it('should get email details successfully', async () => {
      const emailId = 'email_123';
      jest.spyOn(httpService, 'get').mockResolvedValue(mockEmailResponse);

      const result = await service.get(emailId);

      expect(result).toEqual(mockEmailResponse);
      expect(httpService.get).toHaveBeenCalledWith(`/emails/${emailId}`);
    });

    it('should handle errors when getting email details', async () => {
      const emailId = 'email_123';
      const error = new Error('Email not found');
      jest.spyOn(httpService, 'get').mockRejectedValue(error);

      await expect(service.get(emailId)).rejects.toThrow(error);
    });
  });

  describe('list', () => {
    it('should list emails successfully', async () => {
      const mockResponse = {
        data: [mockEmailResponse],
      };
      jest.spyOn(httpService, 'get').mockResolvedValue(mockResponse);

      const result = await service.list();

      expect(result).toEqual(mockResponse);
      expect(httpService.get).toHaveBeenCalledWith('/emails');
    });

    it('should handle errors when listing emails', async () => {
      const error = new Error('Failed to list emails');
      jest.spyOn(httpService, 'get').mockRejectedValue(error);

      await expect(service.list()).rejects.toThrow(error);
    });
  });
});
