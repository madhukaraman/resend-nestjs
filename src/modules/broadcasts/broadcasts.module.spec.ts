import { Test } from '@nestjs/testing';
import { BroadcastsModule } from './broadcasts.module';
import { BroadcastsService } from './broadcasts.service';
import { ResendModule } from '@/resend.module';
import { mockResendOptions } from '@/test/test-utils';

describe('BroadcastsModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [ResendModule.forRoot(mockResendOptions), BroadcastsModule],
    }).compile();

    expect(module).toBeDefined();
  });

  it('should export BroadcastsService', async () => {
    const module = await Test.createTestingModule({
      imports: [ResendModule.forRoot(mockResendOptions), BroadcastsModule],
    }).compile();

    const broadcastsService = module.get(BroadcastsService);
    expect(broadcastsService).toBeDefined();
    expect(broadcastsService).toBeInstanceOf(BroadcastsService);
  });
});
