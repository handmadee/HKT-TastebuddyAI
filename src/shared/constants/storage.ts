/**
 * Storage Keys
 * 
 * Centralized storage key definitions for SecureStore and AsyncStorage
 */

// Secure Storage Keys (for sensitive data)
export const SECURE_STORAGE_KEYS = {
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
    USER_ID: 'user_id',
} as const;

// Async Storage Keys (for non-sensitive data)
export const ASYNC_STORAGE_KEYS = {
    ONBOARDING_COMPLETED: 'onboarding_completed',
    LANGUAGE: 'language',
    THEME: 'theme',
    LAST_SYNC: 'last_sync',
    CACHED_PROFILE: 'cached_profile',
    CACHED_HEALTH_PROFILE: 'cached_health_profile',
} as const;
