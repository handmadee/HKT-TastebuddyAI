import { useState, useEffect, useCallback } from 'react';
import { UserProfile } from '../types';
import { userProfileService } from '../services/userProfileService';

export const useUserProfile = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProfile = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await userProfileService.getProfile();
            setProfile(data);
            setError(null);
        } catch (err) {
            setError('Failed to load profile');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    return { profile, isLoading, error, refetch: fetchProfile };
};
