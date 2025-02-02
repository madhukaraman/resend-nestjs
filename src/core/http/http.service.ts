import { Injectable, Inject } from '@nestjs/common';
import { ResendOptions } from '@/common/interfaces/config.interface';
import { RESEND_OPTIONS } from '@/common/constants/tokens';

interface RequestOptions {
  headers?: Record<string, string>;
}

@Injectable()
export class ResendHttpService {
  private readonly baseUrl: string;
  private readonly headers: Record<string, string>;

  constructor(
    @Inject(RESEND_OPTIONS)
    private readonly options: ResendOptions,
  ) {
    this.baseUrl = options.baseUrl || 'https://api.resend.com';
    this.headers = {
      Authorization: `Bearer ${options.apiKey}`,
      'Content-Type': 'application/json',
      'User-Agent': options.userAgent || 'resend-nestjs',
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: response.statusText,
        name: 'application_error',
      }));
      
      throw error;
    }

    return response.json();
  }

  private mergeHeaders(options?: RequestOptions): Record<string, string> {
    if (!options?.headers) {
      return this.headers;
    }

    return {
      ...this.headers,
      ...options.headers,
    };
  }

  async get<T>(path: string, query?: Record<string, string>, options?: RequestOptions): Promise<T> {
    const url = new URL(`${this.baseUrl}${path}`);
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: this.mergeHeaders(options),
    });

    return this.handleResponse<T>(response);
  }

  async post<T>(path: string, data?: unknown, options?: RequestOptions): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: this.mergeHeaders(options),
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  async put<T>(path: string, data?: unknown, options?: RequestOptions): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'PUT',
      headers: this.mergeHeaders(options),
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  async patch<T>(path: string, data?: unknown, options?: RequestOptions): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'PATCH',
      headers: this.mergeHeaders(options),
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  async delete<T>(path: string, options?: RequestOptions): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'DELETE',
      headers: this.mergeHeaders(options),
    });

    return this.handleResponse<T>(response);
  }
}
