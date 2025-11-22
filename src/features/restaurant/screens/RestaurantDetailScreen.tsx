import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Screen } from '../../../shared/components/layout/Screen';
import { PopularDishRow } from '../components/PopularDishRow';
import { useRestaurantDetail } from '../hooks/useRestaurantDetail';
import { colors, spacing, typography } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';

export const RestaurantDetailScreen = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { restaurant, dishes, isLoading } = useRestaurantDetail(id || '');

    if (isLoading || !restaurant) {
        return <View />;
    }

    const priceSymbols = '$'.repeat(restaurant.priceLevel);

    return (
        <Screen scrollable={true} safeArea={false} backgroundColor={colors.backgroundWhite}>
            <Image source={{ uri: restaurant.imageUri }} style={styles.headerImage} />

            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.titleRow}>
                        <Text style={styles.name}>{restaurant.name}</Text>
                        <View style={styles.ratingContainer}>
                            <Ionicons name="star" size={20} color={colors.accent} />
                            <Text style={styles.rating}>{restaurant.rating}</Text>
                        </View>
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.cuisine}>{restaurant.cuisine}</Text>
                        <Text style={styles.dot}>•</Text>
                        <Text style={styles.price}>{priceSymbols}</Text>
                        <Text style={styles.dot}>•</Text>
                        <Text style={[styles.status, restaurant.isOpen && styles.statusOpen]}>
                            {restaurant.isOpen ? 'Open now' : 'Closed'}
                        </Text>
                    </View>
                </View>

                <View style={styles.tags}>
                    {restaurant.tags.map((tag, index) => (
                        <View key={index} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Popular Dishes</Text>
                    {dishes.map((dish) => (
                        <PopularDishRow
                            key={dish.id}
                            dish={dish}
                            onPress={() => { }}
                        />
                    ))}
                </View>
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    headerImage: {
        width: '100%',
        height: 300,
        backgroundColor: colors.backgroundGray,
    },
    content: {
        paddingBottom: spacing.xxl,
    },
    header: {
        padding: spacing.lg,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: spacing.xs,
    },
    name: {
        ...typography.styles.h2,
        color: colors.textPrimary,
        flex: 1,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    rating: {
        ...typography.styles.bodyMedium,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.bold,
    },
    details: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cuisine: {
        ...typography.styles.bodyRegular,
        color: colors.textSecondary,
    },
    dot: {
        marginHorizontal: 8,
        color: colors.textSecondary,
    },
    price: {
        ...typography.styles.bodyRegular,
        color: colors.textSecondary,
    },
    status: {
        ...typography.styles.bodyRegular,
        color: colors.error,
    },
    statusOpen: {
        color: colors.secondary,
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.lg,
    },
    tag: {
        backgroundColor: colors.backgroundMain,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    tagText: {
        fontSize: 12,
        color: colors.primary,
    },
    section: {
        marginTop: spacing.lg,
    },
    sectionTitle: {
        ...typography.styles.h4,
        color: colors.textPrimary,
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.md,
    },
});
