import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, spacing, typography } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';

interface Option {
    id: string;
    label: string;
    icon?: any;
}

interface MultiChoicePreferenceProps {
    title: string;
    options: Option[];
    selectedValues: string[];
    onToggle: (value: string) => void;
}

export const MultiChoicePreference: React.FC<MultiChoicePreferenceProps> = ({
    title,
    options,
    selectedValues,
    onToggle,
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.grid}>
                {options.map((option) => {
                    const isSelected = selectedValues.includes(option.id);
                    return (
                        <TouchableOpacity
                            key={option.id}
                            style={[
                                styles.option,
                                isSelected && styles.selectedOption,
                            ]}
                            onPress={() => onToggle(option.id)}
                        >
                            {isSelected && (
                                <View style={styles.checkIcon}>
                                    <Ionicons name="checkmark" size={12} color={colors.backgroundWhite} />
                                </View>
                            )}
                            <Text
                                style={[
                                    styles.label,
                                    isSelected && styles.selectedLabel,
                                ]}
                            >
                                {option.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.xl,
        paddingHorizontal: spacing.lg,
    },
    title: {
        ...typography.styles.h4,
        color: colors.textPrimary,
        marginBottom: spacing.md,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
    },
    option: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.backgroundWhite,
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectedOption: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    label: {
        ...typography.styles.bodySmall,
        color: colors.textSecondary,
    },
    selectedLabel: {
        color: colors.backgroundWhite,
        fontWeight: typography.fontWeight.bold,
    },
    checkIcon: {
        marginRight: 4,
    },
});
