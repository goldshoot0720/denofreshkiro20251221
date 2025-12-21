/**
 * Back4App Client Service
 * Core client for communicating with Back4App Parse Server
 */

import Parse from "parse";
import { loadBack4AppConfig, validateConfig } from "../config/back4app.ts";
import type {
  AuthCredentials,
  QueryOptions,
  ApiResponse,
  ApiError,
  ParseUser,
  ParseObject,
} from "../types/api.ts";

export class Back4AppClient {
  private static instance: Back4AppClient;
  private initialized = false;
  private config = loadBack4AppConfig();

  private constructor() {}

  /**
   * Get singleton instance of Back4AppClient
   */
  static getInstance(): Back4AppClient {
    if (!Back4AppClient.instance) {
      Back4AppClient.instance = new Back4AppClient();
    }
    return Back4AppClient.instance;
  }

  /**
   * Initialize the Back4App Parse SDK
   * @throws {Error} If configuration is invalid or initialization fails
   */
  async initialize(): Promise<void> {
    try {
      if (this.initialized) {
        return;
      }

      if (!validateConfig(this.config)) {
        throw new Error("Invalid Back4App configuration");
      }

      Parse.initialize(this.config.applicationId);
      Parse.serverURL = this.config.serverUrl;

      // Test connection by making a simple query
      await this.testConnection();

      this.initialized = true;
      console.log("Back4App client initialized successfully");
    } catch (error) {
      console.error("Failed to initialize Back4App client:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Back4App initialization failed: ${errorMessage}`);
    }
  }

  /**
   * Test connection to Back4App server
   */
  private async testConnection(): Promise<void> {
    try {
      const TestObject = Parse.Object.extend("_User");
      const query = new Parse.Query(TestObject);
      query.limit(1);
      await query.find();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Connection test failed: ${errorMessage}`);
    }
  }

  /**
   * Authenticate user with Back4App
   * @param credentials - User credentials
   * @returns Promise resolving to authenticated user
   */
  async authenticate(credentials: AuthCredentials): Promise<ParseUser> {
    this.ensureInitialized();

    try {
      let user: Parse.User;

      if (credentials.sessionToken) {
        // Authenticate with session token
        user = new Parse.User();
        user.setSessionToken(credentials.sessionToken);
        user = await user.fetch();
      } else if (credentials.username && credentials.password) {
        // Authenticate with username/password
        user = await Parse.User.logIn(credentials.username, credentials.password);
      } else {
        throw new Error("Invalid credentials provided");
      }

      return {
        objectId: user.id,
        username: user.get("username"),
        email: user.get("email"),
        sessionToken: user.getSessionToken() || "",
        createdAt: user.createdAt?.toISOString() || "",
        updatedAt: user.updatedAt?.toISOString() || "",
      };
    } catch (error) {
      throw this.handleParseError(error);
    }
  }

  /**
   * Query objects from Back4App
   * @param className - Parse class name
   * @param options - Query options
   * @returns Promise resolving to array of objects
   */
  async query<T extends ParseObject>(
    className: string,
    options: QueryOptions = {}
  ): Promise<T[]> {
    this.ensureInitialized();

    try {
      const ParseClass = Parse.Object.extend(className);
      const query = new Parse.Query(ParseClass);

      // Apply query options
      if (options.where) {
        Object.entries(options.where).forEach(([key, value]) => {
          query.equalTo(key, value);
        });
      }

      if (options.limit) query.limit(options.limit);
      if (options.skip) query.skip(options.skip);
      if (options.order) query.ascending(options.order);
      if (options.include) query.include(options.include);
      if (options.select) query.select(options.select);

      const results = await query.find();
      return results.map(this.parseObjectToJson) as T[];
    } catch (error) {
      throw this.handleParseError(error);
    }
  }

  /**
   * Create new object in Back4App
   * @param className - Parse class name
   * @param data - Object data
   * @returns Promise resolving to created object
   */
  async create<T extends ParseObject>(
    className: string,
    data: Partial<T>
  ): Promise<T> {
    this.ensureInitialized();

    try {
      const ParseClass = Parse.Object.extend(className);
      const object = new ParseClass();

      // Set object attributes
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "objectId" && key !== "createdAt" && key !== "updatedAt") {
          object.set(key, value);
        }
      });

      const savedObject = await object.save();
      return this.parseObjectToJson(savedObject) as T;
    } catch (error) {
      throw this.handleParseError(error);
    }
  }

  /**
   * Update existing object in Back4App
   * @param className - Parse class name
   * @param objectId - Object ID to update
   * @param data - Updated data
   * @returns Promise resolving to updated object
   */
  async update<T extends ParseObject>(
    className: string,
    objectId: string,
    data: Partial<T>
  ): Promise<T> {
    this.ensureInitialized();

    try {
      const ParseClass = Parse.Object.extend(className);
      const query = new Parse.Query(ParseClass);
      const object = await query.get(objectId);

      // Update object attributes
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "objectId" && key !== "createdAt" && key !== "updatedAt") {
          object.set(key, value);
        }
      });

      const savedObject = await object.save();
      return this.parseObjectToJson(savedObject) as T;
    } catch (error) {
      throw this.handleParseError(error);
    }
  }

  /**
   * Delete object from Back4App
   * @param className - Parse class name
   * @param objectId - Object ID to delete
   */
  async delete(className: string, objectId: string): Promise<void> {
    this.ensureInitialized();

    try {
      const ParseClass = Parse.Object.extend(className);
      const query = new Parse.Query(ParseClass);
      const object = await query.get(objectId);
      await object.destroy();
    } catch (error) {
      throw this.handleParseError(error);
    }
  }

  /**
   * Subscribe to real-time updates for a class
   * @param className - Parse class name
   * @param callback - Callback function for updates
   * @returns Subscription object
   */
  subscribe(
    className: string,
    callback: (data: any) => void
  ): { unsubscribe: () => void } {
    this.ensureInitialized();

    try {
      const ParseClass = Parse.Object.extend(className);
      const query = new Parse.Query(ParseClass);
      const subscription = query.subscribe();

      subscription.on("create", (object: Parse.Object) => {
        callback({ type: "create", object: this.parseObjectToJson(object) });
      });

      subscription.on("update", (object: Parse.Object) => {
        callback({ type: "update", object: this.parseObjectToJson(object) });
      });

      subscription.on("delete", (object: Parse.Object) => {
        callback({ type: "delete", object: this.parseObjectToJson(object) });
      });

      return {
        unsubscribe: () => subscription.unsubscribe(),
      };
    } catch (error) {
      console.error("Failed to create subscription:", error);
      throw this.handleParseError(error);
    }
  }

  /**
   * Convert Parse object to plain JSON
   */
  private parseObjectToJson(parseObject: Parse.Object): ParseObject {
    return {
      objectId: parseObject.id,
      createdAt: parseObject.createdAt?.toISOString() || "",
      updatedAt: parseObject.updatedAt?.toISOString() || "",
      ...parseObject.toJSON(),
    };
  }

  /**
   * Handle Parse errors and convert to standard format
   */
  private handleParseError(error: any): Error {
    if (error instanceof Parse.Error) {
      return new Error(`Parse Error ${error.code}: ${error.message}`);
    }
    return error instanceof Error ? error : new Error(String(error));
  }

  /**
   * Ensure client is initialized before operations
   */
  private ensureInitialized(): void {
    if (!this.initialized) {
      throw new Error("Back4App client not initialized. Call initialize() first.");
    }
  }

  /**
   * Get initialization status
   */
  isInitialized(): boolean {
    return this.initialized;
  }
}