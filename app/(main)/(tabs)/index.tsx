/**
 * Home Tab Screen
 *
 * Main home screen placeholder
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Screen } from '../../../src/shared/components/layout/Screen';
import { BaseButton } from '../../../src/shared/components/base/BaseButton';
import { useAuthStore } from '../../../src/shared/stores/authStore';
import { useRouter } from 'expo-router';
import { colors, typography, spacing } from '../../../src/theme';

export default function HomeScreen() {
    const router = useRouter();
    const { user, signOut } = useAuthStore();

    const handleSignOut = async () => {
        await signOut();
        router.replace('/(auth)/welcome');
    };

    return (
        <Screen safeArea padding>
            <View style={styles.container}>
                <Text style={styles.title}>Welcome to TastebuddyAI!</Text>
                <Text style={styles.subtitle}>
                    Hello, {user?.fullName || 'User'}
                </Text>
                <Text style={styles.text}>
                    Authentication flow is working! ✅
                </Text>

                <BaseButton
                    title="Sign Out"
                    variant="secondary"
                    onPress={handleSignOut}
                    style={styles.button}
                />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.xl,
    },
    title: {
        ...typography.styles.h1,
        color: colors.primary,
        marginBottom: spacing.md,
        textAlign: 'center',
    },
    subtitle: {
        ...typography.styles.h3,
        color: colors.textPrimary,
        marginBottom: spacing.lg,
        textAlign: 'center',
    },
    text: {
        ...typography.styles.bodyRegular,
        color: colors.textSecondary,
        marginBottom: spacing.xxl,
        textAlign: 'center',
    },
    button: {
        minWidth: 200,
    },
});
