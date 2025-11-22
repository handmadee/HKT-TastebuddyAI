/**
 * Screen Container Component
 * 
 * Standard screen wrapper with safe area and consistent padding
 */

import React from 'react';
import { View, ScrollView, StyleSheet, ViewProps, ViewStyle, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../../../theme';

import { ScreenHeader } from './ScreenHeader';

interface ScreenProps extends ViewProps {
    children: React.ReactNode;
    scrollable?: boolean;
    safeArea?: boolean;
    backgroundColor?: string;
    padding?: boolean;
    title?: string;
    showBack?: boolean;
    rightAction?: React.ReactNode;
    onBackPress?: () => void;
}

export const Screen: React.FC<ScreenProps> = ({
    children,
    scrollable = false,
    safeArea = true,
    backgroundColor = colors.backgroundWhite,
    padding = true,
    style,
    title,
    showBack,
    rightAction,
    onBackPress,
    ...rest
}) => {
    const containerStyle: ViewStyle = {
        flex: 1,
        backgroundColor,
    };

    const contentStyle: ViewStyle[] = [
        padding ? styles.padding : {},
        style as ViewStyle,
    ];

    const Wrapper = safeArea ? SafeAreaView : View;

    return (
        <Wrapper style={containerStyle} {...rest}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.flex}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            >
                {(title || showBack) && (
                    <ScreenHeader
                        title={title}
                        showBack={showBack}
                        rightAction={rightAction}
                        onBackPress={onBackPress}
                    />
                )}
                {scrollable ? (
                    <ScrollView
                        contentContainerStyle={contentStyle}
                        showsVerticalScrollIndicator={false}
                    >
                        {children}
                    </ScrollView>
                ) : (
                    <View style={[styles.flex, contentStyle]}>
                        {children}
                    </View>
                )}
            </KeyboardAvoidingView>
        </Wrapper>
    );
};

const styles = StyleSheet.create({
    padding: {
        paddingHorizontal: spacing.container.horizontal,
        paddingVertical: spacing.container.vertical,
    },
    flex: {
        flex: 1,
    },
});
