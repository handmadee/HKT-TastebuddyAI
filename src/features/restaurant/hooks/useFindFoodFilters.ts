import { useState, useEffect } from 'react';
import { RestaurantFilters, DietaryTag, MealTime, BudgetRange } from '../types';
import { userPreferenceService } from '../services/userPreferenceService';

export const useFindFoodFilters = () => {
    const [filters, setFilters] = useState<RestaurantFilters>({
        dietaryPreferences: [],
        mealTime: undefined,
        budget: undefined,
        maxDistance: 1000,
        sortBy: 'bestMatch',
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadPreferences = async () => {
            try {
                const prefs = await userPreferenceService.getPreferences();
                setFilters(prev => ({
                    ...prev,
                    dietaryPreferences: prefs.dietaryRestrictions,
                    budget: prefs.preferredBudget,
                    maxDistance: prefs.defaultMaxDistance,
                }));
            } catch (error) {
                console.error('Failed to load preferences', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadPreferences();
    }, []);

    const toggleDietaryPref = (tag: DietaryTag) => {
        setFilters(prev => ({
            ...prev,
            dietaryPreferences: prev.dietaryPreferences.includes(tag)
                ? prev.dietaryPreferences.filter(t => t !== tag)
                : [...prev.dietaryPreferences, tag],
        }));
    };

    const setMealTime = (mealTime: MealTime | undefined) => {
        setFilters(prev => ({ ...prev, mealTime }));
    };

    const setBudget = (budget: BudgetRange | undefined) => {
        setFilters(prev => ({ ...prev, budget }));
    };

    const setMaxDistance = (maxDistance: number) => {
        setFilters(prev => ({ ...prev, maxDistance }));
    };

    const setSortBy = (sortBy: RestaurantFilters['sortBy']) => {
        setFilters(prev => ({ ...prev, sortBy }));
    };

    const resetFilters = () => {
        setFilters({
            dietaryPreferences: [],
            mealTime: undefined,
            budget: undefined,
            maxDistance: 1000,
            sortBy: 'bestMatch',
        });
    };

    return {
        filters,
        isLoading,
        toggleDietaryPref,
        setMealTime,
        setBudget,
        setMaxDistance,
        setSortBy,
        resetFilters,
    };
};
