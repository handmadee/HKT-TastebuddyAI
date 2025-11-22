/**
 * IngredientsList Component
 *
 * Displays list of ingredients with allergen indicators
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ingredient } from '../types';
import { colors, spacing, typography, borderRadius, shadows } from '../../../theme';

interface IngredientsListProps {
    ingredients: Ingredient[];
    maxHeight?: number;
}

export const IngredientsList: React.FC<IngredientsListProps> = ({
    ingredients,
    maxHeight = 300,
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ingredients</Text>

            <ScrollView
                style={[styles.list, { maxHeight }]}
                showsVerticalScrollIndicator={false}
            >
                {ingredients.map((ingredient, index) => (
                    <IngredientItem
                        key={index}
                        ingredient={ingredient}
                        isLast={index === ingredients.length - 1}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

interface IngredientItemProps {
    ingredient: Ingredient;
    isLast: boolean;
}

const IngredientItem: React.FC<IngredientItemProps> = ({ ingredient, isLast }) => {
    const hasAllergens = ingredient.allergens && ingredient.allergens.length > 0;

    return (
        <View style={[styles.ingredientItem, !isLast && styles.ingredientItemBorder]}>
            <View style={styles.ingredientInfo}>
                <Text style={[styles.ingredientName, hasAllergens && styles.allergenText]}>
                    {ingredient.name}
                    {hasAllergens && ' ⚠️'}
                </Text>
                {ingredient.amount && (
                    <Text style={styles.ingredientAmount}>{ingredient.amount}</Text>
                )}
            </View>

            {hasAllergens && (
                <View style={styles.allergenBadge}>
                    <Text style={styles.allergenBadgeText}>
                        {ingredient.allergens!.join(', ')}
                    </Text>
                </View>
            )}
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
    list: {
        // maxHeight set dynamically
    },
    ingredientItem: {
        paddingVertical: spacing.md,
    },
    ingredientItemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    ingredientInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    ingredientName: {
        ...typography.styles.bodyRegular,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.medium,
        flex: 1,
    },
    allergenText: {
        color: colors.error,
    },
    ingredientAmount: {
        ...typography.styles.bodySmall,
        color: colors.textSecondary,
        marginLeft: spacing.sm,
    },
    allergenBadge: {
        backgroundColor: colors.errorLight,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.badge,
        marginTop: spacing.xs,
        alignSelf: 'flex-start',
    },
    allergenBadgeText: {
        ...typography.styles.caption,
        color: colors.error,
        fontWeight: typography.fontWeight.medium,
    },
});
