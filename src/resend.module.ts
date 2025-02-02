import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ResendOptions, ResendAsyncOptions } from './common/interfaces/config.interface';
import { RESEND_OPTIONS } from './common/constants/tokens';
import { ResendHttpService } from './core/http/http.service';

function validateOptions(options: ResendOptions) {
  if (!options?.apiKey || typeof options.apiKey !== 'string' || options.apiKey.trim() === '') {
    throw new Error('Invalid Resend API key. Please provide a valid API key.');
  }
  return options;
}

@Module({
  providers: [ResendHttpService],
  exports: [ResendHttpService],
})
export class ResendModule {
  static forRoot(options: ResendOptions): DynamicModule {
    const optionsProvider = {
      provide: RESEND_OPTIONS,
      useValue: validateOptions(options),
    };

    return {
      module: ResendModule,
      providers: [
        optionsProvider,
        {
          provide: ResendHttpService,
          useClass: ResendHttpService,
        },
      ],
      exports: [ResendHttpService, optionsProvider],
      global: true,
    };
  }

  static forRootAsync(options: ResendAsyncOptions): DynamicModule {
    const optionsProvider: Provider = {
      provide: RESEND_OPTIONS,
      useFactory: async (...args: any[]) => {
        const config = await options.useFactory(...args);
        return validateOptions(config);
      },
      inject: options.inject || [],
    };

    return {
      module: ResendModule,
      imports: options.imports || [],
      providers: [
        optionsProvider,
        {
          provide: ResendHttpService,
          useClass: ResendHttpService,
        },
      ],
      exports: [ResendHttpService, optionsProvider],
      global: true,
    };
  }
}
