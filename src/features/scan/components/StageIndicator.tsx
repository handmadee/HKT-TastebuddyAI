/**
 * StageIndicator Component
 *
 * Displays current analysis stage with visual timeline
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScanStage, StageStatus } from '../types';
import { colors, spacing, typography } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';

interface StageIndicatorProps {
    currentStage: ScanStage | null;
    progress: number;
    stageData?: Record<string, any>;
}

// Stage labels in Vietnamese
const STAGE_LABELS: Record<ScanStage, string> = {
    [ScanStage.VALIDATION]: 'Kiểm tra ảnh',
    [ScanStage.EXTRACTION]: 'Trích xuất menu',
    [ScanStage.DISH_UNDERSTANDING]: 'Phân tích món ăn',
    [ScanStage.ALLERGEN_ANALYSIS]: 'Kiểm tra dị ứng',
    [ScanStage.DIETARY_ANALYSIS]: 'Kiểm tra chế độ ăn',
    [ScanStage.NUTRITION_ANALYSIS]: 'Phân tích dinh dưỡng',
    [ScanStage.PRICE_ANALYSIS]: 'Phân tích giá',
    [ScanStage.FORMATTING]: 'Hoàn tất',
};

// Key stages to display (skip some for cleaner UI)
const DISPLAY_STAGES: ScanStage[] = [
    ScanStage.EXTRACTION,
    ScanStage.DISH_UNDERSTANDING,
    ScanStage.ALLERGEN_ANALYSIS,
    ScanStage.NUTRITION_ANALYSIS,
];

export const StageIndicator: React.FC<StageIndicatorProps> = ({
    currentStage,
    progress,
    stageData = {},
}) => {
    const getCurrentIndex = () => {
        if (!currentStage) return -1;
        return DISPLAY_STAGES.indexOf(currentStage);
    };

    const currentIndex = getCurrentIndex();

    // Get stage detail message
    const getStageDetail = (stage: ScanStage): string | null => {
        const data = stageData[stage];
        if (!data) return null;

        switch (stage) {
            case ScanStage.EXTRACTION:
                if (data.totalItems) {
                    return `${data.totalItems} món`;
                }
                break;
            case ScanStage.DISH_UNDERSTANDING:
                if (data.totalDishes) {
                    return `${data.totalDishes} món đã phân tích`;
                }
                break;
            case ScanStage.ALLERGEN_ANALYSIS:
                if (data.safeItems !== undefined) {
                    return `${data.safeItems} an toàn, ${data.unsafeItems || 0} cảnh báo`;
                }
                break;
            case ScanStage.NUTRITION_ANALYSIS:
                if (data.itemsAnalyzed !== undefined) {
                    return `${data.itemsAnalyzed} món`;
                }
                break;
        }
        return null;
    };

    return (
        <View style={styles.container}>
            {DISPLAY_STAGES.map((stage, index) => {
                const isCompleted = index < currentIndex;
                const isCurrent = stage === currentStage;
                const isPending = index > currentIndex;

                return (
                    <View key={stage} style={styles.stageRow}>
                        {/* Icon */}
                        <View
                            style={[
                                styles.iconContainer,
                                isCompleted && styles.iconCompleted,
                                isCurrent && styles.iconCurrent,
                                isPending && styles.iconPending,
                            ]}
                        >
                            {isCompleted ? (
                                <Ionicons
                                    name="checkmark-circle"
                                    size={24}
                                    color={colors.success}
                                />
                            ) : isCurrent ? (
                                <View style={styles.loadingDot} />
                            ) : (
                                <View style={styles.pendingDot} />
                            )}
                        </View>

                        {/* Label */}
                        <View style={styles.labelContainer}>
                            <Text
                                style={[
                                    styles.stageLabel,
                                    isCurrent && styles.stageLabelCurrent,
                                    isCompleted && styles.stageLabelCompleted,
                                ]}
                            >
                                {STAGE_LABELS[stage]}
                            </Text>
                            {isCompleted && getStageDetail(stage) && (
                                <Text style={styles.stageDetail}>
                                    {getStageDetail(stage)}
                                </Text>
                            )}
                        </View>

                        {/* Connector line (except for last item) */}
                        {index < DISPLAY_STAGES.length - 1 && (
                            <View
                                style={[
                                    styles.connector,
                                    isCompleted && styles.connectorCompleted,
                                ]}
                            />
                        )}
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: spacing.lg,
    },
    stageRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.md,
        position: 'relative',
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    iconCompleted: {
        backgroundColor: colors.successLight,
    },
    iconCurrent: {
        backgroundColor: colors.primaryLight,
    },
    iconPending: {
        backgroundColor: colors.cardBackground,
    },
    loadingDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: colors.primary,
    },
    pendingDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: colors.textTertiary,
    },
    labelContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    stageLabel: {
        ...typography.styles.bodyRegular,
        color: colors.textSecondary,
    },
    stageDetail: {
        ...typography.styles.caption,
        color: colors.textTertiary,
        marginTop: 2,
    },
    stageLabelCurrent: {
        ...typography.styles.bodyMedium,
        color: colors.primary,
    },
    stageLabelCompleted: {
        color: colors.success,
    },
    connector: {
        position: 'absolute',
        left: spacing.lg + 15,
        top: 40,
        width: 2,
        height: 40,
        backgroundColor: colors.border,
    },
    connectorCompleted: {
        backgroundColor: colors.success,
    },
});
