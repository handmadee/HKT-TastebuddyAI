/**
 * PasswordInput Component
 *
 * Password input with show/hide toggle and strength indicator
 * Senior-level implementation with security best practices
 */

import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FormInput, FormInputProps } from './FormInput';
import { colors, typography, spacing } from '../../../theme';

interface PasswordInputProps extends Omit<FormInputProps, 'secureTextEntry' | 'rightIcon' | 'onRightIconPress'> {
    showStrengthIndicator?: boolean;
}

type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong';

interface PasswordStrengthResult {
    strength: PasswordStrength;
    label: string;
    color: string;
    progress: number;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
    showStrengthIndicator = false,
    value,
    ...props
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const passwordStrength = useMemo((): PasswordStrengthResult => {
        if (!value || !showStrengthIndicator) {
            return {
                strength: 'weak',
                label: '',
                color: colors.textDisabled,
                progress: 0,
            };
        }

        let score = 0;
        const password = value as string;

        // Length check
        if (password.length >= 8) score += 25;
        if (password.length >= 12) score += 15;

        // Contains lowercase
        if (/[a-z]/.test(password)) score += 15;

        // Contains uppercase
        if (/[A-Z]/.test(password)) score += 15;

        // Contains numbers
        if (/[0-9]/.test(password)) score += 15;

        // Contains special characters
        if (/[^A-Za-z0-9]/.test(password)) score += 15;

        // Determine strength
        if (score < 40) {
            return {
                strength: 'weak',
                label: 'Weak',
                color: colors.error,
                progress: 0.25,
            };
        } else if (score < 60) {
            return {
                strength: 'fair',
                label: 'Fair',
                color: '#FF9500',
                progress: 0.5,
            };
        } else if (score < 80) {
            return {
                strength: 'good',
                label: 'Good',
                color: '#34C759',
                progress: 0.75,
            };
        } else {
            return {
                strength: 'strong',
                label: 'Strong',
                color: '#30D158',
                progress: 1,
            };
        }
    }, [value, showStrengthIndicator]);

    return (
        <View>
            <FormInput
                {...props}
                value={value}
                secureTextEntry={!isPasswordVisible}
                leftIcon="lock-closed-outline"
                rightIcon={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                onRightIconPress={() => setIsPasswordVisible(!isPasswordVisible)}
                autoCapitalize="none"
                autoCorrect={false}
            />

            {showStrengthIndicator && value && (value as string).length > 0 && (
                <View style={styles.strengthContainer}>
                    <View style={styles.strengthBarContainer}>
                        <View
                            style={[
                                styles.strengthBar,
                                {
                                    width: `${passwordStrength.progress * 100}%`,
                                    backgroundColor: passwordStrength.color,
                                },
                            ]}
                        />
                    </View>
                    <Text
                        style={[
                            styles.strengthLabel,
                            { color: passwordStrength.color },
                        ]}
                    >
                        Password strength: {passwordStrength.label}
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    strengthContainer: {
        marginTop: spacing.xs,
        marginBottom: spacing.sm,
    },
    strengthBarContainer: {
        height: 4,
        backgroundColor: colors.border,
        borderRadius: 2,
        overflow: 'hidden',
        marginBottom: spacing.xs,
    },
    strengthBar: {
        height: '100%',
        borderRadius: 2,
    },
    strengthLabel: {
        ...typography.styles.caption,
    },
});
