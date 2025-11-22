/**
 * Onboarding Store
 *
 * Zustand store for managing onboarding state and flow
 */

import { create } from 'zustand';
import {
    OnboardingState,
    DietaryPreference,
    Allergen,
    AllergenType,
    AllergenSeverity,
    NutritionGoals,
    SmartFeatures,
    ActivityLevel,
    HealthGoal,
    Gender,
} from '../types';

/**
 * Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
 */
const calculateBMR = (weight: number, height: number, age: number, gender: Gender): number => {
    if (gender === 'male') {
        return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        return 10 * weight + 6.25 * height - 5 * age - 161;
    }
};

/**
 * Calculate TDEE (Total Daily Energy Expenditure)
 */
const calculateTDEE = (bmr: number, activityLevel: ActivityLevel): number => {
    const activityMultipliers: Record<ActivityLevel, number> = {
        'sedentary': 1.2,
        'light': 1.375,
        'moderate': 1.55,
        'active': 1.725,
        'very-active': 1.9,
    };

    return bmr * activityMultipliers[activityLevel];
};

/**
 * Calculate daily calorie target based on health goal
 */
const calculateCalorieTarget = (tdee: number, goal: HealthGoal): number => {
    switch (goal) {
        case 'lose-weight':
            return Math.round(tdee * 0.8); // 20% deficit
        case 'maintain':
            return Math.round(tdee);
        case 'gain-muscle':
            return Math.round(tdee * 1.1); // 10% surplus
        default:
            return Math.round(tdee);
    }
};

/**
 * Calculate macronutrient distribution
 */
const calculateMacros = (calories: number, goal: HealthGoal) => {
    let proteinRatio: number;
    let carbsRatio: number;
    let fatsRatio: number;

    switch (goal) {
        case 'lose-weight':
            // High protein, moderate carbs, low fat
            proteinRatio = 0.35;
            carbsRatio = 0.40;
            fatsRatio = 0.25;
            break;
        case 'gain-muscle':
            // High protein, high carbs, moderate fat
            proteinRatio = 0.30;
            carbsRatio = 0.45;
            fatsRatio = 0.25;
            break;
        case 'maintain':
        default:
            // Balanced
            proteinRatio = 0.30;
            carbsRatio = 0.40;
            fatsRatio = 0.30;
            break;
    }

    return {
        protein: Math.round((calories * proteinRatio) / 4), // 4 cal per gram
        carbs: Math.round((calories * carbsRatio) / 4), // 4 cal per gram
        fats: Math.round((calories * fatsRatio) / 9), // 9 cal per gram
    };
};

const TOTAL_STEPS = 10;

const initialState = {
    language: 'en',
    dietaryPreferences: [] as DietaryPreference[],
    allergens: [] as Allergen[],
    nutritionGoals: {
        gender: 'male' as Gender,
        age: 25,
        weight: 70,
        height: 170,
        activityLevel: 'moderate' as ActivityLevel,
        goal: 'maintain' as HealthGoal,
        healthConditions: [],
    },
    dailyTargets: {
        calories: 2000,
        protein: 150,
        carbs: 200,
        fats: 67,
    },
    smartFeatures: {
        cameraAccess: false,
        locationAccess: false,
        notifications: false,
    },
    currentStep: 0,
    totalSteps: TOTAL_STEPS,
    completed: false,
};

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
    ...initialState,

    setLanguage: (language: string) => {
        set({ language });
    },

    setDietaryPreferences: (preferences: DietaryPreference[]) => {
        set({ dietaryPreferences: preferences });
    },

    addAllergen: (allergen: Allergen) => {
        const { allergens } = get();
        const exists = allergens.find((a) => a.type === allergen.type);

        if (!exists) {
            set({ allergens: [...allergens, allergen] });
        }
    },

    removeAllergen: (type: AllergenType) => {
        const { allergens } = get();
        set({ allergens: allergens.filter((a) => a.type !== type) });
    },

    updateAllergenSeverity: (type: AllergenType, severity: AllergenSeverity) => {
        const { allergens } = get();
        set({
            allergens: allergens.map((a) =>
                a.type === type ? { ...a, severity } : a
            ),
        });
    },

    setNutritionGoals: (goals: NutritionGoals) => {
        set({ nutritionGoals: goals });
    },

    calculateDailyTargets: () => {
        const { nutritionGoals } = get();
        const { weight, height, age, gender, activityLevel, goal } = nutritionGoals;

        // Calculate BMR and TDEE
        const bmr = calculateBMR(weight, height, age, gender);
        const tdee = calculateTDEE(bmr, activityLevel);

        // Calculate calorie target based on goal
        const calories = calculateCalorieTarget(tdee, goal);

        // Calculate macros
        const macros = calculateMacros(calories, goal);

        set({
            dailyTargets: {
                calories,
                ...macros,
            },
        });
    },

    setSmartFeature: (feature: keyof SmartFeatures, enabled: boolean) => {
        const { smartFeatures } = get();
        set({
            smartFeatures: {
                ...smartFeatures,
                [feature]: enabled,
            },
        });
    },

    nextStep: () => {
        const { currentStep, totalSteps } = get();
        if (currentStep < totalSteps - 1) {
            set({ currentStep: currentStep + 1 });
        }
    },

    previousStep: () => {
        const { currentStep } = get();
        if (currentStep > 0) {
            set({ currentStep: currentStep - 1 });
        }
    },

    goToStep: (step: number) => {
        const { totalSteps } = get();
        if (step >= 0 && step < totalSteps) {
            set({ currentStep: step });
        }
    },

    completeOnboarding: async () => {
        set({ completed: true });

        // Save to storage
        const { secureStorage } = await import('../../../shared/services/storage/secureStorage');
        await secureStorage.setItem('onboarding_completed', 'true');
        await secureStorage.removeItem('needs_onboarding');

        // TODO: Send onboarding data to backend
        // await apiClient.post('/user/profile/complete-onboarding', { ...data });
    },

    resetOnboarding: async () => {
        set(initialState);

        // Clear from storage
        const { secureStorage } = await import('../../../shared/services/storage/secureStorage');
        await secureStorage.removeItem('onboarding_completed');
    },

    hydrateOnboarding: async () => {
        // Load onboarding status from storage
        const { secureStorage } = await import('../../../shared/services/storage/secureStorage');
        const completed = await secureStorage.getItem('onboarding_completed');

        if (completed === 'true') {
            set({ completed: true });
        }
    },
}));
