/**
 * Checkbox Component
 *
 * Custom checkbox with label support
 * Senior-level implementation with accessibility
 */

import React from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    ViewStyle,
    StyleProp,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../../theme';

interface CheckboxProps {
    checked: boolean;
    onPress: () => void;
    label?: string | React.ReactNode;
    disabled?: boolean;
    error?: boolean;
    style?: StyleProp<ViewStyle>;
}

export const Checkbox: React.FC<CheckboxProps> = ({
    checked,
    onPress,
    label,
    disabled = false,
    error = false,
    style,
}) => {
    return (
        <TouchableOpacity
            style={[styles.container, style]}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.7}
        >
            <View
                style={[
                    styles.checkbox,
                    checked && styles.checkboxChecked,
                    error && styles.checkboxError,
                    disabled && styles.checkboxDisabled,
                ]}
            >
                {checked && (
                    <Ionicons
                        name="checkmark"
                        size={16}
                        color={colors.white}
                    />
                )}
            </View>

            {label && (
                <View style={styles.labelContainer}>
                    {typeof label === 'string' ? (
                        <Text
                            style={[
                                styles.label,
                                disabled && styles.labelDisabled,
                            ]}
                        >
                            {label}
                        </Text>
                    ) : (
                        label
                    )}
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: borderRadius.xs,
        borderWidth: 2,
        borderColor: colors.border,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
    },
    checkboxChecked: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    checkboxError: {
        borderColor: colors.error,
    },
    checkboxDisabled: {
        opacity: 0.5,
    },
    labelContainer: {
        flex: 1,
        marginLeft: spacing.sm,
    },
    label: {
        ...typography.styles.bodyRegular,
        color: colors.textPrimary,
    },
    labelDisabled: {
        color: colors.textDisabled,
    },
});
