/**
 * Welcome Screen
 *
 * Initial authentication screen with social login options
 * Senior-level implementation with clean architecture
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { AuthLayout } from '../../src/shared/components/layout/AuthLayout';
import { SocialButton } from '../../src/shared/components/forms/SocialButton';
import { colors, typography, spacing } from '../../src/theme';

export default function WelcomeScreen() {
    const router = useRouter();
    const [loading, setLoading] = useState<{
        apple?: boolean;
        google?: boolean;
        email?: boolean;
    }>({});

    const handleAppleSignIn = async () => {
        try {
            setLoading({ ...loading, apple: true });
            // TODO: Implement Apple Sign In
            console.log('Apple Sign In');
        } catch (error) {
            console.error('Apple Sign In Error:', error);
        } finally {
            setLoading({ ...loading, apple: false });
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            setLoading({ ...loading, google: true });
            // TODO: Implement Google Sign In
            console.log('Google Sign In');
        } catch (error) {
            console.error('Google Sign In Error:', error);
        } finally {
            setLoading({ ...loading, google: false });
        }
    };

    const handleEmailSignIn = () => {
        router.push('/(auth)/login');
    };

    const handleCreateAccount = () => {
        router.push('/(auth)/register');
    };

    return (
        <AuthLayout>
            <View style={styles.container}>
                {/* Logo Section */}
                <View style={styles.logoContainer}>
                    <View style={styles.logoPlaceholder}>
                        <Text style={styles.logoText}>🍜</Text>
                    </View>
                    <Text style={styles.appName}>TastebuddyAI</Text>
                    <Text style={styles.tagline}>Your Vietnamese Food Guide</Text>
                </View>

                {/* Welcome Text */}
                <View style={styles.welcomeContainer}>
                    <Text style={styles.welcomeTitle}>Welcome to TastebuddyAI</Text>
                    <Text style={styles.welcomeSubtitle}>
                        Discover authentic Vietnamese cuisine with AI-powered recommendations
                    </Text>
                </View>

                {/* Social Sign In Buttons */}
                <View style={styles.buttonsContainer}>
                    <SocialButton
                        provider="apple"
                        onPress={handleAppleSignIn}
                        loading={loading.apple}
                    />
                    <SocialButton
                        provider="google"
                        onPress={handleGoogleSignIn}
                        loading={loading.google}
                    />
                    <SocialButton
                        provider="email"
                        onPress={handleEmailSignIn}
                        loading={loading.email}
                    />
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Don't have an account?{' '}
                        <Text
                            style={styles.footerLink}
                            onPress={handleCreateAccount}
                        >
                            Create an account
                        </Text>
                    </Text>

                    <Text style={styles.termsText}>
                        By continuing, you agree to our{' '}
                        <Text style={styles.termsLink}>Terms of Service</Text> &{' '}
                        <Text style={styles.termsLink}>Privacy Policy</Text>
                    </Text>
                </View>
            </View>
        </AuthLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: spacing.xxl,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: spacing.xxxl,
    },
    logoPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.md,
    },
    logoText: {
        fontSize: 40,
    },
    appName: {
        ...typography.styles.h1,
        color: colors.textPrimary,
        marginBottom: spacing.xs,
    },
    tagline: {
        ...typography.styles.bodyRegular,
        color: colors.textSecondary,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: spacing.xl,
    },
    welcomeTitle: {
        ...typography.styles.h2,
        color: colors.textPrimary,
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    welcomeSubtitle: {
        ...typography.styles.bodyRegular,
        color: colors.textSecondary,
        textAlign: 'center',
        paddingHorizontal: spacing.lg,
    },
    buttonsContainer: {
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
        marginBottom: spacing.md,
    },
    footerLink: {
        ...typography.styles.bodyMedium,
        color: colors.primary,
    },
    termsText: {
        ...typography.styles.caption,
        color: colors.textSecondary,
        textAlign: 'center',
        paddingHorizontal: spacing.lg,
    },
    termsLink: {
        color: colors.primary,
    },
});
