import { useAuthStore } from '../../../shared/stores/authStore';
import { UserProfile } from '../types';

export const useUserProfile = () => {
    const { user, isLoading } = useAuthStore();

    const profile: UserProfile | null = user ? {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        avatar: undefined,
        country: 'Vietnam', // Default or derive
        joinDate: user.onboarding?.createdAt,
        isPremium: true,
    } : null;

    return { profile, isLoading, error: null, refetch: () => { } };
};
