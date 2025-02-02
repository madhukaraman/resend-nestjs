import { Test } from '@nestjs/testing';
import { DomainsModule } from './domains.module';
import { DomainsService } from './domains.service';
import { ResendModule } from '@/resend.module';
import { mockResendOptions } from '@/test/test-utils';

describe('DomainsModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [ResendModule.forRoot(mockResendOptions), DomainsModule],
    }).compile();

    expect(module).toBeDefined();
  });

  it('should export DomainsService', async () => {
    const module = await Test.createTestingModule({
      imports: [ResendModule.forRoot(mockResendOptions), DomainsModule],
    }).compile();

    const domainsService = module.get(DomainsService);
    expect(domainsService).toBeDefined();
    expect(domainsService).toBeInstanceOf(DomainsService);
  });
});
