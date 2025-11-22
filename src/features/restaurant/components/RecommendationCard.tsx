import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, shadows } from '../../../theme';

const CARD_WIDTH = Dimensions.get('window').width - spacing.lg * 2;

interface RecommendationCardProps {
    title: string;
    subtitle: string;
    imageUri: string;
    tags: string[];
    onPress: () => void;
}

/**
 * Featured recommendation card with premium design
 * Includes image, gradient overlay, and action button
 */
export const RecommendationCard: React.FC<RecommendationCardProps> = ({
    title,
    subtitle,
    imageUri,
    tags,
    onPress,
}) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.9}
            accessibilityRole="button"
            accessibilityLabel={`View ${title}`}
        >
            <Image source={{ uri: imageUri }} style={styles.image} />
            <View style={styles.gradient} />

            <View style={styles.content}>
                <View style={styles.tags}>
                    {tags.slice(0, 2).map((tag, index) => (
                        <View key={index} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                        </View>
                    ))}
                </View>

                <Text style={styles.subtitle}>{subtitle}</Text>
                <Text style={styles.title} numberOfLines={2}>{title}</Text>

                <View style={styles.actionButton}>
                    <Text style={styles.actionText}>Explore</Text>
                    <Ionicons name="arrow-forward" size={16} color={colors.backgroundWhite} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: CARD_WIDTH,
        height: 240,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: colors.backgroundWhite,
        ...shadows.strong,
    },
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    gradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
    },
    content: {
        flex: 1,
        padding: spacing.lg,
        justifyContent: 'flex-end',
    },
    tags: {
        flexDirection: 'row',
        gap: spacing.xs,
        marginBottom: spacing.sm,
    },
    tag: {
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        borderRadius: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(10px)',
    },
    tagText: {
        fontSize: 11,
        fontWeight: typography.fontWeight.semibold,
        color: colors.backgroundWhite,
    },
    subtitle: {
        ...typography.styles.caption,
        color: 'rgba(255, 255, 255, 0.9)',
        marginBottom: 4,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    title: {
        ...typography.styles.h2,
        color: colors.backgroundWhite,
        fontWeight: typography.fontWeight.bold,
        marginBottom: spacing.md,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        alignSelf: 'flex-start',
    },
    actionText: {
        ...typography.styles.bodyMedium,
        color: colors.backgroundWhite,
        fontWeight: typography.fontWeight.semibold,
    },
});
