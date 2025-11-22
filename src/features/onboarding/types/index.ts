/**
 * Onboarding Types
 *
 * Type definitions for the onboarding flow
 */

export type Language = {
    code: string;
    name: string;
    nativeName: string;
    flag: string;
};

export type DietaryPreference =
    | 'halal'
    | 'vegan'
    | 'kosher'
    | 'vegetarian'
    | 'low-carb'
    | 'lactose-intolerant'
    | 'gluten-free'
    | 'pescatarian';

export type AllergenType =
    | 'peanuts'
    | 'shellfish'
    | 'dairy'
    | 'eggs'
    | 'fish'
    | 'soy'
    | 'wheat'
    | 'tree-nuts'
    | 'sesame';

export type AllergenSeverity = 'mild' | 'moderate' | 'severe';

export interface Allergen {
    type: AllergenType;
    severity: AllergenSeverity;
}

export type Gender = 'male' | 'female' | 'other';

export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';

export type HealthGoal = 'lose-weight' | 'maintain' | 'gain-muscle';

export type HealthCondition =
    | 'diabetes'
    | 'high-blood-pressure'
    | 'high-cholesterol'
    | 'heart-disease'
    | 'none';

export interface NutritionGoals {
    gender: Gender;
    age: number;
    weight: number; // in kg
    height: number; // in cm
    activityLevel: ActivityLevel;
    goal: HealthGoal;
    healthConditions: HealthCondition[];
}

export interface DailyTargets {
    calories: number;
    protein: number; // in grams
    carbs: number; // in grams
    fats: number; // in grams
}

export interface SmartFeatures {
    cameraAccess: boolean;
    locationAccess: boolean;
    notifications: boolean;
}

export interface OnboardingData {
    language: string;
    dietaryPreferences: DietaryPreference[];
    allergens: Allergen[];
    nutritionGoals: NutritionGoals;
    dailyTargets: DailyTargets;
    smartFeatures: SmartFeatures;
    completed: boolean;
}

export interface OnboardingState extends OnboardingData {
    currentStep: number;
    totalSteps: number;
    setLanguage: (language: string) => void;
    setDietaryPreferences: (preferences: DietaryPreference[]) => void;
    addAllergen: (allergen: Allergen) => void;
    removeAllergen: (type: AllergenType) => void;
    updateAllergenSeverity: (type: AllergenType, severity: AllergenSeverity) => void;
    setNutritionGoals: (goals: NutritionGoals) => void;
    calculateDailyTargets: () => void;
    setSmartFeature: (feature: keyof SmartFeatures, enabled: boolean) => void;
    nextStep: () => void;
    previousStep: () => void;
    goToStep: (step: number) => void;
    completeOnboarding: () => Promise<void>;
    resetOnboarding: () => Promise<void>;
    hydrateOnboarding: () => Promise<void>;
}
