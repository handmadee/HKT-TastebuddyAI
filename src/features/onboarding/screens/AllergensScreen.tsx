/**
 * Allergens Screen
 *
 * Third step of onboarding - select allergens with severity
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { OnboardingContainer } from '../components/OnboardingContainer';
import { AllergenCard } from '../components/AllergenCard';
import { useOnboardingStore } from '../stores/onboardingStore';
import { ALLERGENS } from '../constants/allergens';
import { Allergen, AllergenType, AllergenSeverity } from '../types';
import { spacing, typography, colors } from '../../../theme';

export const AllergensScreen: React.FC = () => {
    const router = useRouter();
    const {
        allergens,
        addAllergen,
        removeAllergen,
        updateAllergenSeverity,
        currentStep,
        totalSteps,
        nextStep,
        previousStep,
    } = useOnboardingStore();

    const [localAllergens, setLocalAllergens] = useState<Allergen[]>(allergens);

    useEffect(() => {
        // Sync with store
        localAllergens.forEach((allergen) => {
            const existing = allergens.find((a) => a.type === allergen.type);
            if (!existing) {
                addAllergen(allergen);
            } else if (existing.severity !== allergen.severity) {
                updateAllergenSeverity(allergen.type, allergen.severity);
            }
        });

        // Remove allergens that are no longer selected
        allergens.forEach((allergen) => {
            if (!localAllergens.find((a) => a.type === allergen.type)) {
                removeAllergen(allergen.type);
            }
        });
        // Store actions are stable, only react to localAllergens changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localAllergens]);

    const handleToggle = (type: AllergenType) => {
        const exists = localAllergens.find((a) => a.type === type);
        if (exists) {
            setLocalAllergens(localAllergens.filter((a) => a.type !== type));
        } else {
            setLocalAllergens([...localAllergens, { type, severity: 'moderate' }]);
        }
    };

    const handleSeverityChange = (type: AllergenType, severity: AllergenSeverity) => {
        setLocalAllergens(
            localAllergens.map((a) => (a.type === type ? { ...a, severity } : a))
        );
    };

    const handleNext = () => {
        nextStep();
        router.push('/(onboarding)/nutrition-goals');
    };

    const handleBack = () => {
        previousStep();
        router.back();
    };

    const isSelected = (type: AllergenType) => {
        return localAllergens.some((a) => a.type === type);
    };

    const getSeverity = (type: AllergenType): AllergenSeverity => {
        return localAllergens.find((a) => a.type === type)?.severity || 'moderate';
    };

    return (
        <OnboardingContainer
            title="Allergens"
            subtitle="Let us know about any food allergies. Toggle severity levels for each."
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={handleNext}
            onBack={handleBack}
        >
            <Text style={styles.hint}>
                This helps us warn you about potentially dangerous foods
            </Text>
            <FlatList
                data={ALLERGENS}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                    <AllergenCard
                        type={item.value}
                        name={item.label}
                        icon={<Text style={styles.icon}>{item.icon}</Text>}
                        selected={isSelected(item.value)}
                        severity={getSeverity(item.value)}
                        onToggle={() => handleToggle(item.value)}
                        onSeverityChange={(severity) =>
                            handleSeverityChange(item.value, severity)
                        }
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
    hint: {
        ...typography.styles.bodySmall,
        color: colors.textSecondary,
        marginBottom: spacing.lg,
        fontStyle: 'italic',
    },
    icon: {
        fontSize: 24,
    },
});
