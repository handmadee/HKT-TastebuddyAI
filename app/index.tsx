/**
 * App Index / Entry Point
 * 
 * Initial screen with auth check and navigation
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../src/shared/stores/authStore';
import { useTranslation } from '../src/shared/hooks/useTranslation';
import { Screen } from '../src/shared/components/layout/Screen';
import { Loading } from '../src/shared/components/feedback/Loading';
import { BaseButton } from '../src/shared/components/base/BaseButton';
import { colors, typography, spacing } from '../src/theme';

export default function Index() {
    const router = useRouter();
    const { t } = useTranslation();
    const { isAuthenticated, isLoading } = useAuthStore();

    // Auto-navigate based on auth state
    React.useEffect(() => {
        if (!isLoading) {
            if (isAuthenticated) {
                router.replace('/(main)/(tabs)');
            } else {
                router.replace('/(auth)/welcome');
            }
        }
    }, [isLoading, isAuthenticated]);

    if (isLoading) {
        return <Loading message={t('common.loading')} />;
    }

    return (
        <Screen safeArea padding>
            <View style={styles.container}>
                <Text style={styles.title}>{t('common.appName')}</Text>
                <Text style={styles.subtitle}>
                    AI-Powered Nutrition & Food Discovery
                </Text>

                <View style={styles.buttonContainer}>
                    <BaseButton
                        title={t('onboarding.getStarted')}
                        variant="primary"
                        size="large"
                        fullWidth
                        onPress={() => {
                            // TODO: Navigate to onboarding or main app
                            console.log('Get started pressed');
                        }}
                    />
                </View>

                <Text style={styles.version}>Version 1.0.0</Text>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
    },
    title: {
        ...typography.styles.h1,
        color: colors.primary,
        textAlign: 'center',
        marginBottom: spacing.md,
    },
    subtitle: {
        ...typography.styles.bodyRegular,
        color: colors.textSecondary,
        textAlign: 'center',
        marginBottom: spacing.xxxl,
    },
    buttonContainer: {
        width: '100%',
        marginTop: spacing.xxxl,
    },
    version: {
        ...typography.styles.caption,
        color: colors.textDisabled,
        marginTop: spacing.xl,
    },
});
