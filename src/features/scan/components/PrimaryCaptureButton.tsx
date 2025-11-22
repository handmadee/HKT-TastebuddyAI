import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { colors, spacing, typography, shadows } from '../../../theme';

interface PrimaryCaptureButtonProps {
    onPress: () => void;
    onGalleryPress: () => void;
    loading?: boolean;
    disabled?: boolean;
}

/**
 * Primary Capture Button - Main CTA for camera screen
 * Large, thumb-friendly button with loading state and gallery shortcut
 */
export const PrimaryCaptureButton: React.FC<PrimaryCaptureButtonProps> = ({
    onPress,
    onGalleryPress,
    loading = false,
    disabled = false,
}) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.92,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={styles.container}>
            <BlurView intensity={60} tint="dark" style={StyleSheet.absoluteFill} />
            <View style={styles.content}>
                {/* Gallery Button */}
                <TouchableOpacity
                    style={styles.galleryButton}
                    onPress={onGalleryPress}
                    disabled={disabled || loading}
                    accessibilityLabel="Choose from gallery"
                    accessibilityRole="button"
                    accessibilityHint="Select an existing photo to analyze"
                >
                    <Ionicons name="images" size={28} color={colors.backgroundWhite} />
                </TouchableOpacity>

                {/* Capture Button */}
                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                    <TouchableOpacity
                        style={[styles.captureButton, disabled && styles.captureButtonDisabled]}
                        onPress={onPress}
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                        disabled={disabled || loading}
                        activeOpacity={0.9}
                        accessibilityLabel="Capture photo"
                        accessibilityRole="button"
                        accessibilityHint="Takes a photo of the food"
                        accessibilityState={{ disabled: disabled || loading }}
                    >
                        <View style={styles.captureButtonInner}>
                            {loading ? (
                                <ActivityIndicator size="large" color={colors.primary} />
                            ) : (
                                <>
                                    <Ionicons name="camera" size={32} color={colors.primary} />
                                    <Text style={styles.captureText}>Scan</Text>
                                </>
                            )}
                        </View>
                    </TouchableOpacity>
                </Animated.View>

                {/* Spacer for visual balance */}
                <View style={styles.spacer} />
            </View>
        </View>
    );
};

const CAPTURE_BUTTON_SIZE = 80;

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
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.xl,
        gap: spacing.md,
    },
    galleryButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 44,
        minHeight: 44,
    },
    captureButton: {
        width: CAPTURE_BUTTON_SIZE,
        height: CAPTURE_BUTTON_SIZE,
        borderRadius: CAPTURE_BUTTON_SIZE / 2,
        backgroundColor: colors.backgroundWhite,
        justifyContent: 'center',
        alignItems: 'center',
        ...shadows.strong,
    },
    captureButtonDisabled: {
        opacity: 0.5,
    },
    captureButtonInner: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    captureText: {
        ...typography.styles.caption,
        color: colors.primary,
        fontWeight: typography.fontWeight.bold,
        fontSize: 11,
        marginTop: 2,
    },
    spacer: {
        width: 56,
    },
});
