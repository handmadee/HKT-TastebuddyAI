/**
 * Track Tab Screen
 *
 * Nutrition tracking screen placeholder
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Screen } from '../../../src/shared/components/layout/Screen';
import { colors, typography, spacing } from '../../../src/theme';
import { TrackScreen } from '../../../src/features/track/screens/TrackScreen';

export default TrackScreen;

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
