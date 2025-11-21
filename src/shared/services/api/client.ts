/**
 * Axios Client
 * 
 * Centralized HTTP client with request/response interceptors
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { API_CONFIG } from '../../constants/api';
import { secureStorage } from '../storage/secureStorage';
import { logger } from '../logger/logger';

class ApiClient {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: API_CONFIG.BASE_URL,
            timeout: API_CONFIG.TIMEOUT,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        this.setupInterceptors();
    }

    /**
     * Setup request and response interceptors
     */
    private setupInterceptors() {
        // Request interceptor - Add auth token and log
        this.client.interceptors.request.use(
            async (config) => {
                const { accessToken } = await secureStorage.getTokens();

                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }

                // Log API request
                logger.logApiRequest(
                    config.method?.toUpperCase() || 'GET',
                    config.url || '',
                    config.data
                );

                return config;
            },
            (error) => {
                logger.error('API Request Error', error);
                return Promise.reject(error);
            }
        );

        // Response interceptor - Handle errors and log
        this.client.interceptors.response.use(
            (response) => {
                // Log API response
                logger.logApiResponse(
                    response.config.method?.toUpperCase() || 'GET',
                    response.config.url || '',
                    response.status,
                    response.data
                );
                return response;
            },
            async (error: AxiosError) => {
                const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

                // Handle 401 Unauthorized - Token refresh
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        const { refreshToken } = await secureStorage.getTokens();

                        if (!refreshToken) {
                            throw new Error('No refresh token available');
                        }

                        // Call refresh token endpoint
                        const response = await this.client.post('/auth/refresh', {
                            refreshToken,
                        });

                        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.data;

                        // Save new tokens
                        await secureStorage.saveTokens(newAccessToken, newRefreshToken);

                        // Retry original request with new token
                        if (originalRequest.headers) {
                            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                        }

                        return this.client(originalRequest);
                    } catch (refreshError) {
                        // Refresh failed - clear tokens and redirect to login
                        await secureStorage.clearTokens();
                        // TODO: Trigger logout and redirect to login
                        return Promise.reject(refreshError);
                    }
                }

                return Promise.reject(error);
            }
        );
    }

    /**
     * GET request
     */
    async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.get<T>(url, config);
        return response.data;
    }

    /**
     * POST request
     */
    async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.post<T>(url, data, config);
        return response.data;
    }

    /**
     * PUT request
     */
    async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.put<T>(url, data, config);
        return response.data;
    }

    /**
     * PATCH request
     */
    async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.patch<T>(url, data, config);
        return response.data;
    }

    /**
     * DELETE request
     */
    async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.delete<T>(url, config);
        return response.data;
    }

    /**
     * Upload file (multipart/form-data)
     */
    async upload<T = any>(url: string, formData: FormData, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.post<T>(url, formData, {
            ...config,
            headers: {
                'Content-Type': 'multipart/form-data',
                ...config?.headers,
            },
        });
        return response.data;
    }

    /**
     * Get raw axios instance for advanced usage
     */
    getClient(): AxiosInstance {
        return this.client;
    }
}

// Export singleton instance
export const apiClient = new ApiClient();
