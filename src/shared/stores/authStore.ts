/**
 * Auth Store - Zustand
 * 
 * Global authentication state management
 */

import { create } from 'zustand';
import { User } from '../types/common.types';
import { secureStorage } from '../services/storage/secureStorage';
import { logger } from '../services/logger/logger';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    // Actions
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;
    login: (email: string, password: string) => Promise<void>;
    register: (fullName: string, email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    hydrateAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,

    setUser: (user) => {
        logger.logStateChange('AuthStore', 'setUser', { userId: user?.id });
        set({ user, isAuthenticated: !!user });
    },

    setLoading: (loading) => {
        logger.logStateChange('AuthStore', 'setLoading', { loading });
        set({ isLoading: loading });
    },

    login: async (email: string, password: string) => {
        logger.info('User attempting login', { email });
        try {
            // TODO: Implement actual API call
            // const response = await apiClient.post('/auth/login', { email, password });
            // const { user, accessToken, refreshToken } = response.data;

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Mock user data
            const mockUser: User = {
                id: '1',
                email,
                fullName: 'Test User',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            // Save tokens
            await secureStorage.saveTokens('mock-access-token', 'mock-refresh-token');

            set({ user: mockUser, isAuthenticated: true });
            logger.info('User logged in successfully');
        } catch (error) {
            logger.error('Login failed', error);
            throw new Error('Invalid email or password');
        }
    },

    register: async (fullName: string, email: string, password: string) => {
        logger.info('User attempting registration', { email, fullName });
        try {
            // TODO: Implement actual API call
            // const response = await apiClient.post('/auth/register', { fullName, email, password });
            // const { user, accessToken, refreshToken } = response.data;

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Mock user data
            const mockUser: User = {
                id: '1',
                email,
                fullName,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            // Save tokens
            await secureStorage.saveTokens('mock-access-token', 'mock-refresh-token');

            // Mark that this is a new user who needs onboarding
            await secureStorage.setItem('needs_onboarding', 'true');

            set({ user: mockUser, isAuthenticated: true });
            logger.info('User registered successfully');
        } catch (error) {
            logger.error('Registration failed', error);
            throw new Error('Registration failed. Email may already be in use.');
        }
    },

    signOut: async () => {
        logger.info('User signing out');
        await secureStorage.clearTokens();
        set({ user: null, isAuthenticated: false });
    },

    hydrateAuth: async () => {
        set({ isLoading: true });
        try {
            const { accessToken } = await secureStorage.getTokens();
            if (accessToken) {
                // TODO: Fetch user profile with token
                // const user = await fetchUserProfile();
                // set({ user, isAuthenticated: true });
                set({ isAuthenticated: true });
            }
        } catch (error) {
            console.error('Failed to hydrate auth:', error);
        } finally {
            set({ isLoading: false });
        }
    },
}));
