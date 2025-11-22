/**
 * API Constants
 * 
 * Based on API_SEC.MD specification
 */

// 10.0.3.224
// https://26ea34ff3c7b.ngrok-free.app/v1
export const API_CONFIG = {
    BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL || 'http://10.0.3.224:3004/v1',
    TIMEOUT: 30000, // 30 seconds
    VERSION: 'v1',
} as const;

export const API_ENDPOINTS = {
    // Auth
    AUTH: {
        REGISTER: '/auth/register',
        LOGIN: '/auth/login',
        OAUTH_GOOGLE: '/auth/oauth/google',
        OAUTH_APPLE: '/auth/oauth/apple',
        REFRESH_TOKEN: '/auth/refresh',
        LOGOUT: '/auth/logout',
    },

    // Profile
    PROFILE: {
        GET: '/profile',
        UPDATE: '/profile',
    },

    // Health Profile
    HEALTH_PROFILE: {
        GET: '/health-profile',
        UPDATE: '/health-profile',
        PREFERENCES: '/health-profile/preferences',
        ALLERGENS: '/health-profile/allergens',
    },

    // Food Scanner
    SCANNER: {
        UPLOAD: '/food/scan',
        JOB_STATUS: (jobId: string) => `/food/scan/job/${jobId}`,
        FAVORITES: '/food/favorites',
        FAVORITE_ITEM: (id: string) => `/food/favorites/${id}`,
    },

    // Menu Translator (with SSE support)
    MENU: {
        UPLOAD_ASYNC: '/menu/upload/scan-async',
        JOB_STATUS: (jobId: string) => `/menu/jobs/${jobId}`,
        JOB_STREAM: (jobId: string) => `/menu/jobs/${jobId}/stream`,
    },

    // Food Search
    SEARCH: {
        RESTAURANTS: '/search/restaurants',
        FOODS: '/search/foods',
        RECOMMENDATIONS: '/search/recommendations',
    },

    // Nutrition Log
    NUTRITION: {
        SUMMARY: '/nutrition/summary',
        LOG: '/nutrition/log',
        LOG_ITEM: (id: string) => `/nutrition/log/${id}`,
    },
} as const;

export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
} as const;

export const RATE_LIMITS = {
    AUTHENTICATED: 1000, // requests per hour
    ANONYMOUS: 100, // requests per hour
} as const;
