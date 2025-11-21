/**
 * Screen Container Component
 * 
 * Standard screen wrapper with safe area and consistent padding
 */

import React from 'react';
import { View, ScrollView, StyleSheet, ViewProps, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../../../theme';

interface ScreenProps extends ViewProps {
    children: React.ReactNode;
    scrollable?: boolean;
    safeArea?: boolean;
    backgroundColor?: string;
    padding?: boolean;
}

export const Screen: React.FC<ScreenProps> = ({
    children,
    scrollable = false,
    safeArea = true,
    backgroundColor = colors.backgroundWhite,
    padding = true,
    style,
    ...rest
}) => {
    const containerStyle: ViewStyle = {
        flex: 1,
        backgroundColor,
    };

    const contentStyle: ViewStyle[] = [
        padding && styles.padding,
        style as ViewStyle,
    ];

    const Wrapper = safeArea ? SafeAreaView : View;

    if (scrollable) {
        return (
            <Wrapper style={containerStyle} {...rest}>
                <ScrollView
                    contentContainerStyle={contentStyle}
                    showsVerticalScrollIndicator={false}
                >
                    {children}
                </ScrollView>
            </Wrapper>
        );
    }

    return (
        <Wrapper style={[containerStyle, contentStyle]} {...rest}>
            {children}
        </Wrapper>
    );
};

const styles = StyleSheet.create({
    padding: {
        paddingHorizontal: spacing.container.horizontal,
        paddingVertical: spacing.container.vertical,
    },
});
