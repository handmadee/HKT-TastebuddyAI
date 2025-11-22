import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../../../theme';

export type CameraStatus = 'initial' | 'detecting' | 'success' | 'error';

interface CameraStatusTextProps {
    status: CameraStatus;
    message?: string;
}

/**
 * Camera Status Text - Shows current camera state
 * Displays instructions,  progress, or error messages
 */
export const CameraStatusText: React.FC<CameraStatusTextProps> = ({ status, message }) => {
    const getStatusMessage = (): string => {
        if (message) return message;

        switch (status) {
            case 'initial':
                return 'Align the food inside the frame';
            case 'detecting':
                return 'Detecting...';
            case 'success':
                return 'Perfect! Analyzing now...';
            case 'error':
                return 'Try adjusting lighting or angle';
            default:
                return '';
        }
    };

    const getStatusColor = () => {
        switch (status) {
            case 'success':
                return colors.secondary;
            case 'error':
                return colors.error;
            default:
                return colors.backgroundWhite;
        }
    };

    return (
        <View style={styles.container}>
            <View style={[styles.badge, { borderColor: getStatusColor() }]}>
                <Text
                    style={[styles.text, { color: getStatusColor() }]}
                    accessibilityRole="text"
                    accessibilityLiveRegion="polite"
                >
                    {getStatusMessage()}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.lg,
    },
    badge: {
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.badge,
        borderWidth: 1.5,
        minWidth: 200,
        alignItems: 'center',
    },
    text: {
        ...typography.styles.bodyMedium,
        fontWeight: typography.fontWeight.semibold,
        textAlign: 'center',
    },
});
