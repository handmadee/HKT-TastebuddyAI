import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../../theme';
import { DailySummary } from '../types';

interface SummaryProgressCardProps {
    summary: DailySummary;
}

export const SummaryProgressCard: React.FC<SummaryProgressCardProps> = ({ summary }) => {
    const progress = (summary.calories.consumed / summary.calories.target) * 100;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Today's Summary</Text>
            <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${Math.min(progress, 100)}%` }]} />
                </View>
                <Text style={styles.progressText}>
                    {summary.calories.consumed} / {summary.calories.target} kcal
                </Text>
            </View>
            <Text style={styles.meals}>{summary.mealsLogged} meals logged</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.backgroundWhite,
        borderRadius: 16,
        padding: spacing.lg,
        marginBottom: spacing.md,
    },
    title: {
        ...typography.styles.h4,
        color: colors.textPrimary,
        marginBottom: spacing.md,
    },
    progressContainer: {
        marginBottom: spacing.sm,
    },
    progressBar: {
        height: 8,
        backgroundColor: colors.divider,
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: spacing.xs,
    },
    progressFill: {
        height: '100%',
        backgroundColor: colors.primary,
        borderRadius: 4,
    },
    progressText: {
        ...typography.styles.bodyRegular,
        color: colors.textPrimary,
    },
    meals: {
        ...typography.styles.caption,
        color: colors.textSecondary,
    },
});
