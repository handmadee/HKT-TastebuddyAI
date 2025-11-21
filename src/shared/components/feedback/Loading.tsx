/**
 * Loading Component
 * 
 * Centered loading indicator with optional message
 */

import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../../../theme';

interface LoadingProps {
    message?: string;
    size?: 'small' | 'large';
}

export const Loading: React.FC<LoadingProps> = ({
    message,
    size = 'large',
}) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={size} color={colors.primary} />
            {message && <Text style={styles.message}>{message}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.xl,
    },
    message: {
        ...typography.styles.bodyRegular,
        color: colors.textSecondary,
        marginTop: spacing.md,
        textAlign: 'center',
    },
});
