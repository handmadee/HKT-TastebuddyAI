/**
 * OnboardingProgress Component
 *
 * Progress indicator for onboarding flow
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing } from '../../../theme';

interface OnboardingProgressProps {
    currentStep: number;
    totalSteps: number;
}

export const OnboardingProgress: React.FC<OnboardingProgressProps> = ({
    currentStep,
    totalSteps,
}) => {
    const progress = ((currentStep + 1) / totalSteps) * 100;

    return (
        <View style={styles.container}>
            <View style={styles.track}>
                <View style={[styles.fill, { width: `${progress}%` }]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: spacing.container.horizontal,
        paddingTop: spacing.md,
        paddingBottom: spacing.sm,
    },
    track: {
        height: 4,
        backgroundColor: colors.backgroundGray,
        borderRadius: 2,
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
        backgroundColor: colors.primary,
        borderRadius: 2,
    },
});
