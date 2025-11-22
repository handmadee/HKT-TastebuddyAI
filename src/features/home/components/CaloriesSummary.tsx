/**
 * CaloriesSummary Component
 *
 * Displays daily calorie progress with visual indicator
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/theme';
import { ProgressBar } from '@/shared/components/base/ProgressBar';

interface CaloriesSummaryProps {
    current: number;
    target: number;
    label?: string;
}

export const CaloriesSummary: React.FC<CaloriesSummaryProps> = ({
    current,
    target,
    label = 'Calories',
}) => {
    const progress = target > 0 ? current / target : 0;
    const percentage = Math.round(progress * 100);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.values}>
                    {current.toLocaleString()} / {target.toLocaleString()}
                </Text>
            </View>
            <ProgressBar
                progress={progress}
                height={8}
                progressColor={colors.primary}
                style={styles.progressBar}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    label: {
        ...typography.styles.bodyMedium,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.semibold,
    },
    values: {
        ...typography.styles.bodySmall,
        color: colors.textSecondary,
    },
    progressBar: {
        marginTop: spacing.xs,
    },
});
