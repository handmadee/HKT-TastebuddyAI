/**
 * Dietary Preferences Screen
 *
 * Second step of onboarding - select dietary preferences
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { OnboardingContainer } from '../components/OnboardingContainer';
import { SelectableCard } from '../components/SelectableCard';
import { useOnboardingStore } from '../stores/onboardingStore';
import { DIETARY_PREFERENCES } from '../constants/dietaryPreferences';
import { DietaryPreference } from '../types';
import { spacing } from '../../../theme';

export const DietaryPreferencesScreen: React.FC = () => {
    const router = useRouter();
    const {
        dietaryPreferences,
        setDietaryPreferences,
        currentStep,
        totalSteps,
        nextStep,
        previousStep,
    } = useOnboardingStore();

    const [selected, setSelected] = useState<DietaryPreference[]>(dietaryPreferences);

    const handleToggle = (preference: DietaryPreference) => {
        if (selected.includes(preference)) {
            setSelected(selected.filter((p) => p !== preference));
        } else {
            setSelected([...selected, preference]);
        }
    };

    const handleNext = () => {
        setDietaryPreferences(selected);
        nextStep();
        router.push('/(onboarding)/allergens');
    };

    const handleBack = () => {
        previousStep();
        router.back();
    };

    return (
        <OnboardingContainer
            title="Dietary preferences"
            subtitle="Select all that apply to you"
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={handleNext}
            onBack={handleBack}
        >
            <FlatList
                data={DIETARY_PREFERENCES}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                    <SelectableCard
                        title={item.label}
                        subtitle={item.description}
                        icon={<Text style={styles.icon}>{item.icon}</Text>}
                        selected={selected.includes(item.value)}
                        onPress={() => handleToggle(item.value)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
            />
        </OnboardingContainer>
    );
};

const styles = StyleSheet.create({
    listContent: {
        paddingBottom: spacing.xl,
    },
    icon: {
        fontSize: 28,
    },
});
