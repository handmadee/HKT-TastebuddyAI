export interface MacroNutrients {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface FoodItem {
    id: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    servingSize: string;
    imageUri?: string;
}

export interface MealLog {
    id: string;
    type: MealType;
    items: FoodItem[];
    totalCalories: number;
}

export interface DailyLog {
    date: string; // ISO date string YYYY-MM-DD
    meals: {
        breakfast: MealLog;
        lunch: MealLog;
        dinner: MealLog;
        snack: MealLog;
    };
    totalMacros: MacroNutrients;
}

export interface DailyGoals extends MacroNutrients {
    water: number; // ml
}
