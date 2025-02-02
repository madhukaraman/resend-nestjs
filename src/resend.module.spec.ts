import { Test } from '@nestjs/testing';
import { ResendModule } from './resend.module';
import { RESEND_OPTIONS } from '@/common/constants/tokens';
import { ResendHttpService } from '@/core/http/http.service';
import { mockResendOptions } from '@/test/test-utils';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('ResendModule', () => {
  describe('forRoot', () => {
    it('should provide options using forRoot', async () => {
      const module = await Test.createTestingModule({
        imports: [ResendModule.forRoot(mockResendOptions)],
      }).compile();

      const options = module.get(RESEND_OPTIONS);
      const httpService = module.get(ResendHttpService);

      expect(options).toBeDefined();
      expect(options).toEqual(mockResendOptions);
      expect(httpService).toBeInstanceOf(ResendHttpService);
    });

    it('should throw error if apiKey is not provided', async () => {
      const expectedError = new Error('Invalid Resend API key. Please provide a valid API key.');
      
      await expect(async () => {
        await Test.createTestingModule({
          imports: [ResendModule.forRoot({ apiKey: '' })],
        }).compile();
      }).rejects.toThrow(expectedError);
    });

    it('should throw error if apiKey is undefined', async () => {
      const expectedError = new Error('Invalid Resend API key. Please provide a valid API key.');
      
      await expect(async () => {
        await Test.createTestingModule({
          imports: [ResendModule.forRoot({ apiKey: undefined as any })],
        }).compile();
      }).rejects.toThrow(expectedError);
    });
  });

  describe('forRootAsync', () => {
    it('should provide options using forRootAsync with useFactory', async () => {
      const module = await Test.createTestingModule({
        imports: [
          ConfigModule.forRoot({
            load: [() => ({ resend: mockResendOptions })],
          }),
          ResendModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
              const config = configService.get('resend');
              if (!config) {
                throw new Error('Resend config not found');
              }
              return config;
            },
            inject: [ConfigService],
          }),
        ],
      }).compile();

      const options = module.get(RESEND_OPTIONS);
      const httpService = module.get(ResendHttpService);

      expect(options).toBeDefined();
      expect(options).toEqual(mockResendOptions);
      expect(httpService).toBeInstanceOf(ResendHttpService);
    });

    it('should throw error if apiKey is not provided in async config', async () => {
      const expectedError = new Error('Invalid Resend API key. Please provide a valid API key.');

      await expect(async () => {
        await Test.createTestingModule({
          imports: [
            ResendModule.forRootAsync({
              useFactory: () => ({ apiKey: '' }),
            }),
          ],
        }).compile();
      }).rejects.toThrow(expectedError);
    });
  });
});
