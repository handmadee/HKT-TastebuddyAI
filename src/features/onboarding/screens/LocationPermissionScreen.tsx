/**
 * Location Permission Screen
 *
 * Seventh step of onboarding - request location permission
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { OnboardingContainer } from '../components/OnboardingContainer';
import { BaseButton } from '../../../shared/components/base/BaseButton';
import { useOnboardingStore } from '../stores/onboardingStore';
import { spacing, typography, colors, borderRadius } from '../../../theme';

export const LocationPermissionScreen: React.FC = () => {
    const router = useRouter();
    const { setSmartFeature, currentStep, totalSteps, nextStep, previousStep } =
        useOnboardingStore();

    const [locationEnabled, setLocationEnabled] = useState(false);
    const [isRequesting, setIsRequesting] = useState(false);

    const requestLocationPermission = async () => {
        setIsRequesting(true);
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            const enabled = status === 'granted';
            setLocationEnabled(enabled);
            setSmartFeature('locationAccess', enabled);
        } catch (error) {
            console.error('Location permission error:', error);
        } finally {
            setIsRequesting(false);
        }
    };

    const handleNext = () => {
        nextStep();
        router.push('/(onboarding)/completion');
    };

    const handleSkip = () => {
        setSmartFeature('locationAccess', false);
        nextStep();
        router.push('/(onboarding)/completion');
    };

    const handleBack = () => {
        previousStep();
        router.back();
    };

    return (
        <OnboardingContainer
            title="Find places near you"
            subtitle="Enable location to discover restaurants and food options nearby"
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={locationEnabled ? handleNext : undefined}
            onBack={handleBack}
            showProgress={true}
        >
            <View style={styles.content}>
                <View style={styles.illustrationContainer}>
                    <View style={styles.mapPlaceholder}>
                        <Text style={styles.mapIcon}>🗺️</Text>
                        <Text style={styles.mapText}>Map View</Text>
                    </View>
                </View>

                <View style={styles.featuresContainer}>
                    <View style={styles.feature}>
                        <Text style={styles.featureIcon}>🍽️</Text>
                        <View style={styles.featureTextContainer}>
                            <Text style={styles.featureText}>
                                Find restaurants that match your dietary preferences
                            </Text>
                        </View>
                    </View>

                    <View style={styles.feature}>
                        <Text style={styles.featureIcon}>🎯</Text>
                        <View style={styles.featureTextContainer}>
                            <Text style={styles.featureText}>
                                Get personalized food recommendations based on your location
                            </Text>
                        </View>
                    </View>

                    <View style={styles.feature}>
                        <Text style={styles.featureIcon}>🔍</Text>
                        <View style={styles.featureTextContainer}>
                            <Text style={styles.featureText}>
                                Discover new places with nutrition-friendly options
                            </Text>
                        </View>
                    </View>
                </View>

                {!locationEnabled && (
                    <BaseButton
                        title="Enable Location"
                        variant="primary"
                        size="large"
                        fullWidth
                        onPress={requestLocationPermission}
                        loading={isRequesting}
                        style={styles.enableButton}
                    />
                )}

                {!locationEnabled && (
                    <BaseButton
                        title="Skip for now"
                        variant="ghost"
                        size="medium"
                        fullWidth
                        onPress={handleSkip}
                        style={styles.skipButton}
                    />
                )}

                {locationEnabled && (
                    <View style={styles.successCard}>
                        <Text style={styles.successIcon}>✅</Text>
                        <Text style={styles.successText}>Location access enabled!</Text>
                    </View>
                )}
            </View>
        </OnboardingContainer>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'space-between',
    },
    illustrationContainer: {
        alignItems: 'center',
        marginVertical: spacing.xl,
    },
    mapPlaceholder: {
        width: '100%',
        height: 200,
        backgroundColor: colors.backgroundGray,
        borderRadius: borderRadius.card,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: colors.border,
        borderStyle: 'dashed',
    },
    mapIcon: {
        fontSize: 48,
        marginBottom: spacing.sm,
    },
    mapText: {
        ...typography.styles.bodyRegular,
        color: colors.textSecondary,
    },
    featuresContainer: {
        marginBottom: spacing.xl,
    },
    feature: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: spacing.md,
    },
    featureIcon: {
        fontSize: 24,
        marginRight: spacing.md,
        marginTop: 2,
    },
    featureTextContainer: {
        flex: 1,
    },
    featureText: {
        ...typography.styles.bodyRegular,
        color: colors.textPrimary,
        lineHeight: 22,
    },
    enableButton: {
        marginBottom: spacing.md,
    },
    skipButton: {
        marginTop: spacing.sm,
    },
    successCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.backgroundMain,
        borderRadius: borderRadius.card,
        padding: spacing.lg,
        borderWidth: 2,
        borderColor: colors.secondary,
    },
    successIcon: {
        fontSize: 24,
        marginRight: spacing.sm,
    },
    successText: {
        ...typography.styles.bodyMedium,
        color: colors.textSuccess,
        fontWeight: '600',
    },
});
