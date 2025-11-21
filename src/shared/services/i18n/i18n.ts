/**
 * i18n Configuration
 * 
 * Multi-language support with i18next
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { asyncStorage } from '../storage/asyncStorage';
import { ASYNC_STORAGE_KEYS } from '../../constants/storage';

// Import translations
import en from './locales/en.json';
import vi from './locales/vi.json';

const LANGUAGE_DETECTOR = {
    type: 'languageDetector' as const,
    async: true,
    detect: async (callback: (lng: string) => void) => {
        const savedLanguage = await asyncStorage.getItem(ASYNC_STORAGE_KEYS.LANGUAGE);
        callback(savedLanguage || 'en');
    },
    init: () => { },
    cacheUserLanguage: async (lng: string) => {
        await asyncStorage.setItem(ASYNC_STORAGE_KEYS.LANGUAGE, lng);
    },
};

i18n
    .use(LANGUAGE_DETECTOR)
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        resources: {
            en: { translation: en },
            vi: { translation: vi },
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        },
    });

export default i18n;
