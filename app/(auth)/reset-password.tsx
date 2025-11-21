/**
 * Reset Password Screen
 *
 * Password recovery screen with email validation
 * Senior-level implementation with success feedback
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { AuthLayout } from '../../src/shared/components/layout/AuthLayout';
import { FormInput } from '../../src/shared/components/forms/FormInput';
import { BaseButton } from '../../src/shared/components/base/BaseButton';
import { colors, typography, spacing } from '../../src/theme';

export default function ResetPasswordScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const validateEmail = (): boolean => {
        if (!email) {
            setError('Email is required');
            return false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email address');
            return false;
        }

        setError('');
        return true;
    };

    const handleSendResetLink = async () => {
        if (!validateEmail()) {
            return;
        }

        try {
            setLoading(true);
            // TODO: Implement actual password reset API call
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call

            Alert.alert(
                'Email Sent',
                `Password reset instructions have been sent to ${email}. Please check your inbox.`,
                [
                    {
                        text: 'OK',
                        onPress: () => router.back(),
                    },
                ]
            );
        } catch (error: any) {
            Alert.alert(
                'Error',
                error.message || 'Failed to send reset email. Please try again.',
                [{ text: 'OK' }]
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout showBackButton backButtonLabel="Sign in">
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Reset password</Text>
                    <Text style={styles.subtitle}>
                        Enter your email address and we'll send you instructions to reset your password
                    </Text>
                </View>

                <View style={styles.form}>
                    <FormInput
                        label="Email"
                        placeholder="name@example.com"
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text);
                            if (error) {
                                setError('');
                            }
                        }}
                        error={error}
                        leftIcon="mail-outline"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoComplete="email"
                        required
                    />

                    <BaseButton
                        title="Send reset link"
                        variant="primary"
                        size="large"
                        fullWidth
                        onPress={handleSendResetLink}
                        loading={loading}
                        style={styles.sendButton}
                    />
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Remember your password?{' '}
                        <Text
                            style={styles.footerLink}
                            onPress={() => router.back()}
                        >
                            Sign in
                        </Text>
                    </Text>
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
        lineHeight: 24,
    },
    form: {
        marginBottom: spacing.xl,
    },
    sendButton: {
        marginTop: spacing.xl,
    },
    footer: {
        alignItems: 'center',
        marginTop: spacing.xl,
    },
    footerText: {
        ...typography.styles.bodyRegular,
        color: colors.textSecondary,
        textAlign: 'center',
    },
    footerLink: {
        ...typography.styles.bodyMedium,
        color: colors.primary,
    },
});
