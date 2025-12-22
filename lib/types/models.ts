/**
 * Data Models for Subscription and Food Management
 */

import type { ParseObject } from "./api.ts";

// 訂閱管理模型 (對應 Back4App subscription 表)
export interface Subscription extends ParseObject {
  name: string;           // Back4App: name (required)
  price?: number;         // Back4App: price
  nextdate?: string;      // Back4App: nextdate (Date)
  site?: string;          // Back4App: site
  account?: string;       // Back4App: account
  note?: string;          // Back4App: note
  
  // 前端計算欄位
  category?: string;      // 前端分類 (可從 note 或其他欄位推導)
  status?: 'active' | 'paused' | 'cancelled' | 'expired';
  currency?: string;      // 預設 TWD
  billingCycle?: 'monthly' | 'yearly' | 'weekly' | 'daily';
  reminderDays?: number;
}

export interface CreateSubscriptionData {
  name: string;
  price?: number;
  nextdate?: string;
  site?: string;
  account?: string;
  note?: string;
  
  // 前端額外欄位
  category?: string;
  status?: 'active' | 'paused' | 'cancelled' | 'expired';
  currency?: string;
  billingCycle?: 'monthly' | 'yearly' | 'weekly' | 'daily';
  reminderDays?: number;
}

// 食品管理模型 (對應 Back4App food 表)
export interface Food extends ParseObject {
  name?: string;          // Back4App: name
  amount?: number;        // Back4App: amount (數量)
  price?: number;         // Back4App: price
  shop?: string;          // Back4App: shop (商店)
  todate?: string;        // Back4App: todate (到期日期)
  photo?: string;         // Back4App: photo
  photohash?: string;     // Back4App: photohash
  
  // 前端計算欄位
  brand?: string;         // 品牌 (可從 name 推導)
  category?: string;      // 分類 (可從 name 或 shop 推導)
  unit?: string;          // 單位
  currency?: string;      // 貨幣
  status?: 'fresh' | 'expiring_soon' | 'expired' | 'consumed';
  location?: string;      // 存放位置
  notes?: string;         // 備註
}

export interface CreateFoodData {
  name?: string;
  amount?: number;
  price?: number;
  shop?: string;
  todate?: string;
  photo?: string;
  photohash?: string;
  
  // 前端額外欄位
  brand?: string;
  category?: string;
  unit?: string;
  currency?: string;
  status?: 'fresh' | 'expiring_soon' | 'expired' | 'consumed';
  location?: string;
  notes?: string;
}

// 查詢選項
export interface SubscriptionQueryOptions {
  status?: string;
  category?: string;
  search?: string;
  sortBy?: 'name' | 'nextPaymentDate' | 'price' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  skip?: number;
}

export interface FoodQueryOptions {
  status?: string;
  category?: string;
  search?: string;
  expiringWithinDays?: number;
  sortBy?: 'name' | 'expiryDate' | 'purchaseDate' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  skip?: number;
}

// 統計數據
export interface SubscriptionStats {
  totalSubscriptions: number;
  activeSubscriptions: number;
  totalMonthlySpending: number;
  totalYearlySpending: number;
  upcomingPayments: number;
  expiredSubscriptions: number;
}

export interface FoodStats {
  totalItems: number;
  freshItems: number;
  expiringSoonItems: number;
  expiredItems: number;
  totalValue: number;
  categoryCounts: Record<string, number>;
}