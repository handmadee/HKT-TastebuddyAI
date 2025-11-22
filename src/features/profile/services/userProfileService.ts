import { apiClient } from '../../../services/api/apiClient';
import { User } from '../../auth/types/auth.types';
import { logger } from '../../../shared/services/logger/logger';

export const userProfileService = {
    /**
     * Get current user profile
     */
    getProfile: async (): Promise<User> => {
        try {
            const response = await apiClient.get<User>('/users/profile');
            return response.data;
        } catch (error) {
            logger.error('UserProfileService: Failed to fetch profile', error);
            throw error;
        }
    },

    /**
     * Update user profile
     */
    updateProfile: async (data: Partial<User> | any): Promise<User> => {
        try {
            const response = await apiClient.patch<User>('/users/profile', data);
            return response.data;
        } catch (error) {
            logger.error('UserProfileService: Failed to update profile', error);
            throw error;
        }
    },
};
