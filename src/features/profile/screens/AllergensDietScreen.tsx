import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Screen } from '../../../shared/components/layout/Screen';
import { SelectableCard } from '../../onboarding/components/SelectableCard';
import { AllergenCard } from '../../onboarding/components/AllergenCard';
import { useAllergensAndDiet } from '../hooks/useAllergensAndDiet';
import { colors, spacing, typography } from '../../../theme';
import { DIETARY_PREFERENCES } from '../../onboarding/constants/dietaryPreferences';
import { ALLERGENS } from '../../onboarding/constants/allergens';
import { AllergenSeverity } from '../../onboarding/types';

export const AllergensDietScreen = () => {
    const {
        dietaryProfile,
        updateDiet,
        addAllergen,
        removeAllergen,
    } = useAllergensAndDiet();

    if (!dietaryProfile) return null;

    const handleAllergenToggle = (type: string) => {
        const existing = dietaryProfile.allergens.find(a => a.type === type);
        if (existing) {
            removeAllergen(type);
        } else {
            addAllergen(type, 'moderate');
        }
    };

    const handleSeverityChange = (type: string, severity: AllergenSeverity) => {
        addAllergen(type, severity);
    };

    return (
        <Screen
            scrollable={true}
            safeArea={true}
            backgroundColor={colors.backgroundGray}
            title="Allergens & Diet"
            showBack={true}
        >
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Dietary Preference</Text>
                <Text style={styles.sectionSubtitle}>Select all that apply to you</Text>
                <View style={styles.cardContainer}>
                    {DIETARY_PREFERENCES.map((item) => (
                        <SelectableCard
                            key={item.value}
                            title={item.label}
                            subtitle={item.description}
                            icon={<Text style={styles.icon}>{item.icon}</Text>}
                            selected={dietaryProfile.diet.includes(item.value)}
                            onPress={() => updateDiet(item.value)}
                        />
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Allergens</Text>
                <Text style={styles.sectionSubtitle}>Toggle severity levels for each</Text>
                <View style={styles.cardContainer}>
                    {ALLERGENS.map((item) => {
                        const userAllergen = dietaryProfile.allergens.find(a => a.type === item.value);
                        return (
                            <AllergenCard
                                key={item.value}
                                type={item.value}
                                name={item.label}
                                icon={<Text style={styles.icon}>{item.icon}</Text>}
                                selected={!!userAllergen}
                                severity={(userAllergen?.severity as AllergenSeverity) || 'moderate'}
                                onToggle={() => handleAllergenToggle(item.value)}
                                onSeverityChange={(severity) => handleSeverityChange(item.value, severity)}
                            />
                        );
                    })}
                </View>
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    section: {
        marginBottom: spacing.xl,
        paddingHorizontal: spacing.lg,
    },
    sectionTitle: {
        ...typography.styles.h3,
        color: colors.textPrimary,
        marginBottom: spacing.xs,
    },
    sectionSubtitle: {
        ...typography.styles.bodyRegular,
        color: colors.textSecondary,
        marginBottom: spacing.md,
    },
    cardContainer: {
        gap: spacing.xs,
    },
    icon: {
        fontSize: 24,
    },
});
