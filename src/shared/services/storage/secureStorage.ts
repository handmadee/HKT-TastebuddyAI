/**
 * Secure Storage Service
 * 
 * Wrapper around Expo SecureStore for storing sensitive data
 * like authentication tokens.
 */

import * as SecureStore from 'expo-secure-store';

class SecureStorageService {
    /**
     * Save a value to secure storage
     */
    async setItem(key: string, value: string): Promise<void> {
        try {
            await SecureStore.setItemAsync(key, value);
        } catch (error) {
            console.error(`Error saving ${key} to secure storage:`, error);
            throw error;
        }
    }

    /**
     * Get a value from secure storage
     */
    async getItem(key: string): Promise<string | null> {
        try {
            return await SecureStore.getItemAsync(key);
        } catch (error) {
            console.error(`Error reading ${key} from secure storage:`, error);
            return null;
        }
    }

    /**
     * Remove a value from secure storage
     */
    async removeItem(key: string): Promise<void> {
        try {
            await SecureStore.deleteItemAsync(key);
        } catch (error) {
            console.error(`Error removing ${key} from secure storage:`, error);
            throw error;
        }
    }

    /**
     * Clear all items from secure storage (use with caution!)
     */
    async clear(): Promise<void> {
        // Note: SecureStore doesn't have a clear all method
        // You need to manually remove each key
        console.warn('SecureStore.clear() is not implemented. Remove items individually.');
    }

    /**
     * Save auth tokens
     */
    async saveTokens(accessToken: string, refreshToken: string): Promise<void> {
        try {
            await Promise.all([
                this.setItem('access_token', accessToken),
                this.setItem('refresh_token', refreshToken),
            ]);
        } catch (error) {
            console.error('Error saving tokens:', error);
            throw error;
        }
    }

    /**
     * Get auth tokens
     */
    async getTokens(): Promise<{ accessToken: string | null; refreshToken: string | null }> {
        try {
            const [accessToken, refreshToken] = await Promise.all([
                this.getItem('access_token'),
                this.getItem('refresh_token'),
            ]);
            return { accessToken, refreshToken };
        } catch (error) {
            console.error('Error getting tokens:', error);
            return { accessToken: null, refreshToken: null };
        }
    }

    /**
     * Remove auth tokens
     */
    async clearTokens(): Promise<void> {
        try {
            await Promise.all([
                this.removeItem('access_token'),
                this.removeItem('refresh_token'),
            ]);
        } catch (error) {
            console.error('Error clearing tokens:', error);
            throw error;
        }
    }
}

export const secureStorage = new SecureStorageService();
