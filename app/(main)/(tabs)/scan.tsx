/**
 * Scan Tab Screen
 *
 * Food scanning screen placeholder
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Screen } from '../../../src/shared/components/layout/Screen';
import { colors, typography, spacing } from '../../../src/theme';

export default function ScanScreen() {
    return (
        <Screen safeArea padding>
            <View style={styles.container}>
                <Text style={styles.title}>Scan</Text>
                <Text style={styles.subtitle}>
                    Food scanner coming soon...
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
