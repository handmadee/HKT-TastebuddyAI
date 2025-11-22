/**
 * SegmentedControl Component
 *
 * Reusable segmented control for selecting between options
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../../theme';

interface SegmentedControlOption<T> {
    value: T;
    label: string;
}

interface SegmentedControlProps<T> {
    options: SegmentedControlOption<T>[];
    value: T;
    onChange: (value: T) => void;
}

export function SegmentedControl<T extends string>({
    options,
    value,
    onChange,
}: SegmentedControlProps<T>) {
    return (
        <View style={styles.container}>
            {options.map((option, index) => (
                <TouchableOpacity
                    key={option.value}
                    style={[
                        styles.segment,
                        index === 0 && styles.segmentFirst,
                        index === options.length - 1 && styles.segmentLast,
                        value === option.value && styles.segmentSelected,
                    ]}
                    onPress={() => onChange(option.value)}
                    activeOpacity={0.7}
                >
                    <Text
                        style={[
                            styles.label,
                            value === option.value && styles.labelSelected,
                        ]}
                    >
                        {option.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: colors.backgroundGray,
        borderRadius: borderRadius.button,
        padding: 2,
    },
    segment: {
        flex: 1,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    segmentFirst: {
        borderTopLeftRadius: borderRadius.button,
        borderBottomLeftRadius: borderRadius.button,
    },
    segmentLast: {
        borderTopRightRadius: borderRadius.button,
        borderBottomRightRadius: borderRadius.button,
    },
    segmentSelected: {
        backgroundColor: colors.primary,
        borderRadius: borderRadius.button - 2,
    },
    label: {
        ...typography.styles.bodySmall,
        color: colors.textSecondary,
        fontWeight: '500',
    },
    labelSelected: {
        color: colors.backgroundWhite,
        fontWeight: '600',
    },
});
