import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Screen } from '../../../shared/components/layout/Screen';
import { SettingItem } from '../components/SettingItem';
import { BaseButton } from '../../../shared/components/base/BaseButton';
import { useHealthConnect } from '../hooks/useHealthConnect';
import { colors, spacing, typography } from '../../../theme';

export const HealthConnectScreen = () => {
    const {
        status,
        connect,
        disconnect,
        isToggling,
    } = useHealthConnect();

    if (!status) return null;

    return (
        <Screen
            scrollable={true}
            safeArea={true}
            backgroundColor={colors.backgroundGray}
            title="Health Connect"
            showBack={true}
        >
            <View style={styles.header}>
                <Image
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Apple_Health_icon.svg/1200px-Apple_Health_icon.svg.png' }}
                    style={styles.icon}
                />
                <Text style={styles.title}>Apple Health</Text>
                <Text style={styles.subtitle}>
                    Sync your nutrition data with Apple Health to get a complete picture of your wellness.
                </Text>
            </View>

            <View style={styles.card}>
                <SettingItem
                    label="Connect Apple Health"
                    type="toggle"
                    value={status.isConnected}
                    onToggle={(value) => value ? connect() : disconnect()}
                />
            </View>

            {status.isConnected && (
                <>
                    <Text style={styles.sectionTitle}>Data to Sync</Text>
                    <View style={styles.card}>
                        <SettingItem
                            label="Active Energy"
                            type="toggle"
                            value={status.permissions.activeEnergy}
                            onToggle={() => { }} // TODO: Implement granular permissions
                        />
                        <SettingItem
                            label="Dietary Energy"
                            type="toggle"
                            value={status.permissions.dietaryEnergy}
                            onToggle={() => { }}
                        />
                        <SettingItem
                            label="Steps"
                            type="toggle"
                            value={status.permissions.steps}
                            onToggle={() => { }}
                        />
                    </View>
                </>
            )}

            <View style={styles.footer}>
                <BaseButton
                    title="Manage in Apple Health"
                    onPress={() => { }} // TODO: Open Apple Health app
                    variant="outline"
                    fullWidth
                />
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        paddingVertical: spacing.xl,
        paddingHorizontal: spacing.lg,
    },
    icon: {
        width: 64,
        height: 64,
        marginBottom: spacing.md,
    },
    title: {
        ...typography.styles.h2,
        color: colors.textPrimary,
        marginBottom: spacing.sm,
    },
    subtitle: {
        ...typography.styles.bodyRegular,
        color: colors.textSecondary,
        textAlign: 'center',
    },
    sectionTitle: {
        ...typography.styles.h4,
        color: colors.textSecondary,
        marginBottom: spacing.sm,
        marginLeft: spacing.lg,
        marginTop: spacing.lg,
    },
    card: {
        backgroundColor: colors.backgroundWhite,
        borderRadius: 16,
        overflow: 'hidden',
        marginHorizontal: spacing.lg,
    },
    footer: {
        padding: spacing.lg,
        marginTop: spacing.lg,
    },
});
