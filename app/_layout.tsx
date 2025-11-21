/**
 * Root Layout
 * 
 * Main app layout with providers
 */

import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import '../src/shared/services/i18n/i18n';
import { useAuthStore } from '../src/shared/stores/authStore';
import { useThemeStore } from '../src/shared/stores/themeStore';
import { colors } from '../src/theme';

export default function RootLayout() {
    const hydrateAuth = useAuthStore((state) => state.hydrateAuth);
    const hydrateTheme = useThemeStore((state) => state.hydrateTheme);
    const themeMode = useThemeStore((state) => state.mode);

    useEffect(() => {
        // Hydrate stores on app start
        hydrateAuth();
        hydrateTheme();
    }, []);

    const paperTheme = {
        colors: {
            primary: colors.primary,
            secondary: colors.secondary,
            accent: colors.accent,
            background: colors.backgroundWhite,
            surface: colors.card,
            error: colors.error,
            text: colors.textPrimary,
            onSurface: colors.textSecondary,
            disabled: colors.disabled,
            placeholder: colors.textPlaceholder,
            backdrop: 'rgba(0, 0, 0, 0.5)',
            notification: colors.primary,
        },
        dark: themeMode === 'dark',
    };

    return (
        <SafeAreaProvider>
            <PaperProvider theme={paperTheme}>
                <StatusBar style={themeMode === 'dark' ? 'light' : 'dark'} />
                <Stack
                    screenOptions={{
                        headerShown: false,
                        contentStyle: { backgroundColor: colors.backgroundWhite },
                    }}
                />
            </PaperProvider>
        </SafeAreaProvider>
    );
}
