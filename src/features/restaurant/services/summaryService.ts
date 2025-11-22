import { DailySummary } from '../types';

const MOCK_SUMMARY: DailySummary = {
    calories: {
        consumed: 1450,
        target: 2000,
    },
    macros: {
        protein: 78,
        carbs: 165,
        fat: 48,
    },
    mealsLogged: 2,
};

export const summaryService = {
    getTodaySummary: async (): Promise<DailySummary> => {
        await new Promise(resolve => setTimeout(resolve, 400));
        return MOCK_SUMMARY;
    },
};
