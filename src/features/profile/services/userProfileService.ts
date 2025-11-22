import { UserProfile, UserPreferences, DietaryProfile, DietType } from '../types';

// Mock data
const MOCK_PROFILE: UserProfile = {
    id: 'u123',
    fullName: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    country: 'United States',
    avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=0D8ABC&color=fff',
};

const MOCK_PREFERENCES: UserPreferences = {
    language: 'en',
    units: 'metric',
    notifications: {
        dailySummary: true,
        mealLogging: true,
        allergenAlerts: true,
    },
    privacy: {
        shareData: false,
        analytics: true,
    },
};

const MOCK_DIET: DietaryProfile = {
    diet: DietType.Omnivore,
    allergens: ['Peanuts', 'Shellfish'],
};

export const userProfileService = {
    getProfile: async (): Promise<UserProfile> => {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
        return MOCK_PROFILE;
    },

    updateProfile: async (profile: Partial<UserProfile>): Promise<UserProfile> => {
        await new Promise(resolve => setTimeout(resolve, 800));
        return { ...MOCK_PROFILE, ...profile };
    },

    getPreferences: async (): Promise<UserPreferences> => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return MOCK_PREFERENCES;
    },

    updatePreferences: async (prefs: Partial<UserPreferences>): Promise<UserPreferences> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return { ...MOCK_PREFERENCES, ...prefs };
    },

    getDietaryProfile: async (): Promise<DietaryProfile> => {
        await new Promise(resolve => setTimeout(resolve, 400));
        return MOCK_DIET;
    },

    updateDietaryProfile: async (diet: Partial<DietaryProfile>): Promise<DietaryProfile> => {
        await new Promise(resolve => setTimeout(resolve, 600));
        return { ...MOCK_DIET, ...diet };
    },
};
