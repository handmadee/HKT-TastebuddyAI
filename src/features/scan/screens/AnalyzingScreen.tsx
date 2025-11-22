/**
 * AnalyzingScreen
 *
 * Loading screen while analyzing food image
 */

import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Screen } from '../../../shared/components/layout/Screen';
import { AnalyzingAnimation } from '../components/AnalyzingAnimation';
import { useScanStore } from '../stores/scanStore';
import { useOnboardingStore } from '../../onboarding/stores/onboardingStore';
import { checkForUserAllergens, getAllergenSeverityLevel } from '../utils/allergenChecker';

export const AnalyzingScreen: React.FC = () => {
    const router = useRouter();
    const { currentScan, isAnalyzing, error } = useScanStore();
    const { allergens: userAllergens } = useOnboardingStore();

    useEffect(() => {
        // When analysis is complete, navigate to appropriate screen
        if (!isAnalyzing && currentScan) {
            // Check confidence level first
            if (currentScan.confidence < 70) {
                router.replace('/scan/low-confidence');
                return;
            }

            // Check for allergens
            const matchedAllergens = checkForUserAllergens(
                currentScan.allergens,
                userAllergens
            );

            const severityLevel = getAllergenSeverityLevel(matchedAllergens);

            // Navigate based on allergen severity
            if (severityLevel === 'danger' || severityLevel === 'warning') {
                router.replace('/scan/allergen-warning');
            } else {
                router.replace('/scan/result');
            }
        }

        // Handle error
        if (error) {
            // Show error and go back
            router.back();
        }
    }, [isAnalyzing, currentScan, error, userAllergens]);

    return (
        <Screen safeArea>
            <AnalyzingAnimation message="Analyzing dish..." />
        </Screen>
    );
};
