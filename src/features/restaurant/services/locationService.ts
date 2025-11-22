import { LocationPermission } from '../types';

const MOCK_LOCATION = {
    lat: 21.0285,
    lng: 105.8542,
    address: 'Hanoi Old Quarter, Vietnam',
};

export const locationService = {
    checkPermission: async (): Promise<LocationPermission> => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return {
            status: 'granted',
            coordinates: MOCK_LOCATION,
        };
    },

    getCurrentLocation: async (): Promise<{ lat: number; lng: number; address: string }> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return MOCK_LOCATION;
    },

    requestPermission: async (): Promise<LocationPermission> => {
        await new Promise(resolve => setTimeout(resolve, 800));
        return {
            status: 'granted',
            coordinates: MOCK_LOCATION,
        };
    },
};
