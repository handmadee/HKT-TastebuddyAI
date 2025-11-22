export interface Restaurant {
    id: string;
    name: string;
    cuisine: string;
    imageUri: string;
    rating: number;
    reviewCount: number;
    priceLevel: number; // 1-4 ($-$$$$)
    distance: number; // in meters
    distanceText: string; // "500 m", "1.2 km"
    isOpen: boolean;
    tags: string[]; // "Casual", "Cozy", "English menu"
    dietaryOptions: DietaryTag[];
    location: {
        lat: number;
        lng: number;
        address: string;
    };
}

export enum DietaryTag {
    Vegan = 'Vegan',
    Vegetarian = 'Vegetarian',
    GlutenFree = 'Gluten-free',
    DairyFree = 'Dairy-free',
    VeganOptions = 'Vegan options',
    GlutenFreeOptions = 'Gluten-free options',
    DedicatedKitchen = 'Dedicated kitchen',
}

export enum MealTime {
    Breakfast = 'Breakfast',
    Lunch = 'Lunch',
    Dinner = 'Dinner',
    Snack = 'Snack',
    LateNight = 'Late night',
}

export interface RestaurantFilters {
    dietaryPreferences: DietaryTag[];
    mealTime?: MealTime;
    budget?: BudgetRange;
    maxDistance: number; // in meters
    location?: {
        lat: number;
        lng: number;
    };
    sortBy: 'bestMatch' | 'openNow' | 'distance' | 'rating';
}

export enum BudgetRange {
    Low = '$1-3',
    Medium = '$5-10',
    High = '$10+',
}

export interface RestaurantMatch {
    restaurant: Restaurant;
    matchScore: number; // 0-100
    matchReasons: string[];
}

export interface PopularDish {
    id: string;
    name: string;
    description: string;
    tags: DietaryTag[];
    price?: number;
    imageUri?: string;
}

export interface DailySummary {
    calories: {
        consumed: number;
        target: number;
    };
    macros: {
        protein: number;
        carbs: number;
        fat: number;
    };
    mealsLogged: number;
}

export interface LocationPermission {
    status: 'granted' | 'denied' | 'notDetermined';
    coordinates?: {
        lat: number;
        lng: number;
    };
}

export interface UserPreferences {
    dietaryRestrictions: DietaryTag[];
    preferredBudget: BudgetRange;
    defaultMaxDistance: number;
}
