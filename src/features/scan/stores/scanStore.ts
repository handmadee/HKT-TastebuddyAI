/**
 * Scan Store
 *
 * Zustand store for managing menu/food scan state with SSE support
 */

import { create } from 'zustand';
import {
    ScanState,
    FoodScanResult,
    MenuScanResult,
    ScanStage,
    StageStatus,
    UserScanPreferences,
} from '../types';
import { analyzeMenuImage } from '../services/foodDetectionService';
import { createSSEConnection, closeSSEConnection, isSSESupported } from '../../../shared/utils/sse';
import { pollingService } from '../services/pollingService';
import { API_CONFIG } from '../../../shared/constants/api';
import { logger } from '../../../shared/services/logger/logger';
import { transformApiResponse } from '../utils/resultTransformer';

const MAX_HISTORY_ITEMS = 50;

// Stage progress mapping (cumulative percentage)
const STAGE_PROGRESS: Record<ScanStage, number> = {
    [ScanStage.VALIDATION]: 10,
    [ScanStage.EXTRACTION]: 30,
    [ScanStage.DISH_UNDERSTANDING]: 50,
    [ScanStage.ALLERGEN_ANALYSIS]: 70,
    [ScanStage.DIETARY_ANALYSIS]: 80,
    [ScanStage.NUTRITION_ANALYSIS]: 90,
    [ScanStage.PRICE_ANALYSIS]: 95,
    [ScanStage.FORMATTING]: 98,
};

