# Frontend Camera Integration Flow

## 📸 Camera → Menu Analysis → Results

### Overview
Complete flow from camera capture to displaying menu analysis results with progressive loading.

---

## 🎯 Flow Diagram

```mermaid
sequenceDiagram
    participant User
    participant Camera
    participant Frontend
    participant Backend
    participant SSE Stream

    User->>Camera: Tap "Scan Menu" button
    Camera->>Frontend: Capture image
    Frontend->>Frontend: Show loading indicator
    
    Frontend->>Backend: POST /menu/upload/scan-async<br/>(image + user preferences)
    Backend-->>Frontend: { jobId, streamUrl }
    
    Note over Frontend: Immediately connect to SSE
    Frontend->>SSE Stream: EventSource(streamUrl)
    SSE Stream-->>Frontend: Connected
    
    Note over Frontend,SSE Stream: Progressive Updates (every 2-5s)
    SSE Stream-->>Frontend: stage_update: extraction<br/>{ totalItems: 5 }
    Frontend->>User: Show "Found 5 dishes"
    
    SSE Stream-->>Frontend: stage_update: dish_understanding<br/>{ dishes: [...] }
    Frontend->>User: Show ingredients + allergen signals
    
    SSE Stream-->>Frontend: stage_update: allergen_analysis<br/>{ safeItems: 3, unsafeItems: 2 }
    Frontend->>User: Show safety warnings
    
    SSE Stream-->>Frontend: job_completed<br/>{ fullResult }
    Frontend->>User: Display complete analysis
    SSE Stream->>Frontend: Close connection
```

---

## 📱 Implementation Steps

### **Step 1: Camera Capture**
```typescript
// React Native / Expo Camera
import { Camera } from 'expo-camera';

const captureMenuPhoto = async () => {
  const photo = await cameraRef.current.takePictureAsync({
    quality: 0.8,
    base64: false,
  });
  
  uploadAndAnalyze(photo.uri);
};
```

### **Step 2: Upload to Async Endpoint**
```typescript
const uploadAndAnalyze = async (imageUri: string) => {
  const formData = new FormData();
  formData.append('image', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'menu.jpg',
  });
  
  // Add user preferences from profile
  formData.append('language', 'vi');
  formData.append('allergens', JSON.stringify([
    { type: 'shellfish', severity: 'severe' },
    { type: 'peanut', severity: 'moderate' },
  ]));
  formData.append('dietaryPreferences', JSON.stringify(['vegan']));

  // Upload and get jobId
  const response = await fetch('https://api.tastebuddy.ai/menu/upload/scan-async', {
    method: 'POST',
    body: formData,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  const { jobId, streamUrl } = await response.json();
  
  // Start listening to stream
  listenToStream(jobId, streamUrl);
};
```

