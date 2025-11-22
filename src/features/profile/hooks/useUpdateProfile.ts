import { useState } from 'react';
import { UserProfile } from '../types';
import { userProfileService } from '../services/userProfileService';

export const useUpdateProfile = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateProfile = async (profileData: Partial<UserProfile>) => {
        try {
            setIsUpdating(true);
            setError(null);
            const updatedProfile = await userProfileService.updateProfile(profileData);
            return updatedProfile;
        } catch (err) {
            setError('Failed to update profile');
            console.error(err);
            throw err;
        } finally {
            setIsUpdating(false);
        }
    };

    return { updateProfile, isUpdating, error };
};
