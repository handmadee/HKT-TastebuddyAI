import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../../../shared/components/layout/Screen';
import { colors, spacing, typography, borderRadius } from '../../../theme';

interface PermissionDeniedScreenProps {
    onRequestPermission: () => void;
    onOpenSettings: () => void;
}

/**
 * Permission Denied Screen - Empty state for camera permission
 * Shows clear message and action buttons
 */
export const PermissionDeniedScreen: React.FC<PermissionDeniedScreenProps> = ({
    onRequestPermission,
    onOpenSettings,
}) => {
    return (
        <Screen safeArea backgroundColor={colors.backgroundMain}>
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <Ionicons name="camera-outline" size={80} color={colors.textSecondary} />
                </View>

                <Text style={styles.title}>Camera Access Required</Text>

                <Text style={styles.message}>
                    TastebuddyAI needs access to your camera to scan food and analyze nutrition information.
                </Text>

                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={onRequestPermission}
                    accessibilityLabel="Grant camera permission"
                    accessibilityRole="button"
                >
                    <Text style={styles.primaryButtonText}>Grant Permission</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={onOpenSettings}
                    accessibilityLabel="Open settings"
                    accessibilityRole="button"
                    accessibilityHint="Opens system settings to enable camera access"
                >
                    <Text style={styles.secondaryButtonText}>Open Settings</Text>
                </TouchableOpacity>
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
    },
    iconContainer: {
        marginBottom: spacing.lg,
    },
    title: {
        ...typography.styles.h2,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.bold,
        marginBottom: spacing.md,
        textAlign: 'center',
    },
    message: {
        ...typography.styles.bodyRegular,
        color: colors.textSecondary,
        textAlign: 'center',
        marginBottom: spacing.xxl,
        lineHeight: 24,
    },
    primaryButton: {
        backgroundColor: colors.primary,
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.button,
        minWidth: 200,
        minHeight: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    primaryButtonText: {
        ...typography.styles.bodyMedium,
        color: colors.backgroundWhite,
        fontWeight: typography.fontWeight.semibold,
    },
    secondaryButton: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        minHeight: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondaryButtonText: {
        ...typography.styles.bodyRegular,
        color: colors.primary,
        fontWeight: typography.fontWeight.medium,
    },
});
