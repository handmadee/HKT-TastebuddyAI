import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, spacing, typography } from '../../../theme';
import { format, addDays, subDays, isSameDay } from 'date-fns';

interface DateSelectorProps {
    selectedDate: string;
    onSelectDate: (date: string) => void;
}

export const DateSelector: React.FC<DateSelectorProps> = ({ selectedDate, onSelectDate }) => {
    const dates = React.useMemo(() => {
        const today = new Date();
        const result = [];
        for (let i = -2; i <= 2; i++) {
            result.push(addDays(today, i));
        }
        return result;
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {dates.map((date) => {
                    const dateString = format(date, 'yyyy-MM-dd');
                    const isSelected = dateString === selectedDate;
                    const isToday = isSameDay(date, new Date());

                    return (
                        <TouchableOpacity
                            key={dateString}
                            style={[styles.dateItem, isSelected && styles.dateItemActive]}
                            onPress={() => onSelectDate(dateString)}
                        >
                            <Text style={[styles.dayName, isSelected && styles.textActive]}>
                                {format(date, 'EEE')}
                            </Text>
                            <Text style={[styles.dayNumber, isSelected && styles.textActive]}>
                                {format(date, 'd')}
                            </Text>
                            {isToday && <View style={styles.todayIndicator} />}
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: spacing.sm,
        backgroundColor: colors.backgroundMain,
    },
    scrollContent: {
        paddingHorizontal: spacing.lg,
        gap: spacing.md,
    },
    dateItem: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: 16,
        backgroundColor: 'transparent',
        minWidth: 60,
    },
    dateItemActive: {
        backgroundColor: colors.primary,
    },
    dayName: {
        ...typography.styles.caption,
        color: colors.textSecondary,
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    dayNumber: {
        ...typography.styles.h3,
        color: colors.textPrimary,
        fontWeight: typography.fontWeight.bold,
    },
    textActive: {
        color: colors.backgroundWhite,
    },
    todayIndicator: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: colors.primary,
        marginTop: 4,
    },
});
