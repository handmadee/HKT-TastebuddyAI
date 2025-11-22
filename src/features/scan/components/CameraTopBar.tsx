import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { colors, spacing, typography } from '../../../theme';

interface CameraTopBarProps {
    onClose: () => void;
    onFlashToggle: () => void;
    onCameraFlip: () => void;
    isFlashOn: boolean;
    statusText?: string;
}

/**
 * Camera Top Bar - Apple-style navigation and controls
 * Includes close, flash toggle, and camera flip buttons
 */
export const CameraTopBar: React.FC<CameraTopBarProps> = ({
    onClose,
    onFlashToggle,
    onCameraFlip,
    isFlashOn,
    statusText,
}) => {
    return (
        <View style={styles.container}>
            <BlurView intensity={60} tint="dark" style={StyleSheet.absoluteFill} />
            <View style={styles.content}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={onClose}
                    accessibilityLabel="Close camera"
                    accessibilityRole="button"
                    accessibilityHint="Returns to previous screen"
                >
                    <Ionicons name="close" size={28} color={colors.backgroundWhite} />
                </TouchableOpacity>

                {statusText && (
                    <View style={styles.center}>
                        <Text style={styles.statusText} numberOfLines={1}>
                            {statusText}
                        </Text>
                    </View>
                )}

                <View style={styles.rightButtons}>
                    <TouchableOpacity
                        style={[styles.button, isFlashOn && styles.buttonActive]}
                        onPress={onFlashToggle}
                        accessibilityLabel={isFlashOn ? 'Flash on' : 'Flash off'}
                        accessibilityRole="button"
                        accessibilityState={{ selected: isFlashOn }}
                    >
                        <Ionicons
                            name={isFlashOn ? 'flash' : 'flash-off'}
                            size={24}
                            color={colors.backgroundWhite}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={onCameraFlip}
                        accessibilityLabel="Flip camera"
                        accessibilityRole="button"
                        accessibilityHint="Switch between front and back camera"
                    >
                        <Ionicons name="camera-reverse" size={26} color={colors.backgroundWhite} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        overflow: 'hidden',
        backgroundColor: 'transparent',
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingTop: spacing.md,
        paddingBottom: spacing.lg,
        minHeight: 60,
    },
    button: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonActive: {
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
    },
    center: {
        flex: 1,
        paddingHorizontal: spacing.md,
        alignItems: 'center',
    },
    statusText: {
        ...typography.styles.bodySmall,
        color: colors.backgroundWhite,
        fontWeight: typography.fontWeight.semibold,
        textAlign: 'center',
    },
    rightButtons: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
});
