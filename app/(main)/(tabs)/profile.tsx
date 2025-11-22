/**
 * Profile Tab Screen
 *
 * User profile screen placeholder
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Screen } from '../../../src/shared/components/layout/Screen';
import { colors, typography, spacing } from '../../../src/theme';

export default function ProfileScreen() {
    return (
        <Screen safeArea padding>
            <View style={styles.container}>
                <Text style={styles.title}>Profile</Text>
                <Text style={styles.subtitle}>
                    User profile coming soon...
                </Text>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        ...typography.styles.h1,
        color: colors.primary,
        marginBottom: spacing.md,
    },
    subtitle: {
        ...typography.styles.bodyRegular,
        color: colors.textSecondary,
    },
});
