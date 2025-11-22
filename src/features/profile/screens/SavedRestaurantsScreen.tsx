import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { Screen } from '../../../shared/components/layout/Screen';
import { SavedItemCard } from '../components/SavedItemCard';
import { useSavedItems } from '../hooks/useSavedItems';
import { colors, spacing, typography } from '../../../theme';

export const SavedRestaurantsScreen = () => {
    const { restaurants, removeRestaurant, isLoading } = useSavedItems();

    return (
        <Screen
            scrollable={false}
            safeArea={true}
            backgroundColor={colors.backgroundGray}
        >
            <FlatList
                data={restaurants}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <SavedItemCard
                        item={item}
                        type="restaurant"
                        onPress={() => { }} // TODO: Navigate to restaurant details
                        onRemove={() => removeRestaurant(item.id)}
                    />
                )}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={styles.emptyText}>No saved restaurants</Text>
                    </View>
                }
            />
        </Screen>
    );
};

const styles = StyleSheet.create({
    list: {
        padding: spacing.lg,
    },
    empty: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.xxl,
    },
    emptyText: {
        ...typography.styles.bodyRegular,
        color: colors.textSecondary,
    },
});
