import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing, typography } from '../../../theme';

interface SectionHeaderProps {
    title: string;
    actionText?: string;
    onActionPress?: () => void;
}

/**
 * Reusable section header with optional action
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    actionText,
    onActionPress,
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {actionText && (
                <Text style={styles.action} onPress={onActionPress}>
                    {actionText}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    title: {
        ...typography.styles.h3,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.bold,
    },
    action: {
        ...typography.styles.bodyMedium,
        color: colors.primary,
        fontWeight: typography.fontWeight.semibold,
    },
});
