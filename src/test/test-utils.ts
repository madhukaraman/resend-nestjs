export const mockResendOptions = {
  apiKey: 'test_api_key',
  baseUrl: 'https://api.test.com',
  userAgent: 'test-agent',
};

export const mockEmailResponse = {
  id: 'test_email_id',
  object: 'email',
  from: 'test@example.com',
  to: ['recipient@example.com'],
  created_at: '2025-02-02T13:01:02.000Z',
  subject: 'Test Email',
  html: '<p>Test content</p>',
  text: 'Test content',
  reply_to: null,
  cc: null,
  bcc: null,
  last_event: 'delivered',
};

export class MockFetch {
  static success<T>(data: T): Promise<Response> {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(data),
    } as Response);
  }

  static error(status: number, message: string): Promise<Response> {
    return Promise.resolve({
      ok: false,
      status,
      statusText: message,
      json: () => Promise.resolve({ name: 'error', message }),
    } as Response);
  }
}
