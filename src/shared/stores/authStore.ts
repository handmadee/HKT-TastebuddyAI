import { create } from 'zustand';
import { User } from '../../features/auth/types/auth.types';
import { authService } from '../../features/auth/services/authService';
import { secureStorage } from '../services/storage/secureStorage';
import { logger } from '../services/logger/logger';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Actions
    login: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    hydrateAuth: () => Promise<void>;
    clearError: () => void;
    updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,

    clearError: () => set({ error: null }),

    login: async (email, password) => {
        set({ isLoading: true, error: null });
        logger.info('User attempting login', { email });

        try {
            const response = await authService.login({ email, password });
            const { accessToken, refreshToken, user } = response;

            // Save tokens
            await secureStorage.saveTokens(accessToken, refreshToken);

            // Save user state
            set({ user, isAuthenticated: true, isLoading: false });

            logger.info('User logged in successfully');
        } catch (error: any) {
            logger.error('Login failed', error);
            const errorMessage = error.response?.data?.message || 'Invalid email or password';
            set({ error: errorMessage, isLoading: false });
            throw error;
        }
    },

    signOut: async () => {
        logger.info('User signing out');
        set({ isLoading: true });

        try {
            await authService.logout();
        } catch (error) {
            logger.warn('Logout API call failed, proceeding with local cleanup');
        } finally {
            await secureStorage.clearTokens();
            set({ user: null, isAuthenticated: false, isLoading: false });
        }
    },

    hydrateAuth: async () => {
        set({ isLoading: true });
        try {
            const { accessToken } = await secureStorage.getTokens();
            if (accessToken) {
                // Verify token and get fresh user data
                try {
                    const meData = await authService.getMe();

                    // Map MeResponseDto to User interface if needed, or update User interface
                    // For now, constructing User object from MeResponseDto
                    const user: User = {
                        id: meData.userId,
                        email: meData.email,
                        fullName: meData.info.fullName,
                        onboarding: meData.onboarding
                    };

                    set({ user, isAuthenticated: true });
                } catch (error) {
                    logger.warn('Token invalid or expired during hydration');
                    await secureStorage.clearTokens();
                    set({ user: null, isAuthenticated: false });
                }
            } else {
                set({ isAuthenticated: false });
            }
        } catch (error) {
            logger.error('Failed to hydrate auth:', error);
            set({ isAuthenticated: false });
        } finally {
            set({ isLoading: false });
        }
    },

    updateUser: (user: User) => {
        set({ user });
    },
}));
