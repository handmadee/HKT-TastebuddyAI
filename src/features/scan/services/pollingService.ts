/**
 * Polling Service
 *
 * Provides fallback polling mechanism when SSE is not available.
 * Polls job status endpoint at regular intervals.
 */

import { apiClient } from '../../../shared/services/api/client';
import { API_ENDPOINTS } from '../../../shared/constants/api';
import { logger } from '../../../shared/services/logger/logger';

export interface PollingOptions {
    jobId: string;
    onUpdate: (data: any) => void;
    onComplete: (result: any) => void;
    onError: (error: string) => void;
    interval?: number; // milliseconds between polls
    timeout?: number; // max time to poll before giving up
}

export class PollingService {
    private intervalId: ReturnType<typeof setInterval> | null = null;
    private startTime: number = 0;
    private readonly DEFAULT_INTERVAL = 2000; // 2 seconds
    private readonly DEFAULT_TIMEOUT = 120000; // 2 minutes
    private consecutiveErrors: number = 0;
    private readonly MAX_CONSECUTIVE_ERRORS = 3;

    /**
     * Start polling for job updates
     *
     * @param options - Polling configuration
     */
    start(options: PollingOptions): void {
        const {
            jobId,
            onUpdate,
            onComplete,
            onError,
            interval = this.DEFAULT_INTERVAL,
            timeout = this.DEFAULT_TIMEOUT,
        } = options;

        logger.info('Starting polling service', { jobId, interval, timeout });

        this.startTime = Date.now();
        this.consecutiveErrors = 0; // Reset error counter

        // Clear any existing interval
        this.stop();

        // Start polling
        this.intervalId = setInterval(async () => {
            try {
                // Check timeout
                if (Date.now() - this.startTime > timeout) {
                    logger.warn('Polling timeout reached', { jobId });
                    this.stop();
                    onError('Analysis timeout. Please try again.');
                    return;
                }

                // Fetch job status
                const jobData = await apiClient.get<JobStatusResponse>(
                    API_ENDPOINTS.MENU.JOB_STATUS(jobId)
                );

                // Reset consecutive errors on successful request
                this.consecutiveErrors = 0;

                logger.info('Poll response', { jobId, status: jobData.status });

                // Handle job status
                switch (jobData.status) {
                    case 'processing':
                        // Update progress based on stages
                        if (jobData.stages) {
                            onUpdate({
                                type: 'stage_update',
                                stages: jobData.stages,
                                currentStage: jobData.currentStage,
                            });
                        }
                        break;

                    case 'completed':
                        logger.info('Job completed', { jobId });
                        this.stop();
                        onComplete(jobData.result);
                        break;

                    case 'failed':
                        // Ensure we have a proper error string
                        const errMsg = typeof jobData.error === 'string' && jobData.error.trim()
                            ? jobData.error
                            : 'Analysis failed. Please try again.';
                        
                        logger.error('Job failed', { jobId, error: errMsg });
                        
                        // Convert technical error to user-friendly Vietnamese message
                        const userFriendlyError = this.getErrorMessage(errMsg);
                        console.error('❌ JOB FAILED - Backend Error:', errMsg);
                        console.error('💬 User Message:', userFriendlyError);
                        
                        this.stop();
                        onError(userFriendlyError);
                        break;

                    case 'pending':
                        // Still waiting, continue polling
                        break;
                }
            } catch (error) {
                this.consecutiveErrors++;
                
                const errMsg = error && typeof error === 'object' && 'message' in error ? (error as any).message : String(error);
                const status = error && typeof error === 'object' && 'status' in error ? (error as any).status : null;
                
                logger.error('Polling error', { 
                    error: errMsg, 
                    jobId, 
                    status,
                    consecutiveErrors: this.consecutiveErrors 
                });

                // Check if it's a network/server error that might be temporary
                const isTemporaryError = status === 502 || status === 503 || status === 504;
                
                if (isTemporaryError && this.consecutiveErrors < this.MAX_CONSECUTIVE_ERRORS) {
                    // Don't stop polling yet, backend might be temporarily down
                    logger.warn('Temporary network error, will retry', { 
                        consecutiveErrors: this.consecutiveErrors,
                        maxErrors: this.MAX_CONSECUTIVE_ERRORS 
                    });
                    return; // Continue polling
                }

                // Too many consecutive errors or permanent error - stop polling
                logger.error('Too many errors or permanent error, stopping', { 
                    consecutiveErrors: this.consecutiveErrors 
                });
                this.stop();
                
                // Provide user-friendly error message
                let userMessage = errMsg;
                if (status === 502 || status === 503 || status === 504) {
                    userMessage = '🔧 Server đang bận hoặc bảo trì.\n\n' +
                                 'Vui lòng thử lại sau vài phút.';
                } else if (errMsg.includes('Network Error') || errMsg.includes('timeout')) {
                    userMessage = '📡 Lỗi kết nối mạng.\n\n' +
                                 'Vui lòng kiểm tra:\n' +
                                 '  • Kết nối internet\n' +
                                 '  • WiFi hoặc dữ liệu di động\n' +
                                 '  • Thử lại sau';
                } else if (status === 429) {
                    userMessage = '⏰ Bạn đã gửi quá nhiều yêu cầu.\n\n' +
                                 'Vui lòng đợi 1 phút rồi thử lại.';
                } else if (status === 401 || status === 403) {
                    userMessage = '🔒 Phiên đăng nhập hết hạn.\n\n' +
                                 'Vui lòng đăng nhập lại.';
                } else {
                    userMessage = `❌ Lỗi không xác định (${status || 'network'}).\n\n` +
                                 'Vui lòng thử lại sau.';
                }
                
                console.error('❌ POLLING STOPPED - Network Error:', errMsg);
                console.error('💬 User Message:', userMessage);
                
                onError(userMessage);
                return;
            }
        }, interval);
    }

