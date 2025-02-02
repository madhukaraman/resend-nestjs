# @mnmadhukar/resend-nestjs

[![npm version](https://img.shields.io/npm/v/@mnmadhukar/resend-nestjs.svg)](https://www.npmjs.com/package/@mnmadhukar/resend-nestjs)
[![npm downloads](https://img.shields.io/npm/dm/@mnmadhukar/resend-nestjs.svg)](https://www.npmjs.com/package/@mnmadhukar/resend-nestjs)
[![Test CI](https://github.com/mnmadhukar/resend-nestjs/actions/workflows/test.yml/badge.svg)](https://github.com/mnmadhukar/resend-nestjs/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/mnmadhukar/resend-nestjs/branch/main/graph/badge.svg)](https://codecov.io/gh/mnmadhukar/resend-nestjs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

The unofficial [Resend](https://resend.com) SDK for NestJS, providing a type-safe and dependency injection friendly way to interact with Resend's email service.

## Installation

```bash
npm install @mnmadhukar/resend-nestjs
# or
yarn add @mnmadhukar/resend-nestjs
# or
pnpm add @mnmadhukar/resend-nestjs
```

## Quick Start

```typescript
import { Module } from '@nestjs/common';
import { ResendModule } from '@mnmadhukar/resend-nestjs';

@Module({
  imports: [
    ResendModule.forRoot({
      apiKey: 'your_api_key_here',
    }),
  ],
})
export class AppModule {}
```

## Usage

### Sending Emails

```typescript
import { Injectable } from '@nestjs/common';
import { EmailsService } from '@mnmadhukar/resend-nestjs';

@Injectable()
export class YourService {
  constructor(private readonly emailsService: EmailsService) {}

  async sendEmail() {
    const result = await this.emailsService.send({
      from: 'you@example.com',
      to: 'recipient@example.com',
      subject: 'Hello from Resend',
      html: '<p>Hello world!</p>',
    });
    
    return result;
  }
}
```

### Managing API Keys

```typescript
import { Injectable } from '@nestjs/common';
import { ApiKeysService } from '@mnmadhukar/resend-nestjs';

@Injectable()
export class YourService {
  constructor(private readonly apiKeysService: ApiKeysService) {}

  async createApiKey() {
    const result = await this.apiKeysService.create({
      name: 'My API Key',
      permission: 'sending_access',
    });
    
    return result;
  }
}
```

### Managing Audiences

```typescript
import { Injectable } from '@nestjs/common';
import { AudiencesService } from '@mnmadhukar/resend-nestjs';

@Injectable()
export class YourService {
  constructor(private readonly audiencesService: AudiencesService) {}

  async createAudience() {
    const result = await this.audiencesService.create({
      name: 'Newsletter Subscribers',
    });
    
    return result;
  }
}
```

### Managing Contacts

```typescript
import { Injectable } from '@nestjs/common';
import { ContactsService } from '@mnmadhukar/resend-nestjs';

@Injectable()
export class YourService {
  constructor(private readonly contactsService: ContactsService) {}

  async createContact() {
    const result = await this.contactsService.create({
      email: 'user@example.com',
      firstName: 'John',
      lastName: 'Doe',
      unsubscribed: false,
    });
    
    return result;
  }
}
```

### Managing Domains

```typescript
import { Injectable } from '@nestjs/common';
import { DomainsService } from '@mnmadhukar/resend-nestjs';

@Injectable()
export class YourService {
  constructor(private readonly domainsService: DomainsService) {}

  async createDomain() {
    const result = await this.domainsService.create({
      name: 'example.com',
    });
    
    return result;
  }
}
```

## Features

- 🔒 Type-safe: Full TypeScript support with detailed type definitions
- 💉 NestJS native: Built with dependency injection in mind
- 📨 Complete API coverage: All Resend API endpoints supported
- 🔄 Idempotency: Support for idempotent requests
- ⚡ Async configuration: Support for async module configuration
- 🧪 Testable: Built with testing in mind
- 🔍 Error handling: Comprehensive error handling and type definitions

## Available Services

- `EmailsService`: Send transactional emails
- `ApiKeysService`: Manage API keys
- `AudiencesService`: Manage email audiences
- `ContactsService`: Manage contacts within audiences
- `DomainsService`: Manage email sending domains
- `BatchService`: Send batch emails efficiently

## Module Configuration

### Synchronous Configuration

```typescript
import { Module } from '@nestjs/common';
import { ResendModule } from '@mnmadhukar/resend-nestjs';

@Module({
  imports: [
    ResendModule.forRoot({
      apiKey: 'your_api_key_here',
    }),
  ],
})
export class AppModule {}
```

### Asynchronous Configuration

```typescript
import { Module } from '@nestjs/common';
import { ResendModule } from '@mnmadhukar/resend-nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ResendModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get('RESEND_API_KEY'),
      }),
    }),
  ],
})
export class AppModule {}
```

## Error Handling

All services return responses in a consistent format:

```typescript
interface Response<T> {
  data: T | null;
  error: {
    message: string;
    name: string;
    statusCode: number;
  } | null;
}
```

Example error handling:

```typescript
try {
  const { data, error } = await emailsService.send({
    from: 'you@example.com',
    to: 'recipient@example.com',
    subject: 'Hello',
    html: '<p>World</p>',
  });

  if (error) {
    console.error('Failed to send email:', error.message);
    return;
  }

  console.log('Email sent successfully:', data.id);
} catch (e) {
  console.error('Unexpected error:', e);
}
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run tests
npm run test

# Run tests with coverage
npm run test:cov

# Lint code
npm run lint

# Format code
npm run format
```

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## License

MIT License
