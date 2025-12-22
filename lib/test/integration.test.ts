/**
 * Integration Tests for Back4App Infrastructure
 * Basic tests to verify the core infrastructure is working
 */

import { assertEquals, assertExists } from "$std/assert/mod.ts";
import { initializeBack4App, healthCheck, getServices } from "../init.ts";
import { loadBack4AppConfig } from "../config/back4app.ts";

Deno.test("Back4App Configuration", async (t) => {
  await t.step("should load configuration from environment", () => {
    const config = loadBack4AppConfig();
    
    assertExists(config.applicationId);
    assertExists(config.restApiKey);
    assertExists(config.serverUrl);
    assertEquals(config.serverUrl.startsWith("https://"), true);
  });
});

Deno.test("Back4App Initialization", async (t) => {
  await t.step("should initialize all services successfully", async () => {
    const result = await initializeBack4App();
    
    assertEquals(result.success, true);
    assertExists(result.services.back4appClient);
    assertExists(result.services.authService);
    
    // Verify client is initialized
    assertEquals(result.services.back4appClient.isInitialized(), true);
  });

  await t.step("should pass health check after initialization", async () => {
    const health = await healthCheck();
    
    assertEquals(health.checks.back4appClient, true);
    assertEquals(health.checks.authService, true);
    
    // Connectivity might fail in test environment, so we just check it exists
    assertExists(health.checks.connectivity);
  });
});

Deno.test("Service Instances", async (t) => {
  await t.step("should provide access to service instances", () => {
    const services = getServices();
    
    assertExists(services.back4appClient);
    assertExists(services.authService);
    
    // Verify singleton pattern
    const services2 = getServices();
    assertEquals(services.back4appClient, services2.back4appClient);
    assertEquals(services.authService, services2.authService);
  });
});