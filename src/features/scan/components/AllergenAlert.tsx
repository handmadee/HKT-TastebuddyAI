/**
 * AllergenAlert Component
 *
 * Warning alert for detected allergens
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DetectedAllergen } from '../types';
import { colors, spacing, typography, borderRadius, shadows } from '../../../theme';

interface AllergenAlertProps {
    allergens: DetectedAllergen[];
    severity: 'safe' | 'warning' | 'danger';
    message: string;
}

export const AllergenAlert: React.FC<AllergenAlertProps> = ({
    allergens,
    severity,
    message,
}) => {
    const backgroundColor = getBackgroundColor(severity);
    const textColor = severity === 'safe' ? colors.textPrimary : colors.backgroundWhite;

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Text style={[styles.icon, { color: textColor }]}>
                {getIcon(severity)}
            </Text>

            <Text style={[styles.message, { color: textColor }]}>{message}</Text>

            {allergens.length > 0 && (
                <View style={styles.allergenList}>
                    {allergens.map((allergen, index) => (
                        <AllergenBadge
                            key={index}
                            allergen={allergen}
                            textColor={textColor}
                        />
                    ))}
                </View>
            )}
        </View>
    );
};

interface AllergenBadgeProps {
    allergen: DetectedAllergen;
    textColor: string;
}

const AllergenBadge: React.FC<AllergenBadgeProps> = ({ allergen, textColor }) => {
    return (
        <View style={styles.allergenBadge}>
            <Text style={[styles.allergenName, { color: textColor }]}>
                {allergen.type.replace(/-/g, ' ')}
            </Text>
            <Text style={[styles.allergenSeverity, { color: textColor }]}>
                {allergen.severity} ({allergen.confidence}%)
            </Text>
            {allergen.source && (
                <Text style={[styles.allergenSource, { color: textColor }]}>
                    Source: {allergen.source}
                </Text>
            )}
        </View>
    );
};

const getBackgroundColor = (severity: 'safe' | 'warning' | 'danger'): string => {
    switch (severity) {
        case 'safe':
            return colors.success;
        case 'warning':
            return colors.warning;
        case 'danger':
            return colors.error;
        default:
            return colors.backgroundGray;
    }
};

const getIcon = (severity: 'safe' | 'warning' | 'danger'): string => {
    switch (severity) {
        case 'safe':
            return '✓';
        case 'warning':
            return '⚠️';
        case 'danger':
            return '⛔';
        default:
            return 'ℹ️';
    }
};

const styles = StyleSheet.create({
    container: {
        borderRadius: borderRadius.card,
        padding: spacing.lg,
        ...shadows.card,
        marginBottom: spacing.lg,
    },
    icon: {
        fontSize: 48,
        textAlign: 'center',
        marginBottom: spacing.md,
    },
    message: {
        ...typography.styles.h3,
        fontWeight: typography.fontWeight.bold,
        textAlign: 'center',
        marginBottom: spacing.lg,
    },
    allergenList: {
        marginTop: spacing.md,
    },
    allergenBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: borderRadius.badge,
        padding: spacing.md,
        marginBottom: spacing.sm,
    },
    allergenName: {
        ...typography.styles.bodyLarge,
        fontWeight: typography.fontWeight.bold,
        textTransform: 'capitalize',
        marginBottom: spacing.xs,
    },
    allergenSeverity: {
        ...typography.styles.bodySmall,
        fontWeight: typography.fontWeight.medium,
        marginBottom: spacing.xs,
    },
    allergenSource: {
        ...typography.styles.caption,
        fontStyle: 'italic',
    },
});
