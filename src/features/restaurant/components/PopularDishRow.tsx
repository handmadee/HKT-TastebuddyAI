import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../../theme';
import { PopularDish } from '../types';

interface PopularDishRowProps {
    dish: PopularDish;
    onPress: () => void;
}

export const PopularDishRow: React.FC<PopularDishRowProps> = ({ dish, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.content}>
                <Text style={styles.name}>{dish.name}</Text>
                <Text style={styles.description}>{dish.description}</Text>
                <View style={styles.tags}>
                    {dish.tags.map((tag, index) => (
                        <View key={index} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                        </View>
                    ))}
                </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
        backgroundColor: colors.backgroundWhite,
        borderBottomWidth: 1,
        borderBottomColor: colors.divider,
    },
    content: {
        flex: 1,
    },
    name: {
        ...typography.styles.bodyMedium,
        color: colors.textPrimary,
        marginBottom: spacing.xs,
    },
    description: {
        ...typography.styles.caption,
        color: colors.textSecondary,
        marginBottom: spacing.xs,
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
    },
    tag: {
        backgroundColor: colors.backgroundMain,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    tagText: {
        fontSize: 10,
        color: colors.primary,
    },
});
