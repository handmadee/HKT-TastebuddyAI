 # API Setup Guide

## Current Issue: Network Error

The scan feature is failing with a **Network Error** because the app is trying to connect to an API server that doesn't exist.

### Error Details
```
ERROR  [2025-11-22T18:03:54.989Z] [ERROR] Failed to upload menu image {
  "message": "Network Error",
  "imageUri": "file://..."
}
```

**Root Cause:** The app is configured to call `https://api.nutrition-app.com/v1` which is not a real server.

## Solutions

You have **3 options** to fix this:

### Option 1: Use Your Own Backend API (Recommended for Production)

If you have a backend server ready:

1. **Create a `.env` file**:
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` and set your API URL**:
   ```env
   EXPO_PUBLIC_API_BASE_URL=http://YOUR_SERVER_IP:PORT/v1
   ```

   Examples:
   - Local development: `http://192.168.1.100:3000/v1`
   - Staging server: `https://staging-api.yourapp.com/v1`
   - Production: `https://api.yourapp.com/v1`

3. **Restart Expo**:
   ```bash
   # Stop the current server (Ctrl+C)
   npx expo start --clear
   ```

> [!IMPORTANT]
> When testing on a physical device, you CANNOT use `localhost`. You must use your computer's IP address on the local network (e.g., `http://192.168.1.100:3000`).

### Option 2: Create a Mock API Server (For Testing)

For quick testing without a real backend, create a simple mock server:

1. **Install json-server** (in a new terminal):
   ```bash
   npm install -g json-server
   ```

2. **Create a mock API** (`mock-api/db.json`):
   ```json
   {
     "uploads": []
   }
   ```

3. **Run the mock server**:
   ```bash
   json-server --watch mock-api/db.json --port 3000 --host 0.0.0.0
   ```

4. **Update `.env`**:
   ```env
   EXPO_PUBLIC_API_BASE_URL=http://YOUR_LOCAL_IP:3000
   ```

> [!NOTE]
> This is only for testing the connection. The mock server won't actually process menu images.

### Option 3: Use a Temporary Placeholder (Skip API for Now)

If you want to test the UI without a backend:

1. **Comment out the API call** in `foodDetectionService.ts`
2. **Return mock data** instead

## Required API Endpoints

Your backend server needs to implement these endpoints (based on [API_SEC.MD](file:///Users/admin/DEV_FEST_2025/TastebuddyAI/docs/API_SEC.MD)):

### 1. Menu Upload Endpoint
```
POST /menu/upload/scan-async
Content-Type: multipart/form-data

Body:
  - image: File (menu image)
  - language: string (e.g., "en")
  - allergens: JSON array (optional)
  - dietaryPreferences: JSON array (optional)

Response:
{
  "success": true,
  "data": {
    "jobId": "uuid",
    "streamUrl": "/menu/jobs/{jobId}/stream"
  }
}
```

### 2. Job Status Endpoint
```
GET /menu/jobs/{jobId}

Response:
{
  "status": "processing" | "completed" | "failed",
  "currentStage": "extraction" | "dish_understanding" | ...,
  "result": { ... } // when completed
}
```

### 3. SSE Stream Endpoint (Optional)
```
GET /menu/jobs/{jobId}/stream
Accept: text/event-stream

Events:
  - stage_update
  - job_completed
  - job_failed
```

## Troubleshooting

### Error: "Network Error"
- ✅ Check that your backend server is running
- ✅ Verify the API URL in `.env` is correct
- ✅ Ensure you're using IP address (not localhost) when testing on device
- ✅ Check firewall settings allow connections to the port

### Error: "timeout of 30000ms exceeded"
- The server is not responding fast enough
- Check server logs for errors
- Consider increasing timeout in `api.ts`

### Error: "401 Unauthorized"
- Authentication token is missing or invalid
- For testing, you might need to disable auth temporarily

## Next Steps

1. **Choose one of the 3 options above**
2. **Configure your environment** (create `.env` file)
3. **Restart Expo with `npx expo start --clear`**
4. **Test the scan feature again**

## Environment File Example

Here's what your `.env` file should look like:

```env
# API Configuration - CHANGE THIS!
EXPO_PUBLIC_API_BASE_URL=http://192.168.1.100:3000/v1

# Google OAuth (optional for now)
EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS=
EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID=
EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB=

# Apple OAuth (optional for now)
EXPO_PUBLIC_APPLE_SERVICE_ID=

# Feature Flags
EXPO_PUBLIC_ENABLE_ANALYTICS=false
EXPO_PUBLIC_ENABLE_CRASH_REPORTING=false
```

Replace `192.168.1.100:3000` with your actual server address.

## How to Find Your Local IP Address

### On macOS:
```bash
ipconfig getifaddr en0
```

### On Linux:
```bash
hostname -I | awk '{print $1}'
```

### On Windows:
```bash
ipconfig
```
Look for "IPv4 Address" under your active network adapter.
