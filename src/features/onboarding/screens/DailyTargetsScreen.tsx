/**
 * Daily Targets Screen
 *
 * Fifth step of onboarding - display calculated daily nutrition targets
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { OnboardingContainer } from '../components/OnboardingContainer';
import { MacroBar } from '../components/MacroBar';
import { useOnboardingStore } from '../stores/onboardingStore';
import { spacing, typography, colors, borderRadius, shadows } from '../../../theme';

export const DailyTargetsScreen: React.FC = () => {
    const router = useRouter();
    const { dailyTargets, currentStep, totalSteps, nextStep, previousStep } =
        useOnboardingStore();

    const handleNext = () => {
        nextStep();
        router.push('/(onboarding)/smart-features');
    };

    const handleBack = () => {
        previousStep();
        router.back();
    };

    return (
        <OnboardingContainer
            title="Your daily targets"
            subtitle="Based on your profile, here are your personalized nutrition goals"
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={handleNext}
            onBack={handleBack}
        >
            <View style={styles.content}>
                {/* Calories Card */}
                <View style={styles.caloriesCard}>
                    <Text style={styles.caloriesLabel}>Daily Calorie Target</Text>
                    <Text style={styles.caloriesValue}>{dailyTargets.calories}</Text>
                    <Text style={styles.caloriesUnit}>calories</Text>
                </View>

                {/* Macros Section */}
                <View style={styles.macrosSection}>
                    <Text style={styles.sectionTitle}>Macronutrients Breakdown</Text>

                    <MacroBar
                        label="Protein"
                        value={dailyTargets.protein}
                        unit="g"
                        color={colors.primary}
                        percentage={100}
                    />

                    <MacroBar
                        label="Carbs"
                        value={dailyTargets.carbs}
                        unit="g"
                        color={colors.accent}
                        percentage={100}
                    />

                    <MacroBar
                        label="Fats"
                        value={dailyTargets.fats}
                        unit="g"
                        color={colors.secondary}
                        percentage={100}
                    />
                </View>

                {/* Info Card */}
                <View style={styles.infoCard}>
                    <Text style={styles.infoIcon}>💡</Text>
                    <Text style={styles.infoText}>
                        These targets are calculated based on your age, weight, height, activity
                        level, and health goals. You can adjust them later in settings.
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
    caloriesCard: {
        backgroundColor: colors.primary,
        borderRadius: borderRadius.card,
        padding: spacing.xl,
        alignItems: 'center',
        marginBottom: spacing.xl,
        ...shadows.card,
    },
    caloriesLabel: {
        ...typography.styles.bodyRegular,
        color: colors.backgroundWhite,
        marginBottom: spacing.sm,
        opacity: 0.9,
    },
    caloriesValue: {
        ...typography.styles.h1,
        fontSize: 48,
        color: colors.backgroundWhite,
        fontWeight: '700',
        marginBottom: spacing.xs,
    },
    caloriesUnit: {
        ...typography.styles.bodySmall,
        color: colors.backgroundWhite,
        opacity: 0.8,
    },
    macrosSection: {
        marginBottom: spacing.xl,
    },
    sectionTitle: {
        ...typography.styles.h4,
        color: colors.textPrimary,
        marginBottom: spacing.lg,
        fontWeight: '600',
    },
    infoCard: {
        flexDirection: 'row',
        backgroundColor: colors.backgroundMain,
        borderRadius: borderRadius.card,
        padding: spacing.md,
        alignItems: 'flex-start',
    },
    infoIcon: {
        fontSize: 24,
        marginRight: spacing.sm,
    },
    infoText: {
        ...typography.styles.bodySmall,
        color: colors.textSecondary,
        flex: 1,
        lineHeight: 20,
    },
});
