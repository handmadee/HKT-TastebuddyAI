/**
 * AllergenWarningScreen
 *
 * Warning screen showing detected allergens
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../../../shared/components/layout/Screen';
import { BaseButton } from '../../../shared/components/base/BaseButton';
import { AllergenAlert } from '../components/AllergenAlert';
import { useScanStore } from '../stores/scanStore';
import { useOnboardingStore } from '../../onboarding/stores/onboardingStore';
import {
    checkForUserAllergens,
    getAllergenSeverityLevel,
    generateAllergenWarningMessage,
    calculateSafetyScore,
} from '../utils/allergenChecker';
import { colors, spacing, typography, borderRadius } from '../../../theme';

export const AllergenWarningScreen: React.FC = () => {
    const router = useRouter();
    const { currentScan, saveScanResult } = useScanStore();
    const { allergens: userAllergens } = useOnboardingStore();

    if (!currentScan) {
        router.replace('/scan');
        return null;
    }

    const matchedAllergens = checkForUserAllergens(currentScan.allergens, userAllergens);
    const severityLevel = getAllergenSeverityLevel(matchedAllergens);
    const warningMessage = generateAllergenWarningMessage(matchedAllergens, severityLevel);
    const safetyScore = calculateSafetyScore(currentScan, userAllergens);

    const handleViewDetails = async () => {
        await saveScanResult(currentScan);
        router.push('/scan/result');
    };

    const handleScanAgain = () => {
        router.replace('/scan');
    };

    return (
        <Screen safeArea padding>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Warning Alert */}
                <AllergenAlert
                    allergens={matchedAllergens}
                    severity={severityLevel}
                    message={warningMessage}
                />

                {/* Food Info Card */}
                <View style={styles.foodCard}>
                    <Text style={styles.foodName}>{currentScan.name}</Text>
                    <Text style={styles.confidence}>
                        Confidence: {currentScan.confidence}%
                    </Text>

                    <View style={styles.safetyScoreContainer}>
                        <Text style={styles.safetyScoreLabel}>Safety Score</Text>
                        <Text
                            style={[
                                styles.safetyScore,
                                {
                                    color:
                                        safetyScore >= 80
                                            ? colors.success
                                            : safetyScore >= 50
                                            ? colors.warning
                                            : colors.error,
                                },
                            ]}
                        >
                            {safetyScore}/100
                        </Text>
                    </View>
                </View>

                {/* Allergen Count */}
                <View style={styles.allergenCountCard}>
                    <Text style={styles.allergenCountTitle}>
                        Contains {matchedAllergens.length} allergen
                        {matchedAllergens.length !== 1 ? 's' : ''} from your profile
                    </Text>
                    <Text style={styles.allergenCountSubtitle}>
                        Based on your allergen profile, we recommend avoiding this dish.
                    </Text>
                </View>

                {/* Action Buttons */}
                <View style={styles.buttonContainer}>
                    <BaseButton
                        title="View Full Details"
                        variant="secondary"
                        size="large"
                        onPress={handleViewDetails}
                        fullWidth
                        style={styles.button}
                    />

                    <BaseButton
                        title="Scan Another Dish"
                        variant="primary"
                        size="large"
                        onPress={handleScanAgain}
                        fullWidth
                        style={styles.button}
                    />
                </View>
            </ScrollView>
        </Screen>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: spacing.xxl,
    },
    foodCard: {
        backgroundColor: colors.card,
        borderRadius: borderRadius.card,
        padding: spacing.lg,
        marginBottom: spacing.lg,
    },
    foodName: {
        ...typography.styles.h2,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.bold,
        marginBottom: spacing.xs,
    },
    confidence: {
        ...typography.styles.bodyRegular,
        color: colors.textSecondary,
        marginBottom: spacing.lg,
    },
    safetyScoreContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    safetyScoreLabel: {
        ...typography.styles.bodyLarge,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.medium,
    },
    safetyScore: {
        ...typography.styles.h2,
        fontWeight: typography.fontWeight.bold,
    },
    allergenCountCard: {
        backgroundColor: colors.errorLight,
        borderRadius: borderRadius.card,
        padding: spacing.lg,
        marginBottom: spacing.xl,
    },
    allergenCountTitle: {
        ...typography.styles.bodyLarge,
        color: colors.error,
        fontWeight: typography.fontWeight.semibold,
        marginBottom: spacing.sm,
    },
    allergenCountSubtitle: {
        ...typography.styles.bodyRegular,
        color: colors.textSecondary,
    },
    buttonContainer: {
        gap: spacing.md,
    },
    button: {
        marginBottom: spacing.sm,
    },
});
