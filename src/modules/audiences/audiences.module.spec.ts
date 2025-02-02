import { Test } from '@nestjs/testing';
import { AudiencesModule } from './audiences.module';
import { AudiencesService } from './audiences.service';
import { ResendModule } from '@/resend.module';
import { mockResendOptions } from '@/test/test-utils';

describe('AudiencesModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [ResendModule.forRoot(mockResendOptions), AudiencesModule],
    }).compile();

    expect(module).toBeDefined();
  });

  it('should export AudiencesService', async () => {
    const module = await Test.createTestingModule({
      imports: [ResendModule.forRoot(mockResendOptions), AudiencesModule],
    }).compile();

    const audiencesService = module.get(AudiencesService);
    expect(audiencesService).toBeDefined();
    expect(audiencesService).toBeInstanceOf(AudiencesService);
  });
});
