/**
 * API Type Definitions
 */

// Base response types
export interface ApiResponse<T = any> {
    success: boolean;
    data: T;
    message?: string;
}

export interface ApiError {
    success: false;
    error: {
        code: string;
        message: string;
        details?: any;
    };
}

export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

// Job response types (for async operations like food scan, menu translation)
export interface JobResponse {
    success: boolean;
    data: {
        jobId: string;
        status: 'pending' | 'processing' | 'completed' | 'failed';
        message?: string;
    };
}

export interface JobStatusResponse<T = any> {
    success: boolean;
    data: {
        jobId: string;
        status: 'pending' | 'processing' | 'completed' | 'failed';
        progress?: number;
        result?: T;
        error?: string;
    };
}

// Request config
export interface ApiRequestConfig {
    headers?: Record<string, string>;
    params?: Record<string, any>;
    timeout?: number;
}
