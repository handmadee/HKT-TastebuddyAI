import axios from 'axios';
import { secureStorage } from '../../shared/services/storage/secureStorage';
import { logger } from '../../shared/services/logger/logger';

// Create Axios instance
const apiClient = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://10.0.3.224:3004',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Request Interceptor
apiClient.interceptors.request.use(
    async (config) => {
        try {
            const { accessToken } = await secureStorage.getTokens();
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        } catch (error) {
            logger.error('Error attaching token to request', error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Handle 401 Unauthorized
        if (error.response?.status === 401 && !originalRequest._retry) {
            logger.warn('Unauthorized access detected');
            // TODO: Implement refresh token logic if supported by backend
            // For now, we will just reject so the store can handle logout
        }

        return Promise.reject(error);
    }
);

export { apiClient };
