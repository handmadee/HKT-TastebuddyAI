/**
 * FoodCard Component
 *
 * Displays featured food item with image and details
 */

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '@/theme';
import { BaseButton } from '@/shared/components/base/BaseButton';

interface FoodCardProps {
    title: string;
    imageUrl: string;
    timestamp?: string;
    onViewDetails?: () => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({
    title,
    imageUrl,
    timestamp,
    onViewDetails,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                />
                {timestamp && (
                    <View style={styles.timestampBadge}>
                        <Text style={styles.timestampText}>{timestamp}</Text>
                    </View>
                )}
            </View>

            {onViewDetails && (
                <BaseButton
                    title="View Details"
                    variant="primary"
                    size="medium"
                    onPress={onViewDetails}
                    style={styles.button}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.card,
        borderRadius: borderRadius.card,
        overflow: 'hidden',
        ...shadows.normal,
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: 200,
        backgroundColor: colors.backgroundGray,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    timestampBadge: {
        position: 'absolute',
        top: spacing.md,
        left: spacing.md,
        backgroundColor: colors.card,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.badge,
        ...shadows.small,
    },
    timestampText: {
        ...typography.styles.bodyTiny,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.medium,
    },
    button: {
        margin: spacing.md,
    },
});
