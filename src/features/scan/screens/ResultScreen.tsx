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
import { FoodScanResult, MenuScanResult } from '../types';
import { colors, spacing, typography, borderRadius, shadows } from '../../../theme';

// Type guard helper (moved outside component)
const isFoodScan = (scan: FoodScanResult | MenuScanResult): scan is FoodScanResult => {
    return 'name' in scan && 'ingredients' in scan;
};

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

    // Handle MenuScanResult redirect in useEffect
    useEffect(() => {
        if (currentScan && !isFoodScan(currentScan)) {
            // TODO: Redirect to MenuResultScreen for MenuScanResult
            console.warn('MenuScanResult detected, but ResultScreen only handles FoodScanResult');
            router.replace('/scan');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentScan]);

    if (!currentScan) {
        router.replace('/scan');
        return null;
    }

    // Early return if MenuScanResult (redirect handled in useEffect)
    if (!isFoodScan(currentScan)) {
        return null;
    }

    // TypeScript type assertion sau type guard
    const foodScan = currentScan as FoodScanResult;

    const matchedAllergens = checkForUserAllergens(foodScan.allergens, userAllergens);
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
                    <Image source={{ uri: foodScan.imageUri }} style={styles.image} />

                    {foodScan.cuisine && (
                        <View style={styles.cuisineBadge}>
                            <Text style={styles.cuisineBadgeText}>{foodScan.cuisine}</Text>
                        </View>
                    )}
                </View>

                {/* Food Name and Confidence */}
                <View style={styles.headerCard}>
                    <Text style={styles.foodName}>{foodScan.name}</Text>

                    {foodScan.description && (
                        <Text style={styles.description}>{foodScan.description}</Text>
                    )}

                    <View style={styles.confidenceContainer}>
                        <Text style={styles.confidenceLabel}>Độ tin cậy</Text>
                        <View style={styles.confidenceBar}>
                            <View
                                style={[
                                    styles.confidenceFill,
                                    { 
                                        width: `${foodScan.confidence}%`,
                                        backgroundColor: foodScan.confidence >= 70 
                                            ? colors.success 
                                            : foodScan.confidence >= 50 
                                            ? colors.accent  // Use accent for warning
                                            : colors.error   // Use error for danger
                                    },
                                ]}
                            />
                        </View>
                        <Text style={styles.confidenceValue}>
                            {foodScan.confidence}%
                            {foodScan.confidence < 70 && ' (Độ tin cậy thấp)'}
                        </Text>
                    </View>
                    
                    {foodScan.confidence < 70 && (
                        <View style={styles.lowConfidenceWarning}>
                            <Text style={styles.lowConfidenceText}>
                                ⚠️  Thông tin có thể không đầy đủ do chất lượng ảnh hoặc món ăn không phổ biến.
                            </Text>
                        </View>
                    )}
                </View>

                {/* Safety Status */}
                {foodScan.allergens.length === 0 ? (
                    // No allergen data
                    <View style={styles.infoCard}>
                        <Text style={styles.infoIcon}>ℹ️</Text>
                        <Text style={styles.infoTitle}>Thông tin dị ứng</Text>
                        <Text style={styles.infoMessage}>
                            {matchedAllergens.length === 0 
                                ? '✓ Không phát hiện dị ứng cho hồ sơ của bạn.'
                                : '⚠️  Chưa có dữ liệu phân tích dị ứng chi tiết.\n\nVui lòng thận trọng nếu bạn có dị ứng thực phẩm.'}
                        </Text>
                    </View>
                ) : matchedAllergens.length === 0 ? (
                    <View style={styles.safeCard}>
                        <Text style={styles.safeIcon}>✓</Text>
                        <Text style={styles.safeTitle}>An toàn cho bạn</Text>
                        <Text style={styles.safeMessage}>
                            • Không phát hiện dị ứng trong hồ sơ của bạn.
                        </Text>
                    </View>
                ) : (
                    <AllergenAlert
                        allergens={matchedAllergens}
                        severity={severityLevel}
                        message={warningMessage}
                    />
                )}

                {/* Nutrition Information */}
                <NutritionCard nutrition={foodScan.nutrition} showDetailed />

                {/* Ingredients List */}
                <View style={{ marginTop: spacing.lg }}>
                    {foodScan.ingredients.length > 0 ? (
                        <IngredientsList ingredients={foodScan.ingredients} />
                    ) : (
                        <View style={styles.noDataCard}>
                            <Text style={styles.noDataIcon}>📋</Text>
                            <Text style={styles.noDataTitle}>Thành phần chưa có</Text>
                            <Text style={styles.noDataMessage}>
                                Chúng tôi chưa có đủ thông tin chi tiết về thành phần của món này.
                                {'\n\n'}
                                Điều này có thể do:
                                {'\n'}• Món ăn không phổ biến
                                {'\n'}• Chất lượng ảnh chưa đủ rõ
                                {'\n'}• Chưa có dữ liệu trong hệ thống
                            </Text>
                        </View>
                    )}
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
                            router.push('/(main)/(tabs)/journal' as any);
                        }}
                        fullWidth
                        style={styles.secondaryButton}
                    />
                </View>

                {/* Timestamp */}
                <Text style={styles.timestamp}>
                    Scanned {new Date(foodScan.timestamp).toLocaleString()}
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
        color: colors.secondary,
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    safeTitle: {
        ...typography.styles.h3,
        color: colors.secondary,
        fontWeight: typography.fontWeight.bold,
        marginBottom: spacing.sm,
        textAlign: 'center',
    },
    safeMessage: {
        ...typography.styles.bodyRegular,
        color: colors.textPrimary,
        textAlign: 'center',
        lineHeight: 22,
    },
    timestamp: {
        ...typography.styles.caption,
        color: colors.textTertiary,
        textAlign: 'center',
        marginTop: spacing.lg,
    },
    noDataCard: {
        backgroundColor: colors.cardBackground,
        borderRadius: 16,
        padding: spacing.lg,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
    },
    noDataIcon: {
        fontSize: 40,
        marginBottom: spacing.sm,
    },
    noDataTitle: {
        ...typography.styles.h3,
        color: colors.textPrimary,
        marginBottom: spacing.sm,
    },
    noDataMessage: {
        ...typography.styles.bodyRegular,
        color: colors.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
    },
    infoCard: {
        backgroundColor: '#e6f7ff', // Light blue
        borderRadius: 16,
        padding: spacing.lg,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.primary,
        marginBottom: spacing.lg,
    },
    infoIcon: {
        fontSize: 40,
        marginBottom: spacing.sm,
    },
    infoTitle: {
        ...typography.styles.h3,
        color: colors.primary,
        marginBottom: spacing.sm,
    },
    infoMessage: {
        ...typography.styles.bodyRegular,
        color: colors.textPrimary,
        textAlign: 'center',
        lineHeight: 22,
    },
    lowConfidenceWarning: {
        backgroundColor: '#fff7e6', // Light orange
        borderRadius: 8,
        padding: spacing.md,
        marginTop: spacing.sm,
        borderWidth: 1,
        borderColor: colors.accent,
    },
    lowConfidenceText: {
        ...typography.styles.caption,
        color: colors.textPrimary,
        textAlign: 'center',
    },
});
