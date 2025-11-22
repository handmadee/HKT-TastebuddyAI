/**
 * LocationCard Component
 *
 * Displays nearby location with rating and distance
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '@/theme';

interface LocationCardProps {
    name: string;
    rating: number;
    distance: string;
    onPress?: () => void;
}

export const LocationCard: React.FC<LocationCardProps> = ({
    name,
    rating,
    distance,
    onPress,
}) => {
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
                    <Text style={styles.distance}>{distance}</Text>
                </View>

                <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color={colors.accent} />
                    <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
                </View>
            </View>

            <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textSecondary}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.card,
        borderRadius: borderRadius.card,
        padding: spacing.lg,
        marginBottom: spacing.md,
        ...shadows.small,
    },
    content: {
        flex: 1,
        marginRight: spacing.md,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    name: {
        ...typography.styles.h4,
        color: colors.textPrimary,
        flex: 1,
        marginRight: spacing.sm,
    },
    distance: {
        ...typography.styles.bodySmall,
        color: colors.textSecondary,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    ratingText: {
        ...typography.styles.bodySmall,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.medium,
    },
});
