/**
 * MacroBar Component
 *
 * Visual bar for displaying macronutrient targets
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../../theme';

interface MacroBarProps {
    label: string;
    value: number;
    unit: string;
    color: string;
    percentage?: number;
}

export const MacroBar: React.FC<MacroBarProps> = ({
    label,
    value,
    unit,
    color,
    percentage = 100,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.value}>
                    {value}
                    <Text style={styles.unit}>{unit}</Text>
                </Text>
            </View>
            <View style={styles.barContainer}>
                <View style={[styles.bar, { width: `${percentage}%`, backgroundColor: color }]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.lg,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    label: {
        ...typography.styles.bodyMedium,
        color: colors.textPrimary,
        fontWeight: '600',
    },
    value: {
        ...typography.styles.h3,
        color: colors.textPrimary,
        fontWeight: '700',
    },
    unit: {
        ...typography.styles.bodySmall,
        color: colors.textSecondary,
        fontWeight: '400',
    },
    barContainer: {
        height: 12,
        backgroundColor: colors.backgroundGray,
        borderRadius: borderRadius.small,
        overflow: 'hidden',
    },
    bar: {
        height: '100%',
        borderRadius: borderRadius.small,
    },
});
