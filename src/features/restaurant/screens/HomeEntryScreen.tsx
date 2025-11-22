import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Animated, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../../../shared/components/layout/Screen';
import { HomeHeader } from '../components/HomeHeader';
import { QuickActionCard } from '../components/QuickActionCard';
import { SummaryProgressCard } from '../components/SummaryProgressCard';
import { SectionHeader } from '../components/SectionHeader';
import { RecommendationCard } from '../components/RecommendationCard';
import { useLocationPermission } from '../hooks/useLocationPermission';
import { useDailySummary } from '../hooks/useDailySummary';
import { colors, spacing } from '../../../theme';

const { width } = Dimensions.get('window');

/**
 * Home Entry Screen - Production-ready design with animations
 * 
 * Features:
 * - Premium header with location picker
 * - Smooth entrance animations
 * - Quick action cards for primary features
 * - Daily nutrition summary
 * - Featured restaurant recommendations
 * - Responsive layout and accessibility
 */
export const HomeEntryScreen = () => {
    const router = useRouter();
    const { permission } = useLocationPermission();
    const { summary } = useDailySummary();

    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;
    const quickActionsAnim = useRef(new Animated.Value(0)).current;
    const summaryAnim = useRef(new Animated.Value(0)).current;
    const recommendationsAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Staggered entrance animation
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.stagger(150, [
                    Animated.timing(quickActionsAnim, {
                        toValue: 1,
                        duration: 400,
                        useNativeDriver: true,
                    }),
                    Animated.timing(summaryAnim, {
                        toValue: 1,
                        duration: 400,
                        useNativeDriver: true,
                    }),
                    Animated.timing(recommendationsAnim, {
                        toValue: 1,
                        duration: 400,
                        useNativeDriver: true,
                    }),
                ]),
            ]),
        ]).start();
    }, []);

    const handleLocationPress = () => {
        Alert.alert(
            'Change Location',
            'Location picker will be available soon',
            [{ text: 'OK' }]
        );
    };

    const handleNotificationPress = () => {
        Alert.alert(
            'Notifications',
            'You have 2 new notifications',
            [{ text: 'OK' }]
        );
    };

    const handleTranslatePress = () => {
        Alert.alert(
            'Translate Menu',
            'Point your camera at a menu to translate',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Open Camera', onPress: () => console.log('Open camera') },
            ]
        );
    };

    return (
        <Screen
            scrollable={false}
            safeArea={true}
            backgroundColor={colors.backgroundGray}
            padding={false}
        >
            <Animated.View style={{ opacity: fadeAnim }}>
                <HomeHeader
                    location={permission?.coordinates ? 'Hanoi, Vietnam' : 'Select location'}
                    onLocationPress={handleLocationPress}
                    onNotificationPress={handleNotificationPress}
                />
            </Animated.View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Quick Actions Section */}
                <Animated.View
                    style={[
                        styles.section,
                        {
                            opacity: quickActionsAnim,
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
                    <SectionHeader title="Quick Actions" />
                    <View style={styles.quickActions}>
                        <QuickActionCard
                            icon="scan"
                            label="Scan Dish"
                            color={colors.primary}
                            onPress={() => router.push('/(main)/(tabs)/scan' as any)}
                        />
                        <QuickActionCard
                            icon="language"
                            label="Translate"
                            color={colors.info}
                            onPress={handleTranslatePress}
                        />
                        <QuickActionCard
                            icon="restaurant"
                            label="Find Food"
                            color={colors.secondary}
                            onPress={() => router.push('/restaurant/find' as any)}
                        />
                    </View>
                </Animated.View>

                {/* Daily Summary Section */}
                {summary && (
                    <Animated.View
                        style={[
                            styles.section,
                            {
                                opacity: summaryAnim,
                                transform: [{ translateY: slideAnim }],
                            },
                        ]}
                    >
                        <SummaryProgressCard summary={summary} />
                    </Animated.View>
                )}

                {/* Featured Recommendations */}
                <Animated.View
                    style={[
                        styles.section,
                        {
                            opacity: recommendationsAnim,
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
                    <SectionHeader
                        title="Recommended for You"
                        actionText="See all"
                        onActionPress={() => router.push('/restaurant/results' as any)}
                    />
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.recommendations}
                        snapToInterval={width - spacing.lg * 2 + spacing.md}
                        decelerationRate="fast"
                    >
                        <RecommendationCard
                            title="Discover Authentic Vietnamese Cuisine"
                            subtitle="Trending near you"
                            imageUri="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600"
                            tags={['Popular', 'Vietnamese']}
                            onPress={() => router.push('/restaurant/find' as any)}
                        />
                        <View style={styles.cardSpacer} />
                        <RecommendationCard
                            title="Healthy Vegan Spots Nearby"
                            subtitle="Perfect for your diet"
                            imageUri="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600"
                            tags={['Vegan', 'Healthy']}
                            onPress={() => router.push('/restaurant/find' as any)}
                        />
                    </ScrollView>
                </Animated.View>

                {/* Bottom Spacer */}
                <View style={styles.bottomSpacer} />
            </ScrollView>
        </Screen>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        paddingTop: spacing.md,
    },
    section: {
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.xl,
    },
    quickActions: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    recommendations: {
        paddingRight: spacing.lg,
    },
    cardSpacer: {
        width: spacing.md,
    },
    bottomSpacer: {
        height: spacing.xxl,
    },
});
