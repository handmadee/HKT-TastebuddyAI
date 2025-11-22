export const settingsService = {
    exportData: async (): Promise<string> => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        return 'https://example.com/data-export.json';
    },

    deleteAccount: async (): Promise<void> => {
        await new Promise(resolve => setTimeout(resolve, 2000));
    },

    signOut: async (): Promise<void> => {
        await new Promise(resolve => setTimeout(resolve, 500));
    },
};
