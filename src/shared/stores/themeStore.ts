/**
 * Theme Store - Zustand
 * 
 * Global theme state management (light/dark mode)
 */

import { create } from 'zustand';
import { asyncStorage } from '../services/storage/asyncStorage';
import { ASYNC_STORAGE_KEYS } from '../constants/storage';
import { ThemeMode } from '../types/common.types';

interface ThemeState {
    mode: ThemeMode;

    // Actions
    setTheme: (mode: ThemeMode) => Promise<void>;
    toggleTheme: () => Promise<void>;
    hydrateTheme: () => Promise<void>;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
    mode: 'light',

    setTheme: async (mode) => {
        await asyncStorage.setItem(ASYNC_STORAGE_KEYS.THEME, mode);
        set({ mode });
    },

    toggleTheme: async () => {
        const newMode = get().mode === 'light' ? 'dark' : 'light';
        await asyncStorage.setItem(ASYNC_STORAGE_KEYS.THEME, newMode);
        set({ mode: newMode });
    },

    hydrateTheme: async () => {
        const savedTheme = await asyncStorage.getItem(ASYNC_STORAGE_KEYS.THEME);
        if (savedTheme === 'light' || savedTheme === 'dark') {
            set({ mode: savedTheme });
        }
    },
}));
