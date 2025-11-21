/**
 * Main Layout
 *
 * Layout wrapper for main app screens
 */

import { Stack } from 'expo-router';
import React from 'react';

export default function MainLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="(tabs)" />
        </Stack>
    );
}
