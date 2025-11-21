/**
 * BaseButton Component
 * 
 * Production-ready button component with multiple variants
 */

import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacityProps,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { colors, typography, spacing, shadows, borderRadius } from '../../../theme';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface BaseButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
}

export const BaseButton: React.FC<BaseButtonProps> = ({
    title,
    variant = 'primary',
    size = 'medium',
    loading = false,
    disabled = false,
    fullWidth = false,
    icon,
    iconPosition = 'left',
    style,
    ...rest
}) => {
    const isDisabled = disabled || loading;

    const buttonStyles: ViewStyle[] = [
        styles.base,
        styles[variant],
        styles[`size_${size}`],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style as ViewStyle,
    ];

    const textStyles: TextStyle[] = [
        styles.text,
        styles[`text_${variant}`],
        styles[`textSize_${size}`],
        isDisabled && styles.textDisabled,
    ];

    return (
        <TouchableOpacity
            style={buttonStyles}
            disabled={isDisabled}
            activeOpacity={0.7}
            {...rest}
        >
            {loading ? (
                <ActivityIndicator
                    color={variant === 'primary' || variant === 'accent' ? colors.backgroundWhite : colors.primary}
                    size="small"
                />
            ) : (
                <>
                    {icon && iconPosition === 'left' && <>{icon}</>}
                    <Text style={textStyles}>{title}</Text>
                    {icon && iconPosition === 'right' && <>{icon}</>}
                </>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: borderRadius.button,
        gap: spacing.sm,
        ...shadows.button,
    },
    primary: {
        backgroundColor: colors.button.backgroundDefault,
    },
    secondary: {
        backgroundColor: colors.button.backgroundSecondary,
    },
    accent: {
        backgroundColor: colors.button.backgroundAccent,
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.primary,
    },
    ghost: {
        backgroundColor: 'transparent',
    },
    disabled: {
        backgroundColor: colors.button.backgroundDisabled,
        opacity: 0.6,
    },
    size_small: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        minHeight: 36,
    },
    size_medium: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        minHeight: 44,
    },
    size_large: {
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.lg,
        minHeight: 52,
    },
    fullWidth: {
        width: '100%',
    },
    text: {
        ...typography.styles.button,
    },
    text_primary: {
        color: colors.button.textDefault,
    },
    text_secondary: {
        color: colors.button.textSecondary,
    },
    text_accent: {
        color: colors.button.textAccent,
    },
    text_outline: {
        color: colors.primary,
    },
    text_ghost: {
        color: colors.primary,
    },
    textDisabled: {
        color: colors.button.textDisabled,
    },
    textSize_small: {
        fontSize: typography.fontSize.small,
    },
    textSize_medium: {
        fontSize: typography.fontSize.body,
    },
    textSize_large: {
        fontSize: typography.fontSize.h4,
    },
});
