/**
 * Back4App Integration Library
 * Public API exports for the Back4App CRUD management system
 */

// Core services
export { Back4AppClient } from "./services/back4app-client.ts";
export { AuthService } from "./services/auth-service.ts";
export { ApiClient } from "./services/api-client.ts";

// Configuration
export { loadBack4AppConfig, validateConfig } from "./config/back4app.ts";

// Initialization
export { initializeBack4App, healthCheck, getServices } from "./init.ts";

// Types
export type {
  AuthCredentials,
  QueryOptions,
  ApiResponse,
  ApiError,
  RetryOptions,
  RequestOptions,
  HttpMethod,
  ParseUser,
  ParseObject,
} from "./types/api.ts";

export type { Back4AppConfig } from "./config/back4app.ts";
export type { AuthState } from "./services/auth-service.ts";
export type { InitializationResult } from "./init.ts";