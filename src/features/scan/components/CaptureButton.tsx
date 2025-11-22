/**
 * CaptureButton Component
 *
 * Large circular button for capturing food photos
 */

import React from 'react';
import { TouchableOpacity, View, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, shadows } from '../../../theme';

interface CaptureButtonProps {
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
}

export const CaptureButton: React.FC<CaptureButtonProps> = ({
    onPress,
    disabled = false,
    loading = false,
}) => {
    return (
        <TouchableOpacity
            style={[styles.container, disabled && styles.disabled]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            <View style={styles.outerCircle}>
                <View style={styles.innerCircle}>
                    {loading && (
                        <ActivityIndicator size="large" color={colors.primary} />
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    outerCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
        ...shadows.strong,
    },
    innerCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: colors.backgroundWhite,
        alignItems: 'center',
        justifyContent: 'center',
    },
    disabled: {
        opacity: 0.5,
    },
});
