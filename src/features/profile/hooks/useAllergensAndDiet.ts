import { useState, useEffect, useCallback } from 'react';
import { DietaryProfile, DietType } from '../types';
import { userProfileService } from '../services/userProfileService';

export const useAllergensAndDiet = () => {
    const [dietaryProfile, setDietaryProfile] = useState<DietaryProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchDietaryProfile = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await userProfileService.getDietaryProfile();
            setDietaryProfile(data);
            setError(null);
        } catch (err) {
            setError('Failed to load dietary profile');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const updateDiet = async (diet: DietType) => {
        try {
            setIsSaving(true);
            const updated = await userProfileService.updateDietaryProfile({ diet });
            setDietaryProfile(updated);
        } catch (err) {
            setError('Failed to update diet');
            console.error(err);
        } finally {
            setIsSaving(false);
        }
    };

    const addAllergen = async (allergen: string) => {
        if (!dietaryProfile) return;
        if (dietaryProfile.allergens.includes(allergen)) return;

        try {
            setIsSaving(true);
            const newAllergens = [...dietaryProfile.allergens, allergen];
            const updated = await userProfileService.updateDietaryProfile({ allergens: newAllergens });
            setDietaryProfile(updated);
        } catch (err) {
            setError('Failed to add allergen');
            console.error(err);
        } finally {
            setIsSaving(false);
        }
    };

    const removeAllergen = async (allergen: string) => {
        if (!dietaryProfile) return;

        try {
            setIsSaving(true);
            const newAllergens = dietaryProfile.allergens.filter(a => a !== allergen);
            const updated = await userProfileService.updateDietaryProfile({ allergens: newAllergens });
            setDietaryProfile(updated);
        } catch (err) {
            setError('Failed to remove allergen');
            console.error(err);
        } finally {
            setIsSaving(false);
        }
    };

    useEffect(() => {
        fetchDietaryProfile();
    }, [fetchDietaryProfile]);

    return {
        dietaryProfile,
        isLoading,
        isSaving,
        error,
        updateDiet,
        addAllergen,
        removeAllergen,
        refetch: fetchDietaryProfile,
    };
};
