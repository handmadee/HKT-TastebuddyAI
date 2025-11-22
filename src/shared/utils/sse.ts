/**
 * SSE (Server-Sent Events) Utility
 *
 * Provides a TypeScript-safe wrapper around EventSource for real-time updates.
 * Automatically handles authentication, connection errors, and reconnection.
 */

import { secureStorage } from '../services/storage/secureStorage';
import { logger } from '../services/logger/logger';

export interface SSEEvent {
    type: 'stage_update' | 'job_completed' | 'job_failed';
    stage?: string;
    status?: string;
    data?: any;
    result?: any;
    error?: string;
    timestamp?: number;
}

export interface SSEOptions {
    onEvent: (event: SSEEvent) => void;
    onError?: (error: Error) => void;
    onOpen?: () => void;
    onClose?: () => void;
}

/**
 * Create SSE connection to stream endpoint
 *
 * @param url - SSE endpoint URL (relative or absolute)
 * @param options - Event callbacks
 * @returns EventSource instance
 */
export const createSSEConnection = async (
    url: string,
    options: SSEOptions
): Promise<EventSource> => {
    const { onEvent, onError, onOpen, onClose } = options;

    try {
        // Get auth token
        const { accessToken } = await secureStorage.getTokens();

        // Note: React Native's EventSource doesn't support custom headers directly
        // We need to append token as query parameter for auth
        const authUrl = accessToken
            ? `${url}${url.includes('?') ? '&' : '?'}token=${accessToken}`
            : url;

        logger.info('Creating SSE connection', { url });

        // Create EventSource
        const eventSource = new EventSource(authUrl);

        // Handle connection open
        eventSource.addEventListener('open', () => {
            logger.info('SSE connection opened');
            onOpen?.();
        });

        // Handle messages
        eventSource.addEventListener('message', (event: MessageEvent) => {
            try {
                const data = JSON.parse(event.data);
                logger.info('SSE event received', { type: data.type, stage: data.stage });
                onEvent(data);
            } catch (error) {
                logger.error('Failed to parse SSE event', { error, data: event.data });
            }
        });

        // Handle errors
        eventSource.addEventListener('error', (error: Event) => {
            logger.error('SSE connection error', { error });

            // Create error object
            const errorObj = new Error('SSE connection failed');
            onError?.(errorObj);

            // Note: EventSource will automatically attempt to reconnect
            // unless we manually close it
        });

        return eventSource;
    } catch (error) {
        logger.error('Failed to create SSE connection', { error });
        throw error;
    }
};

/**
 * Close SSE connection
 *
 * @param eventSource - EventSource instance to close
 */
export const closeSSEConnection = (eventSource: EventSource | null) => {
    if (eventSource) {
        logger.info('Closing SSE connection');
        eventSource.close();
    }
};

/**
 * Check if SSE is supported in current environment
 *
 * @returns true if SSE is supported
 */
export const isSSESupported = (): boolean => {
    return typeof EventSource !== 'undefined';
};
