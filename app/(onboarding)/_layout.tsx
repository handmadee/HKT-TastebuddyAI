/**
 * Onboarding Layout
 *
 * Layout wrapper for all onboarding screens
 */

import { Stack } from 'expo-router';
import React from 'react';

export default function OnboardingLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
                gestureEnabled: false,
            }}
        >
            <Stack.Screen name="language" />
            <Stack.Screen name="dietary-preferences" />
            <Stack.Screen name="allergens" />
            <Stack.Screen name="nutrition-goals" />
            <Stack.Screen name="daily-targets" />
            <Stack.Screen name="smart-features" />
            <Stack.Screen name="location-permission" />
            <Stack.Screen name="completion" />
        </Stack>
    );
}
