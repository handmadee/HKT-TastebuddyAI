import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { colors, spacing, typography } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';

interface AllergenListProps {
    allergens: string[];
    onAdd: (allergen: string) => void;
    onRemove: (allergen: string) => void;
}

export const AllergenList: React.FC<AllergenListProps> = ({ allergens, onAdd, onRemove }) => {
    const [newAllergen, setNewAllergen] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const handleAdd = () => {
        if (newAllergen.trim()) {
            onAdd(newAllergen.trim());
            setNewAllergen('');
            setIsAdding(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Allergens</Text>
                <TouchableOpacity onPress={() => setIsAdding(!isAdding)}>
                    <Text style={styles.addButton}>{isAdding ? 'Cancel' : 'Add'}</Text>
                </TouchableOpacity>
            </View>

            {isAdding && (
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter allergen (e.g. Peanuts)"
                        value={newAllergen}
                        onChangeText={setNewAllergen}
                        autoFocus
                        onSubmitEditing={handleAdd}
                    />
                    <TouchableOpacity style={styles.confirmButton} onPress={handleAdd}>
                        <Ionicons name="checkmark" size={20} color={colors.backgroundWhite} />
                    </TouchableOpacity>
                </View>
            )}

            <View style={styles.list}>
                {allergens.map((allergen) => (
                    <View key={allergen} style={styles.item}>
                        <Text style={styles.itemText}>{allergen}</Text>
                        <TouchableOpacity onPress={() => onRemove(allergen)}>
                            <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
                        </TouchableOpacity>
                    </View>
                ))}
                {allergens.length === 0 && !isAdding && (
                    <Text style={styles.emptyText}>No allergens added.</Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.lg,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
        paddingHorizontal: spacing.lg,
    },
    title: {
        ...typography.styles.h4,
        color: colors.textPrimary,
    },
    addButton: {
        ...typography.styles.bodyMedium,
        color: colors.primary,
    },
    inputContainer: {
        flexDirection: 'row',
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.md,
        gap: spacing.sm,
    },
    input: {
        flex: 1,
        backgroundColor: colors.backgroundWhite,
        borderRadius: 8,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderWidth: 1,
        borderColor: colors.border,
        ...typography.styles.bodyRegular,
    },
    confirmButton: {
        backgroundColor: colors.primary,
        width: 40,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        paddingHorizontal: spacing.lg,
        gap: spacing.sm,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.backgroundWhite,
        padding: spacing.md,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
    },
    itemText: {
        ...typography.styles.bodyRegular,
        color: colors.textPrimary,
    },
    emptyText: {
        ...typography.styles.bodyRegular,
        color: colors.textSecondary,
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: spacing.sm,
    },
});
