/**
 * Logger Service
 * 
 * Centralized logging with configurable levels
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LoggerConfig {
    enabled: boolean;
    level: LogLevel;
    showTimestamp: boolean;
    showColors: boolean;
}

class Logger {
    private config: LoggerConfig = {
        enabled: __DEV__, // Only log in development
        level: 'debug',
        showTimestamp: true,
        showColors: true,
    };

    private levels: Record<LogLevel, number> = {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3,
    };

    private colors = {
        debug: '\x1b[36m', // Cyan
        info: '\x1b[32m',  // Green
        warn: '\x1b[33m',  // Yellow
        error: '\x1b[31m', // Red
        reset: '\x1b[0m',
    };

    configure(config: Partial<LoggerConfig>) {
        this.config = { ...this.config, ...config };
    }

    private shouldLog(level: LogLevel): boolean {
        if (!this.config.enabled) return false;
        return this.levels[level] >= this.levels[this.config.level];
    }

    private format(level: LogLevel, message: string, data?: any): string {
        const parts: string[] = [];

        if (this.config.showTimestamp) {
            const timestamp = new Date().toISOString();
            parts.push(`[${timestamp}]`);
        }

        const levelText = `[${level.toUpperCase()}]`;
        if (this.config.showColors) {
            parts.push(`${this.colors[level]}${levelText}${this.colors.reset}`);
        } else {
            parts.push(levelText);
        }

        parts.push(message);

        if (data !== undefined) {
            parts.push(JSON.stringify(data, null, 2));
        }

        return parts.join(' ');
    }

    debug(message: string, data?: any) {
        if (this.shouldLog('debug')) {
            console.log(this.format('debug', message, data));
        }
    }

    info(message: string, data?: any) {
        if (this.shouldLog('info')) {
            console.log(this.format('info', message, data));
        }
    }

    warn(message: string, data?: any) {
        if (this.shouldLog('warn')) {
            console.warn(this.format('warn', message, data));
        }
    }

    error(message: string, error?: any) {
        if (this.shouldLog('error')) {
            const errorData = error instanceof Error
                ? { message: error.message, stack: error.stack }
                : error;
            console.error(this.format('error', message, errorData));
        }
    }

    // API logging
    logApiRequest(method: string, url: string, data?: any) {
        this.info(`API Request: ${method} ${url}`, data);
    }

    logApiResponse(method: string, url: string, status: number, data?: any) {
        const message = `API Response: ${method} ${url} - ${status}`;
        if (status >= 400) {
            this.error(message, data);
        } else {
            this.info(message, data);
        }
    }

    // Navigation logging
    logNavigation(from: string, to: string) {
        this.debug(`Navigation: ${from} -> ${to}`);
    }

    // State logging
    logStateChange(storeName: string, action: string, state?: any) {
        this.debug(`State Change [${storeName}]: ${action}`, state);
    }
}

// Export singleton instance
export const logger = new Logger();

// Configure in development
if (__DEV__) {
    logger.configure({
        enabled: true,
        level: 'debug',
        showTimestamp: true,
        showColors: true,
    });
}

// Configure for production (via environment variable)
if (process.env.EXPO_PUBLIC_ENABLE_LOGGING === 'true') {
    logger.configure({
        enabled: true,
        level: 'warn', // Only warnings and errors in production
        showTimestamp: true,
        showColors: false,
    });
}
