/**
 * Nutrition Goals Screen
 *
 * Fourth step of onboarding - set nutrition goals
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { OnboardingContainer } from '../components/OnboardingContainer';
import { SegmentedControl } from '../components/SegmentedControl';
import { BaseInput } from '../../../shared/components/base/BaseInput';
import { SelectableCard } from '../components/SelectableCard';
import { useOnboardingStore } from '../stores/onboardingStore';
import { Gender, ActivityLevel, HealthGoal, HealthCondition, NutritionGoals } from '../types';
import { spacing, typography, colors } from '../../../theme';

const ACTIVITY_LEVELS: Array<{ value: ActivityLevel; label: string; description: string }> = [
    { value: 'sedentary', label: 'Sedentary', description: 'Little or no exercise' },
    { value: 'light', label: 'Light', description: 'Exercise 1-3 days/week' },
    { value: 'moderate', label: 'Moderate', description: 'Exercise 3-5 days/week' },
    { value: 'active', label: 'Active', description: 'Exercise 6-7 days/week' },
    { value: 'very-active', label: 'Very Active', description: 'Physical job + exercise' },
];

const HEALTH_CONDITIONS: Array<{ value: HealthCondition; label: string }> = [
    { value: 'diabetes', label: 'Diabetes' },
    { value: 'high-blood-pressure', label: 'High Blood Pressure' },
    { value: 'high-cholesterol', label: 'High Cholesterol' },
    { value: 'heart-disease', label: 'Heart Disease' },
    { value: 'none', label: 'None' },
];

export const NutritionGoalsScreen: React.FC = () => {
    const router = useRouter();
    const {
        nutritionGoals,
        setNutritionGoals,
        calculateDailyTargets,
        currentStep,
        totalSteps,
        nextStep,
        previousStep,
    } = useOnboardingStore();

    const [formData, setFormData] = useState<NutritionGoals>(nutritionGoals);

    const updateField = <K extends keyof NutritionGoals>(
        field: K,
        value: NutritionGoals[K]
    ) => {
        setFormData({ ...formData, [field]: value });
    };

    const toggleHealthCondition = (condition: HealthCondition) => {
        if (condition === 'none') {
            updateField('healthConditions', ['none']);
        } else {
            const current = formData.healthConditions.filter((c) => c !== 'none');
            if (current.includes(condition)) {
                updateField(
                    'healthConditions',
                    current.filter((c) => c !== condition)
                );
            } else {
                updateField('healthConditions', [...current, condition]);
            }
        }
    };

    const isFormValid = () => {
        return (
            formData.age > 0 &&
            formData.age < 120 &&
            formData.weight > 0 &&
            formData.height > 0
        );
    };

    const handleNext = () => {
        setNutritionGoals(formData);
        calculateDailyTargets();
        nextStep();
        router.push('/(onboarding)/daily-targets');
    };

    const handleBack = () => {
        previousStep();
        router.back();
    };

    return (
        <OnboardingContainer
            title="Set your nutrition goals"
            subtitle="Tell us about yourself to calculate your personalized targets"
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={handleNext}
            onBack={handleBack}
            nextDisabled={!isFormValid()}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                {/* Gender */}
                <View style={styles.section}>
                    <Text style={styles.label}>Gender</Text>
                    <SegmentedControl
                        options={[
                            { value: 'male' as Gender, label: 'Male' },
                            { value: 'female' as Gender, label: 'Female' },
                            { value: 'other' as Gender, label: 'Other' },
                        ]}
                        value={formData.gender}
                        onChange={(value) => updateField('gender', value)}
                    />
                </View>

                {/* Age */}
                <View style={styles.section}>
                    <BaseInput
                        label="Age"
                        value={formData.age.toString()}
                        onChangeText={(text) => {
                            const num = parseInt(text) || 0;
                            updateField('age', num);
                        }}
                        keyboardType="number-pad"
                        placeholder="Enter your age"
                    />
                </View>

                {/* Weight */}
                <View style={styles.section}>
                    <BaseInput
                        label="Weight (kg)"
                        value={formData.weight.toString()}
                        onChangeText={(text) => {
                            const num = parseFloat(text) || 0;
                            updateField('weight', num);
                        }}
                        keyboardType="decimal-pad"
                        placeholder="Enter your weight"
                    />
                </View>

                {/* Height */}
                <View style={styles.section}>
                    <BaseInput
                        label="Height (cm)"
                        value={formData.height.toString()}
                        onChangeText={(text) => {
                            const num = parseFloat(text) || 0;
                            updateField('height', num);
                        }}
                        keyboardType="decimal-pad"
                        placeholder="Enter your height"
                    />
                </View>

                {/* Activity Level */}
                <View style={styles.section}>
                    <Text style={styles.label}>Activity Level</Text>
                    {ACTIVITY_LEVELS.map((level) => (
                        <SelectableCard
                            key={level.value}
                            title={level.label}
                            subtitle={level.description}
                            selected={formData.activityLevel === level.value}
                            onPress={() => updateField('activityLevel', level.value)}
                        />
                    ))}
                </View>

                {/* Goal */}
                <View style={styles.section}>
                    <Text style={styles.label}>Your Goal</Text>
                    <SegmentedControl
                        options={[
                            { value: 'lose-weight' as HealthGoal, label: 'Lose' },
                            { value: 'maintain' as HealthGoal, label: 'Maintain' },
                            { value: 'gain-muscle' as HealthGoal, label: 'Gain' },
                        ]}
                        value={formData.goal}
                        onChange={(value) => updateField('goal', value)}
                    />
                </View>

                {/* Health Conditions */}
                <View style={styles.section}>
                    <Text style={styles.label}>Health Conditions (Optional)</Text>
                    {HEALTH_CONDITIONS.map((condition) => (
                        <SelectableCard
                            key={condition.value}
                            title={condition.label}
                            selected={formData.healthConditions.includes(condition.value)}
                            onPress={() => toggleHealthCondition(condition.value)}
                        />
                    ))}
                </View>
            </ScrollView>
        </OnboardingContainer>
    );
};

const styles = StyleSheet.create({
    content: {
        paddingBottom: spacing.xxxl,
    },
    section: {
        marginBottom: spacing.lg,
    },
    label: {
        ...typography.styles.bodyMedium,
        color: colors.textPrimary,
        marginBottom: spacing.md,
        fontWeight: '600',
    },
});
