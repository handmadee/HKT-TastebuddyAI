/**
 * BaseInput Component
 * 
 * Production-ready input component with validation states
 */

import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TextInputProps,
    ViewStyle,
    TouchableOpacity,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../../theme';

interface BaseInputProps extends TextInputProps {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    onRightIconPress?: () => void;
    containerStyle?: ViewStyle;
}

export const BaseInput: React.FC<BaseInputProps> = ({
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    onRightIconPress,
    containerStyle,
    style,
    ...rest
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasError = !!error;

    const inputContainerStyle = [
        styles.inputContainer,
        isFocused && styles.inputContainerFocused,
        hasError && styles.inputContainerError,
    ];

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View style={inputContainerStyle}>
                {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

                <TextInput
                    style={[styles.input, style]}
                    placeholderTextColor={colors.input.placeholder}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...rest}
                />

                {rightIcon && (
                    onRightIconPress ? (
                        <TouchableOpacity
                            onPress={onRightIconPress}
                            style={styles.rightIcon}
                        >
                            {rightIcon}
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.rightIcon}>{rightIcon}</View>
                    )
                )}
            </View>

            {(error || helperText) && (
                <Text style={[styles.helperText, hasError && styles.errorText]}>
                    {error || helperText}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    label: {
        ...typography.styles.bodyMedium,
        color: colors.textPrimary,
        marginBottom: spacing.sm,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.input.background,
        borderWidth: 1,
        borderColor: colors.input.border,
        borderRadius: borderRadius.input,
        paddingHorizontal: spacing.md,
        minHeight: 48,
    },
    inputContainerFocused: {
        borderColor: colors.input.focus,
        borderWidth: 2,
    },
    inputContainerError: {
        borderColor: colors.input.error,
    },
    input: {
        flex: 1,
        ...typography.styles.bodyRegular,
        color: colors.input.text,
        paddingVertical: spacing.md,
    },
    leftIcon: {
        marginRight: spacing.sm,
    },
    rightIcon: {
        marginLeft: spacing.sm,
    },
    helperText: {
        ...typography.styles.bodySmall,
        color: colors.textSecondary,
        marginTop: spacing.xs,
        marginLeft: spacing.xs,
    },
    errorText: {
        color: colors.input.error,
    },
});
