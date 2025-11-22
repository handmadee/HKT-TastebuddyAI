import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../../../theme';
import { MealLog, FoodItem } from '../types';
import { Ionicons } from '@expo/vector-icons';

interface MealSectionProps {
    title: string;
    mealLog: MealLog;
    onAddFood: () => void;
    onRemoveFood: (foodId: string) => void;
}

export const MealSection: React.FC<MealSectionProps> = ({
    title,
    mealLog,
    onAddFood,
    onRemoveFood
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.calories}>{mealLog.totalCalories} kcal</Text>
            </View>

            <View style={styles.foodList}>
                {mealLog.items.length === 0 ? (
                    <Text style={styles.emptyText}>No food logged yet</Text>
                ) : (
                    mealLog.items.map((item, index) => (
                        <View key={`${item.id}-${index}`} style={styles.foodItem}>
                            <View style={styles.foodInfo}>
                                <Text style={styles.foodName}>{item.name}</Text>
                                <Text style={styles.servingSize}>{item.servingSize}</Text>
                            </View>
                            <View style={styles.foodRight}>
                                <Text style={styles.foodCalories}>{item.calories}</Text>
                                <TouchableOpacity
                                    onPress={() => onRemoveFood(item.id)}
                                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                >
                                    <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                )}
            </View>

            <TouchableOpacity style={styles.addButton} onPress={onAddFood}>
                <Ionicons name="add" size={20} color={colors.primary} />
                <Text style={styles.addButtonText}>Add Food</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.card,
        borderRadius: borderRadius.card,
        padding: spacing.md,
        marginHorizontal: spacing.md,
        marginBottom: spacing.md,
        ...shadows.small,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
        paddingBottom: spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    title: {
        ...typography.styles.h4,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.bold,
        textTransform: 'capitalize',
    },
    calories: {
        ...typography.styles.bodySmall,
        color: colors.textSecondary,
        fontWeight: typography.fontWeight.medium,
    },
    foodList: {
        gap: spacing.sm,
        marginBottom: spacing.md,
    },
    emptyText: {
        ...typography.styles.bodySmall,
        color: colors.textSecondary,
        fontStyle: 'italic',
        textAlign: 'center',
        paddingVertical: spacing.sm,
    },
    foodItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.xs,
    },
    foodInfo: {
        flex: 1,
    },
    foodName: {
        ...typography.styles.bodyRegular,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.medium,
    },
    servingSize: {
        ...typography.styles.caption,
        color: colors.textSecondary,
    },
    foodRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    foodCalories: {
        ...typography.styles.bodySmall,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.bold,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.xs,
        paddingVertical: spacing.sm,
        backgroundColor: colors.backgroundMain,
        borderRadius: borderRadius.sm,
    },
    addButtonText: {
        ...typography.styles.bodySmall,
        color: colors.primary,
        fontWeight: typography.fontWeight.bold,
    },
});
