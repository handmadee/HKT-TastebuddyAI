/**
 * NutritionCard Component
 *
 * Displays nutrition information for a food item
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Nutrition } from '../types';
import { colors, spacing, typography, borderRadius, shadows } from '../../../theme';

interface NutritionCardProps {
    nutrition: Nutrition;
    showDetailed?: boolean;
}

export const NutritionCard: React.FC<NutritionCardProps> = ({
    nutrition,
    showDetailed = false,
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nutrition Information</Text>

            <View style={styles.mainNutrition}>
                <NutritionItem
                    label="Calories"
                    value={nutrition.calories}
                    unit="kcal"
                    color={colors.primary}
                    large
                />
            </View>

            <View style={styles.macrosGrid}>
                <NutritionItem
                    label="Protein"
                    value={nutrition.protein}
                    unit="g"
                    color="#10B981"
                />
                <NutritionItem label="Carbs" value={nutrition.carbs} unit="g" color="#F59E0B" />
                <NutritionItem label="Fats" value={nutrition.fats} unit="g" color="#EF4444" />
            </View>

            {showDetailed && (
                <View style={styles.detailedGrid}>
                    {nutrition.fiber !== undefined && (
                        <DetailedNutritionItem label="Fiber" value={nutrition.fiber} unit="g" />
                    )}
                    {nutrition.sugar !== undefined && (
                        <DetailedNutritionItem label="Sugar" value={nutrition.sugar} unit="g" />
                    )}
                    {nutrition.sodium !== undefined && (
                        <DetailedNutritionItem
                            label="Sodium"
                            value={nutrition.sodium}
                            unit="mg"
                        />
                    )}
                </View>
            )}
        </View>
    );
};

interface NutritionItemProps {
    label: string;
    value: number;
    unit: string;
    color: string;
    large?: boolean;
}

const NutritionItem: React.FC<NutritionItemProps> = ({
    label,
    value,
    unit,
    color,
    large = false,
}) => {
    return (
        <View style={[styles.nutritionItem, large && styles.nutritionItemLarge]}>
            <Text style={[styles.nutritionValue, large && styles.nutritionValueLarge]}>
                {value}
                <Text style={styles.nutritionUnit}> {unit}</Text>
            </Text>
            <Text style={[styles.nutritionLabel, { color }]}>{label}</Text>
        </View>
    );
};

interface DetailedNutritionItemProps {
    label: string;
    value: number;
    unit: string;
}

const DetailedNutritionItem: React.FC<DetailedNutritionItemProps> = ({ label, value, unit }) => {
    return (
        <View style={styles.detailedItem}>
            <Text style={styles.detailedLabel}>{label}</Text>
            <Text style={styles.detailedValue}>
                {value} {unit}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.card,
        borderRadius: borderRadius.card,
        padding: spacing.lg,
        ...shadows.card,
    },
    title: {
        ...typography.styles.h3,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.semibold,
        marginBottom: spacing.md,
    },
    mainNutrition: {
        alignItems: 'center',
        paddingVertical: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    macrosGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: spacing.lg,
    },
    nutritionItem: {
        alignItems: 'center',
    },
    nutritionItemLarge: {
        paddingVertical: spacing.sm,
    },
    nutritionValue: {
        ...typography.styles.h3,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.bold,
    },
    nutritionValueLarge: {
        ...typography.styles.h1,
    },
    nutritionUnit: {
        ...typography.styles.bodySmall,
        color: colors.textSecondary,
        fontWeight: typography.fontWeight.normal,
    },
    nutritionLabel: {
        ...typography.styles.bodySmall,
        fontWeight: typography.fontWeight.medium,
        marginTop: spacing.xs,
    },
    detailedGrid: {
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingTop: spacing.md,
    },
    detailedItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: spacing.sm,
    },
    detailedLabel: {
        ...typography.styles.bodyRegular,
        color: colors.textSecondary,
    },
    detailedValue: {
        ...typography.styles.bodyRegular,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.medium,
    },
});
