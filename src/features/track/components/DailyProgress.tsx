import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../../../theme';
import { DailyGoals, MacroNutrients } from '../types';

interface DailyProgressProps {
    goals: DailyGoals;
    current: MacroNutrients;
}

export const DailyProgress: React.FC<DailyProgressProps> = ({ goals, current }) => {
    const caloriesProgress = Math.min(current.calories / goals.calories, 1);
    const remainingCalories = Math.max(goals.calories - current.calories, 0);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Calories</Text>
                    <Text style={styles.subtitle}>Remaining = Goal - Food</Text>
                </View>
            </View>

            <View style={styles.caloriesSection}>
                <View style={styles.caloriesInfo}>
                    <View style={styles.calorieItem}>
                        <Text style={styles.calorieValue}>{current.calories}</Text>
                        <Text style={styles.calorieLabel}>Eaten</Text>
                    </View>

                    <View style={styles.mainCalorieDisplay}>
                        <View style={styles.progressCircleBackground}>
                            <View style={[styles.progressCircleFill, { height: `${caloriesProgress * 100}%` }]} />
                        </View>
                        <View style={styles.remainingContainer}>
                            <Text style={styles.remainingValue}>{remainingCalories}</Text>
                            <Text style={styles.remainingLabel}>Kcal Left</Text>
                        </View>
                    </View>

                    <View style={styles.calorieItem}>
                        <Text style={styles.calorieValue}>{goals.calories}</Text>
                        <Text style={styles.calorieLabel}>Goal</Text>
                    </View>
                </View>
            </View>

            <View style={styles.macrosContainer}>
                <MacroBar
                    label="Protein"
                    current={current.protein}
                    target={goals.protein}
                    color={colors.primary}
                />
                <MacroBar
                    label="Carbs"
                    current={current.carbs}
                    target={goals.carbs}
                    color="#F59E0B"
                />
                <MacroBar
                    label="Fat"
                    current={current.fat}
                    target={goals.fat}
                    color="#EF4444"
                />
            </View>
        </View>
    );
};

const MacroBar = ({ label, current, target, color }: { label: string, current: number, target: number, color: string }) => {
    const progress = Math.min(current / target, 1);

    return (
        <View style={styles.macroItem}>
            <View style={styles.macroHeader}>
                <Text style={styles.macroLabel}>{label}</Text>
                <Text style={styles.macroValue}>{Math.round(current)} / {target}g</Text>
            </View>
            <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${progress * 100}%`, backgroundColor: color }]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.card,
        borderRadius: borderRadius.card,
        padding: spacing.lg,
        margin: spacing.md,
        ...shadows.card,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    title: {
        ...typography.styles.h3,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.bold,
    },
    subtitle: {
        ...typography.styles.caption,
        color: colors.textSecondary,
    },
    caloriesSection: {
        marginBottom: spacing.xl,
    },
    caloriesInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    calorieItem: {
        alignItems: 'center',
        flex: 1,
    },
    calorieValue: {
        ...typography.styles.h4,
        fontWeight: typography.fontWeight.bold,
        color: colors.textPrimary,
    },
    calorieLabel: {
        ...typography.styles.caption,
        color: colors.textSecondary,
    },
    mainCalorieDisplay: {
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    progressCircleBackground: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 60,
        borderWidth: 8,
        borderColor: colors.backgroundMain,
        overflow: 'hidden',
    },
    progressCircleFill: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.primary + '40', // Transparent primary
    },
    remainingContainer: {
        alignItems: 'center',
    },
    remainingValue: {
        ...typography.styles.h1,
        color: colors.primary,
        fontWeight: typography.fontWeight.bold,
    },
    remainingLabel: {
        ...typography.styles.caption,
        color: colors.textSecondary,
    },
    macrosContainer: {
        gap: spacing.md,
    },
    macroItem: {
        gap: spacing.xs,
    },
    macroHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    macroLabel: {
        ...typography.styles.bodySmall,
        fontWeight: typography.fontWeight.medium,
        color: colors.textPrimary,
    },
    macroValue: {
        ...typography.styles.caption,
        color: colors.textSecondary,
    },
    progressBarBg: {
        height: 6,
        backgroundColor: colors.backgroundMain,
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 3,
    },
});
