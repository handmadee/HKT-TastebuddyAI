/**
 * Food Detection Service
 *
 * Service for analyzing food/menu images with real API integration.
 * Supports async processing with SSE streaming for progressive updates.
 */

import { MenuUploadResponse, UserScanPreferences } from '../types';
import { apiClient } from '../../../shared/services/api/client';
import { API_ENDPOINTS, API_CONFIG } from '../../../shared/constants/api';
import { logger } from '../../../shared/services/logger/logger';

/**
 * Analyze menu image using async API with SSE streaming
 *
 * @param imageUri - URI of the captured food/menu image
 * @param userPreferences - User allergens and dietary preferences
 * @returns Promise with jobId and streamUrl for SSE connection
 */
export const analyzeMenuImage = async (
    imageUri: string,
    userPreferences?: UserScanPreferences
): Promise<MenuUploadResponse> => {
    try {
        logger.info('Starting menu image analysis', { imageUri, userPreferences });

        // Validate image URI
        if (!imageUri || imageUri.trim() === '') {
            throw new Error('Image URI is required');
        }

        // Prepare FormData for React Native
        const formData = new FormData();

        // Add image file with proper React Native format
        const filename = imageUri.split('/').pop() || 'menu.jpg';
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : 'image/jpeg';

        // React Native's FormData expects this exact structure
        formData.append('image', {
            uri: imageUri,
            name: filename,
            type,
        } as any);

        logger.info('Image file prepared', { filename, type });

        // Add language (default to 'en' if not provided)
        const language = userPreferences?.language || 'en';
        formData.append('language', language);

        // Add user preferences if provided
        if (userPreferences?.allergens && userPreferences.allergens.length > 0) {
            formData.append('allergens', JSON.stringify(userPreferences.allergens));
            logger.info('Added allergens to request', { count: userPreferences.allergens.length });
        }

        if (userPreferences?.dietaryPreferences && userPreferences.dietaryPreferences.length > 0) {
            formData.append('dietaryPreferences', JSON.stringify(userPreferences.dietaryPreferences));
            logger.info('Added dietary preferences to request', { count: userPreferences.dietaryPreferences.length });
        }

        // Upload to async endpoint
        logger.info('Sending upload request', {
            endpoint: API_ENDPOINTS.MENU.UPLOAD_ASYNC,
            baseUrl: API_CONFIG.BASE_URL,
            language
        });

        const response = await apiClient.upload<{
            success?: boolean;
            data?: {
                jobId: string;
                streamUrl: string;
            };
            message?: string;
            error?: string;
            jobId?: string;
            streamUrl?: string;
        }>(API_ENDPOINTS.MENU.UPLOAD_ASYNC, formData);

        // Log the raw response for debugging
        logger.info('API Response received', { response });

        // Check if response has expected structure
        if (!response) {
            throw new Error('No response received from server');
        }

        // Handle different response formats from backend
        let jobId: string | undefined;
        let streamUrl: string | undefined;

        // Format 1: {success: true, data: {jobId, streamUrl}}
        if (response.success && response.data) {
            jobId = response.data.jobId;
            streamUrl = response.data.streamUrl;
        }
        // Format 2: {message: "Job created successfully", jobId, streamUrl}
        else if (response.message === 'Job created successfully' && response.jobId && response.streamUrl) {
            jobId = response.jobId;
            streamUrl = response.streamUrl;
        }
        // Format 3: Direct {jobId, streamUrl} at root level
        else if (response.jobId && response.streamUrl) {
            jobId = response.jobId;
            streamUrl = response.streamUrl;
        }

        // If we have jobId and streamUrl, it's a success
        if (jobId && streamUrl) {
            logger.info('Menu upload successful', { jobId, streamUrl, message: response.message });

            return {
                success: true,
                data: {
                    jobId,
                    streamUrl,
                },
            };
        }

        // Handle error response
        const errorMsg = response.error || 'Failed to upload menu image';
        logger.error('Upload failed with error response', { error: errorMsg, response });
        throw new Error(errorMsg);

    } catch (error) {
        // Log full error details for debugging
        const errorMessage = error instanceof Error ? error.message : String(error);
        const errorData: any = {
            message: errorMessage,
            imageUri,
        };

        // Add additional error context if available
        if (error && typeof error === 'object') {
            if ('status' in error) errorData.status = (error as any).status;
            if ('statusText' in error) errorData.statusText = (error as any).statusText;
            if ('data' in error) errorData.responseData = (error as any).data;
        }

        logger.error('Failed to upload menu image', errorData);

        // Return user-friendly error
        return {
            success: false,
            error: errorMessage || 'Failed to upload image. Please check your connection and try again.',
        };
    }
};

/**
 * Upload food image to storage
 * (For future implementation)
 */
export const uploadFoodImage = async (imageUri: string): Promise<string> => {
    // TODO: Implement image upload to cloud storage
    logger.info('Image upload requested', { imageUri });

    // Return the local URI for now
    return imageUri;
};
