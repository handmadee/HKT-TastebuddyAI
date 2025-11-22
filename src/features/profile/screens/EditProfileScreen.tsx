import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ScrollView, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../../../shared/components/layout/Screen';
import { FormInput } from '../../../shared/components/forms/FormInput';
import { BaseButton } from '../../../shared/components/base/BaseButton';
import { useUserProfile } from '../hooks/useUserProfile';
import { useUpdateProfile } from '../hooks/useUpdateProfile';
import { colors, spacing, typography } from '../../../theme';
import { SelectableCard } from '../../onboarding/components/SelectableCard';
import { AllergenCard } from '../../onboarding/components/AllergenCard';
import { SegmentedControl } from '../../onboarding/components/SegmentedControl';
import { MacroBar } from '../../onboarding/components/MacroBar';
import { DietType } from '../types';
import { AllergenType, AllergenSeverity } from '../../onboarding/types';
import { useAuthStore } from '../../../shared/stores/authStore';

export const EditProfileScreen = () => {
    const router = useRouter();
    const { user } = useAuthStore();
    const { updateProfile, isUpdating } = useUpdateProfile();

    // Basic Info
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');

    // Onboarding Data
    const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);
    const [allergens, setAllergens] = useState<{ type: string; severity: string }[]>([]);

    // Nutrition Goals
    const [gender, setGender] = useState('male');
    const [activityLevel, setActivityLevel] = useState('moderate');
    const [goal, setGoal] = useState('maintain');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [healthConditions, setHealthConditions] = useState<string[]>([]);

    useEffect(() => {
        if (user) {
            setFullName(user.fullName || '');
            setEmail(user.email || '');

            if (user.onboarding) {
                setDietaryPreferences(user.onboarding.dietaryPreferences || []);
                setAllergens(user.onboarding.allergens || []);

                const goals = user.onboarding.nutritionGoals;
                if (goals) {
                    setGender(goals.gender || 'male');
                    setActivityLevel(goals.activityLevel || 'moderate');
                    setGoal(goals.goal || 'maintain');
                    setAge(goals.age?.toString() || '');
                    setWeight(goals.weight?.toString() || '');
                    setHeight(goals.height?.toString() || '');
                    setHealthConditions(goals.healthConditions || []);
                }
            }
        }
    }, [user]);

    const toggleHealthCondition = (condition: string) => {
        if (condition === 'none') {
            setHealthConditions(['none']);
        } else {
            setHealthConditions(prev => {
                const current = prev.filter(c => c !== 'none');
                if (current.includes(condition)) {
                    return current.filter(c => c !== condition);
                }
                return [...current, condition];
            });
        }
    };

    const HEALTH_CONDITIONS = [
        { value: 'diabetes', label: 'Diabetes' },
        { value: 'high-blood-pressure', label: 'High Blood Pressure' },
        { value: 'high-cholesterol', label: 'High Cholesterol' },
        { value: 'heart-disease', label: 'Heart Disease' },
        { value: 'none', label: 'None' },
    ];

    const handleSave = async () => {
        try {
            await updateProfile({
                fullName,
                onboarding: {
                    ...user?.onboarding,
                    dietaryPreferences,
                    allergens,
                    nutritionGoals: {
                        ...user?.onboarding?.nutritionGoals,
                        gender,
                        activityLevel,
                        goal,
                        age: parseInt(age) || 0,
                        weight: parseInt(weight) || 0,
                        height: parseInt(height) || 0,
                        healthConditions: healthConditions as any[],
                    },
                }
            });
            router.back();
        } catch (error) {
            Alert.alert('Error', 'Failed to update profile');
        }
    };

    const toggleDiet = (diet: string) => {
        setDietaryPreferences(prev =>
            prev.includes(diet)
                ? prev.filter(d => d !== diet)
                : [...prev, diet]
        );
    };

    const toggleAllergen = (type: string) => {
        setAllergens(prev => {
            const exists = prev.find(a => a.type === type);
            if (exists) {
                return prev.filter(a => a.type !== type);
            }
            return [...prev, { type, severity: 'moderate' }];
        });
    };

    const updateAllergenSeverity = (type: string, severity: string) => {
        setAllergens(prev => prev.map(a =>
            a.type === type ? { ...a, severity } : a
        ));
    };

    const diets = Object.values(DietType);
    // Mock allergens list - ideally should come from constants
    const allergenTypes = ['Peanuts', 'Tree Nuts', 'Milk', 'Eggs', 'Wheat', 'Soy', 'Fish', 'Shellfish'];

    return (
        <Screen
            scrollable={true}
            safeArea={true}
            backgroundColor={colors.backgroundWhite}
            title="Edit Profile"
            showBack={true}
        >
            <View style={styles.container}>
                {/* Basic Info Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Basic Information</Text>
                    <FormInput
                        label="Full Name"
                        value={fullName}
                        onChangeText={setFullName}
                        placeholder="Enter your full name"
                    />
                    <FormInput
                        label="Email"
                        value={email}
                        editable={false} // Email usually not editable directly
                        placeholder="Enter your email"
                    />
                </View>

                {/* Dietary Preferences Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Dietary Preferences</Text>
                    {diets.map(diet => (
                        <SelectableCard
                            key={diet}
                            title={diet}
                            selected={dietaryPreferences.includes(diet)}
                            onPress={() => toggleDiet(diet)}
                        />
                    ))}
                </View>

                {/* Allergens Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Allergens</Text>
                    {allergenTypes.map(type => {
                        const allergen = allergens.find(a => a.type === type);
                        return (
                            <AllergenCard
                                key={type}
                                type={type as any}
                                name={type}
                                selected={!!allergen}
                                severity={allergen?.severity as any}
                                onToggle={() => toggleAllergen(type)}
                                onSeverityChange={(severity) => updateAllergenSeverity(type, severity)}
                            />
                        );
                    })}
                </View>

                {/* Nutrition Goals Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Nutrition Goals</Text>

                    <Text style={styles.label}>Gender</Text>
                    <SegmentedControl
                        options={[
                            { label: 'Male', value: 'male' },
                            { label: 'Female', value: 'female' },
                            { label: 'Other', value: 'other' },
                        ]}
                        value={gender}
                        onChange={setGender}
                    />

                    <View style={styles.row}>
                        <View style={styles.halfInput}>
                            <FormInput
                                label="Age"
                                value={age}
                                onChangeText={setAge}
                                keyboardType="numeric"
                                placeholder="0"
                            />
                        </View>
                        <View style={styles.halfInput}>
                            <FormInput
                                label="Weight (kg)"
                                value={weight}
                                onChangeText={setWeight}
                                keyboardType="numeric"
                                placeholder="0"
                            />
                        </View>
                    </View>

                    <FormInput
                        label="Height (cm)"
                        value={height}
                        onChangeText={setHeight}
                        keyboardType="numeric"
                        placeholder="0"
                    />

                    <Text style={styles.label}>Activity Level</Text>
                    <SegmentedControl
                        options={[
                            { label: 'Sedentary', value: 'sedentary' },
                            { label: 'Moderate', value: 'moderate' },
                            { label: 'Active', value: 'active' },
                        ]}
                        value={activityLevel}
                        onChange={setActivityLevel}
                    />

                    <Text style={styles.label}>Goal</Text>
                    <SegmentedControl
                        options={[
                            { label: 'Lose', value: 'lose' },
                            { label: 'Maintain', value: 'maintain' },
                            { label: 'Gain', value: 'gain' },
                        ]}
                        value={goal}
                        onChange={setGoal}
                    />

                    <Text style={styles.label}>Health Conditions (Optional)</Text>
                    {HEALTH_CONDITIONS.map((condition) => (
                        <SelectableCard
                            key={condition.value}
                            title={condition.label}
                            selected={healthConditions.includes(condition.value)}
                            onPress={() => toggleHealthCondition(condition.value)}
                        />
                    ))}
                </View>

                {/* Daily Targets Section (Read-only) */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Daily Targets</Text>
                    <Text style={styles.sectionSubtitle}>Calculated based on your goals</Text>

                    <View style={styles.caloriesCard}>
                        <Text style={styles.caloriesLabel}>Daily Calorie Target</Text>
                        <Text style={styles.caloriesValue}>{user?.onboarding?.dailyTargets?.calories || 0}</Text>
                        <Text style={styles.caloriesUnit}>calories</Text>
                    </View>

                    <MacroBar
                        label="Protein"
                        value={user?.onboarding?.dailyTargets?.protein || 0}
                        unit="g"
                        color={colors.primary}
                        percentage={100}
                    />
                    <MacroBar
                        label="Carbs"
                        value={user?.onboarding?.dailyTargets?.carbs || 0}
                        unit="g"
                        color={colors.accent}
                        percentage={100}
                    />
                    <MacroBar
                        label="Fats"
                        value={user?.onboarding?.dailyTargets?.fats || 0}
                        unit="g"
                        color={colors.secondary}
                        percentage={100}
                    />
                </View>

                <View style={styles.footer}>
                    <BaseButton
                        title="Save Changes"
                        onPress={handleSave}
                        loading={isUpdating}
                        fullWidth
                    />
                </View>
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: spacing.lg,
    },
    section: {
        marginBottom: spacing.xl,
    },
    sectionTitle: {
        ...typography.styles.h3,
        color: colors.textPrimary,
        marginBottom: spacing.md,
    },
    label: {
        ...typography.styles.bodyMedium,
        color: colors.textSecondary,
        marginBottom: spacing.xs,
        marginTop: spacing.md,
    },
    row: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    halfInput: {
        flex: 1,
    },
    sectionSubtitle: {
        ...typography.styles.bodyRegular,
        color: colors.textSecondary,
        marginBottom: spacing.md,
    },
    caloriesCard: {
        backgroundColor: colors.primary,
        borderRadius: 16,
        padding: spacing.xl,
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    caloriesLabel: {
        ...typography.styles.bodyRegular,
        color: colors.backgroundWhite,
        marginBottom: spacing.sm,
        opacity: 0.9,
    },
    caloriesValue: {
        ...typography.styles.h1,
        fontSize: 48,
        color: colors.backgroundWhite,
        fontWeight: '700',
        marginBottom: spacing.xs,
    },
    caloriesUnit: {
        ...typography.styles.bodySmall,
        color: colors.backgroundWhite,
        opacity: 0.8,
    },
    footer: {
        marginTop: spacing.md,
        marginBottom: spacing.xl,
    },
});
