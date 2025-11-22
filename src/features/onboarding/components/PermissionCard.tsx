/**
 * PermissionCard Component
 *
 * Card for displaying and toggling permissions
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../../theme';

interface PermissionCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    enabled: boolean;
    onToggle: () => void;
}

export const PermissionCard: React.FC<PermissionCardProps> = ({
    icon,
    title,
    description,
    enabled,
    onToggle,
}) => {
    return (
        <View style={[styles.container, enabled && styles.containerEnabled]}>
            <View style={styles.iconContainer}>{icon}</View>
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
            <TouchableOpacity
                style={[styles.toggle, enabled && styles.toggleEnabled]}
                onPress={onToggle}
                activeOpacity={0.7}
            >
                <View style={[styles.thumb, enabled && styles.thumbEnabled]} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.card,
        borderWidth: 2,
        borderColor: colors.border,
        borderRadius: borderRadius.card,
        padding: spacing.md,
        marginBottom: spacing.md,
        ...shadows.card,
    },
    containerEnabled: {
        borderColor: colors.primary,
        backgroundColor: colors.backgroundMain,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: colors.backgroundGray,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    content: {
        flex: 1,
    },
    title: {
        ...typography.styles.bodyMedium,
        color: colors.textPrimary,
        fontWeight: '600',
        marginBottom: spacing.xs,
    },
    description: {
        ...typography.styles.bodySmall,
        color: colors.textSecondary,
        lineHeight: 18,
    },
    toggle: {
        width: 50,
        height: 28,
        borderRadius: 14,
        backgroundColor: colors.backgroundGray,
        padding: 2,
        justifyContent: 'center',
        marginLeft: spacing.sm,
    },
    toggleEnabled: {
        backgroundColor: colors.primary,
        justifyContent: 'flex-end',
    },
    thumb: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: colors.backgroundWhite,
    },
    thumbEnabled: {
        alignSelf: 'flex-end',
    },
});
