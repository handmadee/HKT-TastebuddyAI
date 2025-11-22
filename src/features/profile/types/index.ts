export interface UserProfile {
    id: string;
    fullName: string;
    email: string;
    avatar?: string;
    country?: string;
    joinDate?: string;
}

export interface UserPreferences {
    language: 'en' | 'es' | 'fr' | 'de';
    units: 'metric' | 'imperial';
    notifications: {
        dailySummary: boolean;
        mealLogging: boolean;
        allergenAlerts: boolean;
    };
    privacy: {
        shareData: boolean;
        analytics: boolean;
    };
}

export enum DietType {
    Omnivore = 'Omnivore',
    Vegetarian = 'Vegetarian',
    Vegan = 'Vegan',
    Pescatarian = 'Pescatarian',
    GlutenFree = 'Gluten-free',
    Keto = 'Keto',
    Paleo = 'Paleo',
}

import { Allergen } from '../../auth/types/auth.types';

export interface DietaryProfile {
    diet: string[]; // Changed from DietType to string[] to support multiple
    allergens: Allergen[];
}

export interface HealthConnectStatus {
    isConnected: boolean;
    lastSynced?: string;
    permissions: {
        steps: boolean;
        activeEnergy: boolean;
        dietaryEnergy: boolean;
    };
}

export interface SavedRestaurant {
    id: string;
    name: string;
    imageUri: string;
    rating: number;
    tags: string[];
    distance: string;
    savedAt: string;
}

export interface SavedMenu {
    id: string;
    name: string;
    restaurantName: string;
    imageUri: string;
    calories: number;
    savedAt: string;
}
