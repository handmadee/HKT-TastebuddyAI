/**
 * OnboardingContainer Component
 *
 * Reusable container for onboarding screens with progress indicator
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Screen } from '../../../shared/components/layout/Screen';
import { BaseButton } from '../../../shared/components/base/BaseButton';
import { colors, typography, spacing } from '../../../theme';
import { OnboardingProgress } from './OnboardingProgress';

interface OnboardingContainerProps {
    title: string;
    subtitle?: string;
    currentStep: number;
    totalSteps: number;
    onNext?: () => void;
    onBack?: () => void;
    nextLabel?: string;
    backLabel?: string;
    nextDisabled?: boolean;
    showProgress?: boolean;
    children: React.ReactNode;
    containerStyle?: ViewStyle;
}

export const OnboardingContainer: React.FC<OnboardingContainerProps> = ({
    title,
    subtitle,
    currentStep,
    totalSteps,
    onNext,
    onBack,
    nextLabel = 'Next',
    backLabel = 'Back',
    nextDisabled = false,
    showProgress = true,
    children,
    containerStyle,
}) => {
    return (
        <Screen safeArea backgroundColor={colors.backgroundWhite} padding={false}>
            <View style={styles.container}>
                {showProgress && (
                    <OnboardingProgress
                        currentStep={currentStep}
                        totalSteps={totalSteps}
                    />
                )}

                <View style={[styles.content, containerStyle]}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{title}</Text>
                        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                    </View>

                    <View style={styles.body}>{children}</View>
                </View>

                <View style={styles.footer}>
                    {onBack && (
                        <BaseButton
                            title={backLabel}
                            variant="ghost"
                            size="large"
                            onPress={onBack}
                            style={styles.backButton}
                        />
                    )}
                    {onNext && (
                        <BaseButton
                            title={nextLabel}
                            variant="primary"
                            size="large"
                            fullWidth
                            onPress={onNext}
                            disabled={nextDisabled}
                        />
                    )}
                </View>
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: spacing.container.horizontal,
    },
    header: {
        marginTop: spacing.xl,
        marginBottom: spacing.xl,
    },
    title: {
        ...typography.styles.h1,
        color: colors.textPrimary,
        marginBottom: spacing.sm,
    },
    subtitle: {
        ...typography.styles.bodyRegular,
        color: colors.textSecondary,
        lineHeight: 24,
    },
    body: {
        flex: 1,
    },
    footer: {
        paddingHorizontal: spacing.container.horizontal,
        paddingBottom: spacing.xl,
        gap: spacing.md,
    },
    backButton: {
        alignSelf: 'center',
    },
});
