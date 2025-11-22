import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../../../shared/components/layout/Screen';
import { BaseButton } from '../../../shared/components/base/BaseButton';
import { FilterChip } from '../components/FilterChip';
import { useFindFoodFilters } from '../hooks/useFindFoodFilters';
import { useRestaurantSearch } from '../hooks/useRestaurantSearch';
import { DietaryTag, MealTime } from '../types';
import { colors, spacing, typography } from '../../../theme';

export const FindFoodScreen = () => {
    const router = useRouter();
    const {
        filters,
        toggleDietaryPref,
        setMealTime,
    } = useFindFoodFilters();
    const { search, isSearching } = useRestaurantSearch();

    const dietaryOptions = [DietaryTag.Vegan, DietaryTag.GlutenFree, DietaryTag.VeganOptions];
    const mealTimes = [MealTime.Breakfast, MealTime.Lunch, MealTime.Dinner, MealTime.Snack];

    const handleSearch = async () => {
        await search(filters);
        router.push('/restaurant/results' as any);
    };

    return (
        <Screen scrollable={true} safeArea={true} backgroundColor={colors.backgroundGray}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>What are you looking for?</Text>
                <View style={styles.chipContainer}>
                    {dietaryOptions.map((tag) => (
                        <FilterChip
                            key={tag}
                            label={tag}
                            selected={filters.dietaryPreferences.includes(tag)}
                            onPress={() => toggleDietaryPref(tag)}
                        />
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Meal time</Text>
                <View style={styles.chipContainer}>
                    {mealTimes.map((time) => (
                        <FilterChip
                            key={time}
                            label={time}
                            selected={filters.mealTime === time}
                            onPress={() => setMealTime(filters.mealTime === time ? undefined : time)}
                        />
                    ))}
                </View>
            </View>

            <View style={styles.footer}>
                <BaseButton
                    title="Show recommendations"
                    onPress={handleSearch}
                    loading={isSearching}
                    fullWidth
                />
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    section: {
        marginBottom: spacing.xl,
    },
    sectionTitle: {
        ...typography.styles.h4,
        color: colors.textPrimary,
        marginBottom: spacing.md,
        paddingHorizontal: spacing.lg,
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: spacing.lg,
    },
    footer: {
        padding: spacing.lg,
        backgroundColor: colors.backgroundWhite,
    },
});
