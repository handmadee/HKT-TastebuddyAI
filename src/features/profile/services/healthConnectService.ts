import { HealthConnectStatus } from '../types';

const MOCK_STATUS: HealthConnectStatus = {
    isConnected: false,
    permissions: {
        steps: false,
        activeEnergy: false,
        dietaryEnergy: false,
    },
};

export const healthConnectService = {
    getStatus: async (): Promise<HealthConnectStatus> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return MOCK_STATUS;
    },

    connect: async (): Promise<HealthConnectStatus> => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return {
            isConnected: true,
            lastSynced: new Date().toISOString(),
            permissions: {
                steps: true,
                activeEnergy: true,
                dietaryEnergy: true,
            },
        };
    },

    disconnect: async (): Promise<HealthConnectStatus> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
            isConnected: false,
            permissions: {
                steps: false,
                activeEnergy: false,
                dietaryEnergy: false,
            },
        };
    },

    sync: async (): Promise<void> => {
        await new Promise(resolve => setTimeout(resolve, 1500));
    },
};
