/**
 * Register Screen
 *
 * Account creation screen with comprehensive validation
 * Senior-level implementation with password strength and terms agreement
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { AuthLayout } from '../../src/shared/components/layout/AuthLayout';
import { FormInput } from '../../src/shared/components/forms/FormInput';
import { PasswordInput } from '../../src/shared/components/forms/PasswordInput';
import { Checkbox } from '../../src/shared/components/forms/Checkbox';
import { BaseButton } from '../../src/shared/components/base/BaseButton';
import { useAuthStore } from '../../src/shared/stores/authStore';
import { colors, typography, spacing } from '../../src/theme';

interface FormErrors {
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
}

export default function RegisterScreen() {
    const router = useRouter();
    const { register } = useAuthStore();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [loading, setLoading] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Full Name validation
        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        } else if (formData.fullName.trim().length < 2) {
            newErrors.fullName = 'Full name must be at least 2 characters';
        }

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(formData.password)) {
            newErrors.password = 'Password must contain uppercase, lowercase, and number';
        }

        // Confirm Password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        // Terms validation
        if (!agreedToTerms) {
            newErrors.terms = 'You must agree to the Terms of Service and Privacy Policy';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCreateAccount = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            // TODO: Implement actual registration API call
            await register(formData.fullName, formData.email, formData.password);

            Alert.alert(
                'Success',
                'Your account has been created successfully!',
                [
                    {
                        text: 'OK',
                        onPress: () => router.replace('/(main)/(tabs)'),
                    },
                ]
            );
        } catch (error: any) {
            Alert.alert(
                'Registration Failed',
                error.message || 'An error occurred. Please try again.',
                [{ text: 'OK' }]
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout showBackButton>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Create account</Text>
                    <Text style={styles.subtitle}>
                        Join TastebuddyAI and explore Vietnamese cuisine
                    </Text>
                </View>

                <View style={styles.form}>
                    <FormInput
                        label="Full Name"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChangeText={(text) => {
                            setFormData({ ...formData, fullName: text });
                            if (errors.fullName) {
                                setErrors({ ...errors, fullName: undefined });
                            }
                        }}
                        error={errors.fullName}
                        leftIcon="person-outline"
                        autoCapitalize="words"
                        autoComplete="name"
                        required
                    />

                    <FormInput
                        label="Email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChangeText={(text) => {
                            setFormData({ ...formData, email: text });
                            if (errors.email) {
                                setErrors({ ...errors, email: undefined });
                            }
                        }}
                        error={errors.email}
                        leftIcon="mail-outline"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoComplete="email"
                        required
                    />

                    <PasswordInput
                        label="Password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChangeText={(text) => {
                            setFormData({ ...formData, password: text });
                            if (errors.password) {
                                setErrors({ ...errors, password: undefined });
                            }
                        }}
                        error={errors.password}
                        showStrengthIndicator
                        required
                    />

                    <PasswordInput
                        label="Confirm Password"
                        placeholder="Re-enter your password"
                        value={formData.confirmPassword}
                        onChangeText={(text) => {
                            setFormData({ ...formData, confirmPassword: text });
                            if (errors.confirmPassword) {
                                setErrors({ ...errors, confirmPassword: undefined });
                            }
                        }}
                        error={errors.confirmPassword}
                        required
                    />

                    <Checkbox
                        checked={agreedToTerms}
                        onPress={() => {
                            setAgreedToTerms(!agreedToTerms);
                            if (errors.terms) {
                                setErrors({ ...errors, terms: undefined });
                            }
                        }}
                        error={!!errors.terms}
                        label={
                            <Text style={styles.termsText}>
                                I agree to the{' '}
                                <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
                                <Text style={styles.termsLink}>Privacy Policy</Text>
                            </Text>
                        }
                        style={styles.checkbox}
                    />
                    {errors.terms && (
                        <Text style={styles.termsError}>{errors.terms}</Text>
                    )}

                    <BaseButton
                        title="Create account"
                        variant="primary"
                        size="large"
                        fullWidth
                        onPress={handleCreateAccount}
                        loading={loading}
                        style={styles.createButton}
                    />
                </View>
            </View>
        </AuthLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: spacing.xl,
    },
    header: {
        marginBottom: spacing.xxl,
    },
    title: {
        ...typography.styles.h2,
        color: colors.textPrimary,
        marginBottom: spacing.sm,
    },
    subtitle: {
        ...typography.styles.bodyRegular,
        color: colors.textSecondary,
    },
    form: {
        marginBottom: spacing.xl,
    },
    checkbox: {
        marginTop: spacing.md,
        marginBottom: spacing.xs,
    },
    termsText: {
        ...typography.styles.bodyRegular,
        color: colors.textSecondary,
    },
    termsLink: {
        ...typography.styles.bodyMedium,
        color: colors.primary,
    },
    termsError: {
        ...typography.styles.caption,
        color: colors.error,
        marginTop: spacing.xs,
        marginLeft: spacing.lg,
    },
    createButton: {
        marginTop: spacing.xl,
    },
});
