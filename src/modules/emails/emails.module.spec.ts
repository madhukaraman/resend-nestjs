import { Test } from '@nestjs/testing';
import { EmailsModule } from './emails.module';
import { EmailsService } from './emails.service';
import { ResendModule } from '@/resend.module';
import { mockResendOptions } from '@/test/test-utils';
import { ResendHttpService } from '@/core/http/http.service';

describe('EmailsModule', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [
        ResendModule.forRoot(mockResendOptions),
        EmailsModule
      ],
    }).compile();

    expect(module).toBeDefined();
    const emailsService = module.get(EmailsService);
    expect(emailsService).toBeDefined();
    expect(emailsService).toBeInstanceOf(EmailsService);
  });

  it('should export EmailsService', async () => {
    const module = await Test.createTestingModule({
      imports: [
        ResendModule.forRoot(mockResendOptions),
        EmailsModule
      ],
    }).compile();

    const emailsService = module.get(EmailsService);
    expect(emailsService).toBeDefined();
    expect(emailsService).toBeInstanceOf(EmailsService);
  });

  it('should have access to ResendHttpService', async () => {
    const module = await Test.createTestingModule({
      imports: [
        ResendModule.forRoot(mockResendOptions),
        EmailsModule
      ],
    }).compile();

    const httpService = module.get(ResendHttpService);
    expect(httpService).toBeDefined();
    expect(httpService).toBeInstanceOf(ResendHttpService);

    const emailsService = module.get(EmailsService);
    expect(emailsService).toBeDefined();
    expect(emailsService).toBeInstanceOf(EmailsService);
  });
});
