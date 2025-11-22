/**
 * Language Selection Screen
 *
 * First step of onboarding - select preferred language
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { OnboardingContainer } from '../components/OnboardingContainer';
import { SelectableCard } from '../components/SelectableCard';
import { useOnboardingStore } from '../stores/onboardingStore';
import { LANGUAGES } from '../constants/languages';
import { colors, typography, spacing } from '../../../theme';

export const LanguageSelectionScreen: React.FC = () => {
    const router = useRouter();
    const { language, setLanguage, currentStep, totalSteps, nextStep } = useOnboardingStore();
    const [selectedLanguage, setSelectedLanguage] = useState(language);

    const handleNext = () => {
        setLanguage(selectedLanguage);
        nextStep();
        router.push('/(onboarding)/dietary-preferences');
    };

    return (
        <OnboardingContainer
            title="Choose your language"
            subtitle="Select your preferred language for the app"
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={handleNext}
            nextDisabled={!selectedLanguage}
        >
            <FlatList
                data={LANGUAGES}
                keyExtractor={(item) => item.code}
                renderItem={({ item }) => (
                    <SelectableCard
                        title={item.nativeName}
                        subtitle={item.name}
                        icon={<Text style={styles.flag}>{item.flag}</Text>}
                        selected={selectedLanguage === item.code}
                        onPress={() => setSelectedLanguage(item.code)}
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
    flag: {
        fontSize: 32,
    },
});
