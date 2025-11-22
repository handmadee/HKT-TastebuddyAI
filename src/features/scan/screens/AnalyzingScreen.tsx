/**
 * AnalyzingScreen
 *
 * Progressive loading screen showing real-time analysis stages
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../../../shared/components/layout/Screen';
import { StageIndicator } from '../components/StageIndicator';
import * as Progress from 'react-native-progress';
import { useScanStore } from '../stores/scanStore';
import { useOnboardingStore } from '../../onboarding/stores/onboardingStore';
import { checkForUserAllergens, getAllergenSeverityLevel } from '../utils/allergenChecker';
import { ScanStage, MenuScanResult } from '../types';
import { colors, spacing, typography } from '../../../theme';

// Stage-specific messages in Vietnamese
const STAGE_MESSAGES: Record<ScanStage, string> = {
    [ScanStage.VALIDATION]: 'Đang kiểm tra hình ảnh...',
    [ScanStage.EXTRACTION]: 'Đang trích xuất menu...',
    [ScanStage.DISH_UNDERSTANDING]: 'Đang phân tích món ăn...',
    [ScanStage.ALLERGEN_ANALYSIS]: 'Đang kiểm tra dị ứng...',
    [ScanStage.DIETARY_ANALYSIS]: 'Đang kiểm tra chế độ ăn...',
    [ScanStage.NUTRITION_ANALYSIS]: 'Đang phân tích dinh dưỡng...',
    [ScanStage.PRICE_ANALYSIS]: 'Đang phân tích giá...',
    [ScanStage.FORMATTING]: 'Đang hoàn tất...',
};

export const AnalyzingScreen: React.FC = () => {
    const router = useRouter();
    const { currentScan, isAnalyzing, error, currentStage, progress, stageData, clearCurrentScan } = useScanStore();
    const { allergens: userAllergens } = useOnboardingStore();

    // Get dynamic stage message based on data
    const getStageMessage = (): string => {
        if (!currentStage) return 'Đang xử lý...';

        // Show custom messages based on stage data
        if (currentStage === ScanStage.EXTRACTION && stageData[ScanStage.EXTRACTION]?.totalItems) {
            return `Tìm thấy ${stageData[ScanStage.EXTRACTION].totalItems} món ăn`;
        }

        if (currentStage === ScanStage.DISH_UNDERSTANDING && stageData[ScanStage.DISH_UNDERSTANDING]?.totalDishes) {
            return `Đã phân tích ${stageData[ScanStage.DISH_UNDERSTANDING].totalDishes} món`;
        }

        if (currentStage === ScanStage.ALLERGEN_ANALYSIS && stageData[ScanStage.ALLERGEN_ANALYSIS]) {
            const { safeItems, unsafeItems } = stageData[ScanStage.ALLERGEN_ANALYSIS];
            if (safeItems !== undefined && unsafeItems !== undefined) {
                return `${safeItems} món an toàn, ${unsafeItems} món có nguy cơ`;
            }
        }

        return STAGE_MESSAGES[currentStage] || 'Đang xử lý...';
    };

    useEffect(() => {
        // When analysis is complete, navigate to appropriate screen
        if (!isAnalyzing && currentScan) {
            // Check if it's a menu scan (multiple dishes)
            const isMenuScan = 'dishes' in currentScan;

            if (isMenuScan) {
                // For menu scans, check allergen warnings
                const menuResult = currentScan as MenuScanResult;

                if (menuResult.unsafeCount > 0) {
                    router.replace('/scan/allergen-warning');
                } else {
                    router.replace('/scan/result');
                }
            } else {
                // Single food scan - check confidence and allergens
                if (currentScan.confidence < 70) {
                    router.replace('/scan/low-confidence');
                    return;
                }

                const matchedAllergens = checkForUserAllergens(
                    currentScan.allergens,
                    userAllergens
                );

                const severityLevel = getAllergenSeverityLevel(matchedAllergens);

                if (severityLevel === 'danger' || severityLevel === 'warning') {
                    router.replace('/scan/allergen-warning');
                } else {
                    router.replace('/scan/result');
                }
            }
        }

        // Handle error
        if (error) {
            console.error('═══════════════════════════════════════════════════════════════');
            console.error('❌ ANALYSIS ERROR');
            console.error('Error Message:', error);
            console.error('═══════════════════════════════════════════════════════════════');
            
            // Clear error immediately to prevent loop
            clearCurrentScan();
            
            // Show error dialog with detailed message
            Alert.alert(
                'Không thể phân tích',
                error,
                [
                    {
                        text: 'Thử lại',
                        onPress: () => router.replace('/scan'),
                        style: 'default'
                    },
                    {
                        text: 'Hủy',
                        onPress: () => router.back(),
                        style: 'cancel'
                    }
                ],
                { cancelable: false }
            );
        }
    }, [isAnalyzing, currentScan, error, userAllergens]);

    return (
        <Screen safeArea backgroundColor={colors.backgroundWhite}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <ActivityIndicator size="large" color={colors.primary} />
                    <Text style={styles.title}>Đang phân tích menu</Text>
                    <Text style={styles.subtitle}>{getStageMessage()}</Text>
                </View>

                {/* Progress Bar */}
                <View style={styles.progressContainer}>
                    <Progress.Bar
                        progress={progress / 100}
                        width={null}
                        height={8}
                        color={colors.primary}
                        unfilledColor={colors.border}
                        borderWidth={0}
                        borderRadius={4}
                    />
                    <Text style={styles.progressText}>{Math.round(progress)}%</Text>
                </View>

                {/* Stage Timeline */}
                <StageIndicator 
                    currentStage={currentStage} 
                    progress={progress}
                    stageData={stageData}
                />

                {/* Footer hint */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Quá trình này có thể mất 10-20 giây
                    </Text>
                </View>
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: spacing.xl,
    },
    header: {
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.xl,
    },
    title: {
        ...typography.styles.h2,
        color: colors.textPrimary,
        marginTop: spacing.lg,
        textAlign: 'center',
    },
    subtitle: {
        ...typography.styles.bodyRegular,
        color: colors.primary,
        marginTop: spacing.sm,
        textAlign: 'center',
    },
    progressContainer: {
        paddingHorizontal: spacing.xl,
        marginVertical: spacing.lg,
    },
    progressText: {
        ...typography.styles.caption,
        color: colors.textSecondary,
        textAlign: 'center',
        marginTop: spacing.sm,
    },
    footer: {
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.lg,
    },
    footerText: {
        ...typography.styles.caption,
        color: colors.textTertiary,
        textAlign: 'center',
    },
});
