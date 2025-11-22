/**
 * HomeScreen Component
 *
 * Main home screen with featured food and nearby locations
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, spacing, typography, shadows, borderRadius } from '@/theme';
import { Screen } from '@/shared/components/layout/Screen';
import { FoodCard, LocationCard, CaloriesSummary, QuickActionsSection } from '../components';
import { mockFoodPick, mockNearbyLocations } from '../constants/mockData';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { useAuthStore } from '@/shared/stores/authStore';

export const HomeScreen: React.FC = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const { user } = useAuthStore();

    // Mock data - will be replaced with actual data from stores/API
    const currentCalories = 1240;
    const targetCalories = 1850;
    const userLocation = 'Hanoi, Vietnam';

    const formatTimestamp = (date: Date) => {
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 1) return t('home.justNow');
        if (diffMins < 60) return t('home.minutesAgo', { minutes: diffMins });

        const hours = Math.floor(diffMins / 60);
        if (hours < 24) return t('home.hoursAgo', { hours });

        return date.toLocaleDateString();
    };

    return (
        <Screen safeArea padding={false} scrollable={false}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.headerTitle}>{t('home.appName')}</Text>
                        <View style={styles.locationRow}>
                            <Ionicons
                                name="location"
                                size={14}
                                color={colors.primary}
                            />
                            <Text style={styles.locationText}>{userLocation}</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.avatarButton}
                        onPress={() => router.push('/(main)/(tabs)/profile')}
                    >
                        <Image
                            source={{
                                uri: user?.profileImage || 'https://ui-avatars.com/api/?name=' + (user?.fullName || 'User'),
                            }}
                            style={styles.avatar}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Content */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Quick Actions Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        {t('home.quickActions')}
                    </Text>
                    <QuickActionsSection
                        translations={{
                            scanDish: t('home.scanDish'),
                            translate: t('home.translate'),
                            findFood: t('home.findFood'),
                        }}
                    />
                </View>

                {/* Today's Summary Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        {t('home.todaysSummary')}
                    </Text>
                    <CaloriesSummary
                        current={currentCalories}
                        target={targetCalories}
                        label={t('home.calories')}
                    />
                </View>

                {/* Today's Pick Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        {t('home.todaysPick')}
                    </Text>
                    <FoodCard
                        title={mockFoodPick.name}
                        imageUrl={mockFoodPick.imageUrl}
                        timestamp={formatTimestamp(mockFoodPick.timestamp)}
                        onViewDetails={() => {
                            // Navigate to food details
                            console.log('View food details');
                        }}
                    />
                </View>

                {/* Nearby Spots Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>
                            {t('home.nearbySpots')}
                        </Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>
                                {t('home.seeAll')}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {mockNearbyLocations.map((location) => (
                        <LocationCard
                            key={location.id}
                            name={location.name}
                            rating={location.rating}
                            distance={location.distance}
                            onPress={() => {
                                // Navigate to location details
                                console.log('View location:', location.id);
                            }}
                        />
                    ))}
                </View>

                {/* Bottom padding for tab bar */}
                <View style={styles.bottomPadding} />
            </ScrollView>
        </Screen>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.card,
        paddingTop: spacing.lg,
        paddingBottom: spacing.lg,
        ...shadows.small,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.container.horizontal,
    },
    headerLeft: {
        flex: 1,
    },
    headerTitle: {
        ...typography.styles.h2,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.bold,
        marginBottom: spacing.xs,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    locationText: {
        ...typography.styles.bodySmall,
        color: colors.primary,
    },
    avatarButton: {
        marginLeft: spacing.md,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: borderRadius.avatar,
        backgroundColor: colors.backgroundGray,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: spacing.container.horizontal,
    },
    section: {
        marginTop: spacing.xxl,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    sectionTitle: {
        ...typography.styles.h3,
        color: colors.textPrimary,
        marginBottom: spacing.lg,
    },
    seeAllText: {
        ...typography.styles.bodyMedium,
        color: colors.primary,
    },
    bottomPadding: {
        height: spacing.xxl,
    },
});
