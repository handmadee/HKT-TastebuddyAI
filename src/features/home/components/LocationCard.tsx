/**
 * LocationCard Component
 *
 * Displays nearby location with rating, distance, and safety status
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '@/theme';
import { SafetyStatus } from '../types';

interface LocationCardProps {
    name: string;
    rating: number;
    distance: string;
    safetyStatus: SafetyStatus;
    safetyLabel: string;
    onPress?: () => void;
}

const getSafetyBadgeColors = (status: SafetyStatus) => {
    switch (status) {
        case 'safe':
            return {
                background: '#e6f9eb',
                text: colors.secondary,
            };
        case 'warning':
            return {
                background: '#fff5e4',
                text: colors.accent,
            };
        case 'danger':
            return {
                background: '#fff1f0',
                text: colors.error,
            };
        default:
            return {
                background: colors.backgroundGray,
                text: colors.textSecondary,
            };
    }
};

export const LocationCard: React.FC<LocationCardProps> = ({
    name,
    rating,
    distance,
    safetyStatus,
    safetyLabel,
    onPress,
}) => {
    const badgeColors = getSafetyBadgeColors(safetyStatus);

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.name} numberOfLines={1}>
                        {name}
                    </Text>
                </View>

                <View style={styles.metaRow}>
                    <View style={styles.leftMeta}>
                        <Text style={styles.distance}>{distance}</Text>
                        <Text style={styles.metaSeparator}>•</Text>
                        <Ionicons name="star" size={14} color={colors.accent} />
                        <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
                    </View>
                </View>

                <View
                    style={[
                        styles.safetyBadge,
                        { backgroundColor: badgeColors.background },
                    ]}
                >
                    <Text
                        style={[
                            styles.safetyText,
                            { color: badgeColors.text },
                        ]}
                    >
                        {safetyLabel}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.card,
        borderRadius: borderRadius.card,
        padding: spacing.lg,
        marginBottom: spacing.md,
        ...shadows.small,
    },
    content: {
        flex: 1,
    },
    header: {
        marginBottom: spacing.xs,
    },
    name: {
        ...typography.styles.h4,
        color: colors.textPrimary,
    },
    metaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    leftMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    distance: {
        ...typography.styles.bodySmall,
        color: colors.textSecondary,
    },
    metaSeparator: {
        ...typography.styles.bodySmall,
        color: colors.textSecondary,
    },
    ratingText: {
        ...typography.styles.bodySmall,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.medium,
    },
    safetyBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.badge,
    },
    safetyText: {
        ...typography.styles.bodySmall,
        fontWeight: typography.fontWeight.medium,
    },
});
