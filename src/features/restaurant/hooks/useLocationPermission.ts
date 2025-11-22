import { useState, useEffect, useCallback } from 'react';
import { LocationPermission } from '../types';
import { locationService } from '../services/locationService';

export const useLocationPermission = () => {
    const [permission, setPermission] = useState<LocationPermission | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const checkPermission = useCallback(async () => {
        try {
            setIsLoading(true);
            const perm = await locationService.checkPermission();
            setPermission(perm);
        } catch (error) {
            console.error('Failed to check location permission', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const requestPermission = async () => {
        try {
            const perm = await locationService.requestPermission();
            setPermission(perm);
        } catch (error) {
            console.error('Failed to request location permission', error);
        }
    };

    useEffect(() => {
        checkPermission();
    }, [checkPermission]);

    return {
        permission,
        isLoading,
        requestPermission,
        refetch: checkPermission,
    };
};
