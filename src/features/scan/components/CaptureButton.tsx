/**
 * CaptureButton Component
 *
 * Large circular button for capturing food photos
 */

import React from 'react';
import { TouchableOpacity, View, StyleSheet, ActivityIndicator, Animated, TouchableWithoutFeedback } from 'react-native';
import * as Haptics from 'expo-haptics';
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
    const scaleAnim = React.useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.9,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        onPress();
    };

    return (
        <TouchableWithoutFeedback
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handlePress}
            disabled={disabled || loading}
        >
            <Animated.View
                style={[
                    styles.container,
                    disabled && styles.disabled,
                    { transform: [{ scale: scaleAnim }] },
                ]}
            >
                <View style={styles.outerCircle}>
                    <View style={styles.innerCircle}>
                        {loading && (
                            <ActivityIndicator size="large" color={colors.primary} />
                        )}
                    </View>
                </View>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    outerCircle: {
        width: 84,
        height: 84,
        borderRadius: 42,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 4,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        ...shadows.strong,
    },
    innerCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: colors.backgroundWhite,
        alignItems: 'center',
        justifyContent: 'center',
    },
    disabled: {
        opacity: 0.5,
    },
});
