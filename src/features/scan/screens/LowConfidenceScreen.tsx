/**
 * LowConfidenceScreen
 *
 * Screen shown when AI confidence is low (<70%)
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../../../shared/components/layout/Screen';
import { BaseButton } from '../../../shared/components/base/BaseButton';
import { useScanStore } from '../stores/scanStore';
import { colors, spacing, typography, borderRadius, shadows } from '../../../theme';

export const LowConfidenceScreen: React.FC = () => {
    const router = useRouter();
    const { currentScan, saveScanResult } = useScanStore();
    const [dishName, setDishName] = useState('');

    if (!currentScan) {
        router.replace('/scan');
        return null;
    }

    const handleSubmitName = async () => {
        if (dishName.trim()) {
            // Update scan result with user-provided name
            const updatedScan = {
                ...currentScan,
                name: dishName.trim(),
            };

            await saveScanResult(updatedScan);

            // TODO: Send feedback to backend to improve AI
            // await apiClient.post('/food/feedback', { dishName, imageUri });

            router.push('/scan/result');
        }
    };

    const handleScanAgain = () => {
        router.replace('/scan');
    };

    const handleLogManually = () => {
        // TODO: Navigate to manual food logging
        router.push('/(main)/(tabs)/journal');
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
                </View>

                {/* Dish Name */}
                <Text style={styles.dishName}>{currentScan.name}</Text>

                {/* Warning Card */}
                <View style={styles.warningCard}>
                    <Text style={styles.warningIcon}>⚠️</Text>
                    <Text style={styles.warningTitle}>We're not sure</Text>
                    <Text style={styles.warningMessage}>
                        Our confidence is low ({currentScan.confidence}%). Please double-check with
                        the restaurant staff before eating to avoid allergens.
                    </Text>
                </View>

                {/* Help Improve Section */}
                <View style={styles.helpCard}>
                    <Text style={styles.helpTitle}>Help improve TastebuddyAI</Text>
                    <Text style={styles.helpSubtitle}>
                        This dish is new to our database. Tell us its name if you know it.
                    </Text>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Type dish name here..."
                            placeholderTextColor={colors.textPlaceholder}
                            value={dishName}
                            onChangeText={setDishName}
                            autoCapitalize="words"
                        />
                        <BaseButton
                            title="Submit"
                            variant="primary"
                            size="medium"
                            onPress={handleSubmitName}
                            disabled={!dishName.trim()}
                            style={styles.submitButton}
                        />
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.buttonContainer}>
                    <BaseButton
                        title="Scan another dish"
                        variant="primary"
                        size="large"
                        onPress={handleScanAgain}
                        fullWidth
                    />

                    <BaseButton
                        title="Log manually"
                        variant="secondary"
                        size="large"
                        onPress={handleLogManually}
                        fullWidth
                        style={styles.secondaryButton}
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
    imageContainer: {
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
    dishName: {
        ...typography.styles.h1,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.bold,
        marginBottom: spacing.lg,
        textAlign: 'center',
    },
    warningCard: {
        backgroundColor: '#FEF3C7', // Light yellow
        borderRadius: borderRadius.card,
        padding: spacing.lg,
        marginBottom: spacing.lg,
        alignItems: 'center',
    },
    warningIcon: {
        fontSize: 48,
        marginBottom: spacing.sm,
    },
    warningTitle: {
        ...typography.styles.h3,
        color: '#92400E', // Dark yellow
        fontWeight: typography.fontWeight.bold,
        marginBottom: spacing.sm,
        textAlign: 'center',
    },
    warningMessage: {
        ...typography.styles.bodyRegular,
        color: '#78350F', // Darker yellow
        textAlign: 'center',
        lineHeight: 22,
    },
    helpCard: {
        backgroundColor: colors.card,
        borderRadius: borderRadius.card,
        padding: spacing.lg,
        marginBottom: spacing.xl,
        ...shadows.card,
    },
    helpTitle: {
        ...typography.styles.h3,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.semibold,
        marginBottom: spacing.sm,
    },
    helpSubtitle: {
        ...typography.styles.bodyRegular,
        color: colors.textSecondary,
        marginBottom: spacing.lg,
        lineHeight: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        gap: spacing.sm,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: colors.backgroundGray,
        borderRadius: borderRadius.input,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        ...typography.styles.bodyRegular,
        color: colors.textPrimary,
        height: 44,
    },
    submitButton: {
        minWidth: 100,
    },
    buttonContainer: {
        gap: spacing.md,
    },
    secondaryButton: {
        marginTop: spacing.sm,
    },
});
