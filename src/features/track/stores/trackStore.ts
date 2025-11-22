import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DailyLog, DailyGoals, FoodItem, MealType } from '../types';

interface TrackState {
    selectedDate: string; // YYYY-MM-DD
    dailyGoals: DailyGoals;
    logs: Record<string, DailyLog>; // Keyed by date

    // Actions
    setSelectedDate: (date: string) => void;
    addFood: (date: string, mealType: MealType, food: FoodItem) => void;
    removeFood: (date: string, mealType: MealType, foodId: string) => void;
    updateGoals: (goals: Partial<DailyGoals>) => void;
}

const DEFAULT_GOALS: DailyGoals = {
    calories: 2000,
    protein: 150,
    carbs: 200,
    fat: 65,
    water: 2500,
};

const getEmptyDailyLog = (date: string): DailyLog => ({
    date,
    meals: {
        breakfast: { id: 'breakfast', type: 'breakfast', items: [], totalCalories: 0 },
        lunch: { id: 'lunch', type: 'lunch', items: [], totalCalories: 0 },
        dinner: { id: 'dinner', type: 'dinner', items: [], totalCalories: 0 },
        snack: { id: 'snack', type: 'snack', items: [], totalCalories: 0 },
    },
    totalMacros: { calories: 0, protein: 0, carbs: 0, fat: 0 },
});

export const useTrackStore = create<TrackState>()(
    persist(
        (set, get) => ({
            selectedDate: new Date().toISOString().split('T')[0],
            dailyGoals: DEFAULT_GOALS,
            logs: {},

            setSelectedDate: (date) => set({ selectedDate: date }),

            addFood: (date, mealType, food) => {
                const { logs } = get();
                const currentLog = logs[date] || getEmptyDailyLog(date);
                const currentMeal = currentLog.meals[mealType];

                const updatedMeal = {
                    ...currentMeal,
                    items: [...currentMeal.items, food],
                    totalCalories: currentMeal.totalCalories + food.calories,
                };

                const updatedLog = {
                    ...currentLog,
                    meals: {
                        ...currentLog.meals,
                        [mealType]: updatedMeal,
                    },
                    totalMacros: {
                        calories: currentLog.totalMacros.calories + food.calories,
                        protein: currentLog.totalMacros.protein + food.protein,
                        carbs: currentLog.totalMacros.carbs + food.carbs,
                        fat: currentLog.totalMacros.fat + food.fat,
                    },
                };

                set({
                    logs: {
                        ...logs,
                        [date]: updatedLog,
                    },
                });
            },

            removeFood: (date, mealType, foodId) => {
                const { logs } = get();
                const currentLog = logs[date];
                if (!currentLog) return;

                const currentMeal = currentLog.meals[mealType];
                const foodToRemove = currentMeal.items.find((item) => item.id === foodId);

                if (!foodToRemove) return;

                const updatedMeal = {
                    ...currentMeal,
                    items: currentMeal.items.filter((item) => item.id !== foodId),
                    totalCalories: currentMeal.totalCalories - foodToRemove.calories,
                };

                const updatedLog = {
                    ...currentLog,
                    meals: {
                        ...currentLog.meals,
                        [mealType]: updatedMeal,
                    },
                    totalMacros: {
                        calories: currentLog.totalMacros.calories - foodToRemove.calories,
                        protein: currentLog.totalMacros.protein - foodToRemove.protein,
                        carbs: currentLog.totalMacros.carbs - foodToRemove.carbs,
                        fat: currentLog.totalMacros.fat - foodToRemove.fat,
                    },
                };

                set({
                    logs: {
                        ...logs,
                        [date]: updatedLog,
                    },
                });
            },

            updateGoals: (goals) => {
                set((state) => ({
                    dailyGoals: { ...state.dailyGoals, ...goals },
                }));
            },
        }),
        {
            name: 'track-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
