/**
 * Auth Layout
 *
 * Layout wrapper for all authentication screens
 * Senior-level implementation with proper navigation structure
 */

import { Stack } from 'expo-router';
import React from 'react';

export default function AuthLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
            }}
        >
            <Stack.Screen name="welcome" />
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
            <Stack.Screen name="reset-password" />
        </Stack>
    );
}
