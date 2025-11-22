# 🚨 Fix Lỗi Khởi Động

## Vấn Đề Hiện Tại

Bạn đang gặp lỗi vì **chạy từ sai thư mục**:

```bash
# ❌ SAI - Đang ở đây
/Users/admin/Hackathon_1/TastebuddyAI/mobile

# ✅ ĐÚNG - Cần ở đây  
/Users/admin/Hackathon_1/TastebuddyAI
```

---

## ✅ Cách Fix (3 Bước)

### Bước 1: Di chuyển về thư mục đúng

```bash
cd /Users/admin/Hackathon_1/TastebuddyAI
```

### Bước 2: Cài đặt dependencies (nếu chưa)

```bash
npm install
```

### Bước 3: Chạy app

```bash
npm start
```

---

## 🔧 Node Version Warning

Bạn có Node 20.18.3 nhưng cần >= 20.19.4. **Có 2 cách:**

### Option 1: Nâng cấp Node (Khuyến nghị)

```bash
# Dùng nvm
nvm install 20.19.4
nvm use 20.19.4

# Hoặc dùng n
sudo n 20.19.4
```

### Option 2: Bỏ qua warning (Tạm thời)

Node 20.18.3 vẫn hoạt động được, chỉ có warning. Bạn có thể tiếp tục dùng.

---

## 📝 Đã Fix Cho Bạn

1. ✅ Tạo `.watchmanconfig` - Fix Watchman error
2. ✅ Tạo Logger Service - Logging cho toàn app
3. ✅ Tích hợp logger vào API client, Auth store
4. ✅ Áp dụng rules từ `.agent/rules/code-react-native.md`

---

## 🎯 Logger Service - Cách Dùng

```typescript
import { logger } from '@services/logger/logger';

// Basic logging
logger.debug('Debug message');
logger.info('Info message');
logger.warn('Warning message');
logger.error('Error message', error);

// API logging (tự động trong API client)
logger.logApiRequest('GET', '/profile');
logger.logApiResponse('GET', '/profile', 200, data);

// Navigation logging
logger.logNavigation('Home', 'Profile');

// State logging (tự động trong stores)
logger.logStateChange('AuthStore', 'setUser', { userId: 123 });
```

### Configure Logger

```typescript
import { logger } from '@services/logger/logger';

logger.configure({
  enabled: true,
  level: 'debug', // 'debug' | 'info' | 'warn' | 'error'
  showTimestamp: true,
  showColors: true,
});
```

---

## 🚀 Sau Khi Fix

Chạy lại từ thư mục đúng:

```bash
cd /Users/admin/Hackathon_1/TastebuddyAI
npm start
```

Bạn sẽ thấy:
- ✅ Không còn lỗi Watchman
- ✅ App chạy bình thường
- ✅ Logs xuất hiện trong console
- ✅ QR code để scan với Expo Go

---

## 📱 Test Trên Điện Thoại

1. Cài **Expo Go** từ App Store/Google Play
2. Scan QR code hiện trên terminal
3. App sẽ tự động load

Hoặc test trên simulator:

```bash
# iOS
npm run ios

# Android
npm run android
```

---

**Vấn đề chính là thư mục sai. Hãy cd về `/Users/admin/Hackathon_1/TastebuddyAI` rồi chạy lại!** 🎉
