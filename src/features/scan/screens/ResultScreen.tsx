/**
 * ResultScreen
 *
 * Displays detailed scan results with nutrition and ingredients
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../../../shared/components/layout/Screen';
import { BaseButton } from '../../../shared/components/base/BaseButton';
import { NutritionCard } from '../components/NutritionCard';
import { IngredientsList } from '../components/IngredientsList';
import { AllergenAlert } from '../components/AllergenAlert';
import { useScanStore } from '../stores/scanStore';
import { useOnboardingStore } from '../../onboarding/stores/onboardingStore';
import {
    checkForUserAllergens,
    getAllergenSeverityLevel,
    generateAllergenWarningMessage,
} from '../utils/allergenChecker';
import { colors, spacing, typography, borderRadius, shadows } from '../../../theme';

export const ResultScreen: React.FC = () => {
    const router = useRouter();
    const { currentScan, saveScanResult } = useScanStore();
    const { allergens: userAllergens } = useOnboardingStore();

    useEffect(() => {
        if (currentScan) {
            // Save to history
            saveScanResult(currentScan);
        }
    }, [currentScan]);

    if (!currentScan) {
        router.replace('/scan');
        return null;
    }

    const matchedAllergens = checkForUserAllergens(currentScan.allergens, userAllergens);
    const severityLevel = getAllergenSeverityLevel(matchedAllergens);
    const warningMessage = generateAllergenWarningMessage(matchedAllergens, severityLevel);

    const handleScanAgain = () => {
        router.replace('/scan');
    };

    return (
        <Screen safeArea padding>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Food Image */}
                <View style={styles.imageContainer}>
                    <Image source={{ uri: currentScan.imageUri }} style={styles.image} />

                    {currentScan.cuisine && (
                        <View style={styles.cuisineBadge}>
                            <Text style={styles.cuisineBadgeText}>{currentScan.cuisine}</Text>
                        </View>
                    )}
                </View>

                {/* Food Name and Confidence */}
                <View style={styles.headerCard}>
                    <Text style={styles.foodName}>{currentScan.name}</Text>

                    {currentScan.description && (
                        <Text style={styles.description}>{currentScan.description}</Text>
                    )}

                    <View style={styles.confidenceContainer}>
                        <Text style={styles.confidenceLabel}>Detection Confidence</Text>
                        <View style={styles.confidenceBar}>
                            <View
                                style={[
                                    styles.confidenceFill,
                                    { width: `${currentScan.confidence}%` },
                                ]}
                            />
                        </View>
                        <Text style={styles.confidenceValue}>{currentScan.confidence}%</Text>
                    </View>
                </View>

                {/* Safety Status */}
                {matchedAllergens.length === 0 ? (
                    <View style={styles.safeCard}>
                        <Text style={styles.safeIcon}>✓</Text>
                        <Text style={styles.safeTitle}>Safe for you</Text>
                        <Text style={styles.safeMessage}>
                            • No allergens detected for your profile.
                        </Text>
                        {currentScan.name.toLowerCase().includes('vegetarian') ||
                        currentScan.name.toLowerCase().includes('vegan') ? (
                            <Text style={styles.safeMessage}>
                                • Matches your dietary preference.
                            </Text>
                        ) : null}
                    </View>
                ) : (
                    <AllergenAlert
                        allergens={matchedAllergens}
                        severity={severityLevel}
                        message={warningMessage}
                    />
                )}

                {/* Nutrition Information */}
                <NutritionCard nutrition={currentScan.nutrition} showDetailed />

                {/* Ingredients List */}
                <View style={{ marginTop: spacing.lg }}>
                    <IngredientsList ingredients={currentScan.ingredients} />
                </View>

                {/* Action Buttons */}
                <View style={styles.buttonContainer}>
                    <BaseButton
                        title="Scan Another Dish"
                        variant="primary"
                        size="large"
                        onPress={handleScanAgain}
                        fullWidth
                    />

                    <BaseButton
                        title="Add to Journal"
                        variant="secondary"
                        size="large"
                        onPress={() => {
                            // TODO: Add to food journal
                            router.push('/(main)/(tabs)/journal');
                        }}
                        fullWidth
                        style={styles.secondaryButton}
                    />
                </View>

                {/* Timestamp */}
                <Text style={styles.timestamp}>
                    Scanned {new Date(currentScan.timestamp).toLocaleString()}
                </Text>
            </ScrollView>
        </Screen>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: spacing.xxl,
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: 250,
        borderRadius: borderRadius.card,
        overflow: 'hidden',
        marginBottom: spacing.lg,
        ...shadows.card,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    cuisineBadge: {
        position: 'absolute',
        top: spacing.md,
        right: spacing.md,
        backgroundColor: colors.primary,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.badge,
    },
    cuisineBadgeText: {
        ...typography.styles.bodySmall,
        color: colors.backgroundWhite,
        fontWeight: typography.fontWeight.semibold,
    },
    headerCard: {
        backgroundColor: colors.card,
        borderRadius: borderRadius.card,
        padding: spacing.lg,
        marginBottom: spacing.lg,
        ...shadows.card,
    },
    foodName: {
        ...typography.styles.h1,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.bold,
        marginBottom: spacing.sm,
    },
    description: {
        ...typography.styles.bodyRegular,
        color: colors.textSecondary,
        marginBottom: spacing.lg,
        lineHeight: 22,
    },
    confidenceContainer: {
        paddingTop: spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    confidenceLabel: {
        ...typography.styles.bodySmall,
        color: colors.textSecondary,
        marginBottom: spacing.xs,
    },
    confidenceBar: {
        height: 8,
        backgroundColor: colors.backgroundGray,
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: spacing.xs,
    },
    confidenceFill: {
        height: '100%',
        backgroundColor: colors.primary,
        borderRadius: 4,
    },
    confidenceValue: {
        ...typography.styles.bodySmall,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.semibold,
        textAlign: 'right',
    },
    buttonContainer: {
        marginTop: spacing.xl,
        gap: spacing.md,
    },
    secondaryButton: {
        marginTop: spacing.sm,
    },
    safeCard: {
        backgroundColor: '#ECFDF5', // Light green
        borderRadius: borderRadius.card,
        padding: spacing.lg,
        marginBottom: spacing.lg,
    },
    safeIcon: {
        fontSize: 40,
        color: colors.success,
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    safeTitle: {
        ...typography.styles.h3,
        color: colors.success,
        fontWeight: typography.fontWeight.bold,
        marginBottom: spacing.sm,
        textAlign: 'center',
    },
    safeMessage: {
        ...typography.styles.bodyRegular,
        color: '#065F46', // Dark green
        marginBottom: spacing.xs,
    },
    timestamp: {
        ...typography.styles.caption,
        color: colors.textDisabled,
        textAlign: 'center',
        marginTop: spacing.lg,
    },
});
