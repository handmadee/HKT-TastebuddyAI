import React from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../../../shared/components/layout/Screen';
import { SettingItem } from '../components/SettingItem';
import { useProfileSettings } from '../hooks/useProfileSettings';
import { colors, spacing, typography } from '../../../theme';

export const SettingsScreen = () => {
    const router = useRouter();
    const { preferences, updatePreferences, signOut } = useProfileSettings();

    if (!preferences) return null;

    const handleSignOut = () => {
        Alert.alert(
            'Sign Out',
            'Are you sure you want to sign out?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Sign Out',
                    style: 'destructive',
                    onPress: async () => {
                        await signOut();
                        router.replace('/(auth)/welcome' as any);
                    },
                },
            ]
        );
    };

    return (
        <Screen
            scrollable={true}
            safeArea={true}
            backgroundColor={colors.backgroundGray}
        >
            <Text style={styles.sectionTitle}>App Settings</Text>
            <View style={styles.card}>
                <SettingItem
                    label="Language"
                    type="value"
                    value={preferences.language.toUpperCase()}
                    onPress={() => { }} // TODO: Language picker
                />
                <SettingItem
                    label="Measurement Units"
                    type="value"
                    value={preferences.units === 'metric' ? 'Metric' : 'Imperial'}
                    onPress={() => { }} // TODO: Units picker
                />
            </View>

            <Text style={styles.sectionTitle}>Notifications</Text>
            <View style={styles.card}>
                <SettingItem
                    label="Daily Summary"
                    type="toggle"
                    value={preferences.notifications.dailySummary}
                    onToggle={(value) => updatePreferences({
                        notifications: { ...preferences.notifications, dailySummary: value }
                    })}
                />
                <SettingItem
                    label="Meal Logging Reminders"
                    type="toggle"
                    value={preferences.notifications.mealLogging}
                    onToggle={(value) => updatePreferences({
                        notifications: { ...preferences.notifications, mealLogging: value }
                    })}
                />
                <SettingItem
                    label="Allergen Alerts"
                    type="toggle"
                    value={preferences.notifications.allergenAlerts}
                    onToggle={(value) => updatePreferences({
                        notifications: { ...preferences.notifications, allergenAlerts: value }
                    })}
                />
            </View>

            <Text style={styles.sectionTitle}>Privacy & Data</Text>
            <View style={styles.card}>
                <SettingItem
                    label="Privacy Policy"
                    type="link"
                    onPress={() => { }} // TODO: Open privacy policy
                />
                <SettingItem
                    label="Terms of Service"
                    type="link"
                    onPress={() => { }} // TODO: Open terms
                />
                <SettingItem
                    label="Export My Data"
                    type="link"
                    onPress={() => { }} // TODO: Export data
                />
            </View>

            <View style={styles.card}>
                <SettingItem
                    label="Sign Out"
                    type="link"
                    onPress={handleSignOut}
                    icon="log-out"
                    destructive
                />
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    sectionTitle: {
        ...typography.styles.h4,
        color: colors.textSecondary,
        marginBottom: spacing.sm,
        marginLeft: spacing.lg,
        marginTop: spacing.lg,
    },
    card: {
        backgroundColor: colors.backgroundWhite,
        borderRadius: 16,
        overflow: 'hidden',
        marginHorizontal: spacing.lg,
        marginBottom: spacing.md,
    },
});
