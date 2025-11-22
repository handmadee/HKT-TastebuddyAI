import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../../../theme';
import { UserProfile } from '../types';
import { Ionicons } from '@expo/vector-icons';

interface ProfileHeaderProps {
    profile: UserProfile;
    onEditPress: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile, onEditPress }) => {
    return (
        <View style={styles.container}>
            <View style={styles.avatarContainer}>
                <Image
                    source={{ uri: profile.avatar || 'https://ui-avatars.com/api/?name=' + profile.fullName }}
                    style={styles.avatar}
                />
                <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
                    <Ionicons name="pencil" size={16} color={colors.backgroundWhite} />
                </TouchableOpacity>
            </View>
            <Text style={styles.name}>{profile.fullName}</Text>
            <View style={styles.badgeContainer}>
                <Ionicons name="shield-checkmark" size={14} color={colors.primary} />
                <Text style={styles.badgeText}>Tastebuddy Pro</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: spacing.xl,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: spacing.md,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: colors.backgroundWhite,
    },
    editButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: colors.primary,
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: colors.backgroundWhite,
    },
    name: {
        ...typography.styles.h2,
        color: colors.textPrimary,
        marginBottom: spacing.xs,
    },
    badgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.primary + '20',
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 4,
    },
    badgeText: {
        ...typography.styles.caption,
        color: colors.primary,
        fontWeight: typography.fontWeight.bold,
    },
});
