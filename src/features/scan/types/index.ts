/**
 * Scan Feature Types
 *
 * Type definitions for food scanning and analysis
 */

import { AllergenType, AllergenSeverity } from '../../onboarding/types';

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
 * Food scan result from AI analysis
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
 * Scan state
 */
export interface ScanState {
    currentScan: FoodScanResult | null;
    scanHistory: FoodScanResult[];
    isScanning: boolean;
    isAnalyzing: boolean;
    error: string | null;

    // Actions
    startScan: () => void;
    stopScan: () => void;
    analyzeFoodImage: (imageUri: string) => Promise<void>;
    saveScanResult: (result: FoodScanResult) => Promise<void>;
    clearCurrentScan: () => void;
    loadScanHistory: () => Promise<void>;
    deleteScanFromHistory: (id: string) => Promise<void>;
}

/**
 * Food detection API response
 */
export interface FoodDetectionResponse {
    success: boolean;
    data?: FoodScanResult;
    error?: string;
}