export const useScanStore = create<ScanState>((set, get) => ({
    currentScan: null,
    scanHistory: [],
    isScanning: false,
    isAnalyzing: false,
    error: null,
    currentStage: null,
    progress: 0,
    stageData: {},
    sseConnection: null,

    startScan: () => {
        logger.info('Starting scan');
        set({
            isScanning: true,
            error: null,
            currentScan: null,
            currentStage: null,
            progress: 0,
            stageData: {},
        });
    },

    stopScan: () => {
        logger.info('Stopping scan');
        get().disconnectSSE();
        pollingService.stop();
        set({ isScanning: false, isAnalyzing: false });
    },

    updateStage: (stage: ScanStage, data?: any, status: StageStatus = 'completed') => {
        logger.info('Stage update', { stage, status });

        const stageData = { ...get().stageData };
        stageData[stage] = data;

        set({
            currentStage: stage,
            stageData,
            progress: STAGE_PROGRESS[stage] || 0,
        });
    },

    updateProgress: (progress: number) => {
        set({ progress: Math.min(100, Math.max(0, progress)) });
    },

    analyzeFoodImage: async (imageUri: string, userPreferences?: UserScanPreferences) => {
        logger.info('Analyzing menu image', { imageUri });

        set({ isAnalyzing: true, error: null, progress: 5 });

        try {
            // Upload image and get jobId
            const response = await analyzeMenuImage(imageUri, userPreferences);

            if (!response.success || !response.data) {
                throw new Error(response.error || 'Upload failed');
            }

            const { jobId, streamUrl } = response.data;
            logger.info('Upload successful', { jobId });

            // Try SSE first
            if (isSSESupported()) {
                try {
                    await get().connectSSE(jobId, streamUrl, imageUri);
                } catch (sseError) {
                    logger.warn('SSE failed, falling back to polling', { sseError });
                    get().startPolling(jobId, imageUri);
                }
            } else {
                // Fallback to polling if SSE not supported
                logger.info('SSE not supported, using polling');
                get().startPolling(jobId, imageUri);
            }
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'Failed to analyze image. Please try again.';

            // Log error with proper serialization
            const errorDetails: any = {
                message: errorMessage,
            };

            // Extract additional error context if available
            if (error && typeof error === 'object') {
                if ('status' in error) errorDetails.status = (error as any).status;
                if ('statusText' in error) errorDetails.statusText = (error as any).statusText;
                if ('data' in error) errorDetails.data = (error as any).data;
            }

            logger.error('Food analysis failed', errorDetails);

            set({
                error: errorMessage,
                isAnalyzing: false,
                isScanning: false,
                progress: 0,
            });
        }
    },

    connectSSE: async (jobId: string, streamUrl: string, imageUri: string) => {
        logger.info('Connecting to SSE stream', { jobId, streamUrl });

        const fullUrl = `${API_CONFIG.BASE_URL}${streamUrl}`;

        const eventSource = await createSSEConnection(fullUrl, {
            onEvent: (event) => {
                const state = get();

                switch (event.type) {
                    case 'stage_update':
                        if (event.stage) {
                            state.updateStage(event.stage as ScanStage, event.data, event.status as StageStatus);
                        }
                        break;

                    case 'job_completed':
                        logger.info('Job completed via SSE');
                        state.disconnectSSE();

                        if (event.result) {
                            console.log('\n🎊 JOB COMPLETED - RAW RESPONSE (SSE) 🎊');
                            console.log('Result from SSE:', JSON.stringify(event.result, null, 2));
                            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

                            try {
                                // Transform API response to app format
                                const transformedResult = transformApiResponse(event.result, imageUri, jobId);
                                
                                set({
                                    currentScan: transformedResult,
                                    isAnalyzing: false,
                                    isScanning: false,
                                    progress: 100,
                                });
                            } catch (error) {
                                console.error('❌ TRANSFORM ERROR (SSE):', error);
                                logger.error('Failed to transform SSE result', { error });
                                set({
                                    error: 'Failed to process scan result',
                                    isAnalyzing: false,
                                    isScanning: false,
                                    progress: 0,
                                });
                            }
                        }
                        break;

                    case 'job_failed':
                        logger.error('Job failed via SSE', { error: event.error });
                        state.disconnectSSE();
                        set({
                            error: event.error || 'Analysis failed',
                            isAnalyzing: false,
                            isScanning: false,
                            progress: 0,
                        });
                        break;
                }
            },
            onError: (error) => {
                logger.error('SSE error, falling back to polling', { error });
                get().disconnectSSE();
                get().startPolling(jobId, imageUri);
            },
            onOpen: () => {
                logger.info('SSE connection opened');
            },
        });

        set({ sseConnection: eventSource });
    },

    startPolling: (jobId: string, imageUri: string) => {
        logger.info('Starting polling', { jobId });

        pollingService.start({
            jobId,
            onUpdate: (data) => {
                // Handle stage updates from polling
                if (data.currentStage) {
                    get().updateStage(data.currentStage as ScanStage, data.stages);
                }
            },
            onComplete: (result) => {
                logger.info('Job completed via polling');
                pollingService.stop();

                console.log('\n🎊 JOB COMPLETED - RAW RESPONSE 🎊');
                console.log('Result from polling:', JSON.stringify(result, null, 2));
                console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

                try {
                    // Transform API response to app format
                    const transformedResult = transformApiResponse(result, imageUri, jobId);
                    
                    set({
                        currentScan: transformedResult,
                        isAnalyzing: false,
                        isScanning: false,
                        progress: 100,
                    });
                } catch (error) {
                    console.error('❌ TRANSFORM ERROR:', error);
                    logger.error('Failed to transform result', { error });
                    set({
                        error: 'Failed to process scan result',
                        isAnalyzing: false,
                        isScanning: false,
                        progress: 0,
                    });
                }
            },
            onError: (error) => {
                logger.error('Polling error', { error });
                pollingService.stop();
                set({
                    error,
                    isAnalyzing: false,
                    isScanning: false,
                    progress: 0,
                });
            },
        });
    },

    disconnectSSE: () => {
        const { sseConnection } = get();
        if (sseConnection) {
            closeSSEConnection(sseConnection);
            set({ sseConnection: null });
        }
    },

    saveScanResult: async (result: FoodScanResult | MenuScanResult) => {
        logger.info('Saving scan result', { id: result.id });

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
        get().disconnectSSE();
        pollingService.stop();
        set({
            currentScan: null,
            isScanning: false,
            isAnalyzing: false,
            error: null,
            currentStage: null,
            progress: 0,
            stageData: {},
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
