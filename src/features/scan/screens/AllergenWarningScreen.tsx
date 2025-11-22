/**
 * AllergenWarningScreen
 *
 * Warning screen showing detected allergens
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../../../shared/components/layout/Screen';
import { BaseButton } from '../../../shared/components/base/BaseButton';
import { useScanStore } from '../stores/scanStore';
import { useOnboardingStore } from '../../onboarding/stores/onboardingStore';
import {
    checkForUserAllergens,
    getAllergenSeverityLevel,
    generateAllergenWarningMessage,
    calculateSafetyScore,
} from '../utils/allergenChecker';
import { DetectedAllergen } from '../types';
import { colors, spacing, typography, borderRadius, shadows } from '../../../theme';

export const AllergenWarningScreen: React.FC = () => {
    const router = useRouter();
    const { currentScan, saveScanResult } = useScanStore();
    const { allergens: userAllergens } = useOnboardingStore();

    // Animation refs
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const shakeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Entrance animations
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
        ]).start();

        // Warning shake animation
        Animated.sequence([
            Animated.timing(shakeAnim, {
                toValue: 10,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
                toValue: -10,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
                toValue: 10,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    if (!currentScan) {
        router.replace('/scan' as any);
        return null;
    }

    const matchedAllergens = checkForUserAllergens(currentScan.allergens, userAllergens);
    const severityLevel = getAllergenSeverityLevel(matchedAllergens);
    const warningMessage = generateAllergenWarningMessage(matchedAllergens, severityLevel);
    const safetyScore = calculateSafetyScore(currentScan, userAllergens);

    const handleViewDetails = async () => {
        await saveScanResult(currentScan);
        router.push('/scan/result' as any);
    };

    const handleScanAgain = () => {
        router.replace('/scan' as any);
    };

    const handleSeeAlternatives = () => {
        // TODO: Navigate to alternatives screen
        // For now, just go to home
        router.push('/(main)/(tabs)' as any);
    };

    return (
        <Screen>
            <Animated.View
                style={[
                    styles.container,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                    },
                ]}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* Food Image */}
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: currentScan.imageUri }}
                            style={styles.image}
                        />
                    </View>

                    {/* Warning Card */}
                    <Animated.View
                        style={[
                            styles.warningCard,
                            { transform: [{ translateX: shakeAnim }] },
                        ]}
                    >
                        <Text style={styles.warningTitle}>Warning:</Text>
                        <Text style={styles.warningMessage}>Do not eat this dish</Text>
                        <Text style={styles.warningSubtitle}>
                            We detected critical allergens in this dish.
                        </Text>
                    </Animated.View>

                    {/* Critical Allergens Section */}
                    <View style={styles.allergensSection}>
                        <Text style={styles.sectionTitle}>
                            CRITICAL ALLERGENS FOR YOUR PROFILE
                        </Text>

                        {matchedAllergens.map((allergen, index) => (
                            <AllergenItem key={index} allergen={allergen} />
                        ))}
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.buttonContainer}>
                        <BaseButton
                            title="View details"
                            variant="secondary"
                            size="large"
                            onPress={handleViewDetails}
                            fullWidth
                            style={styles.viewDetailsButton}
                        />

                        <BaseButton
                            title="See alternatives"
                            variant="secondary"
                            size="large"
                            onPress={handleSeeAlternatives}
                            fullWidth
                            style={styles.alternativesButton}
                        />
                    </View>
                </ScrollView>
            </Animated.View>
        </Screen>
    );
};

// Allergen Item Component
interface AllergenItemProps {
    allergen: DetectedAllergen;
}

const AllergenItem: React.FC<AllergenItemProps> = ({ allergen }) => {
    const getIcon = (severity: string) => {
        switch (severity) {
            case 'severe':
                return '🔴';
            case 'moderate':
                return '⚠️';
            default:
                return '🟡';
        }
    };

    const getRisk = (severity: string) => {
        switch (severity) {
            case 'severe':
                return 'Life-threatening. Risk: Anaphylaxis.';
            case 'moderate':
                return 'Severe. Risk: Hives, swelling.';
            default:
                return 'Mild discomfort.';
        }
    };

    return (
        <View style={styles.allergenItem}>
            <Text style={styles.allergenIcon}>{getIcon(allergen.severity)}</Text>
            <View style={styles.allergenContent}>
                <Text style={styles.allergenName}>
                    {allergen.type.charAt(0).toUpperCase() + allergen.type.slice(1)}{' '}
                    {allergen.source ? `(${allergen.source})` : ''}
                </Text>
                <Text style={styles.allergenRisk}>
                    Your allergy: {getRisk(allergen.severity)}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.error,
    },
    scrollContent: {
        paddingBottom: spacing.xxxl,
    },
    imageContainer: {
        margin: spacing.lg,
        borderRadius: borderRadius.card,
        overflow: 'hidden',
        borderWidth: 4,
        borderColor: colors.backgroundWhite,
        ...shadows.strong,
    },
    image: {
        width: '100%',
        height: 200,
    },
    warningCard: {
        backgroundColor: colors.error,
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.lg,
    },
    warningTitle: {
        ...typography.styles.h1,
        color: colors.backgroundWhite,
        fontWeight: typography.fontWeight.bold,
        marginBottom: spacing.xs,
    },
    warningMessage: {
        ...typography.styles.h1,
        color: colors.backgroundWhite,
        fontWeight: typography.fontWeight.bold,
        marginBottom: spacing.md,
    },
    warningSubtitle: {
        ...typography.styles.bodyRegular,
        color: colors.backgroundWhite,
        lineHeight: 24,
    },
    allergensSection: {
        backgroundColor: colors.backgroundWhite,
        margin: spacing.lg,
        borderRadius: borderRadius.card,
        padding: spacing.lg,
        ...shadows.card,
    },
    sectionTitle: {
        ...typography.styles.bodySmall,
        color: colors.textSecondary,
        fontWeight: typography.fontWeight.semibold,
        letterSpacing: 0.5,
        marginBottom: spacing.lg,
    },
    allergenItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    allergenIcon: {
        fontSize: 24,
        marginRight: spacing.md,
        marginTop: 2,
    },
    allergenContent: {
        flex: 1,
    },
    allergenName: {
        ...typography.styles.bodyRegular,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.semibold,
        marginBottom: spacing.xs,
    },
    allergenRisk: {
        ...typography.styles.bodySmall,
        color: colors.error,
        lineHeight: 18,
    },
    buttonContainer: {
        paddingHorizontal: spacing.lg,
        gap: spacing.md,
    },
    viewDetailsButton: {
        backgroundColor: colors.backgroundWhite,
        borderWidth: 0,
    },
    alternativesButton: {
        backgroundColor: 'transparent',
        borderWidth: 0,
    },
});
