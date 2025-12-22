/**
 * Back4App REST Client Service
 * Direct REST API client for Back4App without Parse SDK
 */

import { loadBack4AppConfig } from "../config/back4app.ts";
import type { QueryOptions, ParseObject } from "../types/api.ts";

export class Back4AppRestClient {
  private static instance: Back4AppRestClient;
  private initialized = false;
  private config = loadBack4AppConfig();

  private constructor() {}

  static getInstance(): Back4AppRestClient {
    if (!Back4AppRestClient.instance) {
      Back4AppRestClient.instance = new Back4AppRestClient();
    }
    return Back4AppRestClient.instance;
  }

  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    try {
      // Test connection
      await this.testConnection();
      this.initialized = true;
      console.log("Back4App REST client initialized successfully");
    } catch (error) {
      console.error("Failed to initialize Back4App REST client:", error);
      throw error;
    }
  }

  private async testConnection(): Promise<void> {
    try {
      // 測試連接到 subscription 表而不是 _User 表
      const response = await fetch(`${this.config.serverUrl}/classes/subscription`, {
        method: "GET",
        headers: this.getHeaders(),
      });

      if (!response.ok && response.status !== 404 && response.status !== 403) {
        throw new Error(`Connection test failed: ${response.statusText}`);
      }
      
      // 如果能到達這裡，說明連接是正常的
    } catch (error) {
      throw new Error(`Connection test failed: ${error.message}`);
    }
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      "X-Parse-Application-Id": this.config.applicationId,
      "Content-Type": "application/json",
    };

    // 優先使用 Master Key，如果沒有則使用 REST API Key
    if (this.config.masterKey) {
      headers["X-Parse-Master-Key"] = this.config.masterKey;
    } else {
      headers["X-Parse-REST-API-Key"] = this.config.restApiKey;
    }

    return headers;
  }

  async query<T extends ParseObject>(
    className: string,
    options: QueryOptions = {}
  ): Promise<T[]> {
    this.ensureInitialized();

    try {
      const params = new URLSearchParams();

      if (options.where) {
        params.append("where", JSON.stringify(options.where));
      }
      if (options.limit) {
        params.append("limit", options.limit.toString());
      }
      if (options.skip) {
        params.append("skip", options.skip.toString());
      }
      if (options.order) {
        params.append("order", options.order);
      }

      const url = `${this.config.serverUrl}/classes/${className}?${params.toString()}`;
      const response = await fetch(url, {
        method: "GET",
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Query failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.results || [];
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async create<T extends ParseObject>(
    className: string,
    data: Partial<T>
  ): Promise<T> {
    this.ensureInitialized();

    try {
      const url = `${this.config.serverUrl}/classes/${className}`;
      
      // Convert Date objects to Parse format
      const processedData = this.processDataForParse(data);
      
      const response = await fetch(url, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(processedData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Create failed: ${error.error || response.statusText}`);
      }

      const result = await response.json();
      return { ...data, objectId: result.objectId, createdAt: result.createdAt, updatedAt: result.updatedAt } as T;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async update<T extends ParseObject>(
    className: string,
    objectId: string,
    data: Partial<T>
  ): Promise<T> {
    this.ensureInitialized();

    try {
      const url = `${this.config.serverUrl}/classes/${className}/${objectId}`;
      
      // Convert Date objects to Parse format
      const processedData = this.processDataForParse(data);
      
      const response = await fetch(url, {
        method: "PUT",
        headers: this.getHeaders(),
        body: JSON.stringify(processedData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Update failed: ${error.error || response.statusText}`);
      }

      const result = await response.json();
      return { ...data, objectId, updatedAt: result.updatedAt } as T;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async delete(className: string, objectId: string): Promise<void> {
    this.ensureInitialized();

    try {
      const url = `${this.config.serverUrl}/classes/${className}/${objectId}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Delete failed: ${error.error || response.statusText}`);
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private processDataForParse(data: any): any {
    if (data === null || data === undefined) {
      return data;
    }

    if (data instanceof Date) {
      return {
        __type: "Date",
        iso: data.toISOString()
      };
    }

    if (Array.isArray(data)) {
      return data.map(item => this.processDataForParse(item));
    }

    if (typeof data === 'object') {
      const processed: any = {};
      for (const [key, value] of Object.entries(data)) {
        processed[key] = this.processDataForParse(value);
      }
      return processed;
    }

    return data;
  }

  private handleError(error: any): Error {
    if (error instanceof Error) {
      return error;
    }
    return new Error(String(error));
  }

  private ensureInitialized(): void {
    if (!this.initialized) {
      throw new Error("Back4App REST client not initialized. Call initialize() first.");
    }
  }

  isInitialized(): boolean {
    return this.initialized;
  }
}
