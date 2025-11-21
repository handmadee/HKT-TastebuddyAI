/**
 * AuthLayout Component
 *
 * Consistent layout wrapper for authentication screens
 * Senior-level implementation with keyboard handling
 */

import React from 'react';
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, spacing, typography } from '../../../theme';

interface AuthLayoutProps {
    children: React.ReactNode;
    showBackButton?: boolean;
    backButtonLabel?: string;
    onBackPress?: () => void;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
    children,
    showBackButton = false,
    backButtonLabel,
    onBackPress,
}) => {
    const router = useRouter();

    const handleBackPress = () => {
        if (onBackPress) {
            onBackPress();
        } else {
            router.back();
        }
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                {showBackButton && (
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={handleBackPress}
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={24}
                            color={colors.primary}
                        />
                        {backButtonLabel && (
                            <Text style={styles.backButtonLabel}>
                                {backButtonLabel}
                            </Text>
                        )}
                    </TouchableOpacity>
                )}

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {children}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.backgroundWhite,
    },
    container: {
        flex: 1,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
    },
    backButtonLabel: {
        ...typography.styles.bodyMedium,
        color: colors.primary,
        marginLeft: spacing.xs,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: spacing.xl,
        paddingBottom: spacing.xl,
    },
});
