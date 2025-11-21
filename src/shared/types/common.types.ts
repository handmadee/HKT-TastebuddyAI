/**
 * Common TypeScript Types
 * 
 * Shared types used across the application
 */

// User types
export interface User {
    id: string;
    email: string;
    fullName: string;
    username?: string;
    avatar?: string;
    createdAt: string;
    updatedAt: string;
}

// Health Profile types
export interface HealthProfile {
    userId: string;
    age: number;
    gender: 'male' | 'female' | 'other';
    height: number; // cm
    weight: number; // kg
    activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extremely_active';
    goal: 'lose_weight' | 'maintain_weight' | 'gain_weight' | 'build_muscle';
    dietaryPreferences: string[];
    allergens: string[];
    medicalConditions: string[];
    targetCalories?: number;
    targetProtein?: number;
    targetCarbs?: number;
    targetFat?: number;
}

// Food types
export interface Food {
    id: string;
    name: string;
    brand?: string;
    servingSize: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber?: number;
    sugar?: number;
    sodium?: number;
    allergens: string[];
    imageUrl?: string;
}

// Nutrition Log types
export interface NutritionLog {
    id: string;
    userId: string;
    date: string;
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    food: Food;
    quantity: number;
    notes?: string;
    createdAt: string;
}

// Restaurant types
export interface Restaurant {
    id: string;
    name: string;
    description?: string;
    address: string;
    latitude: number;
    longitude: number;
    phone?: string;
    website?: string;
    rating?: number;
    priceLevel?: 1 | 2 | 3 | 4;
    cuisineTypes: string[];
    imageUrl?: string;
    distance?: number; // in km
    matchingScore?: number; // 0-100
}

// Safety indicator types
export type SafetyLevel = 'safe' | 'warning' | 'danger';

export interface SafetyIndicator {
    level: SafetyLevel;
    message: string;
    allergens?: string[];
}

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Pagination
export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

// Language
export type Language = 'en' | 'vi' | 'zh' | 'ja' | 'ko';

// Theme
export type ThemeMode = 'light' | 'dark';
