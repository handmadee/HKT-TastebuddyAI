# API SPECIFICATION - Ứng Dụng Dinh Dưỡng Thông Minh

## MỤC LỤC
1. [API Overview](#1-api-overview)
2. [Authentication & Authorization](#2-authentication--authorization)
3. [Auth & Profile APIs](#3-auth--profile-apis)
4. [Health Profile APIs](#4-health-profile-apis)
5. [Food Scanner APIs](#5-food-scanner-apis)
6. [Menu Translator APIs](#6-menu-translator-apis)
7. [Food Search APIs](#7-food-search-apis)
8. [Nutrition Log APIs](#8-nutrition-log-apis)
9. [Multi-Agent System APIs](#9-multi-agent-system-apis)
10. [Common Schemas](#10-common-schemas)
11. [Error Handling](#11-error-handling)

---

## 1. API OVERVIEW

**Base URL:** `https://api.nutrition-app.com/v1`

**API Versioning:** URL-based versioning (`/v1`, `/v2`)

**Data Format:** JSON

**Authentication:** JWT Bearer Token

**Rate Limiting:**
- Authenticated users: 1000 requests/hour
- Anonymous: 100 requests/hour

---

## 2. AUTHENTICATION & AUTHORIZATION

### 2.1. JWT Token Structure

```json
{
  "sub": "user-uuid",
  "email": "user@example.com",
  "iat": 1637012345,
  "exp": 1637098745,
  "roles": ["user"]
}
```

### 2.2. Authorization Header

```
Authorization: Bearer <jwt_token>
```

### 2.3. Token Expiration
- Access Token: 24 hours
- Refresh Token: 30 days

---

## 3. AUTH & PROFILE APIs

### 3.1. Register with Email

**Endpoint:** `POST /auth/register`

**Authentication:** None

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "fullName": "Nguyen Van A"
}
```

**Response:** `201 Created`
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "fullName": "Nguyen Van A",
    "authProvider": "EMAIL"
  },
  "accessToken": "jwt_token",
  "refreshToken": "refresh_token"
}
```

**Errors:**
- `409 Conflict` - Email already exists
- `400 Bad Request` - Invalid input

---

### 3.2. Login with Email

**Endpoint:** `POST /auth/login`

**Authentication:** None

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response:** `200 OK`
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "fullName": "Nguyen Van A",
    "avatarUrl": "https://cdn.example.com/avatar.jpg"
  },
  "accessToken": "jwt_token",
  "refreshToken": "refresh_token",
  "hasCompletedOnboarding": true
}
```

**Errors:**
- `401 Unauthorized` - Invalid credentials
- `404 Not Found` - User not found

---

### 3.3. OAuth Login (Google/Apple)

**Endpoint:** `POST /auth/oauth/:provider`

**Parameters:**
- `provider`: `google` | `apple`

**Request Body:**
```json
{
  "idToken": "oauth_id_token_from_provider"
}
```

**Response:** `200 OK`
```json
{
  "user": {
    "id": "uuid",
    "email": "user@gmail.com",
    "fullName": "Nguyen Van A",
    "avatarUrl": "https://lh3.googleusercontent.com/...",
    "authProvider": "GOOGLE"
  },
  "accessToken": "jwt_token",
  "refreshToken": "refresh_token",
  "isNewUser": false,
  "hasCompletedOnboarding": true
}
```

---

### 3.4. Refresh Token

**Endpoint:** `POST /auth/refresh`

**Request Body:**
```json
{
  "refreshToken": "refresh_token"
}
```

**Response:** `200 OK`
```json
{
  "accessToken": "new_jwt_token",
  "refreshToken": "new_refresh_token"
}
```

---

### 3.5. Get User Profile

**Endpoint:** `GET /profile`

**Authentication:** Required

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "fullName": "Nguyen Van A",
  "avatarUrl": "https://cdn.example.com/avatar.jpg",
  "language": "vi",
  "foodPreferences": {
    "categoryIds": ["uuid-1", "uuid-2"],
    "tags": ["Vegan", "Asian Food"]
  },
  "createdAt": "2024-01-01T00:00:00Z"
}
```

---

### 3.6. Update User Profile

**Endpoint:** `PATCH /profile`

**Authentication:** Required

**Request Body:**
```json
{
  "fullName": "Nguyen Van B",
  "language": "en",
  "foodPreferences": {
    "categoryIds": ["uuid-3"],
    "tags": ["Halal", "Low-Carb"]
  }
}
```

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "fullName": "Nguyen Van B",
  "language": "en",
  "foodPreferences": {
    "categoryIds": ["uuid-3"],
    "tags": ["Halal", "Low-Carb"]
  },
  "updatedAt": "2024-01-02T00:00:00Z"
}
```

---

### 3.7. Upload Avatar

**Endpoint:** `POST /profile/avatar`

**Authentication:** Required

**Request:** `multipart/form-data`
```
Content-Type: multipart/form-data

file: <image_file>
```

**Response:** `200 OK`
```json
{
  "avatarUrl": "https://cdn.example.com/avatars/uuid-timestamp.jpg"
}
```

**Constraints:**
- Max file size: 5MB
- Allowed formats: JPG, PNG, WEBP

---

## 4. HEALTH PROFILE APIs

### 4.1. Setup Health Profile (Onboarding)

**Endpoint:** `POST /health-profile`

**Authentication:** Required

**Request Body:**
```json
{
  "weightKg": 70.5,
  "heightCm": 175.0,
  "gender": "MALE",
  "age": 28,
  "healthConditions": ["Diabetes", "HighBP"],
  "goal": "LOSE_WEIGHT",
  "allergens": [
    {
      "allergenCategoryId": "uuid-seafood",
      "severity": "SEVERE"
    },
    {
      "allergenCategoryId": "uuid-peanut",
      "severity": "MILD"
    }
  ]
}
```

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "userId": "user-uuid",
  "weightKg": 70.5,
  "heightCm": 175.0,
  "gender": "MALE",
  "age": 28,
  "healthConditions": ["Diabetes", "HighBP"],
  "goal": "LOSE_WEIGHT",
  "bmi": 23.02,
  "tdee": 2250.00,
  "targetCalories": 1750.00,
  "targetProteinG": 131.25,
  "targetCarbsG": 175.00,
  "targetFatG": 58.33,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

**Business Logic:**
- BMI = weightKg / (heightCm/100)^2
- TDEE calculated using Mifflin-St Jeor equation
- Target Calories based on goal (LOSE_WEIGHT: TDEE-500, MAINTAIN: TDEE, GAIN: TDEE+300)
- Macros: Protein 30%, Carbs 40%, Fat 30%

---

### 4.2. Get Health Profile

**Endpoint:** `GET /health-profile`

**Authentication:** Required

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "weightKg": 70.5,
  "heightCm": 175.0,
  "gender": "MALE",
  "age": 28,
  "healthConditions": ["Diabetes", "HighBP"],
  "goal": "LOSE_WEIGHT",
  "bmi": 23.02,
  "tdee": 2250.00,
  "targetCalories": 1750.00,
  "targetProteinG": 131.25,
  "targetCarbsG": 175.00,
  "targetFatG": 58.33,
  "allergens": [
    {
      "id": "allergen-uuid",
      "allergenCategory": {
        "id": "uuid-seafood",
        "name": "Hải sản",
        "description": "Tôm, cua, cá, mực"
      },
      "severity": "SEVERE"
    }
  ],
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

---

### 4.3. Update Health Profile

**Endpoint:** `PATCH /health-profile`

**Authentication:** Required

**Request Body:**
```json
{
  "weightKg": 68.0,
  "goal": "MAINTAIN"
}
```

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "weightKg": 68.0,
  "heightCm": 175.0,
  "goal": "MAINTAIN",
  "bmi": 22.20,
  "tdee": 2200.00,
  "targetCalories": 2200.00,
  "targetProteinG": 165.00,
  "targetCarbsG": 220.00,
  "targetFatG": 73.33,
  "updatedAt": "2024-01-05T00:00:00Z"
}
```

---

### 4.4. Get Food Categories

**Endpoint:** `GET /food-categories`

**Authentication:** Optional

**Response:** `200 OK`
```json
{
  "categories": [
    {
      "id": "uuid-1",
      "name": "Vegan",
      "description": "Không chứa sản phẩm động vật"
    },
    {
      "id": "uuid-2",
      "name": "Halal",
      "description": "Phù hợp với Hồi giáo"
    }
  ]
}
```

---

### 4.5. Get Allergen Categories

**Endpoint:** `GET /allergen-categories`

**Authentication:** Optional

**Response:** `200 OK`
```json
{
  "categories": [
    {
      "id": "uuid-seafood",
      "name": "Hải sản",
      "description": "Tôm, cua, cá, mực",
      "commonFoods": ["Sushi", "Tempura", "Tom Yum"]
    },
    {
      "id": "uuid-peanut",
      "name": "Đậu phộng",
      "description": "Đậu phộng và các sản phẩm từ đậu phộng",
      "commonFoods": ["Pad Thai", "Satay", "Kung Pao"]
    }
  ]
}
```

---

## 5. FOOD SCANNER APIs

### 5.1. Scan Food (Multi-Agent Orchestration)

**Endpoint:** `POST /food-scanner/scan`

**Authentication:** Required

**Request:** `multipart/form-data`
```
Content-Type: multipart/form-data

image: <food_image_file>
servingSize: 1.0
```

**Response:** `202 Accepted`
```json
{
  "jobId": "scan-job-uuid",
  "status": "PROCESSING",
  "estimatedTimeSeconds": 5,
  "pollingUrl": "/food-scanner/jobs/scan-job-uuid"
}
```

**Agent Workflow:**
1. Image Analysis Agent → Nhận diện món ăn
2. Parallel:
   - Safety Check Agent → Kiểm tra allergens
   - Nutrition Calculator Agent → Tính toán nutrition

---

### 5.2. Get Scan Job Status

**Endpoint:** `GET /food-scanner/jobs/:jobId`

**Authentication:** Required

**Response (Processing):** `200 OK`
```json
{
  "jobId": "scan-job-uuid",
  "status": "PROCESSING",
  "progress": 60,
  "currentAgent": "Nutrition Calculator Agent"
}
```

**Response (Completed):** `200 OK`
```json
{
  "jobId": "scan-job-uuid",
  "status": "COMPLETED",
  "result": {
    "foodItem": {
      "id": "food-uuid",
      "name": "Phở Bò",
      "description": "Vietnamese beef noodle soup",
      "ingredients": ["Bánh phở", "Thịt bò", "Hành", "Ngò"],
      "nutrition": {
        "calories": 450.00,
        "proteinG": 30.00,
        "carbsG": 55.00,
        "fatG": 12.00
      },
      "imageUrl": "https://cdn.example.com/foods/uuid.jpg",
      "source": "SCANNED"
    },
    "safetyCheck": {
      "status": "SAFE",
      "allergenWarnings": [],
      "healthConditionWarnings": []
    }
  },
  "processingTimeMs": 3450,
  "agentExecutionLog": [
    {
      "agent": "Image Analysis Agent",
      "startTime": "2024-01-01T10:00:00Z",
      "endTime": "2024-01-01T10:00:02Z",
      "durationMs": 2000,
      "status": "SUCCESS"
    },
    {
      "agent": "Safety Check Agent",
      "startTime": "2024-01-01T10:00:02Z",
      "endTime": "2024-01-01T10:00:03Z",
      "durationMs": 1000,
      "status": "SUCCESS"
    },
    {
      "agent": "Nutrition Calculator Agent",
      "startTime": "2024-01-01T10:00:02Z",
      "endTime": "2024-01-01T10:00:03.450Z",
      "durationMs": 1450,
      "status": "SUCCESS"
    }
  ]
}
```

**Response (Failed):** `200 OK`
```json
{
  "jobId": "scan-job-uuid",
  "status": "FAILED",
  "error": {
    "code": "IMAGE_ANALYSIS_FAILED",
    "message": "Unable to recognize food in the image",
    "agent": "Image Analysis Agent"
  }
}
```

---

### 5.3. Scan Food with Manual Input

**Endpoint:** `POST /food-scanner/manual`

**Authentication:** Required

**Request Body:**
```json
{
  "name": "Cơm gà",
  "description": "Chicken rice",
  "ingredients": ["Cơm", "Gà", "Mỡ gà"],
  "calories": 550.00,
  "proteinG": 35.00,
  "carbsG": 60.00,
  "fatG": 18.00
}
```

**Response:** `201 Created`
```json
{
  "foodItem": {
    "id": "food-uuid",
    "name": "Cơm gà",
    "description": "Chicken rice",
    "ingredients": ["Cơm", "Gà", "Mỡ gà"],
    "nutrition": {
      "calories": 550.00,
      "proteinG": 35.00,
      "carbsG": 60.00,
      "fatG": 18.00
    },
    "source": "MANUAL",
    "createdAt": "2024-01-01T10:00:00Z"
  }
}
```

---

### 5.4. Add to Favorites

**Endpoint:** `POST /favorites`

**Authentication:** Required

**Request Body:**
```json
{
  "foodItemId": "food-uuid",
  "customName": "Phở Bò yêu thích"
}
```

**Response:** `201 Created`
```json
{
  "id": "favorite-uuid",
  "foodItem": {
    "id": "food-uuid",
    "name": "Phở Bò",
    "nutrition": {
      "calories": 450.00,
      "proteinG": 30.00,
      "carbsG": 55.00,
      "fatG": 12.00
    }
  },
  "customName": "Phở Bò yêu thích",
  "createdAt": "2024-01-01T10:00:00Z"
}
```

---

### 5.5. Get Favorites

**Endpoint:** `GET /favorites`

**Authentication:** Required

**Query Parameters:**
- `page` (optional): Page number, default 1
- `limit` (optional): Items per page, default 20

**Response:** `200 OK`
```json
{
  "favorites": [
    {
      "id": "favorite-uuid",
      "foodItem": {
        "id": "food-uuid",
        "name": "Phở Bò",
        "imageUrl": "https://cdn.example.com/foods/uuid.jpg",
        "nutrition": {
          "calories": 450.00,
          "proteinG": 30.00,
          "carbsG": 55.00,
          "fatG": 12.00
        }
      },
      "customName": "Phở Bò yêu thích",
      "createdAt": "2024-01-01T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 15,
    "totalPages": 1
  }
}
```

---

### 5.6. Delete Favorite

**Endpoint:** `DELETE /favorites/:favoriteId`

**Authentication:** Required

**Response:** `204 No Content`

---

## 6. MENU TRANSLATOR APIs

### 6.1. Scan Menu (Multi-Agent Orchestration)

**Endpoint:** `POST /menu-translator/scan`

**Authentication:** Required

**Request:** `multipart/form-data`
```
Content-Type: multipart/form-data

image: <menu_image_file>
latitude: 35.6762
longitude: 139.6503
```

**Response:** `202 Accepted`
```json
{
  "menuId": "menu-uuid",
  "status": "PROCESSING",
  "estimatedTimeSeconds": 10,
  "pollingUrl": "/menu-translator/menus/menu-uuid"
}
```

**Agent Workflow:**
1. OCR Agent → Parse menu structure
2. Parallel (after OCR):
   - Translation Agent → Dịch items
   - Currency Conversion Agent → Quy đổi giá
   - Menu Safety Scanner Agent → Quét allergens
3. Tag Recognition Agent → Nhận diện tags

---

### 6.2. Get Menu Processing Status

**Endpoint:** `GET /menu-translator/menus/:menuId`

**Authentication:** Required

**Response (Processing):** `200 OK`
```json
{
  "menuId": "menu-uuid",
  "status": "PROCESSING",
  "progress": {
    "ocr": 100,
    "translation": 60,
    "currency": 80,
    "safety": 40,
    "tags": 0
  },
  "currentAgent": "Translation Agent"
}
```

**Response (Completed):** `200 OK`
```json
{
  "menuId": "menu-uuid",
  "status": "COMPLETED",
  "restaurant": {
    "id": "restaurant-uuid",
    "name": "Sushi Dai",
    "address": "Tsukiji, Tokyo",
    "latitude": 35.6654,
    "longitude": 139.7706,
    "defaultCurrency": {
      "code": "JPY",
      "symbol": "¥"
    }
  },
  "menuItems": [
    {
      "id": "menu-item-uuid-1",
      "originalName": "本マグロ握り",
      "translatedName": "Bluefin Tuna Nigiri",
      "originalDescription": "築地直送の本マグロ",
      "translatedDescription": "Fresh bluefin tuna from Tsukiji",
      "originalPrice": 1500,
      "currency": {
        "code": "JPY",
        "symbol": "¥"
      },
      "convertedPriceVND": 240000,
      "category": "MAIN",
      "tags": ["Best Seller", "Chef's Choice"],
      "allergenWarnings": [
        {
          "allergen": "Hải sản",
          "severity": "HIGH",
          "reason": "Contains raw fish"
        }
      ],
      "nutritionEstimate": {
        "calories": 180,
        "proteinG": 25,
        "carbsG": 15,
        "fatG": 3,
        "confidence": 0.85
      },
      "safetyStatus": "WARNING"
    }
  ],
  "ocrData": {
    "detectedLanguage": "ja",
    "confidence": 0.95
  },
  "scannedAt": "2024-01-01T12:00:00Z",
  "processingTimeMs": 8500
}
```

---

### 6.3. Get Menu Item Details

**Endpoint:** `GET /menu-translator/items/:itemId`

**Authentication:** Required

**Response:** `200 OK`
```json
{
  "id": "menu-item-uuid",
  "originalName": "本マグロ握り",
  "translatedName": "Bluefin Tuna Nigiri",
  "originalDescription": "築地直送の本マグロ",
  "translatedDescription": "Fresh bluefin tuna from Tsukiji",
  "originalPrice": 1500,
  "currency": {
    "code": "JPY",
    "symbol": "¥",
    "exchangeRateToVND": 160.00
  },
  "convertedPriceVND": 240000,
  "category": "MAIN",
  "tags": ["Best Seller", "Chef's Choice"],
  "allergenWarnings": [
    {
      "allergen": "Hải sản",
      "severity": "HIGH",
      "reason": "Contains raw fish",
      "userAllergenMatch": {
        "hasAllergy": true,
        "severity": "SEVERE"
      }
    }
  ],
  "nutritionEstimate": {
    "calories": 180,
    "proteinG": 25,
    "carbsG": 15,
    "fatG": 3,
    "confidence": 0.85
  },
  "safetyStatus": "DANGER"
}
```

---

### 6.4. Get My Scanned Menus

**Endpoint:** `GET /menu-translator/menus`

**Authentication:** Required

**Query Parameters:**
- `page` (optional): Page number, default 1
- `limit` (optional): Items per page, default 20
- `status` (optional): `PROCESSING` | `COMPLETED` | `FAILED`

**Response:** `200 OK`
```json
{
  "menus": [
    {
      "id": "menu-uuid",
      "restaurant": {
        "id": "restaurant-uuid",
        "name": "Sushi Dai",
        "address": "Tsukiji, Tokyo"
      },
      "status": "COMPLETED",
      "itemCount": 15,
      "thumbnailUrl": "https://cdn.example.com/menus/menu-uuid-thumb.jpg",
      "scannedAt": "2024-01-01T12:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 5,
    "totalPages": 1
  }
}
```

---

### 6.5. Get Currency Rates

**Endpoint:** `GET /currencies`

**Authentication:** Optional

**Response:** `200 OK`
```json
{
  "currencies": [
    {
      "code": "VND",
      "symbol": "₫",
      "exchangeRateToVND": 1.0000,
      "updatedAt": "2024-01-01T00:00:00Z"
    },
    {
      "code": "JPY",
      "symbol": "¥",
      "exchangeRateToVND": 160.0000,
      "updatedAt": "2024-01-01T00:00:00Z"
    },
    {
      "code": "USD",
      "symbol": "$",
      "exchangeRateToVND": 24000.0000,
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

## 7. FOOD SEARCH APIs

### 7.1. Search Restaurants (Multi-Agent)

**Endpoint:** `POST /food-search`

**Authentication:** Required

**Request Body:**
```json
{
  "location": {
    "latitude": 10.7769,
    "longitude": 106.7009
  },
  "radiusMeters": 1000,
  "budget": {
    "minPerPerson": 50000,
    "maxPerPerson": 200000
  },
  "mealTime": "LUNCH",
  "preferences": ["Asian Food", "Low-Carb"]
}
```

**Response:** `200 OK`
```json
{
  "restaurants": [
    {
      "id": "restaurant-uuid",
      "name": "Quán Cơm Gà Hải Nam",
      "address": "123 Nguyễn Huệ, Q1, TPHCM",
      "location": {
        "latitude": 10.7750,
        "longitude": 106.7000
      },
      "distanceMeters": 350,
      "avgPricePerPerson": 80000,
      "rating": 4.5,
      "recommendedDishes": [
        {
          "name": "Cơm Gà",
          "matchingScore": 85,
          "matchingBadge": "Highly Recommended",
          "matchingReasons": [
            "High Protein - Low Fat",
            "Fits your calorie budget",
            "Matches your preferences"
          ],
          "nutrition": {
            "calories": 550,
            "proteinG": 35,
            "carbsG": 60,
            "fatG": 18
          },
          "estimatedPrice": 75000,
          "safetyStatus": "SAFE"
        }
      ],
      "operatingHours": {
        "monday": {"open": "09:00", "close": "22:00"}
      }
    }
  ],
  "filters": {
    "totalResults": 12,
    "filteredByBudget": 8,
    "filteredByPreferences": 5,
    "displayedResults": 5
  }
}
```

**Agent Workflow:**
1. Location Service Agent → Validate coordinates
2. Restaurant Query Agent → Query database + Google Places
3. Matching Score Agent → Calculate scores for dishes
4. Sort by matching score

---

### 7.2. Get Restaurant Details

**Endpoint:** `GET /restaurants/:restaurantId`

**Authentication:** Optional

**Response:** `200 OK`
```json
{
  "id": "restaurant-uuid",
  "name": "Quán Cơm Gà Hải Nam",
  "address": "123 Nguyễn Huệ, Q1, TPHCM",
  "location": {
    "latitude": 10.7750,
    "longitude": 106.7000
  },
  "phone": "+84901234567",
  "avgPricePerPerson": 80000,
  "defaultCurrency": {
    "code": "VND",
    "symbol": "₫"
  },
  "operatingHours": {
    "monday": {"open": "09:00", "close": "22:00"},
    "tuesday": {"open": "09:00", "close": "22:00"}
  },
  "rating": 4.5,
  "menuItems": [
    {
      "name": "Cơm Gà",
      "price": 75000,
      "nutrition": {
        "calories": 550,
        "proteinG": 35,
        "carbsG": 60,
        "fatG": 18
      }
    }
  ],
  "photos": [
    "https://cdn.example.com/restaurants/uuid/photo1.jpg"
  ]
}
```

---

## 8. NUTRITION LOG APIs

### 8.1. Log Food

**Endpoint:** `POST /nutrition-logs`

**Authentication:** Required

**Request Body:**
```json
{
  "foodItemId": "food-uuid",
  "logDate": "2024-01-01",
  "mealType": "LUNCH",
  "servingSize": 1.5
}
```

**Response:** `201 Created`
```json
{
  "id": "log-uuid",
  "foodItem": {
    "id": "food-uuid",
    "name": "Phở Bò",
    "nutrition": {
      "calories": 450.00,
      "proteinG": 30.00,
      "carbsG": 55.00,
      "fatG": 12.00
    }
  },
  "logDate": "2024-01-01",
  "mealType": "LUNCH",
  "servingSize": 1.5,
  "actualNutrition": {
    "calories": 675.00,
    "proteinG": 45.00,
    "carbsG": 82.50,
    "fatG": 18.00
  },
  "createdAt": "2024-01-01T12:30:00Z"
}
```

---

### 8.2. Get Daily Summary

**Endpoint:** `GET /nutrition-logs/summary`

**Authentication:** Required

**Query Parameters:**
- `date` (optional): YYYY-MM-DD, default today

**Response:** `200 OK`
```json
{
  "date": "2024-01-01",
  "summary": {
    "totalCalories": 1450.00,
    "totalProteinG": 95.00,
    "totalCarbsG": 160.00,
    "totalFatG": 45.00
  },
  "targets": {
    "calories": 1750.00,
    "proteinG": 131.25,
    "carbsG": 175.00,
    "fatG": 58.33
  },
  "progress": {
    "caloriesPercent": 82.86,
    "proteinPercent": 72.38,
    "carbsPercent": 91.43,
    "fatPercent": 77.14
  },
  "gaps": {
    "calories": 300.00,
    "proteinG": 36.25,
    "carbsG": 15.00,
    "fatG": 13.33
  },
  "mealBreakdown": [
    {
      "mealType": "BREAKFAST",
      "calories": 350.00,
      "proteinG": 20.00,
      "carbsG": 45.00,
      "fatG": 12.00,
      "itemCount": 2
    },
    {
      "mealType": "LUNCH",
      "calories": 675.00,
      "proteinG": 45.00,
      "carbsG": 82.50,
      "fatG": 18.00,
      "itemCount": 1
    }
  ]
}
```

---

### 8.3. Get Nutrition Logs

**Endpoint:** `GET /nutrition-logs`

**Authentication:** Required

**Query Parameters:**
- `startDate` (required): YYYY-MM-DD
- `endDate` (required): YYYY-MM-DD
- `mealType` (optional): Filter by meal type

**Response:** `200 OK`
```json
{
  "logs": [
    {
      "id": "log-uuid",
      "foodItem": {
        "id": "food-uuid",
        "name": "Phở Bò",
        "imageUrl": "https://cdn.example.com/foods/uuid.jpg"
      },
      "logDate": "2024-01-01",
      "mealType": "LUNCH",
      "servingSize": 1.5,
      "actualNutrition": {
        "calories": 675.00,
        "proteinG": 45.00,
        "carbsG": 82.50,
        "fatG": 18.00
      },
      "createdAt": "2024-01-01T12:30:00Z"
    }
  ],
  "dateRange": {
    "startDate": "2024-01-01",
    "endDate": "2024-01-07"
  }
}
```

---

### 8.4. Update Nutrition Log

**Endpoint:** `PATCH /nutrition-logs/:logId`

**Authentication:** Required

**Request Body:**
```json
{
  "servingSize": 2.0,
  "mealType": "DINNER"
}
```

**Response:** `200 OK`
```json
{
  "id": "log-uuid",
  "servingSize": 2.0,
  "mealType": "DINNER",
  "actualNutrition": {
    "calories": 900.00,
    "proteinG": 60.00,
    "carbsG": 110.00,
    "fatG": 24.00
  },
  "updatedAt": "2024-01-01T15:00:00Z"
}
```

---

### 8.5. Delete Nutrition Log

**Endpoint:** `DELETE /nutrition-logs/:logId`

**Authentication:** Required

**Response:** `204 No Content`

---

## 9. MULTI-AGENT SYSTEM APIs

### 9.1. Get AI Nutrition Suggestions (LLM Agent)

**Endpoint:** `POST /ai/suggestions`

**Authentication:** Required

**Request Body:**
```json
{
  "context": {
    "mealTime": "DINNER",
    "currentLocation": {
      "latitude": 10.7769,
      "longitude": 106.7009
    }
  }
}
```

**Response:** `200 OK`
```json
{
  "nutritionGap": {
    "calories": 300.00,
    "proteinG": 36.25,
    "carbsG": 15.00,
    "fatG": 13.33
  },
  "suggestions": [
    {
      "dishName": "Ức gà nướng với salad",
      "reasoning": "Để đủ protein (36g) mà không bị dư fat và calories, bạn nên ăn ức gà nướng. Món này cung cấp protein cao mà ít fat.",
      "nutrition": {
        "calories": 280,
        "proteinG": 40,
        "carbsG": 10,
        "fatG": 12
      },
      "matchWithGap": {
        "caloriesPercent": 93.33,
        "proteinPercent": 110.34
      }
    },
    {
      "dishName": "Cá hồi áp chảo",
      "reasoning": "Cá hồi giàu protein và omega-3, phù hợp với mục tiêu giảm cân và cải thiện sức khỏe tim mạch.",
      "nutrition": {
        "calories": 320,
        "proteinG": 35,
        "carbsG": 5,
        "fatG": 18
      }
    }
  ],
  "generatedAt": "2024-01-01T18:00:00Z",
  "cacheHit": false,
  "llmProvider": "OpenAI GPT-4",
  "responseTimeMs": 2500
}
```

---

### 9.2. Get Agent Health Status

**Endpoint:** `GET /agents/health`

**Authentication:** Admin only

**Response:** `200 OK`
```json
{
  "agents": [
    {
      "name": "Image Analysis Agent",
      "group": "AI Food Scanner",
      "status": "HEALTHY",
      "healthCheck": {
        "lastCheck": "2024-01-01T12:00:00Z",
        "responseTimeMs": 150,
        "consecutiveFailures": 0
      },
      "metrics": {
        "avgResponseTimeMs": 1800,
        "successRate": 98.5,
        "errorRate": 1.5,
        "totalRequests": 1524,
        "apiQuotaUsage": 45.2
      }
    },
    {
      "name": "Translation Agent",
      "group": "Smart Menu Translator",
      "status": "DEGRADED",
      "healthCheck": {
        "lastCheck": "2024-01-01T12:00:00Z",
        "responseTimeMs": 5200,
        "consecutiveFailures": 1
      },
      "metrics": {
        "avgResponseTimeMs": 4500,
        "successRate": 89.0,
        "errorRate": 11.0,
        "totalRequests": 856
      },
      "warnings": [
        "Response time exceeds threshold (5000ms)"
      ]
    }
  ],
  "overallStatus": "DEGRADED"
}
```

---

### 9.3. Get Agent Metrics

**Endpoint:** `GET /agents/:agentName/metrics`

**Authentication:** Admin only

**Query Parameters:**
- `startDate` (optional): YYYY-MM-DD
- `endDate` (optional): YYYY-MM-DD
- `granularity` (optional): `hour` | `day`, default `day`

**Response:** `200 OK`
```json
{
  "agentName": "Image Analysis Agent",
  "metrics": {
    "timeSeries": [
      {
        "timestamp": "2024-01-01T00:00:00Z",
        "requests": 125,
        "successRate": 98.4,
        "avgResponseTimeMs": 1750,
        "errorRate": 1.6,
        "retryCount": 5,
        "apiQuotaUsage": 3.8
      },
      {
        "timestamp": "2024-01-01T01:00:00Z",
        "requests": 98,
        "successRate": 99.0,
        "avgResponseTimeMs": 1680,
        "errorRate": 1.0,
        "retryCount": 2,
        "apiQuotaUsage": 3.0
      }
    ],
    "summary": {
      "totalRequests": 1524,
      "avgSuccessRate": 98.5,
      "avgResponseTimeMs": 1800,
      "totalErrors": 23,
      "totalRetries": 45
    }
  }
}
```

---

### 9.4. Trigger Agent Circuit Breaker Test

**Endpoint:** `POST /agents/:agentName/circuit-breaker/test`

**Authentication:** Admin only

**Response:** `200 OK`
```json
{
  "agentName": "Translation Agent",
  "circuitBreakerStatus": "OPEN",
  "reason": "Error rate exceeded 50% threshold",
  "openedAt": "2024-01-01T12:05:00Z",
  "willRetryAt": "2024-01-01T12:10:00Z",
  "recentErrors": [
    {
      "timestamp": "2024-01-01T12:04:58Z",
      "error": "DeepL API rate limit exceeded",
      "errorCode": "RATE_LIMIT_EXCEEDED"
    }
  ]
}
```

---

### 9.5. Get Cache Statistics

**Endpoint:** `GET /cache/stats`

**Authentication:** Admin only

**Response:** `200 OK`
```json
{
  "overall": {
    "hitRate": 72.5,
    "missRate": 27.5,
    "totalHits": 15420,
    "totalMisses": 5850,
    "totalRequests": 21270
  },
  "byCategory": [
    {
      "category": "Food Scans",
      "hitRate": 68.2,
      "totalKeys": 2450,
      "avgTtlHours": 168,
      "storageUsageMB": 145.8
    },
    {
      "category": "Translations",
      "hitRate": 85.6,
      "totalKeys": 8920,
      "avgTtlHours": 720,
      "storageUsageMB": 52.3
    },
    {
      "category": "Currency Rates",
      "hitRate": 99.1,
      "totalKeys": 6,
      "avgTtlHours": 24,
      "storageUsageMB": 0.001
    },
    {
      "category": "LLM Recommendations",
      "hitRate": 45.8,
      "totalKeys": 1230,
      "avgTtlHours": 1,
      "storageUsageMB": 28.5
    }
  ],
  "recentEvictions": 125,
  "totalStorageUsageMB": 226.6,
  "maxStorageMB": 1024
}
```

---

## 10. COMMON SCHEMAS

### 10.1. Pagination Schema

```json
{
  "page": 1,
  "limit": 20,
  "total": 125,
  "totalPages": 7
}
```

### 10.2. Nutrition Schema

```json
{
  "calories": 450.00,
  "proteinG": 30.00,
  "carbsG": 55.00,
  "fatG": 12.00
}
```

### 10.3. Location Schema

```json
{
  "latitude": 10.7769,
  "longitude": 106.7009
}
```

### 10.4. Safety Status Enum

```
"SAFE" | "WARNING" | "DANGER"
```

### 10.5. Meal Type Enum

```
"BREAKFAST" | "LUNCH" | "DINNER" | "SNACK"
```

### 10.6. Gender Enum

```
"MALE" | "FEMALE" | "OTHER"
```

### 10.7. Goal Enum

```
"LOSE_WEIGHT" | "MAINTAIN" | "GAIN"
```

### 10.8. Allergen Severity Enum

```
"MILD" | "MODERATE" | "SEVERE"
```

---

## 11. ERROR HANDLING

### 11.1. Standard Error Response

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      "field": "email",
      "reason": "Email already exists"
    },
    "timestamp": "2024-01-01T12:00:00Z",
    "correlationId": "uuid-for-tracing"
  }
}
```

### 11.2. Common Error Codes

| HTTP Status | Error Code | Description |
|-------------|------------|-------------|
| 400 | `INVALID_INPUT` | Invalid request body or parameters |
| 401 | `UNAUTHORIZED` | Missing or invalid authentication |
| 403 | `FORBIDDEN` | User doesn't have permission |
| 404 | `NOT_FOUND` | Resource not found |
| 409 | `CONFLICT` | Resource already exists |
| 422 | `VALIDATION_FAILED` | Validation error |
| 429 | `RATE_LIMIT_EXCEEDED` | Too many requests |
| 500 | `INTERNAL_SERVER_ERROR` | Server error |
| 503 | `SERVICE_UNAVAILABLE` | Service temporarily unavailable |

### 11.3. Agent-Specific Error Codes

| Error Code | Description |
|------------|-------------|
| `IMAGE_ANALYSIS_FAILED` | Cannot recognize food in image |
| `OCR_FAILED` | Cannot extract text from menu |
| `TRANSLATION_FAILED` | Translation service unavailable |
| `CURRENCY_CONVERSION_FAILED` | Cannot fetch exchange rates |
| `LLM_TIMEOUT` | LLM Agent timeout |
| `AGENT_ORCHESTRATION_FAILED` | Agent workflow failed |
| `CIRCUIT_BREAKER_OPEN` | Agent temporarily disabled |

---

## 12. RATE LIMITING

### 12.1. Rate Limit Headers

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 995
X-RateLimit-Reset: 1640000000
```

### 12.2. Rate Limit Response

**HTTP 429 Too Many Requests**
```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "You have exceeded the request rate limit",
    "retryAfter": 3600,
    "limit": 1000,
    "windowSeconds": 3600
  }
}
```

---

## 13. WEBHOOKS (Future)

### 13.1. Scan Completion Webhook

**Event:** `food_scan.completed`

**Payload:**
```json
{
  "event": "food_scan.completed",
  "timestamp": "2024-01-01T12:00:00Z",
  "data": {
    "jobId": "scan-job-uuid",
    "userId": "user-uuid",
    "foodItem": {
      "id": "food-uuid",
      "name": "Phở Bò"
    }
  }
}
```

---

## APPENDIX: AGENT ORCHESTRATION WORKFLOWS

### A.1. Food Scanner Workflow

```
User Upload Image
    ↓
Image Analysis Agent (2-3s)
    ↓
Extract Ingredients
    ↓
    ├─→ Safety Check Agent (0.5-1s)
    └─→ Nutrition Calculator Agent (1-2s)
    ↓
Aggregate Results
    ↓
Return to Client
```

### A.2. Menu Translation Workflow

```
User Upload Menu Image
    ↓
OCR Agent (3-5s)
    ↓
Parse Menu Structure
    ↓
    ├─→ Translation Agent (2-4s)
    ├─→ Currency Conversion Agent (0.5s)
    └─→ Menu Safety Scanner Agent (1-2s)
    ↓
Tag Recognition Agent (1s)
    ↓
Aggregate Results
    ↓
Return to Client
```

### A.3. Food Search Workflow

```
User Submit Search Criteria
    ↓
Location Service Agent (0.2s)
    ↓
Restaurant Query Agent (1-2s)
    ↓
Matching Score Agent (0.5-1s)
    ↓
Sort & Filter Results
    ↓
Return to Client
```

---

**Document Version:** 1.0  
**Last Updated:** 2024-01-20  
**Maintained By:** Backend Team
