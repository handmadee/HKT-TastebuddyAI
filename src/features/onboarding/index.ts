/**
 * Onboarding Feature Exports
 *
 * Central export file for all onboarding-related components and utilities
 */

// Screens
export { LanguageSelectionScreen } from './screens/LanguageSelectionScreen';
export { DietaryPreferencesScreen } from './screens/DietaryPreferencesScreen';
export { AllergensScreen } from './screens/AllergensScreen';
export { NutritionGoalsScreen } from './screens/NutritionGoalsScreen';
export { DailyTargetsScreen } from './screens/DailyTargetsScreen';
export { SmartFeaturesScreen } from './screens/SmartFeaturesScreen';
export { LocationPermissionScreen } from './screens/LocationPermissionScreen';
export { CompletionScreen } from './screens/CompletionScreen';

// Components
export { OnboardingContainer } from './components/OnboardingContainer';
export { OnboardingProgress } from './components/OnboardingProgress';
export { SelectableCard } from './components/SelectableCard';
export { AllergenCard } from './components/AllergenCard';
export { SegmentedControl } from './components/SegmentedControl';
export { MacroBar } from './components/MacroBar';
export { PermissionCard } from './components/PermissionCard';

// Store
export { useOnboardingStore } from './stores/onboardingStore';

// Types
export * from './types';

// Constants
export { LANGUAGES } from './constants/languages';
export { DIETARY_PREFERENCES } from './constants/dietaryPreferences';
export { ALLERGENS } from './constants/allergens';
