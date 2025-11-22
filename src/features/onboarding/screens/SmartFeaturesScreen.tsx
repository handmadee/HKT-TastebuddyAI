/**
 * Smart Features Screen
 *
 * Sixth step of onboarding - enable smart features and permissions
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import * as Notifications from 'expo-notifications';
import { Camera } from 'expo-camera';
import { OnboardingContainer } from '../components/OnboardingContainer';
import { PermissionCard } from '../components/PermissionCard';
import { useOnboardingStore } from '../stores/onboardingStore';
import { spacing, typography, colors } from '../../../theme';

export const SmartFeaturesScreen: React.FC = () => {
    const router = useRouter();
    const { smartFeatures, setSmartFeature, currentStep, totalSteps, nextStep, previousStep } =
        useOnboardingStore();

    const [permissions, setPermissions] = useState(smartFeatures);

    const requestCameraPermission = async () => {
        try {
            const { status } = await Camera.requestCameraPermissionsAsync();
            const enabled = status === 'granted';
            setPermissions((prev) => ({ ...prev, cameraAccess: enabled }));
            setSmartFeature('cameraAccess', enabled);
        } catch (error) {
            console.error('Camera permission error:', error);
        }
    };

    const requestNotificationPermission = async () => {
        try {
            const { status } = await Notifications.requestPermissionsAsync();
            const enabled = status === 'granted';
            setPermissions((prev) => ({ ...prev, notifications: enabled }));
            setSmartFeature('notifications', enabled);
        } catch (error) {
            console.error('Notification permission error:', error);
        }
    };

    const handleNext = () => {
        nextStep();
        router.push('/(onboarding)/location-permission');
    };

    const handleBack = () => {
        previousStep();
        router.back();
    };

    return (
        <OnboardingContainer
            title="Enable smart features"
            subtitle="Allow permissions to unlock powerful AI features"
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={handleNext}
            onBack={handleBack}
        >
            <View style={styles.content}>
                <PermissionCard
                    icon={<Text style={{ fontSize: 28 }}>📸</Text>}
                    title="Camera Access"
                    description="Scan food items and menus instantly with your camera"
                    enabled={permissions.cameraAccess}
                    onToggle={requestCameraPermission}
                />

                <PermissionCard
                    icon={<Text style={{ fontSize: 28 }}>🔔</Text>}
                    title="Notifications"
                    description="Get reminders and nutrition insights throughout the day"
                    enabled={permissions.notifications}
                    onToggle={requestNotificationPermission}
                />

                <View style={styles.infoCard}>
                    <Text style={styles.infoIcon}>ℹ️</Text>
                    <Text style={styles.infoText}>
                        You can change these permissions anytime in your device settings.
                    </Text>
                </View>
            </View>
        </OnboardingContainer>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    infoCard: {
        flexDirection: 'row',
        backgroundColor: colors.backgroundAlt,
        borderRadius: 12,
        padding: spacing.md,
        marginTop: spacing.lg,
        alignItems: 'flex-start',
    },
    infoIcon: {
        fontSize: 20,
        marginRight: spacing.sm,
    },
    infoText: {
        ...typography.styles.bodySmall,
        color: colors.textSecondary,
        flex: 1,
        lineHeight: 20,
    },
});
