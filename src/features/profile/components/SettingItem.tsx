import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { colors, spacing, typography } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';

interface SettingItemProps {
    label: string;
    value?: string | boolean;
    type: 'toggle' | 'link' | 'value';
    onPress?: () => void;
    onToggle?: (value: boolean) => void;
    icon?: keyof typeof Ionicons.glyphMap;
    color?: string;
    destructive?: boolean;
}

export const SettingItem: React.FC<SettingItemProps> = ({
    label,
    value,
    type,
    onPress,
    onToggle,
    icon,
    color = colors.textPrimary,
    destructive = false,
}) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={type !== 'toggle' ? onPress : undefined}
            disabled={type === 'toggle'}
        >
            <View style={styles.leftContent}>
                {icon && (
                    <View style={[styles.iconContainer, { backgroundColor: destructive ? colors.errorLight : colors.backgroundGray }]}>
                        <Ionicons name={icon} size={20} color={destructive ? colors.error : color} />
                    </View>
                )}
                <Text style={[styles.label, destructive && styles.destructiveLabel]}>{label}</Text>
            </View>

            <View style={styles.rightContent}>
                {type === 'toggle' && (
                    <Switch
                        value={value as boolean}
                        onValueChange={onToggle}
                        trackColor={{ false: colors.disabled, true: colors.primary }}
                        thumbColor={colors.backgroundWhite}
                    />
                )}
                {type === 'value' && (
                    <Text style={styles.value}>{value as string}</Text>
                )}
                {type === 'link' && (
                    <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        backgroundColor: colors.backgroundWhite,
        borderBottomWidth: 1,
        borderBottomColor: colors.divider,
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        ...typography.styles.bodyRegular,
        color: colors.textPrimary,
    },
    destructiveLabel: {
        color: colors.error,
    },
    rightContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    value: {
        ...typography.styles.bodyRegular,
        color: colors.textSecondary,
        marginRight: spacing.sm,
    },
});
