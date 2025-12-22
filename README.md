# 鋒兄AI資訊系統

一個基於 Fresh 框架構建的現代化管理系統，包含影片庫、圖片庫、食品管理和訂閱管理功能。

## 功能特色

- 🎬 **影片庫管理** - 管理和瀏覽影片收藏
- 🖼️ **圖片庫管理** - 智能圖片分類和搜尋
- 🍎 **食品管理** - 食品到期提醒和庫存管理
- 📋 **訂閱管理** - 訂閱服務和帳單追蹤
- 📊 **系統儀表板** - 即時數據監控和統計
- 📱 **響應式設計** - 支援桌面和移動設備

## 技術棧

- **前端框架**: Fresh (Deno)
- **UI 框架**: Preact
- **樣式**: Tailwind CSS
- **運行環境**: Deno
- **部署**: 支援 Netlify 等平台

## 快速開始

### 環境要求

- Deno 1.40+
- Node.js (可選，用於某些工具)

### 安裝和運行

1. 克隆項目
```bash
git clone https://github.com/goldshoot0720/denofreshkiro20251221.git
cd denofreshkiro20251221
```

2. 啟動開發服務器
```bash
deno task start
```

3. 打開瀏覽器訪問 `http://localhost:8000`

### 可用命令

```bash
# 開發模式
deno task start

# 代碼檢查
deno task check

# 構建生產版本
deno task build

# 預覽生產版本
deno task preview

# 更新依賴
deno task update
```

## 項目結構

```
├── components/          # 可重用組件
│   ├── Layout.tsx      # 主佈局組件
│   └── Sidebar.tsx     # 側邊導航
├── islands/            # 客戶端交互組件
│   └── MobileNavToggle.tsx
├── routes/             # 頁面路由
│   ├── index.tsx       # 首頁
│   ├── dashboard.tsx   # 儀表板
│   ├── videos.tsx      # 影片庫
│   ├── images.tsx      # 圖片庫
│   ├── food.tsx        # 食品管理
│   └── subscriptions.tsx # 訂閱管理
├── static/             # 靜態資源
└── fresh.config.ts     # Fresh 配置
```

## 頁面功能

### 🏠 首頁
- 系統介紹和技術棧展示
- 快速導航到各個功能模塊

### 📊 系統儀表板
- 訂閱和食品統計概覽
- 到期提醒和警告
- 實時數據監控

### 🎬 影片庫
- 影片收藏管理
- 搜尋和篩選功能
- 影片信息展示

### 🖼️ 圖片庫
- 圖片收藏和分類
- 多種格式支援 (JPG, PNG, JPEG)
- 智能搜尋和排序

### 🍎 食品管理
- 食品庫存追蹤
- 到期日期提醒
- 食品信息管理

### 📋 訂閱管理
- 訂閱服務追蹤
- 帳單和付款提醒
- 訂閱狀態管理

## 響應式設計

系統採用移動優先的響應式設計：

- **桌面端**: 完整的側邊導航和多列佈局
- **移動端**: 折疊式導航和單列佈局
- **平板端**: 自適應的混合佈局

## 開發指南

### 添加新頁面

1. 在 `routes/` 目錄創建新的 `.tsx` 文件
2. 使用 `Layout` 組件包裝頁面內容
3. 在 `Sidebar.tsx` 中添加導航項目

### 自定義樣式

項目使用 Tailwind CSS，可以在 `static/styles.css` 中添加自定義樣式。

### 組件開發

- 靜態組件放在 `components/` 目錄
- 需要客戶端交互的組件放在 `islands/` 目錄

## 部署

### Netlify 部署

1. 連接 GitHub 倉庫到 Netlify
2. 設置構建命令: `deno task build`
3. 設置發布目錄: `_fresh`

### 其他平台

項目支援任何支援 Deno 的部署平台。

## 貢獻

歡迎提交 Issue 和 Pull Request 來改進項目。

## 版權

© 2025-2125 鋒兄資訊公開資訊 版權所有