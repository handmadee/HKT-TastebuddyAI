/**
 * QuickActionButton Component
 *
 * Reusable button component for quick action shortcuts
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '@/theme';

type QuickActionVariant = 'primary' | 'secondary';

interface QuickActionButtonProps {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    onPress: () => void;
    variant?: QuickActionVariant;
}

export const QuickActionButton: React.FC<QuickActionButtonProps> = ({
    icon,
    label,
    onPress,
    variant = 'secondary',
}) => {
    const isPrimary = variant === 'primary';

    return (
        <TouchableOpacity
            style={[
                styles.container,
                isPrimary ? styles.primaryContainer : styles.secondaryContainer,
            ]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View
                style={[
                    styles.iconContainer,
                    isPrimary && styles.primaryIconContainer,
                ]}
            >
                <Ionicons
                    name={icon}
                    size={28}
                    color={isPrimary ? colors.white : colors.textPrimary}
                />
            </View>
            <Text
                style={[
                    styles.label,
                    isPrimary && styles.primaryLabel,
                ]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.lg,
        borderRadius: borderRadius.card,
        ...shadows.small,
    },
    primaryContainer: {
        backgroundColor: colors.primary,
    },
    secondaryContainer: {
        backgroundColor: colors.card,
    },
    iconContainer: {
        marginBottom: spacing.sm,
    },
    primaryIconContainer: {
        // Additional styling for primary variant if needed
    },
    label: {
        ...typography.styles.bodySmall,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.medium,
        textAlign: 'center',
    },
    primaryLabel: {
        color: colors.white,
    },
});
