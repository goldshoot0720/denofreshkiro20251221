# 訂閱管理與食品管理系統設定指南

這是一個整合 Back4App 雲端資料庫的訂閱管理和食品管理系統，使用 Fresh (Deno) 框架建構。

## 功能特色

### 📋 訂閱管理系統
- ✅ 完整的 CRUD 操作（建立、讀取、更新、刪除）
- ✅ 智能付款提醒和到期通知
- ✅ 多種計費週期支援（月、年、週、日）
- ✅ 分類管理和搜尋功能
- ✅ 即時數據同步

### 🍎 食品管理系統
- ✅ 食品庫存追蹤
- ✅ 到期日期監控和提醒
- ✅ 自動狀態更新（新鮮、即將過期、已過期）
- ✅ 品牌和分類管理
- ✅ 價格和位置追蹤

### 🔧 技術特色
- ✅ Back4App 雲端資料庫整合
- ✅ 用戶認證和會話管理
- ✅ 響應式設計
- ✅ 即時數據更新
- ✅ RESTful API 設計

## 環境設定

### 1. Back4App 設定

1. 前往 [Back4App](https://www.back4app.com/) 註冊帳戶
2. 建立新的應用程式
3. 在應用程式設定中取得以下資訊：
   - Application ID
   - REST API Key
   - Server URL

### 2. 環境變數設定

在專案根目錄建立 `.env` 文件：

```bash
# Back4App 配置
BACK4APP_APPLICATION_ID=your_application_id_here
BACK4APP_REST_API_KEY=your_rest_api_key_here
BACK4APP_SERVER_URL=https://parseapi.back4app.com/
```

### 3. 安裝依賴

```bash
# 確保已安裝 Deno
deno --version

# 安裝專案依賴（Fresh 會自動處理）
deno task dev
```

## 資料庫結構

### Subscription 表格
```typescript
{
  objectId: string;           // Parse 自動生成
  name: string;              // 訂閱名稱
  category: string;          // 分類
  url?: string;              // 網站 URL
  price: number;             // 價格
  currency: string;          // 貨幣（預設 TWD）
  billingCycle: string;      // 計費週期
  nextPaymentDate: string;   // 下次付款日期
  status: string;            // 狀態
  description?: string;      // 描述
  reminderDays: number;      // 提醒天數
  userId: string;            // 用戶 ID
  createdAt: string;         // 建立時間
  updatedAt: string;         // 更新時間
}
```

### Food 表格
```typescript
{
  objectId: string;          // Parse 自動生成
  name: string;              // 食品名稱
  brand?: string;            // 品牌
  category: string;          // 分類
  quantity: number;          // 數量
  unit: string;              // 單位
  price?: number;            // 價格
  currency: string;          // 貨幣
  purchaseDate?: string;     // 購買日期
  expiryDate?: string;       // 到期日期
  status: string;            // 狀態
  location?: string;         // 存放位置
  barcode?: string;          // 條碼
  image?: string;            // 圖片 URL
  notes?: string;            // 備註
  userId: string;            // 用戶 ID
  createdAt: string;         // 建立時間
  updatedAt: string;         // 更新時間
}
```

## API 端點

### 認證 API
- `POST /api/auth/login` - 用戶登入
- `POST /api/auth/logout` - 用戶登出

### 訂閱管理 API
- `GET /api/subscriptions` - 取得訂閱列表
- `POST /api/subscriptions` - 建立新訂閱
- `GET /api/subscriptions/[id]` - 取得單一訂閱
- `PUT /api/subscriptions/[id]` - 更新訂閱
- `DELETE /api/subscriptions/[id]` - 刪除訂閱

### 食品管理 API
- `GET /api/foods` - 取得食品列表
- `POST /api/foods` - 建立新食品項目
- `GET /api/foods/[id]` - 取得單一食品項目
- `PUT /api/foods/[id]` - 更新食品項目
- `DELETE /api/foods/[id]` - 刪除食品項目

### 統計 API
- `GET /api/stats` - 取得統計數據
- `GET /api/stats?type=subscriptions` - 訂閱統計
- `GET /api/stats?type=foods` - 食品統計

### 系統 API
- `GET /api/health` - 系統健康檢查

## 使用方式

### 1. 啟動開發伺服器

```bash
deno task dev
```

### 2. 存取應用程式

開啟瀏覽器前往 `http://localhost:8000`

### 3. 登入系統

1. 前往 `/login` 頁面
2. 使用 Back4App 用戶帳戶登入
3. 或先在 Back4App 控制台建立測試用戶

### 4. 使用功能

#### 訂閱管理
1. 前往 `/subscriptions` 頁面
2. 點擊「添加訂閱」建立新訂閱
3. 填寫訂閱資訊並儲存
4. 使用搜尋功能查找特定訂閱
5. 編輯或刪除現有訂閱

#### 食品管理
1. 前往 `/food` 頁面
2. 點擊「添加食品」建立新食品項目
3. 填寫食品資訊，包括到期日期
4. 系統會自動計算剩餘天數並更新狀態
5. 使用搜尋功能查找特定食品

## 開發指南

### 專案結構
```
├── components/          # 共用組件
├── islands/            # 互動式組件
├── lib/               # 核心程式庫
│   ├── config/        # 配置文件
│   ├── services/      # 服務層
│   ├── types/         # 類型定義
│   └── init.ts        # 初始化
├── routes/            # 路由和頁面
│   └── api/          # API 路由
└── static/           # 靜態資源
```

### 新增功能

1. **新增資料模型**：在 `lib/types/models.ts` 定義類型
2. **建立服務**：在 `lib/services/` 建立服務類別
3. **建立 API**：在 `routes/api/` 建立 API 路由
4. **建立頁面**：在 `routes/` 建立頁面組件
5. **建立互動組件**：在 `islands/` 建立 Islands 組件

### 測試

```bash
# 執行測試
deno test

# 檢查系統健康狀態
curl http://localhost:8000/api/health
```

## 故障排除

### 常見問題

1. **Back4App 連線失敗**
   - 檢查環境變數是否正確設定
   - 確認 Back4App 應用程式狀態正常
   - 檢查網路連線

2. **認證失敗**
   - 確認用戶帳戶存在於 Back4App
   - 檢查用戶名稱和密碼是否正確
   - 清除瀏覽器快取和 localStorage

3. **資料無法載入**
   - 檢查用戶是否已登入
   - 確認 API 路由正常運作
   - 查看瀏覽器開發者工具的錯誤訊息

### 除錯工具

- 使用 `/api/health` 檢查系統狀態
- 查看瀏覽器開發者工具的 Network 標籤
- 檢查伺服器控制台的錯誤訊息

## 部署

### Deno Deploy

1. 推送程式碼到 GitHub
2. 連結 Deno Deploy 專案
3. 設定環境變數
4. 部署應用程式

### 其他平台

確保平台支援 Deno 運行時，並正確設定環境變數。

## 貢獻

歡迎提交 Issue 和 Pull Request 來改善這個專案！

## 授權

MIT License