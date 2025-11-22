import { UserPreferences, DietaryTag, BudgetRange } from '../types';

const MOCK_PREFERENCES: UserPreferences = {
    dietaryRestrictions: [DietaryTag.VeganOptions],
    preferredBudget: BudgetRange.Medium,
    defaultMaxDistance: 1000,
};

export const userPreferenceService = {
    getPreferences: async (): Promise<UserPreferences> => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return MOCK_PREFERENCES;
    },

    updatePreferences: async (preferences: Partial<UserPreferences>): Promise<UserPreferences> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return { ...MOCK_PREFERENCES, ...preferences };
    },
};
