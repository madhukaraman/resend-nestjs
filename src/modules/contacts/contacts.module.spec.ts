import { Test } from '@nestjs/testing';
import { ContactsModule } from './contacts.module';
import { ContactsService } from './contacts.service';
import { ResendModule } from '@/resend.module';
import { mockResendOptions } from '@/test/test-utils';

describe('ContactsModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [ResendModule.forRoot(mockResendOptions), ContactsModule],
    }).compile();

    expect(module).toBeDefined();
  });

  it('should export ContactsService', async () => {
    const module = await Test.createTestingModule({
      imports: [ResendModule.forRoot(mockResendOptions), ContactsModule],
    }).compile();

    const contactsService = module.get(ContactsService);
    expect(contactsService).toBeDefined();
    expect(contactsService).toBeInstanceOf(ContactsService);
  });
});
