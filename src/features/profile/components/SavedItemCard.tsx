import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';
import { SavedRestaurant, SavedMenu } from '../types';

interface SavedItemCardProps {
    item: SavedRestaurant | SavedMenu;
    type: 'restaurant' | 'menu';
    onPress: () => void;
    onRemove: () => void;
}

export const SavedItemCard: React.FC<SavedItemCardProps> = ({ item, type, onPress, onRemove }) => {
    const isRestaurant = type === 'restaurant';
    const restaurantItem = item as SavedRestaurant;
    const menuItem = item as SavedMenu;

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image source={{ uri: item.imageUri }} style={styles.image} />
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                    <TouchableOpacity onPress={onRemove}>
                        <Ionicons name="bookmark" size={20} color={colors.primary} />
                    </TouchableOpacity>
                </View>

                {isRestaurant ? (
                    <>
                        <View style={styles.row}>
                            <Ionicons name="star" size={14} color={colors.accent} />
                            <Text style={styles.rating}>{restaurantItem.rating}</Text>
                            <Text style={styles.dot}>•</Text>
                            <Text style={styles.detail}>{restaurantItem.distance}</Text>
                        </View>
                        <View style={styles.tags}>
                            {restaurantItem.tags.map((tag, index) => (
                                <View key={index} style={styles.tag}>
                                    <Text style={styles.tagText}>{tag}</Text>
                                </View>
                            ))}
                        </View>
                    </>
                ) : (
                    <>
                        <Text style={styles.restaurantName}>{menuItem.restaurantName}</Text>
                        <Text style={styles.detail}>{menuItem.calories} kcal</Text>
                    </>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: colors.backgroundWhite,
        borderRadius: 16,
        padding: spacing.sm,
        marginBottom: spacing.md,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 12,
        backgroundColor: colors.backgroundGray,
    },
    content: {
        flex: 1,
        marginLeft: spacing.md,
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 4,
    },
    name: {
        ...typography.styles.h4,
        color: colors.textPrimary,
        flex: 1,
        marginRight: spacing.sm,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    rating: {
        ...typography.styles.caption,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.bold,
        marginLeft: 4,
    },
    dot: {
        marginHorizontal: 6,
        color: colors.textSecondary,
    },
    detail: {
        ...typography.styles.caption,
        color: colors.textSecondary,
    },
    restaurantName: {
        ...typography.styles.caption,
        color: colors.textSecondary,
        marginBottom: 2,
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
