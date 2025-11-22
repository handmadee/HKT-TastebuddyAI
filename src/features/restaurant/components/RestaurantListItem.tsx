import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../../theme';
import { RestaurantMatch } from '../types';

interface RestaurantListItemProps {
    match: RestaurantMatch;
    onPress: () => void;
    showMatchBadge?: boolean;
}

export const RestaurantListItem: React.FC<RestaurantListItemProps> = ({
    match,
    onPress,
    showMatchBadge = false,
}) => {
    const { restaurant, matchScore } = match;
    const priceSymbols = '$'.repeat(restaurant.priceLevel);

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            {showMatchBadge && matchScore >= 80 && (
                <View style={styles.matchBadge}>
                    <Text style={styles.matchText}>PERFECT MATCH ({matchScore}%)</Text>
                </View>
            )}
            <Image source={{ uri: restaurant.imageUri }} style={styles.image} />
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.name}>{restaurant.name}</Text>
                    <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={16} color={colors.accent} />
                        <Text style={styles.rating}>{restaurant.rating}</Text>
                    </View>
                </View>
                <View style={styles.details}>
                    <Text style={styles.cuisine}>{restaurant.cuisine}</Text>
                    <Text style={styles.dot}>•</Text>
                    <Text style={styles.price}>{priceSymbols}</Text>
                    <Text style={styles.dot}>•</Text>
                    <Text style={styles.distance}>{restaurant.distanceText}</Text>
                </View>
                <View style={styles.tags}>
                    {restaurant.dietaryOptions.slice(0, 3).map((tag, index) => (
                        <View key={index} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.backgroundWhite,
        borderRadius: 16,
        marginBottom: spacing.md,
        overflow: 'hidden',
    },
    matchBadge: {
        backgroundColor: colors.secondary,
        padding: spacing.xs,
        alignItems: 'center',
    },
    matchText: {
        ...typography.styles.caption,
        color: colors.backgroundWhite,
        fontWeight: typography.fontWeight.bold,
    },
    image: {
        width: '100%',
        height: 180,
        backgroundColor: colors.backgroundGray,
    },
    content: {
        padding: spacing.md,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    name: {
        ...typography.styles.h4,
        color: colors.textPrimary,
        flex: 1,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    rating: {
        ...typography.styles.bodyRegular,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.bold,
    },
    details: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    cuisine: {
        ...typography.styles.caption,
        color: colors.textSecondary,
    },
    dot: {
        marginHorizontal: 6,
        color: colors.textSecondary,
    },
    price: {
        ...typography.styles.caption,
        color: colors.textSecondary,
    },
    distance: {
        ...typography.styles.caption,
        color: colors.textSecondary,
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
    },
    tag: {
        backgroundColor: colors.backgroundMain,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    tagText: {
        fontSize: 10,
        color: colors.primary,
    },
});
