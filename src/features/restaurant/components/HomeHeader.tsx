import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, shadows } from '../../../theme';

interface HomeHeaderProps {
    location: string;
    onLocationPress: () => void;
    onNotificationPress: () => void;
}

/**
 * Premium app header with location and notifications
 * Follows Material Design elevated header pattern
 */
export const HomeHeader: React.FC<HomeHeaderProps> = ({
    location,
    onLocationPress,
    onNotificationPress,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.brandSection}>
                    <View style={styles.logoContainer}>
                        <Ionicons name="restaurant" size={28} color={colors.primary} />
                    </View>
                    <View>
                        <Text style={styles.appName}>TastebuddyAI</Text>
                        <TouchableOpacity style={styles.locationButton} onPress={onLocationPress}>
                            <Ionicons name="location" size={14} color={colors.textSecondary} />
                            <Text style={styles.locationText}>{location}</Text>
                            <Ionicons name="chevron-down" size={14} color={colors.textSecondary} />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.notificationButton}
                    onPress={onNotificationPress}
                    accessibilityLabel="Notifications"
                    accessibilityRole="button"
                >
                    <Ionicons name="notifications-outline" size={24} color={colors.textPrimary} />
                    <View style={styles.badge} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.backgroundWhite,
        ...shadows.card,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
    },
    brandSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    logoContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: colors.primary + '15',
        alignItems: 'center',
        justifyContent: 'center',
    },
    appName: {
        ...typography.styles.h3,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.bold,
    },
    locationButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 2,
    },
    locationText: {
        ...typography.styles.caption,
        color: colors.textSecondary,
    },
    notificationButton: {
        position: 'relative',
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.backgroundGray,
    },
    badge: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.error,
        borderWidth: 2,
        borderColor: colors.backgroundWhite,
    },
});