    /**
     * Stop polling
     */
    stop(): void {
        if (this.intervalId) {
            logger.info('Stopping polling service');
            clearInterval(this.intervalId);
            this.intervalId = null;
            this.consecutiveErrors = 0; // Reset error counter
        }
    }

    /**
     * Check if currently polling
     *
     * @returns true if polling is active
     */
    isActive(): boolean {
        return this.intervalId !== null;
    }

    /**
     * Convert backend error to user-friendly Vietnamese message
     */
    private getErrorMessage(backendError: string): string {
        const errorLower = backendError.toLowerCase();

        // Validation errors
        if (errorLower.includes('validate') || errorLower.includes('validation')) {
            if (errorLower.includes('image content') || errorLower.includes('no food') || errorLower.includes('no menu')) {
                return '❌ Không thể phát hiện thực phẩm hoặc menu trong ảnh.\n\n' +
                       '📸 Vui lòng chụp lại ảnh với:\n' +
                       '  • Hình ảnh rõ nét, đủ sáng\n' +
                       '  • Hiển thị rõ món ăn hoặc menu\n' +
                       '  • Không bị mờ hoặc nghiêng';
            }
            return '❌ Ảnh không hợp lệ. Vui lòng chụp ảnh thực phẩm hoặc menu rõ ràng hơn.';
        }

        // Image quality errors
        if (errorLower.includes('quality') || errorLower.includes('blur') || errorLower.includes('low resolution')) {
            return '❌ Chất lượng ảnh quá thấp.\n\n' +
                   '📸 Vui lòng:\n' +
                   '  • Chụp ảnh rõ nét hơn\n' +
                   '  • Đảm bảo đủ ánh sáng\n' +
                   '  • Giữ camera ổn định';
        }

        // Extraction errors
        if (errorLower.includes('extract') || errorLower.includes('ocr')) {
            return '❌ Không thể đọc thông tin từ ảnh.\n\n' +
                   '📸 Vui lòng chụp lại với:\n' +
                   '  • Menu hoặc nhãn thực phẩm rõ ràng\n' +
                   '  • Chữ viết dễ đọc\n' +
                   '  • Không bị che khuất';
        }

        // Processing errors
        if (errorLower.includes('processing') || errorLower.includes('timeout')) {
            return '⏱️ Xử lý ảnh mất quá nhiều thời gian.\n\n' +
                   'Vui lòng thử lại với ảnh đơn giản hơn.';
        }

        // Generic errors
        if (errorLower.includes('failed') || errorLower.includes('error')) {
            return '❌ Không thể phân tích ảnh.\n\n' +
                   'Vui lòng thử lại hoặc chọn ảnh khác.';
        }

        // Return original if no match (fallback)
        return `❌ Lỗi: ${backendError}\n\nVui lòng thử lại.`;
    }
}

/**
 * Job status response interface
 * API returns job data directly in response.data
 */
interface JobStatusResponse {
    id: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    currentStage?: string;
    stages?: Record<string, any>;
    result?: any;
    error?: string;
    createdAt?: number;
    updatedAt?: number;
}

// Export singleton instance
export const pollingService = new PollingService();
