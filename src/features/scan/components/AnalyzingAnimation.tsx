/**
 * AnalyzingAnimation Component
 *
 * Loading animation while analyzing food
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { colors, spacing, typography } from '../../../theme';

interface AnalyzingAnimationProps {
    message?: string;
}

export const AnalyzingAnimation: React.FC<AnalyzingAnimationProps> = ({
    message = 'Analyzing dish...',
}) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Pulse animation
        const pulseAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.2,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        );

        // Rotation animation
        const rotateAnimation = Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        );

        pulseAnimation.start();
        rotateAnimation.start();

        return () => {
            pulseAnimation.stop();
            rotateAnimation.stop();
        };
    }, [scaleAnim, rotateAnim]);

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.iconContainer,
                    {
                        transform: [{ scale: scaleAnim }, { rotate }],
                    },
                ]}
            >
                <Text style={styles.icon}>🍽️</Text>
            </Animated.View>

            <Text style={styles.message}>{message}</Text>

            <View style={styles.dotsContainer}>
                <AnimatedDot delay={0} />
                <AnimatedDot delay={200} />
                <AnimatedDot delay={400} />
            </View>
        </View>
    );
};

const AnimatedDot: React.FC<{ delay: number }> = ({ delay }) => {
    const opacity = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.delay(delay),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0.3,
                    duration: 600,
                    useNativeDriver: true,
                }),
            ])
        );

        animation.start();

        return () => animation.stop();
    }, [opacity, delay]);

    return <Animated.View style={[styles.dot, { opacity }]} />;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.backgroundWhite,
        padding: spacing.xl,
    },
    iconContainer: {
        marginBottom: spacing.xl,
    },
    icon: {
        fontSize: 80,
    },
    message: {
        ...typography.styles.h2,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.semibold,
        textAlign: 'center',
        marginBottom: spacing.lg,
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: colors.primary,
        marginHorizontal: spacing.xs,
    },
});
