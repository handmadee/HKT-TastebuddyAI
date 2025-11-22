import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../../theme';

interface ScreenHeaderProps {
    title?: string;
    showBack?: boolean;
    rightAction?: React.ReactNode;
    onBackPress?: () => void;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
    title,
    showBack = false,
    rightAction,
    onBackPress,
}) => {
    const router = useRouter();

    const handleBack = () => {
        if (onBackPress) {
            onBackPress();
        } else {
            router.back();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                {showBack && (
                    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.titleContainer}>
                {title && <Text style={styles.title}>{title}</Text>}
            </View>

            <View style={styles.rightContainer}>
                {rightAction}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        backgroundColor: colors.backgroundWhite,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    leftContainer: {
        flex: 1,
        alignItems: 'flex-start',
    },
    titleContainer: {
        flex: 2,
        alignItems: 'center',
    },
    rightContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    backButton: {
        padding: spacing.xs,
        marginLeft: -spacing.xs,
    },
    title: {
        ...typography.styles.h4,
        color: colors.textPrimary,
        textAlign: 'center',
    },
});
