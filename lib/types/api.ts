/**
 * API Types and Interfaces
 * Common types used across the Back4App integration
 */

export interface AuthCredentials {
  username?: string;
  password?: string;
  sessionToken?: string;
}

export interface QueryOptions {
  where?: Record<string, any>;
  limit?: number;
  skip?: number;
  order?: string;
  include?: string[];
  select?: string[];
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

export interface ApiError {
  code: number;
  message: string;
  details?: Record<string, any>;
}

export interface RetryOptions {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
  backoffFactor: number;
}

export interface RequestOptions {
  timeout?: number;
  retries?: RetryOptions;
  headers?: Record<string, string>;
}

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface ParseUser {
  objectId: string;
  username: string;
  email?: string;
  sessionToken: string;
  createdAt: string;
  updatedAt: string;
}

export interface ParseObject {
  objectId: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}