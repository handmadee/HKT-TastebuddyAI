/**
 * Scan Feature Types
 *
 * Type definitions for food scanning and menu analysis
 */

import { AllergenType, AllergenSeverity } from '../../onboarding/types';

/**
 * Scan stages for progressive updates
 */
export enum ScanStage {
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
 * Stage status
 */
export type StageStatus = 'pending' | 'processing' | 'completed' | 'failed';

/**
 * Stage information
 */
export interface StageInfo {
    status: StageStatus;
    startTime?: number;
    endTime?: number;
    duration?: number;
    data?: any;
    error?: string;
}

/**
 * Nutritional information for a food item
 */
export interface Nutrition {
    calories: number;
    protein: number; // in grams
    carbs: number; // in grams
    fats: number; // in grams
    fiber?: number; // in grams
    sugar?: number; // in grams
    sodium?: number; // in mg
}

/**
 * Food ingredient
 */
export interface Ingredient {
    name: string;
    amount?: string;
    allergens?: AllergenType[];
}

/**
 * Detected allergen in food
 */
export interface DetectedAllergen {
    type: AllergenType;
    severity: AllergenSeverity;
    confidence: number; // 0-100
    source?: string; // Which ingredient contains this allergen
}

/**
 * Single dish in menu
 */
export interface DishItem {
    id: string;
    name: string;
    nameTranslated?: string;
    description?: string;
    confidence: number; // 0-100
    nutrition: Nutrition;
    ingredients: Ingredient[];
    allergens: DetectedAllergen[];
    price?: number;
    currency?: string;
    isSafe: boolean; // Based on user allergens
    warnings?: string[];
}

/**
 * Food scan result from AI analysis (single item)
 */
export interface FoodScanResult {
    id: string;
    name: string;
    confidence: number; // 0-100
    imageUri: string;
    nutrition: Nutrition;
    ingredients: Ingredient[];
    allergens: DetectedAllergen[];
    timestamp: string;
    description?: string;
    cuisine?: string;
}

/**
 * Menu scan result (multiple dishes)
 */
export interface MenuScanResult {
    id: string;
    imageUri: string;
    timestamp: string;
    dishes: DishItem[];
    totalDishes: number;
    safeCount: number;
    unsafeCount: number;
    cuisine?: string;
    language?: string;
}

/**
 * Scan state
 */
export interface ScanState {
    currentScan: FoodScanResult | MenuScanResult | null;
    scanHistory: (FoodScanResult | MenuScanResult)[];
    isScanning: boolean;
    isAnalyzing: boolean;
    error: string | null;

    // Progressive update state
    currentStage: ScanStage | null;
    progress: number; // 0-100
    stageData: Partial<Record<ScanStage, any>>;
    sseConnection: EventSource | null;

    // Actions
    startScan: () => void;
    stopScan: () => void;
    analyzeFoodImage: (imageUri: string, userPreferences?: UserScanPreferences) => Promise<void>;
    saveScanResult: (result: FoodScanResult | MenuScanResult) => Promise<void>;
    clearCurrentScan: () => void;
    loadScanHistory: () => Promise<void>;
    deleteScanFromHistory: (id: string) => Promise<void>;
    disconnectSSE: () => void;
    updateStage: (stage: ScanStage, data?: any, status?: StageStatus) => void;
    updateProgress: (progress: number) => void;

    // Internal methods (not for external use)
    connectSSE: (jobId: string, streamUrl: string, imageUri: string) => Promise<void>;
    startPolling: (jobId: string, imageUri: string) => void;
}

/**
 * User preferences for scanning
 */
export interface UserScanPreferences {
    allergens?: Array<{ type: AllergenType; severity: AllergenSeverity }>;
    dietaryPreferences?: string[];
    language?: string;
}

/**
 * Food detection API response
 */
export interface FoodDetectionResponse {
    success: boolean;
    data?: FoodScanResult;
    error?: string;
}

/**
 * Menu upload response (async)
 */
export interface MenuUploadResponse {
    success: boolean;
    data?: {
        jobId: string;
        streamUrl: string;
    };
    error?: string;
}

/**
 * SSE Event types
 */
export interface SSEStageUpdate {
    type: 'stage_update';
    stage: ScanStage;
    status: StageStatus;
    data?: any;
    timestamp: number;
}

export interface SSEJobCompleted {
    type: 'job_completed';
    result: MenuScanResult;
    timestamp: number;
}

export interface SSEJobFailed {
    type: 'job_failed';
    error: string;
    timestamp: number;
}

export type SSEEvent = SSEStageUpdate | SSEJobCompleted | SSEJobFailed;
