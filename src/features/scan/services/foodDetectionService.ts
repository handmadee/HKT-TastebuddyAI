/**
 * Food Detection Service
 *
 * Service for analyzing food images and detecting allergens
 * Currently using mock data, will integrate with AI API later
 */

import { FoodScanResult, FoodDetectionResponse } from '../types';
import { getRandomMockScanResult } from '../constants/mockData';
import { logger } from '../../../shared/services/logger/logger';

/**
 * Analyze food image and get nutrition/allergen information
 *
 * @param imageUri - URI of the captured food image
 * @returns Promise with food scan result
 */
export const analyzeFoodImage = async (
    imageUri: string
): Promise<FoodDetectionResponse> => {
    try {
        logger.info('Analyzing food image', { imageUri });

        // TODO: Replace with actual AI API call
        // const response = await apiClient.post('/food/analyze', {
        //     image: imageUri,
        // });

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Use mock data for now
        const mockResult = getRandomMockScanResult();
        const result: FoodScanResult = {
            ...mockResult,
            imageUri, // Use the actual captured image
        };

        logger.info('Food analysis completed', {
            foodName: result.name,
            confidence: result.confidence,
            allergensCount: result.allergens.length,
        });

        return {
            success: true,
            data: result,
        };
    } catch (error) {
        logger.error('Failed to analyze food image', { error, imageUri });

        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : 'Failed to analyze image. Please try again.',
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

/**
 * Re-analyze a previously scanned food item
 */
export const reAnalyzeFoodImage = async (
    imageUri: string
): Promise<FoodDetectionResponse> => {
    logger.info('Re-analyzing food image', { imageUri });

    // Same logic as initial analysis
    return analyzeFoodImage(imageUri);
};
