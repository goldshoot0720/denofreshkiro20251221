import { Handlers } from "$fresh/server.ts";
import { Back4AppRestClient } from "../../lib/services/back4app-rest-client.ts";

export const handler: Handlers = {
  // GET /api/health - 系統健康檢查
  async GET() {
    try {
      const client = Back4AppRestClient.getInstance();
      
      const checks: Record<string, boolean> = {};
      const errors: string[] = [];
      
      // 檢查 Back4App 客戶端
      checks.back4appClient = client.isInitialized();
      if (!checks.back4appClient) {
        try {
          await client.initialize();
          checks.back4appClient = true;
        } catch (error) {
          errors.push(`Back4App client initialization failed: ${error.message}`);
        }
      }
      
      // 測試連接
      if (checks.back4appClient) {
        try {
          await client.query("subscription", { limit: 1 });
          checks.connectivity = true;
        } catch (error) {
          checks.connectivity = false;
          errors.push(`Connectivity test failed: ${error.message}`);
        }
      } else {
        checks.connectivity = false;
        errors.push("Cannot test connectivity: Back4App client not initialized");
      }
      
      const healthy = Object.values(checks).every(Boolean);
      
      return new Response(JSON.stringify({
        success: true,
        timestamp: new Date().toISOString(),
        healthy,
        checks,
        errors,
      }), {
        status: healthy ? 200 : 503,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Health check error:", error);
      return new Response(JSON.stringify({
        success: false,
        healthy: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};