import { Test } from '@nestjs/testing';
import { BatchModule } from './batch.module';
import { BatchService } from './batch.service';
import { ResendModule } from '@/resend.module';
import { mockResendOptions } from '@/test/test-utils';

describe('BatchModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [ResendModule.forRoot(mockResendOptions), BatchModule],
    }).compile();

    expect(module).toBeDefined();
  });

  it('should export BatchService', async () => {
    const module = await Test.createTestingModule({
      imports: [ResendModule.forRoot(mockResendOptions), BatchModule],
    }).compile();

    const batchService = module.get(BatchService);
    expect(batchService).toBeDefined();
    expect(batchService).toBeInstanceOf(BatchService);
  });
});
