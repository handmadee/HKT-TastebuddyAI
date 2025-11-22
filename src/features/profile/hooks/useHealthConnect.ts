import { useState, useEffect, useCallback } from 'react';
import { HealthConnectStatus } from '../types';
import { healthConnectService } from '../services/healthConnectService';

export const useHealthConnect = () => {
    const [status, setStatus] = useState<HealthConnectStatus | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isToggling, setIsToggling] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchStatus = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await healthConnectService.getStatus();
            setStatus(data);
            setError(null);
        } catch (err) {
            setError('Failed to load Health Connect status');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const connect = async () => {
        try {
            setIsToggling(true);
            const data = await healthConnectService.connect();
            setStatus(data);
        } catch (err) {
            setError('Failed to connect');
            console.error(err);
        } finally {
            setIsToggling(false);
        }
    };

    const disconnect = async () => {
        try {
            setIsToggling(true);
            const data = await healthConnectService.disconnect();
            setStatus(data);
        } catch (err) {
            setError('Failed to disconnect');
            console.error(err);
        } finally {
            setIsToggling(false);
        }
    };

    const sync = async () => {
        try {
            setIsToggling(true);
            await healthConnectService.sync();
            // Refresh status after sync
            const data = await healthConnectService.getStatus();
            setStatus(data);
        } catch (err) {
            setError('Failed to sync');
            console.error(err);
        } finally {
            setIsToggling(false);
        }
    };

    useEffect(() => {
        fetchStatus();
    }, [fetchStatus]);

    return {
        status,
        isLoading,
        isToggling,
        error,
        connect,
        disconnect,
        sync,
    };
};
