import { Test, TestingModule } from '@nestjs/testing';
import { ContactsService } from './contacts.service';
import { ResendHttpService } from '@/core/http/http.service';
import { RESEND_OPTIONS } from '@/common/constants/tokens';
import { mockResendOptions } from '@/test/test-utils';

describe('ContactsService', () => {
  let service: ContactsService;
  let httpService: ResendHttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactsService,
        ResendHttpService,
        {
          provide: RESEND_OPTIONS,
          useValue: mockResendOptions,
        },
      ],
    }).compile();

    service = module.get<ContactsService>(ContactsService);
    httpService = module.get<ResendHttpService>(ResendHttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createContactPayload = {
      audienceId: 'aud_123',
      email: 'john@example.com',
      firstName: 'John',
      lastName: 'Doe',
      unsubscribed: false,
    };

    const createContactResponse = {
      data: {
        object: 'contact',
        id: 'contact_123',
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
        unsubscribed: false,
        created_at: '2023-01-01T00:00:00.000Z',
      },
      error: null,
    };

    it('should create a contact', async () => {
      jest.spyOn(httpService, 'post').mockResolvedValue(createContactResponse);

      const result = await service.create(createContactPayload);

      expect(httpService.post).toHaveBeenCalledWith(
        `/audiences/${createContactPayload.audienceId}/contacts`,
        {
          email: createContactPayload.email,
          firstName: createContactPayload.firstName,
          lastName: createContactPayload.lastName,
          unsubscribed: createContactPayload.unsubscribed,
        },
        undefined,
      );
      expect(result).toEqual(createContactResponse);
    });

    it('should create a contact with idempotency key', async () => {
      const idempotencyKey = 'test-key';
      jest.spyOn(httpService, 'post').mockResolvedValue(createContactResponse);

      const result = await service.create(createContactPayload, { idempotencyKey });

      expect(httpService.post).toHaveBeenCalledWith(
        `/audiences/${createContactPayload.audienceId}/contacts`,
        {
          email: createContactPayload.email,
          firstName: createContactPayload.firstName,
          lastName: createContactPayload.lastName,
          unsubscribed: createContactPayload.unsubscribed,
        },
        {
          headers: { 'Idempotency-Key': idempotencyKey },
        },
      );
      expect(result).toEqual(createContactResponse);
    });
  });

  describe('list', () => {
    const listContactsResponse = {
      data: {
        object: 'list',
        data: [
          {
            id: 'contact_123',
            email: 'john@example.com',
            first_name: 'John',
            last_name: 'Doe',
            unsubscribed: false,
            created_at: '2023-01-01T00:00:00.000Z',
          },
        ],
      },
      error: null,
    };

    it('should list contacts', async () => {
      const audienceId = 'aud_123';
      jest.spyOn(httpService, 'get').mockResolvedValue(listContactsResponse);

      const result = await service.list({ audienceId });

      expect(httpService.get).toHaveBeenCalledWith(
        `/audiences/${audienceId}/contacts`,
      );
      expect(result).toEqual(listContactsResponse);
    });
  });

  describe('get', () => {
    const getContactResponse = {
      data: {
        object: 'contact',
        data: {
          id: 'contact_123',
          email: 'john@example.com',
          first_name: 'John',
          last_name: 'Doe',
          unsubscribed: false,
          created_at: '2023-01-01T00:00:00.000Z',
        },
      },
      error: null,
    };

    it('should get a contact', async () => {
      const audienceId = 'aud_123';
      const contactId = 'contact_123';
      jest.spyOn(httpService, 'get').mockResolvedValue(getContactResponse);

      const result = await service.get({ audienceId, id: contactId });

      expect(httpService.get).toHaveBeenCalledWith(
        `/audiences/${audienceId}/contacts/${contactId}`,
      );
      expect(result).toEqual(getContactResponse);
    });
  });

  describe('update', () => {
    const updateContactPayload = {
      audienceId: 'aud_123',
      id: 'contact_123',
      firstName: 'John',
      lastName: 'Doe',
      unsubscribed: false,
    };

    const updateContactResponse = {
      data: {
        object: 'contact',
        id: 'contact_123',
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
        unsubscribed: false,
        created_at: '2023-01-01T00:00:00.000Z',
      },
      error: null,
    };

    it('should update a contact by id', async () => {
      jest.spyOn(httpService, 'patch').mockResolvedValue(updateContactResponse);

      const result = await service.update(updateContactPayload);

      expect(httpService.patch).toHaveBeenCalledWith(
        `/audiences/${updateContactPayload.audienceId}/contacts/${updateContactPayload.id}`,
        {
          firstName: updateContactPayload.firstName,
          lastName: updateContactPayload.lastName,
          unsubscribed: updateContactPayload.unsubscribed,
        },
      );
      expect(result).toEqual(updateContactResponse);
    });

    it('should update a contact by email', async () => {
      const emailPayload = {
        audienceId: 'aud_123',
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
        unsubscribed: false,
      };

      jest.spyOn(httpService, 'patch').mockResolvedValue(updateContactResponse);

      const result = await service.update(emailPayload);

      expect(httpService.patch).toHaveBeenCalledWith(
        `/audiences/${emailPayload.audienceId}/contacts/${emailPayload.email}`,
        {
          firstName: emailPayload.firstName,
          lastName: emailPayload.lastName,
          unsubscribed: emailPayload.unsubscribed,
        },
      );
      expect(result).toEqual(updateContactResponse);
    });

    it('should throw error if neither id nor email is provided', async () => {
      const invalidPayload = {
        audienceId: 'aud_123',
        firstName: 'John',
      };

      await expect(service.update(invalidPayload as any)).rejects.toThrow(
        'Either id or email must be provided',
      );
    });
  });

  describe('remove', () => {
    const removeContactResponse = {
      data: {
        object: 'contact',
        deleted: true,
        contact: 'contact_123',
      },
      error: null,
    };

    it('should remove a contact by id', async () => {
      const payload = {
        audienceId: 'aud_123',
        id: 'contact_123',
      };

      jest.spyOn(httpService, 'delete').mockResolvedValue(removeContactResponse);

      const result = await service.remove(payload);

      expect(httpService.delete).toHaveBeenCalledWith(
        `/audiences/${payload.audienceId}/contacts/${payload.id}`,
      );
      expect(result).toEqual(removeContactResponse);
    });

    it('should remove a contact by email', async () => {
      const payload = {
        audienceId: 'aud_123',
        email: 'john@example.com',
      };

      jest.spyOn(httpService, 'delete').mockResolvedValue(removeContactResponse);

      const result = await service.remove(payload);

      expect(httpService.delete).toHaveBeenCalledWith(
        `/audiences/${payload.audienceId}/contacts/${payload.email}`,
      );
      expect(result).toEqual(removeContactResponse);
    });

    it('should throw error if neither id nor email is provided', async () => {
      const invalidPayload = {
        audienceId: 'aud_123',
      };

      await expect(service.remove(invalidPayload as any)).rejects.toThrow(
        'Either id or email must be provided',
      );
    });
  });
});
