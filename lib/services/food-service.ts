/**
 * Food Management Service
 * Handles CRUD operations for food data using Back4App
 */

import { Back4AppRestClient } from "./back4app-rest-client.ts";
import { AuthService } from "./auth-service.ts";
import type {
  Food,
  CreateFoodData,
  FoodQueryOptions,
  FoodStats,
} from "../types/models.ts";
import type { QueryOptions } from "../types/api.ts";

export class FoodService {
  private static instance: FoodService;
  private back4appClient: Back4AppRestClient;
  private authService: AuthService;
  private readonly className = "food";

  private constructor() {
    this.back4appClient = Back4AppRestClient.getInstance();
    this.authService = AuthService.getInstance();
  }

  static getInstance(): FoodService {
    if (!FoodService.instance) {
      FoodService.instance = new FoodService();
    }
    return FoodService.instance;
  }

  /**
   * 建立新食品項目
   */
  async createFood(data: CreateFoodData): Promise<Food> {
    // 確保 Back4App 客戶端已初始化
    await this.back4appClient.initialize();
    
    const foodData = {
      name: data.name,
      amount: data.amount || 1,
      price: data.price,
      shop: data.shop,
      todate: data.todate ? new Date(data.todate) : undefined,
      photo: data.photo,
      photohash: data.photohash,
    };

    return await this.back4appClient.create<Food>(this.className, foodData);
  }

  /**
   * 取得食品列表
   */
  async getFoods(options: FoodQueryOptions = {}): Promise<Food[]> {
    // 確保 Back4App 客戶端已初始化
    await this.back4appClient.initialize();
    
    const queryOptions: QueryOptions = {
      limit: options.limit || 50,
      skip: options.skip || 0,
    };

    // 添加搜尋功能
    if (options.search) {
      queryOptions.where = {
        name: { $regex: options.search, $options: "i" }
      };
    }

    // 篩選即將到期的食品
    if (options.expiringWithinDays) {
      const today = new Date();
      const futureDate = new Date();
      futureDate.setDate(today.getDate() + options.expiringWithinDays);
      
      queryOptions.where = {
        ...queryOptions.where,
        todate: {
          $gte: today.toISOString().split('T')[0],
          $lte: futureDate.toISOString().split('T')[0],
        }
      };
    }

    // 添加排序
    if (options.sortBy) {
      const sortField = options.sortBy === 'expiryDate' ? 'todate' : 
                       options.sortBy === 'purchaseDate' ? 'createdAt' : options.sortBy;
      queryOptions.order = options.sortOrder === "desc" ? `-${sortField}` : sortField;
    } else {
      queryOptions.order = "-createdAt"; // 預設按建立時間降序
    }

    return await this.back4appClient.query<Food>(this.className, queryOptions);
  }

  /**
   * 取得單一食品項目
   */
  async getFood(objectId: string): Promise<Food | null> {
    // 確保 Back4App 客戶端已初始化
    await this.back4appClient.initialize();
    
    const foods = await this.back4appClient.query<Food>(this.className, {
      where: { objectId },
      limit: 1,
    });

    return foods.length > 0 ? foods[0] : null;
  }

  /**
   * 更新食品項目
   */
  async updateFood(objectId: string, data: Partial<CreateFoodData>): Promise<Food> {
    // 確保 Back4App 客戶端已初始化
    await this.back4appClient.initialize();
    
    // Convert date strings to Date objects if present
    const updateData = { ...data };
    if (updateData.todate) {
      if (typeof updateData.todate === 'string') {
        updateData.todate = new Date(updateData.todate);
      }
    }

    return await this.back4appClient.update<Food>(this.className, objectId, updateData);
  }

  /**
   * 刪除食品項目
   */
  async deleteFood(objectId: string): Promise<void> {
    // 確保 Back4App 客戶端已初始化
    await this.back4appClient.initialize();
    
    await this.back4appClient.delete(this.className, objectId);
  }

