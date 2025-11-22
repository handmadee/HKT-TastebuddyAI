import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, typography } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';

export const LanguageSelector = () => {
    const { i18n, t } = useTranslation();

    const languages = [
        { code: 'en', label: 'English', flag: '🇺🇸' },
        { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
    ];

    const changeLanguage = (langCode: string) => {
        i18n.changeLanguage(langCode);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t('profile.language', 'Language')}</Text>
            <View style={styles.optionsContainer}>
                {languages.map((lang) => (
                    <TouchableOpacity
                        key={lang.code}
                        style={[
                            styles.option,
                            i18n.language === lang.code && styles.selectedOption,
                        ]}
                        onPress={() => changeLanguage(lang.code)}
                    >
                        <Text style={styles.flag}>{lang.flag}</Text>
                        <Text
                            style={[
                                styles.label,
                                i18n.language === lang.code && styles.selectedLabel,
                            ]}
                        >
                            {lang.label}
                        </Text>
                        {i18n.language === lang.code && (
                            <Ionicons
                                name="checkmark-circle"
                                size={20}
                                color={colors.primary}
                            />
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.xl,
        paddingHorizontal: spacing.lg,
    },
    title: {
        ...typography.styles.h4,
        color: colors.textPrimary,
        marginBottom: spacing.md,
    },
    optionsContainer: {
        backgroundColor: colors.backgroundWhite,
        borderRadius: 12,
        overflow: 'hidden',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    selectedOption: {
        backgroundColor: colors.primary + '10', // 10% opacity
    },
    flag: {
        fontSize: 24,
        marginRight: spacing.md,
    },
    label: {
        ...typography.styles.bodyRegular,
        color: colors.textPrimary,
        flex: 1,
    },
    selectedLabel: {
        color: colors.primary,
        fontWeight: typography.fontWeight.bold,
    },
});
