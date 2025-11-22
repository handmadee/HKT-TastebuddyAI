import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../../../shared/components/layout/Screen';
import { FormInput } from '../../../shared/components/forms/FormInput';
import { BaseButton } from '../../../shared/components/base/BaseButton';
import { useUserProfile } from '../hooks/useUserProfile';
import { useUpdateProfile } from '../hooks/useUpdateProfile';
import { colors, spacing, typography } from '../../../theme';

export const EditProfileScreen = () => {
    const router = useRouter();
    const { profile } = useUserProfile();
    const { updateProfile, isUpdating } = useUpdateProfile();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');

    useEffect(() => {
        if (profile) {
            setFullName(profile.fullName);
            setEmail(profile.email);
            setCountry(profile.country);
        }
    }, [profile]);

    const handleSave = async () => {
        if (!fullName.trim() || !email.trim()) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }

        try {
            await updateProfile({
                fullName,
                email,
                country,
            });
            router.back();
        } catch (error) {
            Alert.alert('Error', 'Failed to update profile');
        }
    };

    return (
        <Screen
            scrollable={true}
            safeArea={true}
            backgroundColor={colors.backgroundWhite}
            style={styles.container}
        >
            <View style={styles.form}>
                <FormInput
                    label="Full Name"
                    value={fullName}
                    onChangeText={setFullName}
                    placeholder="Enter your full name"
                />
                <FormInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <FormInput
                    label="Country"
                    value={country}
                    onChangeText={setCountry}
                    placeholder="Enter your country"
                />
            </View>

            <View style={styles.footer}>
                <BaseButton
                    title="Save Changes"
                    onPress={handleSave}
                    loading={isUpdating}
                    fullWidth
                />
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: spacing.lg,
    },
    form: {
        gap: spacing.md,
        marginTop: spacing.xl,
    },
    footer: {
        marginTop: spacing.xl,
        marginBottom: spacing.xl,
    },
});