  /**
   * 取得即將到期的食品
   */
  async getExpiringFoods(days: number = 7): Promise<Food[]> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error("User must be authenticated");
    }

    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + days);

    return await this.back4appClient.query<Food>(this.className, {
      where: {
        userId: currentUser.objectId,
        status: { $in: ["fresh", "expiring_soon"] },
        expiryDate: {
          $gte: today.toISOString().split('T')[0],
          $lte: futureDate.toISOString().split('T')[0],
        },
      },
      order: "expiryDate",
    });
  }

  /**
   * 取得已過期的食品
   */
  async getExpiredFoods(): Promise<Food[]> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error("User must be authenticated");
    }

    const today = new Date().toISOString().split('T')[0];

    return await this.back4appClient.query<Food>(this.className, {
      where: {
        userId: currentUser.objectId,
        expiryDate: { $lt: today },
        status: { $ne: "consumed" },
      },
      order: "-expiryDate",
    });
  }

  /**
   * 取得食品統計數據
   */
  async getFoodStats(): Promise<FoodStats> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error("User must be authenticated");
    }

    const allFoods = await this.getFoods();
    
    const stats: FoodStats = {
      totalItems: allFoods.length,
      freshItems: 0,
      expiringSoonItems: 0,
      expiredItems: 0,
      totalValue: 0,
      categoryCounts: {},
    };

    for (const food of allFoods) {
      // 統計狀態
      switch (food.status) {
        case "fresh":
          stats.freshItems++;
          break;
        case "expiring_soon":
          stats.expiringSoonItems++;
          break;
        case "expired":
          stats.expiredItems++;
          break;
      }

      // 計算總價值
      if (food.price && food.quantity) {
        stats.totalValue += food.price * food.quantity;
      }

      // 統計分類
      const category = food.category || "未分類";
      stats.categoryCounts[category] = (stats.categoryCounts[category] || 0) + 1;
    }

    return stats;
  }

  /**
   * 標記食品為已消費
   */
  async markAsConsumed(objectId: string, consumedQuantity?: number): Promise<Food> {
    const food = await this.getFood(objectId);
    if (!food) {
      throw new Error("Food item not found");
    }

    if (consumedQuantity && consumedQuantity < food.quantity) {
      // 部分消費，減少數量
      return await this.updateFood(objectId, {
        quantity: food.quantity - consumedQuantity,
      });
    } else {
      // 完全消費，標記狀態
      return await this.updateFood(objectId, {
        status: "consumed",
        quantity: 0,
      });
    }
  }

  /**
   * 批量更新過期食品狀態
   */
  async processExpiredFoods(): Promise<number> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error("User must be authenticated");
    }

    const today = new Date().toISOString().split('T')[0];
    
    const expiredFoods = await this.back4appClient.query<Food>(this.className, {
      where: {
        userId: currentUser.objectId,
        expiryDate: { $lt: today },
        status: { $in: ["fresh", "expiring_soon"] },
      },
    });

    let updatedCount = 0;
    for (const food of expiredFoods) {
      try {
        await this.updateFood(food.objectId, { status: "expired" });
        updatedCount++;
      } catch (error) {
        console.error(`Failed to update food ${food.objectId}:`, error);
      }
    }

    return updatedCount;
  }

  /**
   * 取得食品分類列表
   */
  async getFoodCategories(): Promise<string[]> {
    const foods = await this.getFoods();
    const categories = new Set<string>();
    
    foods.forEach(food => {
      if (food.category) {
        categories.add(food.category);
      }
    });

    return Array.from(categories).sort();
  }

  /**
   * 根據條碼搜尋食品
   */
  async searchByBarcode(barcode: string): Promise<Food[]> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error("User must be authenticated");
    }

    return await this.back4appClient.query<Food>(this.className, {
      where: {
        userId: currentUser.objectId,
        barcode: barcode,
      },
    });
  }

  /**
   * 食品即時更新訂閱
   */
  subscribeToUpdates(callback: (data: any) => void): { unsubscribe: () => void } {
    return this.back4appClient.subscribe(this.className, callback);
  }
}