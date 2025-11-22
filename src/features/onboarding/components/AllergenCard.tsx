/**
 * AllergenCard Component
 *
 * Card for allergen selection with severity level toggle
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../../theme';
import { AllergenType, AllergenSeverity } from '../types';

interface AllergenCardProps {
    type: AllergenType;
    name: string;
    icon?: React.ReactNode;
    selected: boolean;
    severity?: AllergenSeverity;
    onToggle: () => void;
    onSeverityChange: (severity: AllergenSeverity) => void;
}

const SEVERITY_LABELS: Record<AllergenSeverity, string> = {
    mild: 'Mild',
    moderate: 'Moderate',
    severe: 'Severe',
};

const SEVERITY_COLORS: Record<AllergenSeverity, string> = {
    mild: colors.secondary,
    moderate: colors.accent,
    severe: colors.error,
};

export const AllergenCard: React.FC<AllergenCardProps> = ({
    name,
    selected,
    severity = 'moderate',
    onToggle,
    onSeverityChange,
    icon,
}) => {
    return (
        <View style={[styles.container, selected && styles.selected]}>
            <TouchableOpacity
                style={styles.header}
                onPress={onToggle}
                activeOpacity={0.7}
            >
                {icon && <View style={styles.icon}>{icon}</View>}
                <Text style={[styles.name, selected && styles.nameSelected]}>
                    {name}
                </Text>
                <View
                    style={[
                        styles.toggle,
                        selected && styles.toggleSelected,
                    ]}
                >
                    {selected && <View style={styles.toggleThumb} />}
                </View>
            </TouchableOpacity>

            {selected && (
                <View style={styles.severityContainer}>
                    <Text style={styles.severityLabel}>Severity:</Text>
                    <View style={styles.severityButtons}>
                        {(['mild', 'moderate', 'severe'] as AllergenSeverity[]).map(
                            (level) => (
                                <TouchableOpacity
                                    key={level}
                                    style={[
                                        styles.severityButton,
                                        severity === level && {
                                            backgroundColor: SEVERITY_COLORS[level],
                                        },
                                    ]}
                                    onPress={() => onSeverityChange(level)}
                                    activeOpacity={0.7}
                                >
                                    <Text
                                        style={[
                                            styles.severityButtonText,
                                            severity === level && styles.severityButtonTextSelected,
                                        ]}
                                    >
                                        {SEVERITY_LABELS[level]}
                                    </Text>
                                </TouchableOpacity>
                            )
                        )}
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.card,
        borderWidth: 2,
        borderColor: colors.border,
        borderRadius: borderRadius.card,
        marginBottom: spacing.md,
        overflow: 'hidden',
        ...shadows.card,
    },
    selected: {
        borderColor: colors.primary,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
    },
    icon: {
        marginRight: spacing.sm,
    },
    name: {
        ...typography.styles.bodyMedium,
        color: colors.textPrimary,
        flex: 1,
    },
    nameSelected: {
        color: colors.primary,
        fontWeight: '600',
    },
    toggle: {
        width: 50,
        height: 28,
        borderRadius: 14,
        backgroundColor: colors.backgroundGray,
        padding: 2,
        justifyContent: 'center',
    },
    toggleSelected: {
        backgroundColor: colors.primary,
        justifyContent: 'flex-end',
    },
    toggleThumb: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: colors.backgroundWhite,
    },
    severityContainer: {
        padding: spacing.md,
        paddingTop: 0,
        borderTopWidth: 1,
        borderTopColor: colors.divider,
    },
    severityLabel: {
        ...typography.styles.bodySmall,
        color: colors.textSecondary,
        marginBottom: spacing.sm,
    },
    severityButtons: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    severityButton: {
        flex: 1,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: borderRadius.button,
        backgroundColor: colors.backgroundGray,
        alignItems: 'center',
    },
    severityButtonText: {
        ...typography.styles.bodySmall,
        color: colors.textSecondary,
        fontWeight: '500',
    },
    severityButtonTextSelected: {
        color: colors.backgroundWhite,
        fontWeight: '600',
    },
});
