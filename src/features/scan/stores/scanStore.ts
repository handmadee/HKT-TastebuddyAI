/**
 * Scan Store
 *
 * Zustand store for managing food scan state
 */

import { create } from 'zustand';
import { ScanState, FoodScanResult } from '../types';
import { analyzeFoodImage } from '../services/foodDetectionService';
import { logger } from '../../../shared/services/logger/logger';

const MAX_HISTORY_ITEMS = 50;

export const useScanStore = create<ScanState>((set, get) => ({
    currentScan: null,
    scanHistory: [],
    isScanning: false,
    isAnalyzing: false,
    error: null,

    startScan: () => {
        logger.info('Starting scan');
        set({ isScanning: true, error: null, currentScan: null });
    },

    stopScan: () => {
        logger.info('Stopping scan');
        set({ isScanning: false });
    },

    analyzeFoodImage: async (imageUri: string) => {
        logger.info('Analyzing food image', { imageUri });

        set({ isAnalyzing: true, error: null });

        try {
            const response = await analyzeFoodImage(imageUri);

            if (response.success && response.data) {
                set({
                    currentScan: response.data,
                    isAnalyzing: false,
                    isScanning: false,
                });

                logger.info('Food analysis successful', {
                    foodName: response.data.name,
                });
            } else {
                throw new Error(response.error || 'Analysis failed');
            }
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'Failed to analyze image. Please try again.';

            logger.error('Food analysis failed', { error });

            set({
                error: errorMessage,
                isAnalyzing: false,
                isScanning: false,
            });
        }
    },

    saveScanResult: async (result: FoodScanResult) => {
        logger.info('Saving scan result', { id: result.id, name: result.name });

        try {
            const { scanHistory } = get();

            // Add to history (most recent first)
            const updatedHistory = [result, ...scanHistory];

            // Limit history size
            if (updatedHistory.length > MAX_HISTORY_ITEMS) {
                updatedHistory.splice(MAX_HISTORY_ITEMS);
            }

            set({ scanHistory: updatedHistory });

            // TODO: Persist to storage and/or backend
            // await asyncStorage.setItem('scan_history', JSON.stringify(updatedHistory));
            // await apiClient.post('/scans', result);

            logger.info('Scan result saved successfully');
        } catch (error) {
            logger.error('Failed to save scan result', { error });
        }
    },

    clearCurrentScan: () => {
        logger.info('Clearing current scan');
        set({
            currentScan: null,
            isScanning: false,
            isAnalyzing: false,
            error: null,
        });
    },

    loadScanHistory: async () => {
        try {
            // TODO: Load from storage and/or backend
            // const storedHistory = await asyncStorage.getItem('scan_history');
            // if (storedHistory) {
            //     const history = JSON.parse(storedHistory);
            //     set({ scanHistory: history });
            // }

            logger.info('Scan history loaded');
        } catch (error) {
            logger.error('Failed to load scan history', { error });
        }
    },

    deleteScanFromHistory: async (id: string) => {
        logger.info('Deleting scan from history', { id });

        try {
            const { scanHistory } = get();
            const updatedHistory = scanHistory.filter((scan) => scan.id !== id);

            set({ scanHistory: updatedHistory });

            // TODO: Update storage and/or backend
            // await asyncStorage.setItem('scan_history', JSON.stringify(updatedHistory));
            // await apiClient.delete(`/scans/${id}`);

            logger.info('Scan deleted from history');
        } catch (error) {
            logger.error('Failed to delete scan from history', { error });
        }
    },
}));
