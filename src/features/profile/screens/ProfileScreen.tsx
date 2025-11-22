import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../../../shared/components/layout/Screen';
import { ProfileHeader } from '../components/ProfileHeader';
import { SummaryCard } from '../components/SummaryCard';
import { ShortcutGrid } from '../components/ShortcutGrid';
import { useUserProfile } from '../hooks/useUserProfile';
import { useAllergensAndDiet } from '../hooks/useAllergensAndDiet';
import { colors, spacing } from '../../../theme';

export const ProfileScreen = () => {
    const router = useRouter();
    const { profile, isLoading: isProfileLoading } = useUserProfile();
    const { dietaryProfile, isLoading: isDietLoading } = useAllergensAndDiet();

    const isLoading = isProfileLoading || isDietLoading;

    const handleEditProfile = () => {
        router.push('/profile/edit' as any);
    };

    const healthShortcuts = [
        {
            id: 'allergens',
            icon: 'nutrition' as const,
            label: 'Allergens & Diet',
            color: colors.secondary,
            onPress: () => router.push('/profile/allergens' as any),
        },
        {
            id: 'goals',
            icon: 'fitness' as const,
            label: 'Nutrition Goals',
            color: colors.accent,
            onPress: () => { }, // TODO: Implement goals screen
        },
        {
            id: 'health',
            icon: 'heart' as const,
            label: 'Apple Health',
            color: colors.error,
            onPress: () => router.push('/profile/health-connect' as any),
        },
    ];

    const savedShortcuts = [
        {
            id: 'restaurants',
            icon: 'restaurant' as const,
            label: 'Saved Places',
            color: colors.primary,
            onPress: () => router.push('/profile/saved-restaurants' as any),
        },
        {
            id: 'menus',
            icon: 'book' as const,
            label: 'Saved Menus',
            color: colors.info,
            onPress: () => router.push('/profile/saved-menus' as any),
        },
        {
            id: 'activity',
            icon: 'pulse' as const,
            label: 'Activity',
            color: colors.textSecondary,
            onPress: () => { }, // TODO: Implement activity screen
        },
    ];

    return (
        <Screen
            scrollable={true}
            safeArea={true}
            backgroundColor={colors.backgroundMain}
        >
            {profile && (
                <ProfileHeader
                    profile={profile}
                    onEditPress={handleEditProfile}
                />
            )}

            {profile && dietaryProfile && (
                <SummaryCard
                    profile={profile}
                    dietaryProfile={dietaryProfile}
                />
            )}

            <ShortcutGrid
                title="Health preferences"
                items={healthShortcuts}
            />

            <ShortcutGrid
                title="Saved items"
                items={savedShortcuts}
            />

            <View style={styles.footerSpacer} />
        </Screen>
    );
};

const styles = StyleSheet.create({
    footerSpacer: {
        height: spacing.xl,
    },
});
