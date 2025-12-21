/**
 * Back4App Configuration Module
 * Handles environment variables and connection settings for Back4App Parse Server
 */

export interface Back4AppConfig {
  applicationId: string;
  restApiKey: string;
  masterKey?: string;
  serverUrl: string;
}

/**
 * Load Back4App configuration from environment variables
 * @throws {Error} If required environment variables are missing
 */
export function loadBack4AppConfig(): Back4AppConfig {
  const applicationId = Deno.env.get("BACK4APP_APPLICATION_ID");
  const restApiKey = Deno.env.get("BACK4APP_REST_API_KEY");
  const masterKey = Deno.env.get("BACK4APP_MASTER_KEY");
  const serverUrl = Deno.env.get("BACK4APP_SERVER_URL");

  if (!applicationId) {
    throw new Error("BACK4APP_APPLICATION_ID environment variable is required");
  }

  if (!restApiKey) {
    throw new Error("BACK4APP_REST_API_KEY environment variable is required");
  }

  if (!serverUrl) {
    throw new Error("BACK4APP_SERVER_URL environment variable is required");
  }

  return {
    applicationId,
    restApiKey,
    masterKey,
    serverUrl,
  };
}

/**
 * Validate Back4App configuration
 * @param config - Configuration object to validate
 * @returns true if configuration is valid
 */
export function validateConfig(config: Back4AppConfig): boolean {
  return !!(
    config.applicationId &&
    config.restApiKey &&
    config.serverUrl &&
    config.serverUrl.startsWith("https://")
  );
}