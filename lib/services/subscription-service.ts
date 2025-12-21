/**
 * Subscription Management Service
 * Handles CRUD operations for subscription data using Back4App
 */

import { Back4AppRestClient } from "./back4app-rest-client.ts";
import { AuthService } from "./auth-service.ts";
import type {
  Subscription,
  CreateSubscriptionData,
  SubscriptionQueryOptions,
  SubscriptionStats,
} from "../types/models.ts";
import type { QueryOptions } from "../types/api.ts";

export class SubscriptionService {
  private static instance: SubscriptionService;
  private back4appClient: Back4AppRestClient;
  private authService: AuthService;
  private readonly className = "subscription";

  private constructor() {
    this.back4appClient = Back4AppRestClient.getInstance();
    this.authService = AuthService.getInstance();
  }

  static getInstance(): SubscriptionService {
    if (!SubscriptionService.instance) {
      SubscriptionService.instance = new SubscriptionService();
    }
    return SubscriptionService.instance;
  }

  /**
   * 建立新訂閱
   */
  async createSubscription(data: CreateSubscriptionData): Promise<Subscription> {
    const subscriptionData = {
      name: data.name,
      price: data.price || 0,
      nextdate: data.nextdate ? new Date(data.nextdate) : undefined,
      site: data.site,
      account: data.account,
      note: data.note,
    };

    return await this.back4appClient.create<Subscription>(
      this.className,
      subscriptionData
    );
  }

  /**
   * 取得訂閱列表
   */
  async getSubscriptions(options: SubscriptionQueryOptions = {}): Promise<Subscription[]> {
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

    // 添加排序
    if (options.sortBy) {
      const sortField = options.sortBy === 'nextPaymentDate' ? 'nextdate' : options.sortBy;
      queryOptions.order = options.sortOrder === "desc" ? `-${sortField}` : sortField;
    } else {
      queryOptions.order = "-createdAt"; // 預設按建立時間降序
    }

    return await this.back4appClient.query<Subscription>(this.className, queryOptions);
  }

  /**
   * 取得單一訂閱
   */
  async getSubscription(objectId: string): Promise<Subscription | null> {
    const subscriptions = await this.back4appClient.query<Subscription>(
      this.className,
      {
        where: { objectId },
        limit: 1,
      }
    );

    return subscriptions.length > 0 ? subscriptions[0] : null;
  }

  /**
   * 更新訂閱
   */
  async updateSubscription(
    objectId: string,
    data: Partial<CreateSubscriptionData>
  ): Promise<Subscription> {
    // Convert date strings to Date objects if present
    const updateData = { ...data };
    if (updateData.nextdate && typeof updateData.nextdate === 'string') {
      updateData.nextdate = new Date(updateData.nextdate);
    }

    return await this.back4appClient.update<Subscription>(
      this.className,
      objectId,
      updateData
    );
  }

  /**
   * 刪除訂閱
   */
  async deleteSubscription(objectId: string): Promise<void> {
    await this.back4appClient.delete(this.className, objectId);
  }

  /**
   * 取得即將到期的訂閱
   */
  async getUpcomingPayments(days: number = 7): Promise<Subscription[]> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error("User must be authenticated");
    }

    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + days);

    return await this.back4appClient.query<Subscription>(this.className, {
      where: {
        userId: currentUser.objectId,
        status: "active",
        nextPaymentDate: {
          $gte: today.toISOString().split('T')[0],
          $lte: futureDate.toISOString().split('T')[0],
        },
      },
      order: "nextPaymentDate",
    });
  }

  /**
   * 取得訂閱統計數據
   */
  async getSubscriptionStats(): Promise<SubscriptionStats> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error("User must be authenticated");
    }

    const allSubscriptions = await this.getSubscriptions();
    
    const stats: SubscriptionStats = {
      totalSubscriptions: allSubscriptions.length,
      activeSubscriptions: 0,
      totalMonthlySpending: 0,
      totalYearlySpending: 0,
      upcomingPayments: 0,
      expiredSubscriptions: 0,
    };

    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    for (const subscription of allSubscriptions) {
      if (subscription.status === "active") {
        stats.activeSubscriptions++;
        
        // 計算月度和年度支出
        const price = subscription.price || 0;
        switch (subscription.billingCycle) {
          case "monthly":
            stats.totalMonthlySpending += price;
            stats.totalYearlySpending += price * 12;
            break;
          case "yearly":
            stats.totalMonthlySpending += price / 12;
            stats.totalYearlySpending += price;
            break;
          case "weekly":
            stats.totalMonthlySpending += price * 4.33; // 平均每月週數
            stats.totalYearlySpending += price * 52;
            break;
          case "daily":
            stats.totalMonthlySpending += price * 30;
            stats.totalYearlySpending += price * 365;
            break;
        }
      }

      if (subscription.status === "expired") {
        stats.expiredSubscriptions++;
      }

      // 檢查即將到期的付款
      if (subscription.nextPaymentDate) {
        const paymentDate = new Date(subscription.nextPaymentDate);
        if (paymentDate >= today && paymentDate <= nextWeek) {
          stats.upcomingPayments++;
        }
      }
    }

    return stats;
  }

  /**
   * 更新訂閱狀態
   */
  async updateSubscriptionStatus(
    objectId: string,
    status: "active" | "paused" | "cancelled" | "expired"
  ): Promise<Subscription> {
    return await this.updateSubscription(objectId, { status });
  }

  /**
   * 批量更新即將到期的訂閱
   */
  async processExpiredSubscriptions(): Promise<number> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error("User must be authenticated");
    }

    const today = new Date().toISOString().split('T')[0];
    
    const expiredSubscriptions = await this.back4appClient.query<Subscription>(
      this.className,
      {
        where: {
          userId: currentUser.objectId,
          status: "active",
          nextPaymentDate: { $lt: today },
        },
      }
    );

    let updatedCount = 0;
    for (const subscription of expiredSubscriptions) {
      try {
        await this.updateSubscriptionStatus(subscription.objectId, "expired");
        updatedCount++;
      } catch (error) {
        console.error(`Failed to update subscription ${subscription.objectId}:`, error);
      }
    }

    return updatedCount;
  }

  /**
   * 訂閱即時更新
   */
  subscribeToUpdates(callback: (data: any) => void): { unsubscribe: () => void } {
    return this.back4appClient.subscribe(this.className, callback);
  }
}