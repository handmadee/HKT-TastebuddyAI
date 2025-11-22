import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { Screen } from '../../../shared/components/layout/Screen';
import { SavedItemCard } from '../components/SavedItemCard';
import { useSavedItems } from '../hooks/useSavedItems';
import { colors, spacing, typography } from '../../../theme';

export const SavedMenusScreen = () => {
    const { menus, removeMenu, isLoading } = useSavedItems();

    return (
        <Screen
            scrollable={false}
            safeArea={true}
            backgroundColor={colors.backgroundGray}
            title="Saved Menus"
            showBack={true}
        >
            <FlatList
                data={menus}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <SavedItemCard
                        item={item}
                        type="menu"
                        onPress={() => { }} // TODO: Navigate to menu details
                        onRemove={() => removeMenu(item.id)}
                    />
                )}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={styles.emptyText}>No saved menus</Text>
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
