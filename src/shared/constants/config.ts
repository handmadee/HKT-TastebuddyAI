/**
 * App Configuration Constants
 */

export const APP_CONFIG = {
    NAME: 'TastebuddyAI',
    VERSION: '1.0.0',
    BUILD_NUMBER: 1,
} as const;

export const ANIMATION_DURATION = {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
} as const;

export const DEBOUNCE_DELAY = {
    SEARCH: 500,
    INPUT: 300,
} as const;

export const JOB_POLLING = {
    INTERVAL: 2000, // 2 seconds
    MAX_ATTEMPTS: 30, // 60 seconds total
    TIMEOUT: 60000, // 60 seconds
} as const;

export const IMAGE_CONFIG = {
    MAX_SIZE: 10 * 1024 * 1024, // 10MB
    QUALITY: 0.8,
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
} as const;
