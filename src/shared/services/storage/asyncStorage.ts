/**
 * Async Storage Service
 * 
 * Wrapper around AsyncStorage for non-sensitive data persistence
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

class AsyncStorageService {
    /**
     * Save a value to storage
     */
    async setItem(key: string, value: string): Promise<void> {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.error(`Error saving ${key} to async storage:`, error);
            throw error;
        }
    }

    /**
     * Save an object to storage (JSON stringified)
     */
    async setObject<T>(key: string, value: T): Promise<void> {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (error) {
            console.error(`Error saving object ${key} to async storage:`, error);
            throw error;
        }
    }

    /**
     * Get a value from storage
     */
    async getItem(key: string): Promise<string | null> {
        try {
            return await AsyncStorage.getItem(key);
        } catch (error) {
            console.error(`Error reading ${key} from async storage:`, error);
            return null;
        }
    }

    /**
     * Get an object from storage (JSON parsed)
     */
    async getObject<T>(key: string): Promise<T | null> {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (error) {
            console.error(`Error reading object ${key} from async storage:`, error);
            return null;
        }
    }

    /**
     * Remove a value from storage
     */
    async removeItem(key: string): Promise<void> {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing ${key} from async storage:`, error);
            throw error;
        }
    }

    /**
     * Remove multiple items
     */
    async multiRemove(keys: string[]): Promise<void> {
        try {
            await AsyncStorage.multiRemove(keys);
        } catch (error) {
            console.error('Error removing multiple items from async storage:', error);
            throw error;
        }
    }

    /**
     * Clear all items from storage (use with caution!)
     */
    async clear(): Promise<void> {
        try {
            await AsyncStorage.clear();
        } catch (error) {
            console.error('Error clearing async storage:', error);
            throw error;
        }
    }

    /**
     * Get all keys
     */
    async getAllKeys(): Promise<string[]> {
        try {
            return await AsyncStorage.getAllKeys();
        } catch (error) {
            console.error('Error getting all keys from async storage:', error);
            return [];
        }
    }
}

export const asyncStorage = new AsyncStorageService();
