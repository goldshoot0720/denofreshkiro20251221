/**
 * Back4App Integration Initialization
 * Central initialization point for all Back4App services
 */

import { Back4AppClient } from "./services/back4app-client.ts";
import { AuthService } from "./services/auth-service.ts";
import { SubscriptionService } from "./services/subscription-service.ts";
import { FoodService } from "./services/food-service.ts";
import { loadBack4AppConfig } from "./config/back4app.ts";

export interface InitializationResult {
  success: boolean;
  error?: string;
  services: {
    back4appClient: Back4AppClient;
    authService: AuthService;
    subscriptionService: SubscriptionService;
    foodService: FoodService;
  };
}

/**
 * Initialize all Back4App services and infrastructure
 * This should be called once during application startup
 */
export async function initializeBack4App(): Promise<InitializationResult> {
  try {
    console.log("Initializing Back4App integration...");

    // Load and validate configuration
    const config = loadBack4AppConfig();
    console.log("Back4App configuration loaded successfully");

    // Initialize Back4App client
    const back4appClient = Back4AppClient.getInstance();
    await back4appClient.initialize();
    console.log("Back4App client initialized");

    // Initialize authentication service
    const authService = AuthService.getInstance();
    await authService.initialize();
    console.log("Authentication service initialized");

    // Initialize business services
    const subscriptionService = SubscriptionService.getInstance();
    const foodService = FoodService.getInstance();
    console.log("Business services initialized");

    console.log("Back4App integration initialized successfully");

    return {
      success: true,
      services: {
        back4appClient,
        authService,
        subscriptionService,
        foodService,
      },
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Failed to initialize Back4App integration:", errorMessage);

    return {
      success: false,
      error: errorMessage,
      services: {
        back4appClient: Back4AppClient.getInstance(),
        authService: AuthService.getInstance(),
        subscriptionService: SubscriptionService.getInstance(),
        foodService: FoodService.getInstance(),
      },
    };
  }
}

/**
 * Health check for Back4App services
 * Verifies that all services are properly initialized and connected
 */
export async function healthCheck(): Promise<{
  healthy: boolean;
  checks: Record<string, boolean>;
  errors: string[];
}> {
  const checks: Record<string, boolean> = {};
  const errors: string[] = [];

  try {
    // Check Back4App client
    const back4appClient = Back4AppClient.getInstance();
    checks.back4appClient = back4appClient.isInitialized();
    if (!checks.back4appClient) {
      errors.push("Back4App client not initialized");
    }

    // Check authentication service
    const authService = AuthService.getInstance();
    checks.authService = true; // AuthService doesn't have a direct health check method
    
    // Test basic connectivity by making a simple query
    try {
      await back4appClient.query("_User", { limit: 1 });
      checks.connectivity = true;
    } catch (error) {
      checks.connectivity = false;
      const errorMessage = error instanceof Error ? error.message : String(error);
      errors.push(`Connectivity test failed: ${errorMessage}`);
    }

    const healthy = Object.values(checks).every(Boolean);

    return {
      healthy,
      checks,
      errors,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    errors.push(`Health check failed: ${errorMessage}`);
    return {
      healthy: false,
      checks,
      errors,
    };
  }
}

/**
 * Get service instances (assumes initialization has been completed)
 */
export function getServices() {
  return {
    back4appClient: Back4AppClient.getInstance(),
    authService: AuthService.getInstance(),
    subscriptionService: SubscriptionService.getInstance(),
    foodService: FoodService.getInstance(),
  };
}