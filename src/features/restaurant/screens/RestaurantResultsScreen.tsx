import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../../../shared/components/layout/Screen';
import { RestaurantListItem } from '../components/RestaurantListItem';
import { useRestaurantSearch } from '../hooks/useRestaurantSearch';
import { colors, spacing, typography } from '../../../theme';

export const RestaurantResultsScreen = () => {
    const router = useRouter();
    const { results } = useRestaurantSearch();

    return (
        <Screen scrollable={false} safeArea={true} backgroundColor={colors.backgroundGray}>
            <View style={styles.header}>
                <Text style={styles.title}>Results ({results.length})</Text>
            </View>

            <FlatList
                data={results}
                keyExtractor={(item) => item.restaurant.id}
                renderItem={({ item, index }) => (
                    <RestaurantListItem
                        match={item}
                        onPress={() => router.push(`/restaurant/${item.restaurant.id}` as any)}
                        showMatchBadge={index === 0}
                    />
                )}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={styles.emptyText}>No restaurants found</Text>
                    </View>
                }
            />
        </Screen>
    );
};

const styles = StyleSheet.create({
    header: {
        padding: spacing.lg,
        backgroundColor: colors.backgroundWhite,
    },
    title: {
        ...typography.styles.h3,
        color: colors.textPrimary,
    },
    list: {
        padding: spacing.lg,
    },
    empty: {
        paddingVertical: spacing.xxl,
        alignItems: 'center',
    },
    emptyText: {
        ...typography.styles.bodyRegular,
        color: colors.textSecondary,
    },
});
