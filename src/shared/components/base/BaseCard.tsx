/**
 * BaseCard Component
 * 
 * Reusable card component for consistent styling
 */

import React from 'react';
import { View, StyleSheet, ViewProps, ViewStyle } from 'react-native';
import { colors, spacing, shadows, borderRadius } from '../../../theme';

type CardVariant = 'default' | 'outlined' | 'elevated';
type CardPadding = 'none' | 'small' | 'medium' | 'large';

interface BaseCardProps extends ViewProps {
    variant?: CardVariant;
    padding?: CardPadding;
    children: React.ReactNode;
}

export const BaseCard: React.FC<BaseCardProps> = ({
    variant = 'elevated',
    padding = 'medium',
    children,
    style,
    ...rest
}) => {
    const cardStyles: ViewStyle[] = [
        styles.base,
        styles[variant],
        styles[`padding_${padding}`],
        style as ViewStyle,
    ];

    return (
        <View style={cardStyles} {...rest}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    base: {
        backgroundColor: colors.card,
        borderRadius: borderRadius.card,
        overflow: 'hidden',
    },
    default: {
        // No shadow, no border
    },
    outlined: {
        borderWidth: 1,
        borderColor: colors.border,
    },
    elevated: {
        ...shadows.normal,
    },
    padding_none: {
        padding: 0,
    },
    padding_small: {
        padding: spacing.md,
    },
    padding_medium: {
        padding: spacing.lg,
    },
    padding_large: {
        padding: spacing.xl,
    },
});
