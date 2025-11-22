/**
 * QuickActionsSection Component
 *
 * Section displaying quick action shortcuts
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { QuickActionButton } from '@/shared/components/base/QuickActionButton';
import { spacing } from '@/theme';
import { useRouter } from 'expo-router';

interface QuickActionsSectionProps {
    translations: {
        scanDish: string;
        translate: string;
        findFood: string;
    };
}

export const QuickActionsSection: React.FC<QuickActionsSectionProps> = ({
    translations,
}) => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <QuickActionButton
                icon="camera"
                label={translations.scanDish}
                variant="primary"
                onPress={() => {
                    // Navigate to scan screen
                    console.log('Scan dish');
                }}
            />
            <QuickActionButton
                icon="document-text-outline"
                label={translations.translate}
                variant="secondary"
                onPress={() => {
                    // Navigate to translate screen
                    console.log('Translate');
                }}
            />
            <QuickActionButton
                icon="restaurant-outline"
                label={translations.findFood}
                variant="secondary"
                onPress={() => {
                    // Navigate to find food screen
                    console.log('Find food');
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: spacing.md,
        justifyContent: 'space-between',
    },
});
