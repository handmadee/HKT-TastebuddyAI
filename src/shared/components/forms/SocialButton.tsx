/**
 * SocialButton Component
 *
 * Button for social authentication (Apple, Google, Facebook)
 * Senior-level implementation with consistent styling
 */

import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    StyleProp,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../../theme';

type SocialProvider = 'apple' | 'google' | 'facebook' | 'email';

interface SocialButtonProps {
    provider: SocialProvider;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}

const PROVIDER_CONFIG: Record<
    SocialProvider,
    {
        icon: keyof typeof Ionicons.glyphMap;
        label: string;
        backgroundColor: string;
        textColor: string;
        borderColor?: string;
    }
> = {
    apple: {
        icon: 'logo-apple',
        label: 'Sign in with Apple',
        backgroundColor: '#000000',
        textColor: '#FFFFFF',
    },
    google: {
        icon: 'logo-google',
        label: 'Sign in with Google',
        backgroundColor: '#FFFFFF',
        textColor: '#000000',
        borderColor: colors.border,
    },
    facebook: {
        icon: 'logo-facebook',
        label: 'Sign in with Facebook',
        backgroundColor: '#1877F2',
        textColor: '#FFFFFF',
    },
    email: {
        icon: 'mail-outline',
        label: 'Continue with email',
        backgroundColor: '#FFFFFF',
        textColor: '#000000',
        borderColor: colors.border,
    },
};

export const SocialButton: React.FC<SocialButtonProps> = ({
    provider,
    onPress,
    loading = false,
    disabled = false,
    style,
}) => {
    const config = PROVIDER_CONFIG[provider];

    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    backgroundColor: config.backgroundColor,
                    borderColor: config.borderColor || 'transparent',
                },
                disabled && styles.buttonDisabled,
                style,
            ]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator
                    color={config.textColor}
                    size="small"
                    style={styles.loader}
                />
            ) : (
                <>
                    <Ionicons
                        name={config.icon}
                        size={20}
                        color={config.textColor}
                        style={styles.icon}
                    />
                    <Text
                        style={[
                            styles.label,
                            { color: config.textColor },
                        ]}
                    >
                        {config.label}
                    </Text>
                </>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
        borderRadius: borderRadius.md,
        borderWidth: 1,
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.sm,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    icon: {
        marginRight: spacing.sm,
    },
    label: {
        ...typography.styles.bodyMedium,
    },
    loader: {
        marginHorizontal: spacing.sm,
    },
});
