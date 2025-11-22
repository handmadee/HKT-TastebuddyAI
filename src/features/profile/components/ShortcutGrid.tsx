import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';

interface ShortcutItem {
    id: string;
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    color: string;
    onPress: () => void;
}

interface ShortcutGridProps {
    title: string;
    items: ShortcutItem[];
}

export const ShortcutGrid: React.FC<ShortcutGridProps> = ({ title, items }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.grid}>
                {items.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.item}
                        onPress={item.onPress}
                    >
                        <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
                            <Ionicons name={item.icon} size={24} color={item.color} />
                        </View>
                        <Text style={styles.label}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: spacing.lg,
        marginBottom: spacing.lg,
    },
    title: {
        ...typography.styles.h4,
        color: colors.textPrimary,
        marginBottom: spacing.md,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.md,
    },
    item: {
        width: '30%', // Approximate for 3 columns with gap
        backgroundColor: colors.backgroundWhite,
        borderRadius: 16,
        padding: spacing.md,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.sm,
    },
    label: {
        ...typography.styles.caption,
        color: colors.textPrimary,
        textAlign: 'center',
        fontWeight: typography.fontWeight.medium,
    },
});
