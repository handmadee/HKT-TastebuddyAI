import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../../../theme';

interface FilterChipProps {
    label: string;
    selected: boolean;
    onPress: () => void;
}

export const FilterChip: React.FC<FilterChipProps> = ({ label, selected, onPress }) => {
    return (
        <TouchableOpacity
            style={[styles.chip, selected && styles.chipSelected]}
            onPress={onPress}
        >
            <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    chip: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: 20,
        backgroundColor: colors.backgroundGray,
        borderWidth: 1,
        borderColor: colors.border,
        marginRight: spacing.sm,
        marginBottom: spacing.sm,
    },
    chipSelected: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    label: {
        ...typography.styles.bodyRegular,
        color: colors.textPrimary,
    },
    labelSelected: {
        color: colors.backgroundWhite,
    },
});