### **Step 3: Listen to SSE Stream**
```typescript
const listenToStream = (jobId: string, streamUrl: string) => {
  const eventSource = new EventSource(
    `https://api.tastebuddy.ai${streamUrl}`,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    }
  );

  // Connected
  eventSource.addEventListener('message', (e) => {
    const event = JSON.parse(e.data);
    
    switch (event.type) {
      case 'stage_update':
        handleStageUpdate(event);
        break;
        
      case 'job_completed':
        handleJobCompleted(event);
        eventSource.close();
        break;
        
      case 'job_failed':
        handleJobFailed(event);
        eventSource.close();
        break;
    }
  });

  eventSource.onerror = (error) => {
    console.error('SSE Error:', error);
    // Fallback to polling
    startPolling(jobId);
  };
};
```

### **Step 4: Handle Progressive Updates**
```typescript
const handleStageUpdate = (event: any) => {
  const { stage, status, data } = event;
  
  switch (stage) {
    case 'extraction':
      if (status === 'completed') {
        // Show menu items immediately
        setMenuItems(data.totalItems);
        updateUI({ 
          message: `Tìm thấy ${data.totalItems} món ăn`,
          progress: 30 
        });
      }
      break;
      
    case 'dish_understanding':
      if (status === 'completed') {
        // Show ingredients and allergen signals
        setDishes(data.dishes);
        updateUI({ 
          message: `Đã phân tích ${data.totalDishes} món`,
          progress: 60 
        });
      }
      break;
      
    case 'allergen_analysis':
      if (status === 'completed') {
        // Show safety warnings
        setSafetyResults(data);
        updateUI({ 
          message: `${data.safeItems} món an toàn, ${data.unsafeItems} món có nguy cơ`,
          progress: 90 
        });
      }
      break;
  }
};
```

### **Step 5: Display Final Results**
```typescript
const handleJobCompleted = (event: any) => {
  const result = event.result;
  
  // Navigate to results screen
  navigation.navigate('MenuAnalysisResults', {
    extraction: result.data.extraction,
    allergenAnalysis: result.data.allergenAnalysis,
    dietaryCompliance: result.data.dietaryCompliance,
  });
  
  // Hide loading
  setLoading(false);
};
```

---

## 🔄 Polling Fallback (for browsers without SSE support)

```typescript
const startPolling = async (jobId: string) => {
  const pollInterval = setInterval(async () => {
    try {
      const response = await fetch(
        `https://api.tastebuddy.ai/menu/jobs/${jobId}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );
      
      const job = await response.json();
      
      // Update UI based on current stage
      if (job.status === 'completed') {
        handleJobCompleted({ result: job.result });
        clearInterval(pollInterval);
      } else if (job.status === 'failed') {
        handleJobFailed({ error: job.error });
        clearInterval(pollInterval);
      } else {
        // Update progress
        updateProgressFromStages(job.stages);
      }
    } catch (error) {
      console.error('Polling error:', error);
      clearInterval(pollInterval);
    }
  }, 2000); // Poll every 2 seconds
};
```

---

## 🎨 UI States

### 1. **Uploading** (0-1s)
```
📤 Đang tải ảnh lên...
[=====               ] 25%
```

### 2. **Extraction** (1-5s)
```
🔍 Đang trích xuất menu...
[==========          ] 50%
✅ Tìm thấy 5 món ăn
```

### 3. **Dish Understanding** (5-8s)
```
🍲 Đang phân tích món ăn...
[===============     ] 75%
✅ Đã phân tích 5 món
```

### 4. **Safety Analysis** (8-16s)
```
⚠️ Đang kiểm tra an toàn...
[=================== ] 95%
✅ 3 món an toàn, 2 món có nguy cơ
```

### 5. **Complete** (16s)
```
🎉 Hoàn tất!
[====================] 100%
Chuyển đến kết quả...
```

---

## 🚨 Error Handling

```typescript
const handleJobFailed = (event: any) => {
  const errorCode = event.error?.code || 'UNKNOWN_ERROR';
  
  const errorMessages = {
    'ERR_NOT_FOOD_IMAGE': 'Ảnh không phải là món ăn hoặc menu. Vui lòng chụp lại.',
    'ERR_FILE_TOO_LARGE': 'Ảnh quá lớn (> 10MB). Vui lòng chọn ảnh nhỏ hơn.',
    'ERR_CLOUD_VISION_FAILED': 'Lỗi OCR. Thử lại với ảnh rõ hơn.',
  };
  
  Alert.alert(
    'Lỗi phân tích',
    errorMessages[errorCode] || 'Đã có lỗi xảy ra. Vui lòng thử lại.',
    [
      { text: 'Chụp lại', onPress: () => openCamera() },
      { text: 'Hủy', style: 'cancel' },
    ]
  );
};
```

---

## 📊 Complete Example (React Native)

```typescript
import React, { useState, useRef } from 'react';
import { View, Button, Text, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';

export const MenuScannerScreen = () => {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  const cameraRef = useRef<Camera>(null);

  const scanMenu = async () => {
    setScanning(true);
    
    // 1. Capture photo
    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.8,
    });

    // 2. Upload
    const formData = new FormData();
    formData.append('image', {
      uri: photo.uri,
      type: 'image/jpeg',
      name: 'menu.jpg',
    });

    const response = await fetch('https://api.tastebuddy.ai/menu/upload/scan-async', {
      method: 'POST',
      body: formData,
    });

    const { jobId, streamUrl } = await response.json();

    // 3. Listen to SSE
    const eventSource = new EventSource(`https://api.tastebuddy.ai${streamUrl}`);

    eventSource.addEventListener('message', (e) => {
      const event = JSON.parse(e.data);

      if (event.type === 'stage_update') {
        const stageProgress = {
          'extraction': 30,
          'dish_understanding': 60,
          'allergen_analysis': 90,
        };
        
        setProgress(stageProgress[event.stage] || 0);
        setMessage(`Đang xử lý: ${event.stage}`);
      }

      if (event.type === 'job_completed') {
        setProgress(100);
        setMessage('Hoàn tất!');
        
        // Navigate to results
        navigation.navigate('Results', { data: event.result });
        
        eventSource.close();
        setScanning(false);
      }
    });
  };

  return (
    <View>
      <Camera ref={cameraRef} style={{ flex: 1 }} />
      
      {scanning ? (
        <View>
          <ActivityIndicator size="large" />
          <Text>{message}</Text>
          <Text>{progress}%</Text>
        </View>
      ) : (
        <Button title="Quét Menu" onPress={scanMenu} />
      )}
    </View>
  );
};
```

---

## ⏱️ Timeline Summary

| Stage | Time | Frontend Action |
|-------|------|----------------|
| **Upload** | 0-1s | Show loading |
| **Extraction** | 1-5s | Display "Found X dishes" |
| **Dish Understanding** | 5-8s | Show ingredients |
| **Safety Analysis** | 8-16s | Show allergen warnings |
| **Complete** | 16s | Navigate to results |

---

## 💡 Best Practices

1. **Always show progress**: Use SSE updates to show real-time progress
2. **Immediate feedback**: Show "Found X dishes" as soon as extraction completes
3. **Offline handling**: Cache results, retry failed uploads
4. **Error recovery**: Provide clear retry options
5. **User auth**: Include Bearer token in all requests

---

## 🔗 API Endpoints Used

- `POST /menu/upload/scan-async` - Upload and get jobId
- `GET /menu/jobs/:jobId/stream` (SSE) - Real-time updates
- `GET /menu/jobs/:jobId` - Polling fallback



import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter } from 'events';

/**
 * Job status enum
 */
export enum JobStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

/**
 * Job stage enum for progressive updates
 */
export enum JobStage {
  VALIDATION = 'validation',
  EXTRACTION = 'extraction',
  DISH_UNDERSTANDING = 'dish_understanding',
  ALLERGEN_ANALYSIS = 'allergen_analysis',
  DIETARY_ANALYSIS = 'dietary_analysis',
  NUTRITION_ANALYSIS = 'nutrition_analysis',
  PRICE_ANALYSIS = 'price_analysis',
  FORMATTING = 'formatting',
}

/**
 * Job interface
 */
export interface Job {
  id: string;
  status: JobStatus;
  currentStage: JobStage | null;
  stages: {
    [key in JobStage]?: {
      status: 'pending' | 'processing' | 'completed' | 'failed';
      startTime?: number;
      endTime?: number;
      duration?: number;
      data?: any;
      error?: string;
    };
  };
  result: any;
  error?: string;
  createdAt: number;
  updatedAt: number;
}

/**
 * JobQueueService
 *
 * Manages async job processing with progressive updates.
 * Supports Server-Sent Events (SSE) for real-time streaming.
 *
 * Usage:
 * 1. Create job: const jobId = jobQueue.createJob();
 * 2. Update stages: jobQueue.updateStage(jobId, JobStage.EXTRACTION, data);
 * 3. Listen to events: jobQueue.on(jobId, (update) => { ... });
 * 4. Complete job: jobQueue.completeJob(jobId, result);
 */
@Injectable()
export class JobQueueService {
  private readonly logger = new Logger(JobQueueService.name);
  private jobs: Map<string, Job> = new Map();
  private eventEmitters: Map<string, EventEmitter> = new Map();

  // Auto-cleanup jobs after 1 hour
  private readonly JOB_TTL = 60 * 60 * 1000; // 1 hour

  constructor() {
    // Cleanup old jobs every 10 minutes
    setInterval(() => this.cleanupOldJobs(), 10 * 60 * 1000);
  }

  /**
   * Create a new job
   *
   * @returns Job ID
   */
  createJob(): string {
    const jobId = this.generateJobId();
    const now = Date.now();

    const job: Job = {
      id: jobId,
      status: JobStatus.PENDING,
      currentStage: null,
      stages: {},
      result: null,
      createdAt: now,
      updatedAt: now,
    };

    this.jobs.set(jobId, job);
    this.eventEmitters.set(jobId, new EventEmitter());

    this.logger.log(`Job created: ${jobId}`);
    return jobId;
  }

  /**
   * Get job by ID
   *
   * @param jobId - Job ID
   * @returns Job or null
   */
  getJob(jobId: string): Job | null {
    return this.jobs.get(jobId) || null;
  }

  /**
   * Update job stage
   *
   * @param jobId - Job ID
   * @param stage - Stage name
   * @param data - Stage result data
   * @param status - Stage status
   */
  updateStage(
    jobId: string,
    stage: JobStage,
    data?: any,
    status: 'pending' | 'processing' | 'completed' | 'failed' = 'completed',
  ): void {
    const job = this.jobs.get(jobId);
    if (!job) {
      this.logger.warn(`Job not found: ${jobId}`);
      return;
    }

    const now = Date.now();

    // Initialize stage if not exists
    if (!job.stages[stage]) {
      job.stages[stage] = { status: 'pending' };
    }

    // Update stage
    const stageInfo = job.stages[stage];
    stageInfo.status = status;

    if (status === 'processing') {
      stageInfo.startTime = now;
    }

    if (status === 'completed' || status === 'failed') {
      stageInfo.endTime = now;
      if (stageInfo.startTime) {
        stageInfo.duration = now - stageInfo.startTime;
      }
      if (data) {
        stageInfo.data = data;
      }
    }

    job.currentStage = stage;
    job.updatedAt = now;

    if (job.status === JobStatus.PENDING) {
      job.status = JobStatus.PROCESSING;
    }

    this.jobs.set(jobId, job);

    // Emit event
    this.emit(jobId, {
      type: 'stage_update',
      stage,
      status,
      data,
      timestamp: now,
    });

    this.logger.log(`Job ${jobId} - Stage ${stage}: ${status}`);
  }

  /**
   * Mark stage as failed
   *
   * @param jobId - Job ID
   * @param stage - Stage name
   * @param error - Error message
   */
  failStage(jobId: string, stage: JobStage, error: string): void {
    const job = this.jobs.get(jobId);
    if (!job) return;

    if (!job.stages[stage]) {
      job.stages[stage] = { status: 'failed' };
    }

    job.stages[stage].status = 'failed';
    job.stages[stage].error = error;
    job.stages[stage].endTime = Date.now();

    this.emit(jobId, {
      type: 'stage_failed',
      stage,
      error,
      timestamp: Date.now(),
    });

    this.logger.error(`Job ${jobId} - Stage ${stage} failed: ${error}`);
  }

  /**
   * Complete job
   *
   * @param jobId - Job ID
   * @param result - Final result
   */
  completeJob(jobId: string, result: any): void {
    const job = this.jobs.get(jobId);
    if (!job) {
      this.logger.warn(`Job not found: ${jobId}`);
      return;
    }

    job.status = JobStatus.COMPLETED;
    job.result = result;
    job.updatedAt = Date.now();

    this.jobs.set(jobId, job);

    // Emit completion event
    this.emit(jobId, {
      type: 'job_completed',
      result,
      timestamp: Date.now(),
    });

    this.logger.log(`Job completed: ${jobId}`);
  }

  /**
   * Fail job
   *
   * @param jobId - Job ID
   * @param error - Error message
   */
  failJob(jobId: string, error: string): void {
    const job = this.jobs.get(jobId);
    if (!job) return;

    job.status = JobStatus.FAILED;
    job.error = error;
    job.updatedAt = Date.now();

    this.jobs.set(jobId, job);

    // Emit failure event
    this.emit(jobId, {
      type: 'job_failed',
      error,
      timestamp: Date.now(),
    });

    this.logger.error(`Job failed: ${jobId} - ${error}`);
  }

  /**
   * Subscribe to job events
   *
   * @param jobId - Job ID
   * @param callback - Event callback
   */
  on(jobId: string, callback: (event: any) => void): void {
    const emitter = this.eventEmitters.get(jobId);
    if (emitter) {
      emitter.on('update', callback);
    }
  }

  /**
   * Unsubscribe from job events
   *
   * @param jobId - Job ID
   * @param callback - Event callback
   */
  off(jobId: string, callback: (event: any) => void): void {
    const emitter = this.eventEmitters.get(jobId);
    if (emitter) {
      emitter.off('update', callback);
    }
  }

  /**
   * Emit event for job
   *
   * @param jobId - Job ID
   * @param event - Event data
   */
  private emit(jobId: string, event: any): void {
    const emitter = this.eventEmitters.get(jobId);
    if (emitter) {
      emitter.emit('update', event);
    }
  }

  /**
   * Generate unique job ID
   *
   * @returns Job ID
   */
  private generateJobId(): string {
    return `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Cleanup old jobs
   */
  private cleanupOldJobs(): void {
    const now = Date.now();
    let cleaned = 0;

    for (const [jobId, job] of this.jobs.entries()) {
      if (now - job.createdAt > this.JOB_TTL) {
        this.jobs.delete(jobId);
        this.eventEmitters.delete(jobId);
        cleaned++;
      }
    }

    if (cleaned > 0) {
      this.logger.log(`Cleaned up ${cleaned} old jobs`);
    }
  }

  /**
   * Get job statistics
   *
   * @returns Job stats
   */
  getStats(): {
    total: number;
    pending: number;
    processing: number;
    completed: number;
    failed: number;
  } {
    const stats = {
      total: this.jobs.size,
      pending: 0,
      processing: 0,
      completed: 0,
      failed: 0,
    };

    for (const job of this.jobs.values()) {
      stats[job.status]++;
    }

    return stats;
  }
}
