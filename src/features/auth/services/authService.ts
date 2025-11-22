import { apiClient } from '../../../services/api/apiClient';
import { LoginRequestDto, LoginResponseDto, MeResponseDto } from '../types/auth.types';
import { logger } from '../../../shared/services/logger/logger';

export const authService = {
    /**
     * Login with email and password
     */
    login: async (credentials: LoginRequestDto): Promise<LoginResponseDto> => {
        try {
            const response = await apiClient.post<LoginResponseDto>('/auth/login', credentials);
            return response.data;
        } catch (error) {
            logger.error('AuthService: Login failed', error);
            throw error;
        }
    },

    /**
     * Get current user profile
     */
    getMe: async (): Promise<MeResponseDto> => {
        try {
            const response = await apiClient.get<MeResponseDto>('/auth/me');
            return response.data;
        } catch (error) {
            logger.error('AuthService: GetMe failed', error);
            throw error;
        }
    },

    /**
     * Logout
     */
    logout: async (): Promise<void> => {
        try {
            await apiClient.post('/auth/logout');
        } catch (error) {
            logger.warn('AuthService: Logout failed (server might be unreachable)', error);
            // We still want to clear local state even if server logout fails
        }
    },
};
