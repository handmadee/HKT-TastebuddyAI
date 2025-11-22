import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Screen } from '../../../shared/components/layout/Screen';
import { AllergenList } from '../components/AllergenList';
import { SettingItem } from '../components/SettingItem';
import { useAllergensAndDiet } from '../hooks/useAllergensAndDiet';
import { DietType } from '../types';
import { colors, spacing, typography } from '../../../theme';

export const AllergensDietScreen = () => {
    const {
        dietaryProfile,
        updateDiet,
        addAllergen,
        removeAllergen,
        isSaving,
    } = useAllergensAndDiet();

    if (!dietaryProfile) return null;

    const diets = Object.values(DietType);

    return (
        <Screen
            scrollable={true}
            safeArea={true}
            backgroundColor={colors.backgroundGray}
        >
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Dietary Preference</Text>
                <View style={styles.card}>
                    {diets.map((diet, index) => (
                        <SettingItem
                            key={diet}
                            label={diet}
                            type="toggle"
                            value={dietaryProfile.diet === diet}
                            onToggle={() => updateDiet(diet)}
                        />
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <AllergenList
                    allergens={dietaryProfile.allergens}
                    onAdd={addAllergen}
                    onRemove={removeAllergen}
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
        color: colors.textSecondary,
        marginBottom: spacing.sm,
        marginLeft: spacing.lg,
    },
    card: {
        backgroundColor: colors.backgroundWhite,
        borderRadius: 16,
        overflow: 'hidden',
        marginHorizontal: spacing.lg,
    },
});
