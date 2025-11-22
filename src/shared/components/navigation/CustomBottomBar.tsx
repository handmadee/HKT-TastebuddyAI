/**
 * CustomBottomBar Component
 *
 * Custom bottom navigation bar for the main app
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, shadows } from '@/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface BottomBarTab {
    key: string;
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
}

interface CustomBottomBarProps {
    tabs: BottomBarTab[];
    activeTab: string;
}

export const CustomBottomBar: React.FC<CustomBottomBarProps> = ({
    tabs,
    activeTab,
}) => {
    const insets = useSafeAreaInsets();

    return (
        <View
            style={[
                styles.container,
                {
                    paddingBottom: Math.max(insets.bottom, spacing.md),
                },
            ]}
        >
            {tabs.map((tab) => {
                const isActive = tab.key === activeTab;

                return (
                    <TouchableOpacity
                        key={tab.key}
                        style={styles.tab}
                        onPress={tab.onPress}
                        activeOpacity={0.7}
                    >
                        <View
                            style={[
                                styles.iconContainer,
                                isActive && styles.iconContainerActive,
                            ]}
                        >
                            <Ionicons
                                name={tab.icon}
                                size={24}
                                color={isActive ? colors.primary : colors.textSecondary}
                            />
                        </View>
                        <Text
                            style={[
                                styles.label,
                                isActive && styles.labelActive,
                            ]}
                        >
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: colors.card,
        paddingTop: spacing.md,
        paddingHorizontal: spacing.lg,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        ...shadows.top,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.xs,
    },
    iconContainer: {
        padding: spacing.sm,
        borderRadius: 12,
    },
    iconContainerActive: {
        backgroundColor: colors.backgroundMain,
    },
    label: {
        ...typography.styles.bodyTiny,
        color: colors.textSecondary,
    },
    labelActive: {
        color: colors.primary,
        fontWeight: typography.fontWeight.semibold,
    },
});
