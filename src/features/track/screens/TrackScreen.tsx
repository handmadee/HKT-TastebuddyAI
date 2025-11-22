import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Screen } from '../../../shared/components/layout/Screen';
import { colors, spacing } from '../../../theme';
import { useTrackStore } from '../stores/trackStore';
import { DateSelector } from '../components/DateSelector';
import { DailyProgress } from '../components/DailyProgress';
import { MealSection } from '../components/MealSection';
import { MealType, FoodItem } from '../types';
import { useRouter } from 'expo-router';

export const TrackScreen = () => {
    const router = useRouter();
    const {
        selectedDate,
        dailyGoals,
        logs,
        setSelectedDate,
        addFood,
        removeFood
    } = useTrackStore();

    const currentLog = logs[selectedDate] || {
        date: selectedDate,
        meals: {
            breakfast: { id: 'breakfast', type: 'breakfast', items: [], totalCalories: 0 },
            lunch: { id: 'lunch', type: 'lunch', items: [], totalCalories: 0 },
            dinner: { id: 'dinner', type: 'dinner', items: [], totalCalories: 0 },
            snack: { id: 'snack', type: 'snack', items: [], totalCalories: 0 },
        },
        totalMacros: { calories: 0, protein: 0, carbs: 0, fat: 0 },
    };

    const handleAddFood = (mealType: MealType) => {
        // For now, we'll simulate adding a food item since we don't have a food search screen yet
        // In a real app, this would navigate to a search screen
        // router.push({ pathname: '/search', params: { mealType, date: selectedDate } });

        // Simulation:
        const mockFoods: FoodItem[] = [
            { id: Math.random().toString(), name: 'Oatmeal', calories: 150, protein: 5, carbs: 27, fat: 3, servingSize: '1 cup' },
            { id: Math.random().toString(), name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6, servingSize: '100g' },
            { id: Math.random().toString(), name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, servingSize: '1 medium' },
            { id: Math.random().toString(), name: 'Almonds', calories: 164, protein: 6, carbs: 6, fat: 14, servingSize: '1 oz' },
        ];

        const randomFood = mockFoods[Math.floor(Math.random() * mockFoods.length)];
        addFood(selectedDate, mealType, randomFood);
    };

    return (
        <Screen safeArea style={styles.screen}>
            <DateSelector
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
            />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <DailyProgress
                    goals={dailyGoals}
                    current={currentLog.totalMacros}
                />

                <MealSection
                    title="Breakfast"
                    mealLog={currentLog.meals.breakfast}
                    onAddFood={() => handleAddFood('breakfast')}
                    onRemoveFood={(id) => removeFood(selectedDate, 'breakfast', id)}
                />

                <MealSection
                    title="Lunch"
                    mealLog={currentLog.meals.lunch}
                    onAddFood={() => handleAddFood('lunch')}
                    onRemoveFood={(id) => removeFood(selectedDate, 'lunch', id)}
                />

                <MealSection
                    title="Dinner"
                    mealLog={currentLog.meals.dinner}
                    onAddFood={() => handleAddFood('dinner')}
                    onRemoveFood={(id) => removeFood(selectedDate, 'dinner', id)}
                />

                <MealSection
                    title="Snacks"
                    mealLog={currentLog.meals.snack}
                    onAddFood={() => handleAddFood('snack')}
                    onRemoveFood={(id) => removeFood(selectedDate, 'snack', id)}
                />

                <View style={styles.footerSpacer} />
            </ScrollView>
        </Screen>
    );
};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.backgroundMain,
    },
    scrollContent: {
        paddingBottom: spacing.xl,
    },
    footerSpacer: {
        height: 80, // Space for bottom tab bar
    },
});
