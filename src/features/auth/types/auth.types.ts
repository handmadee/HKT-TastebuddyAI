export interface LoginRequestDto {
    email: string;
    password: string;
}

export interface LoginResponseDto {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface MeResponseDto {
    userId: string;
    email: string;
    info: UserInfo;
    onboarding: Onboarding;
    metadata: AuthMetadata;
}

export interface User {
    id: string;
    email: string;
    fullName: string;
    onboarding: Onboarding;
}

export interface UserInfo {
    _id: string;
    fullName: string;
    isOnboarded: boolean;
}

export interface Allergen {
    type: string;
    severity: string;
}

export interface Onboarding {
    _id: string;
    userId: string;
    language: string;
    dietaryPreferences: string[];
    allergens: Allergen[];
    nutritionGoals: NutritionGoals;
    dailyTargets: DailyTargets;
    smartFeatures: SmartFeatures;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface NutritionGoals {
    gender: string;
    age: number;
    weight: number;
    height: number;
    activityLevel: string;
    goal: string;
    healthConditions: string[];
    _id: string;
}

export interface DailyTargets {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    _id: string;
}

export interface SmartFeatures {
    cameraAccess: boolean;
    locationAccess: boolean;
    notifications: boolean;
    _id: string;
}

export interface AuthMetadata {
    provider: string;
    creationDate: string;
}
