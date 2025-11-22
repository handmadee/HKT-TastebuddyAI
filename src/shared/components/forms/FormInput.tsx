/**
 * FormInput Component
 *
 * Enhanced text input with label, error state, and icons
 * Senior-level implementation with full TypeScript support
 */

import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TextInputProps,
    TouchableOpacity,
    StyleProp,
    ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../../theme';

export interface FormInputProps extends TextInputProps {
    label?: string;
    error?: string;
    leftIcon?: keyof typeof Ionicons.glyphMap;
    rightIcon?: keyof typeof Ionicons.glyphMap;
    onRightIconPress?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    required?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
    label,
    error,
    leftIcon,
    rightIcon,
    onRightIconPress,
    containerStyle,
    required = false,
    style,
    ...textInputProps
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const hasError = !!error;

    return (
        <View style={[styles.container, containerStyle]}>
            {label && (
                <Text style={styles.label}>
                    {label}
                    {required && <Text style={styles.required}> *</Text>}
                </Text>
            )}

            <View
                style={[
                    styles.inputContainer,
                    isFocused && styles.inputContainerFocused,
                    hasError && styles.inputContainerError,
                ]}
            >
                {leftIcon && (
                    <Ionicons
                        name={leftIcon}
                        size={20}
                        color={hasError ? colors.error : colors.textSecondary}
                        style={styles.leftIcon}
                    />
                )}

                <TextInput
                    {...textInputProps}
                    style={[styles.input, style]}
                    placeholderTextColor={colors.textPlaceholder}
                    onFocus={(e) => {
                        setIsFocused(true);
                        textInputProps.onFocus?.(e);
                    }}
                    onBlur={(e) => {
                        setIsFocused(false);
                        textInputProps.onBlur?.(e);
                    }}
                />

                {rightIcon && (
                    <TouchableOpacity
                        onPress={onRightIconPress}
                        disabled={!onRightIconPress}
                        style={styles.rightIconButton}
                    >
                        <Ionicons
                            name={rightIcon}
                            size={20}
                            color={hasError ? colors.error : colors.textSecondary}
                        />
                    </TouchableOpacity>
                )}
            </View>

            {hasError && (
                <View style={styles.errorContainer}>
                    <Ionicons
                        name="alert-circle"
                        size={14}
                        color={colors.error}
                        style={styles.errorIcon}
                    />
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.md,
    },
    label: {
        ...typography.styles.bodyMedium,
        color: colors.textPrimary,
        marginBottom: spacing.xs,
    },
    required: {
        color: colors.error,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.inputBackground,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: borderRadius.md,
        paddingHorizontal: spacing.md,
        minHeight: 48,
    },
    inputContainerFocused: {
        borderColor: colors.primary,
        borderWidth: 2,
    },
    inputContainerError: {
        borderColor: colors.error,
    },
    leftIcon: {
        marginRight: spacing.sm,
    },
    input: {
        flex: 1,
        ...typography.styles.bodyRegular,
        color: colors.textPrimary,
        paddingVertical: spacing.sm,
    },
    rightIconButton: {
        padding: spacing.xs,
        marginLeft: spacing.sm,
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: spacing.xs,
    },
    errorIcon: {
        marginRight: 2,
    },
    errorText: {
        ...typography.styles.caption,
        color: colors.error,
        flex: 1,
    },
});
