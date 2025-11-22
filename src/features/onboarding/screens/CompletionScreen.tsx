/**
 * Completion Screen
 *
 * Final step of onboarding - celebration and completion
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { OnboardingContainer } from '../components/OnboardingContainer';
import { useOnboardingStore } from '../stores/onboardingStore';
import { spacing, typography, colors } from '../../../theme';

export const CompletionScreen: React.FC = () => {
    const router = useRouter();
    const { completeOnboarding, currentStep, totalSteps } = useOnboardingStore();

    const handleComplete = async () => {
        await completeOnboarding();
        // Navigate to main app
        router.replace('/(main)/(tabs)');
    };

    return (
        <OnboardingContainer
            title="You're all set!"
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={handleComplete}
            nextLabel="Get Started"
            showProgress={true}
        >
            <View style={styles.content}>
                <View style={styles.celebrationContainer}>
                    <Text style={styles.celebrationIcon}>🎉</Text>
                    <Text style={styles.celebrationText}>
                        Your profile is complete!
                    </Text>
                </View>

                <View style={styles.featuresContainer}>
                    <Text style={styles.featuresTitle}>What's next?</Text>

                    <View style={styles.feature}>
                        <View style={styles.featureIconContainer}>
                            <Text style={styles.featureIcon}>📸</Text>
                        </View>
                        <View style={styles.featureContent}>
                            <Text style={styles.featureTitle}>Scan Your Food</Text>
                            <Text style={styles.featureDescription}>
                                Use AI to instantly analyze nutrition and check for allergens
                            </Text>
                        </View>
                    </View>

                    <View style={styles.feature}>
                        <View style={styles.featureIconContainer}>
                            <Text style={styles.featureIcon}>🗺️</Text>
                        </View>
                        <View style={styles.featureContent}>
                            <Text style={styles.featureTitle}>Find Healthy Options</Text>
                            <Text style={styles.featureDescription}>
                                Discover restaurants that match your dietary preferences
                            </Text>
                        </View>
                    </View>

                    <View style={styles.feature}>
                        <View style={styles.featureIconContainer}>
                            <Text style={styles.featureIcon}>📊</Text>
                        </View>
                        <View style={styles.featureContent}>
                            <Text style={styles.featureTitle}>Track Your Progress</Text>
                            <Text style={styles.featureDescription}>
                                Monitor your daily nutrition and reach your health goals
                            </Text>
                        </View>
                    </View>

                    <View style={styles.feature}>
                        <View style={styles.featureIconContainer}>
                            <Text style={styles.featureIcon}>🌐</Text>
                        </View>
                        <View style={styles.featureContent}>
                            <Text style={styles.featureTitle}>Translate Menus</Text>
                            <Text style={styles.featureDescription}>
                                Read menus in any language with instant translation
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.readyCard}>
                    <Text style={styles.readyIcon}>✨</Text>
                    <Text style={styles.readyText}>
                        Ready to start your healthy eating journey?
                    </Text>
                </View>
            </View>
        </OnboardingContainer>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    celebrationContainer: {
        alignItems: 'center',
        marginVertical: spacing.xl,
    },
    celebrationIcon: {
        fontSize: 80,
        marginBottom: spacing.md,
    },
    celebrationText: {
        ...typography.styles.h2,
        color: colors.primary,
        textAlign: 'center',
        fontWeight: '700',
    },
    featuresContainer: {
        marginBottom: spacing.xl,
    },
    featuresTitle: {
        ...typography.styles.h3,
        color: colors.textPrimary,
        marginBottom: spacing.lg,
        fontWeight: '600',
    },
    feature: {
        flexDirection: 'row',
        marginBottom: spacing.lg,
    },
    featureIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: colors.backgroundMain,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    featureIcon: {
        fontSize: 24,
    },
    featureContent: {
        flex: 1,
    },
    featureTitle: {
        ...typography.styles.bodyMedium,
        color: colors.textPrimary,
        fontWeight: '600',
        marginBottom: spacing.xs,
    },
    featureDescription: {
        ...typography.styles.bodySmall,
        color: colors.textSecondary,
        lineHeight: 18,
    },
    readyCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.backgroundAlt,
        borderRadius: 12,
        padding: spacing.lg,
        marginTop: spacing.md,
    },
    readyIcon: {
        fontSize: 28,
        marginRight: spacing.md,
    },
    readyText: {
        ...typography.styles.bodyRegular,
        color: colors.textPrimary,
        flex: 1,
        fontWeight: '500',
    },
});
