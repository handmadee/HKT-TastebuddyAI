import { useAuthStore } from '../../../shared/stores/authStore';
import { DietaryProfile } from '../types';
import { userProfileService } from '../services/userProfileService';
import { useState } from 'react';

export const useAllergensAndDiet = () => {
    const { user, updateUser } = useAuthStore();
    const [isSaving, setIsSaving] = useState(false);

    const dietaryProfile: DietaryProfile | null = user?.onboarding ? {
        diet: user.onboarding.dietaryPreferences || [],
        allergens: user.onboarding.allergens || [],
    } : null;

    const updateOnboarding = async (updates: any) => {
        if (!user) return;
        try {
            setIsSaving(true);
            const updatedUser = await userProfileService.updateProfile({
                onboarding: {
                    ...user.onboarding,
                    ...updates
                }
            });
            updateUser(updatedUser);
        } catch (error) {
            console.error('Failed to update profile', error);
        } finally {
            setIsSaving(false);
        }
    };

    const updateDiet = async (diet: string) => {
        // Toggle logic if diet is single select or multi select
        // Assuming multi-select based on string[] type
        if (!dietaryProfile) return;

        const currentDiets = dietaryProfile.diet;
        const newDiets = currentDiets.includes(diet)
            ? currentDiets.filter(d => d !== diet)
            : [...currentDiets, diet];

        await updateOnboarding({ dietaryPreferences: newDiets });
    };

    const addAllergen = async (allergenType: string, severity: string = 'medium') => {
        if (!dietaryProfile) return;
        if (dietaryProfile.allergens.some(a => a.type === allergenType)) return;

        const newAllergens = [...dietaryProfile.allergens, { type: allergenType, severity }];
        await updateOnboarding({ allergens: newAllergens });
    };

    const removeAllergen = async (allergenType: string) => {
        if (!dietaryProfile) return;

        const newAllergens = dietaryProfile.allergens.filter(a => a.type !== allergenType);
        await updateOnboarding({ allergens: newAllergens });
    };

    return {
        dietaryProfile,
        isLoading: false,
        isSaving,
        error: null,
        updateDiet,
        addAllergen,
        removeAllergen,
        refetch: () => { },
    };
};
