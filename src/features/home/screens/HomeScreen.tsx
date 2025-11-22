/**
 * HomeScreen Component
 *
 * Main home screen with featured food and nearby locations
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Animated } from 'react-native';
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

    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    // Mock data - will be replaced with actual data from stores/API
    const currentCalories = 1240;
    const targetCalories = 1850;
    const userLocation = 'Hanoi, Vietnam';

    // Animate on mount
    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

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
                        onPress={() => router.push('/(main)/(tabs)/profile' as any)}
                    >
                        <Image
                            source={{
                                uri: (user as any)?.profileImage || 'https://ui-avatars.com/api/?name=' + (user?.fullName || 'User'),
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
                <Animated.View
                    style={[
                        styles.section,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
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
                </Animated.View>

                {/* Today's Summary Section */}
                <Animated.View
                    style={[
                        styles.section,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
                    <Text style={styles.sectionTitle}>
                        {t('home.todaysSummary')}
                    </Text>
                    <CaloriesSummary
                        current={currentCalories}
                        target={targetCalories}
                        label={t('home.calories')}
                    />
                </Animated.View>

                {/* Today's Pick Section */}
                <Animated.View
                    style={[
                        styles.section,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
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
                </Animated.View>

                {/* Nearby Spots Section */}
                <Animated.View
                    style={[
                        styles.section,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
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

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.horizontalScroll}
                    >
                        {mockNearbyLocations.map((location, index) => (
                            <Animated.View
                                key={location.id}
                                style={{
                                    opacity: fadeAnim,
                                    transform: [{
                                        translateX: fadeAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [50 * (index + 1), 0],
                                        }),
                                    }],
                                }}
                            >
                                <LocationCard
                                    name={location.name}
                                    rating={location.rating}
                                    distance={location.distance}
                                    safetyStatus={location.safetyStatus}
                                    safetyLabel={location.safetyLabel}
                                    onPress={() => {
                                        // Navigate to location details
                                        console.log('View location:', location.id);
                                    }}
                                />
                            </Animated.View>
                        ))}
                    </ScrollView>
                </Animated.View>

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
    horizontalScroll: {
        paddingRight: spacing.container.horizontal,
    },
    bottomPadding: {
        height: spacing.xxl,
    },
});
