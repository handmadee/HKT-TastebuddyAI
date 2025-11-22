import { useState, useEffect, useCallback } from 'react';
import { UserPreferences } from '../types';
import { userProfileService } from '../services/userProfileService';
import { settingsService } from '../services/settingsService';

export const useProfileSettings = () => {
    const [preferences, setPreferences] = useState<UserPreferences | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPreferences = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await userProfileService.getPreferences();
            setPreferences(data);
            setError(null);
        } catch (err) {
            setError('Failed to load preferences');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const updatePreferences = async (prefs: Partial<UserPreferences>) => {
        try {
            setIsSaving(true);
            const updated = await userProfileService.updatePreferences(prefs);
            setPreferences(updated);
        } catch (err) {
            setError('Failed to update preferences');
            console.error(err);
        } finally {
            setIsSaving(false);
        }
    };

    const signOut = async () => {
        try {
            await settingsService.signOut();
            // Handle navigation or state cleanup in the component
        } catch (err) {
            setError('Failed to sign out');
            console.error(err);
        }
    };

    useEffect(() => {
        fetchPreferences();
    }, [fetchPreferences]);

    return {
        preferences,
        isLoading,
        isSaving,
        error,
        updatePreferences,
        signOut,
        refetch: fetchPreferences,
    };
};
