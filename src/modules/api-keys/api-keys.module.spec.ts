import { Test } from '@nestjs/testing';
import { ApiKeysModule } from './api-keys.module';
import { ApiKeysService } from './api-keys.service';
import { ResendModule } from '@/resend.module';
import { mockResendOptions } from '@/test/test-utils';

describe('ApiKeysModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [ResendModule.forRoot(mockResendOptions), ApiKeysModule],
    }).compile();

    expect(module).toBeDefined();
  });

  it('should export ApiKeysService', async () => {
    const module = await Test.createTestingModule({
      imports: [ResendModule.forRoot(mockResendOptions), ApiKeysModule],
    }).compile();

    const apiKeysService = module.get(ApiKeysService);
    expect(apiKeysService).toBeDefined();
    expect(apiKeysService).toBeInstanceOf(ApiKeysService);
  });
});
