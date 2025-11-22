/**
 * Onboarding Entry Point
 *
 * Redirects to the first onboarding screen
 */

import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function OnboardingIndex() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to language selection (first step)
        router.replace('/(onboarding)/language');
    }, []);

    return null;
}
