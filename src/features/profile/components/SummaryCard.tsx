import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../../theme';
import { UserProfile, DietaryProfile } from '../types';

interface SummaryCardProps {
    profile: UserProfile;
    dietaryProfile: DietaryProfile;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ profile, dietaryProfile }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Summary</Text>
            <View style={styles.row}>
                <View style={styles.item}>
                    <Text style={styles.label}>Language</Text>
                    <Text style={styles.value}>{profile.country}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.item}>
                    <Text style={styles.label}>Diet</Text>
                    <Text style={styles.value}>{dietaryProfile.diet}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.item}>
                    <Text style={styles.label}>Allergens</Text>
                    <Text style={styles.value}>{dietaryProfile.allergens.length}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.backgroundWhite,
        borderRadius: 16,
        padding: spacing.lg,
        marginHorizontal: spacing.lg,
        marginBottom: spacing.lg,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    title: {
        ...typography.styles.h4,
        color: colors.textPrimary,
        marginBottom: spacing.md,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    item: {
        flex: 1,
        alignItems: 'center',
    },
    divider: {
        width: 1,
        backgroundColor: colors.border,
        height: '100%',
    },
    label: {
        ...typography.styles.caption,
        color: colors.textSecondary,
        marginBottom: 4,
    },
    value: {
        ...typography.styles.bodyRegular,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.semibold,
        textAlign: 'center',
    },
});
