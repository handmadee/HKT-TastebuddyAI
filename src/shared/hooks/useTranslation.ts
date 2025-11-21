/**
 * useTranslation Hook
 * 
 * Wrapper around react-i18next for consistent usage
 */

import { useTranslation as useI18nextTranslation } from 'react-i18next';

export const useTranslation = () => {
    const { t, i18n } = useI18nextTranslation();

    const changeLanguage = async (lng: string) => {
        await i18n.changeLanguage(lng);
    };

    return {
        t,
        i18n,
        changeLanguage,
        currentLanguage: i18n.language,
    };
};
