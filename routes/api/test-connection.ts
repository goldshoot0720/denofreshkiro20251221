/**
 * Test Back4App Connection API
 * 測試 Back4App 連接狀態
 */

import { Handlers } from "$fresh/server.ts";
import { Back4AppRestClient } from "../../lib/services/back4app-rest-client.ts";

export const handler: Handlers = {
  async GET() {
    try {
      const client = Back4AppRestClient.getInstance();
      
      // 嘗試初始化客戶端
      await client.initialize();
      
      // 嘗試查詢一個簡單的測試
      try {
        const result = await client.query("subscription", { limit: 1 });
        
        return new Response(JSON.stringify({
          success: true,
          message: "Back4App connection successful",
          data: {
            initialized: client.isInitialized(),
            queryResult: result.length,
          }
        }), {
          headers: { "Content-Type": "application/json" },
        });
      } catch (queryError) {
        // 如果查詢失敗，可能是權限問題
        return new Response(JSON.stringify({
          success: false,
          message: "Connection OK but query failed",
          error: queryError.message,
          suggestion: "Check Back4App class permissions or create test data"
        }), {
          status: 200, // 連接成功但查詢失敗
          headers: { "Content-Type": "application/json" },
        });
      }
      
    } catch (error) {
      console.error("Back4App connection test failed:", error);
      
      return new Response(JSON.stringify({
        success: false,
        message: "Back4App connection failed",
        error: error.message,
        suggestions: [
          "Check environment variables in .env file",
          "Verify Back4App Application ID and API keys",
          "Ensure Back4App server URL is correct",
          "Check network connectivity"
        ]
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};