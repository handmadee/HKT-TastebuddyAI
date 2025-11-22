/**
 * SelectableCard Component
 *
 * Reusable card for selecting options in onboarding
 */

import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../../theme';

interface SelectableCardProps {
    title: string;
    subtitle?: string;
    icon?: React.ReactNode;
    selected: boolean;
    onPress: () => void;
    disabled?: boolean;
}

export const SelectableCard: React.FC<SelectableCardProps> = ({
    title,
    subtitle,
    icon,
    selected,
    onPress,
    disabled = false,
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                selected && styles.selected,
                disabled && styles.disabled,
            ]}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.7}
        >
            {icon && <View style={styles.iconContainer}>{icon}</View>}
            <View style={styles.content}>
                <Text
                    style={[
                        styles.title,
                        selected && styles.titleSelected,
                        disabled && styles.titleDisabled,
                    ]}
                >
                    {title}
                </Text>
                {subtitle && (
                    <Text style={[styles.subtitle, disabled && styles.subtitleDisabled]}>
                        {subtitle}
                    </Text>
                )}
            </View>
            <View
                style={[
                    styles.checkbox,
                    selected && styles.checkboxSelected,
                    disabled && styles.checkboxDisabled,
                ]}
            >
                {selected && <View style={styles.checkmark} />}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.card,
        borderWidth: 2,
        borderColor: colors.border,
        borderRadius: borderRadius.card,
        padding: spacing.md,
        marginBottom: spacing.md,
        ...shadows.card,
    },
    selected: {
        borderColor: colors.primary,
        backgroundColor: colors.backgroundMain,
    },
    disabled: {
        opacity: 0.5,
    },
    iconContainer: {
        marginRight: spacing.md,
    },
    content: {
        flex: 1,
    },
    title: {
        ...typography.styles.bodyMedium,
        color: colors.textPrimary,
        marginBottom: spacing.xs,
    },
    titleSelected: {
        color: colors.primary,
        fontWeight: '600',
    },
    titleDisabled: {
        color: colors.textDisabled,
    },
    subtitle: {
        ...typography.styles.bodySmall,
        color: colors.textSecondary,
    },
    subtitleDisabled: {
        color: colors.textDisabled,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: spacing.sm,
    },
    checkboxSelected: {
        borderColor: colors.primary,
        backgroundColor: colors.primary,
    },
    checkboxDisabled: {
        borderColor: colors.disabled,
    },
    checkmark: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: colors.backgroundWhite,
    },
});
