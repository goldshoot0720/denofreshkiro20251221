# 🍎 食品管理系統 - 結構對照表

## 📊 Back4App 資料庫 vs 前端表單對照

### Back4App `food` 表結構
```json
{
  "className": "food",
  "fields": {
    "objectId": {"type": "String"},
    "createdAt": {"type": "Date"},
    "updatedAt": {"type": "Date"},
    "ACL": {"type": "ACL"},
    "name": {"type": "String", "required": false},
    "amount": {"type": "Number", "required": false},
    "price": {"type": "Number", "required": false},
    "shop": {"type": "String", "required": false},
    "todate": {"type": "Date", "required": false},
    "photo": {"type": "String", "required": false},
    "photohash": {"type": "String", "required": false}
  }
}
```

### 前端表單欄位 (當前)
- ✅ `name` (String) - 食品名稱
- ✅ `amount` (Number) - 數量
- ✅ `price` (Number) - 價格
- ✅ `shop` (String) - 商店
- ✅ `todate` (Date) - 到期日期
- ❌ `photo` (String) - **缺少**
- ❌ `photohash` (String) - **缺少**
- ✅ `note` (String) - 備註 (額外欄位)

### 🔧 需要修復的問題

1. **缺少 photo 欄位**
   - 應該添加圖片上傳功能
   - 可以是 URL 或 Base64 字串

2. **缺少 photohash 欄位**
   - 用於圖片去重和快速比對
   - 可以從上傳的圖片自動生成

### 📝 建議的修復方案

#### 選項 1: 添加完整圖片功能
```typescript
// 添加到表單
<input
  type="file"
  accept="image/*"
  placeholder="食品照片 (選填)"
  onChange={handlePhotoUpload}
/>
<input
  type="text"
  placeholder="照片 URL (選填)"
  value={formData.value.photo}
  onInput={(e) => formData.value = { ...formData.value, photo: (e.target as HTMLInputElement).value }}
/>
```

#### 選項 2: 簡化處理 (推薦)
```typescript
// 暫時添加隱藏欄位，保持資料結構一致
photo: data.photo || "",
photohash: data.photohash || "",
```

### 🎯 當前狀態
- **前端表單**: 5/7 欄位完整 (71%)
- **資料傳輸**: ✅ 正常 (缺少欄位會設為空字串)
- **功能影響**: ⚠️ 輕微 (圖片功能不可用)

### 📋 修復優先級
1. **高優先級**: 確保資料結構一致性
2. **中優先級**: 添加基本圖片 URL 輸入
3. **低優先級**: 完整圖片上傳功能