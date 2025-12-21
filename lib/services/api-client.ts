/**
 * Base API Client with Retry Logic and Timeout Handling
 * Provides robust HTTP client functionality with exponential backoff
 */

import type {
  HttpMethod,
  RequestOptions,
  RetryOptions,
  ApiResponse,
  ApiError,
} from "../types/api.ts";

export class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;
  private defaultTimeout: number;
  private defaultRetryOptions: RetryOptions;

  constructor(
    baseUrl: string,
    defaultHeaders: Record<string, string> = {},
    defaultTimeout = 30000
  ) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      "Content-Type": "application/json",
      ...defaultHeaders,
    };
    this.defaultTimeout = defaultTimeout;
    this.defaultRetryOptions = {
      maxRetries: 3,
      baseDelay: 1000,
      maxDelay: 10000,
      backoffFactor: 2,
    };
  }

  /**
   * Make HTTP request with retry logic and timeout handling
   */
  async request<T = any>(
    method: HttpMethod,
    endpoint: string,
    data?: any,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const timeout = options.timeout || this.defaultTimeout;
    const retryOptions = options.retries || this.defaultRetryOptions;

    let lastError: Error;

    for (let attempt = 0; attempt <= retryOptions.maxRetries; attempt++) {
      try {
        const response = await this.makeRequest<T>(
          method,
          url,
          data,
          timeout,
          options.headers
        );
        return response;
      } catch (error) {
        lastError = error as Error;

        // Don't retry on client errors (4xx) or if it's the last attempt
        if (
          this.isClientError(error) ||
          attempt === retryOptions.maxRetries
        ) {
          break;
        }

        // Calculate delay for exponential backoff
        const delay = Math.min(
          retryOptions.baseDelay * Math.pow(retryOptions.backoffFactor, attempt),
          retryOptions.maxDelay
        );

        console.warn(
          `Request failed (attempt ${attempt + 1}/${retryOptions.maxRetries + 1}), retrying in ${delay}ms:`,
          error.message
        );

        await this.sleep(delay);
      }
    }

    // All retries exhausted
    return {
      success: false,
      error: this.createApiError(lastError!),
    };
  }

  /**
   * Make the actual HTTP request
   */
  private async makeRequest<T>(
    method: HttpMethod,
    url: string,
    data?: any,
    timeout?: number,
    additionalHeaders?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    const controller = new AbortController();
    const timeoutId = timeout
      ? setTimeout(() => controller.abort(), timeout)
      : null;

    try {
      const headers = {
        ...this.defaultHeaders,
        ...additionalHeaders,
      };

      const requestInit: RequestInit = {
        method,
        headers,
        signal: controller.signal,
      };

      if (data && (method === "POST" || method === "PUT")) {
        requestInit.body = JSON.stringify(data);
      }

      const response = await fetch(url, requestInit);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const responseData = await response.json();

      return {
        success: true,
        data: responseData,
      };
    } catch (error) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      if (error.name === "AbortError") {
        throw new Error(`Request timeout after ${timeout}ms`);
      }

      throw error;
    }
  }

  /**
   * GET request
   */
  async get<T = any>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>("GET", endpoint, undefined, options);
  }

  /**
   * POST request
   */
  async post<T = any>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>("POST", endpoint, data, options);
  }

  /**
   * PUT request
   */
  async put<T = any>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>("PUT", endpoint, data, options);
  }

  /**
   * DELETE request
   */
  async delete<T = any>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>("DELETE", endpoint, undefined, options);
  }

  /**
   * Check if error is a client error (4xx)
   */
  private isClientError(error: any): boolean {
    if (error.message && typeof error.message === "string") {
      const match = error.message.match(/HTTP (\d+):/);
      if (match) {
        const statusCode = parseInt(match[1]);
        return statusCode >= 400 && statusCode < 500;
      }
    }
    return false;
  }

  /**
   * Create standardized API error
   */
  private createApiError(error: Error): ApiError {
    const message = error.message || "Unknown error occurred";
    let code = 500;

    // Extract HTTP status code if available
    const match = message.match(/HTTP (\d+):/);
    if (match) {
      code = parseInt(match[1]);
    }

    return {
      code,
      message,
      details: {
        originalError: error.name,
        timestamp: new Date().toISOString(),
      },
    };
  }

  /**
   * Sleep utility for retry delays
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Update default headers
   */
  setDefaultHeaders(headers: Record<string, string>): void {
    this.defaultHeaders = { ...this.defaultHeaders, ...headers };
  }

  /**
   * Update default timeout
   */
  setDefaultTimeout(timeout: number): void {
    this.defaultTimeout = timeout;
  }

  /**
   * Update default retry options
   */
  setDefaultRetryOptions(options: Partial<RetryOptions>): void {
    this.defaultRetryOptions = { ...this.defaultRetryOptions, ...options };
  }
}