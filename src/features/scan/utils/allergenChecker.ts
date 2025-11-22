/**
 * Allergen Checker Utility
 *
 * Checks detected allergens against user's allergen profile
 */

import { Allergen } from '../../onboarding/types';
import { DetectedAllergen, FoodScanResult } from '../types';

/**
 * Check if food contains any allergens from user's profile
 */
export const checkForUserAllergens = (
    foodAllergens: DetectedAllergen[],
    userAllergens: Allergen[]
): DetectedAllergen[] => {
    if (!userAllergens.length) return [];

    const userAllergenTypes = userAllergens.map((a) => a.type);

    return foodAllergens.filter((foodAllergen) =>
        userAllergenTypes.includes(foodAllergen.type)
    );
};

/**
 * Get severity level for allergen matches
 */
export const getAllergenSeverityLevel = (
    matchedAllergens: DetectedAllergen[]
): 'safe' | 'warning' | 'danger' => {
    if (matchedAllergens.length === 0) return 'safe';

    const hasSevere = matchedAllergens.some((a) => a.severity === 'severe');
    const hasModerate = matchedAllergens.some((a) => a.severity === 'moderate');

    if (hasSevere) return 'danger';
    if (hasModerate) return 'warning';
    return 'warning'; // Even mild allergens should show warning
};

/**
 * Generate allergen warning message
 */
export const generateAllergenWarningMessage = (
    matchedAllergens: DetectedAllergen[],
    severityLevel: 'safe' | 'warning' | 'danger'
): string => {
    if (severityLevel === 'safe') {
        return 'This dish appears safe for you to eat based on your allergen profile.';
    }

    const allergenCount = matchedAllergens.length;
    const allergenNames = matchedAllergens
        .map((a) => a.type.replace(/-/g, ' '))
        .join(', ');

    if (severityLevel === 'danger') {
        return `⚠️ DO NOT EAT THIS DISH!\n\nContains ${allergenCount} allergen${allergenCount > 1 ? 's' : ''} from your profile: ${allergenNames}`;
    }

    return `⚠️ WARNING: This dish contains ${allergenCount} allergen${allergenCount > 1 ? 's' : ''} from your profile: ${allergenNames}`;
};

/**
 * Calculate overall safety score (0-100)
 */
export const calculateSafetyScore = (
    foodScanResult: FoodScanResult,
    userAllergens: Allergen[]
): number => {
    const matchedAllergens = checkForUserAllergens(
        foodScanResult.allergens,
        userAllergens
    );

    if (matchedAllergens.length === 0) return 100;

    // Reduce score based on number and severity of allergens
    let penalty = 0;
    matchedAllergens.forEach((allergen) => {
        switch (allergen.severity) {
            case 'severe':
                penalty += 40;
                break;
            case 'moderate':
                penalty += 25;
                break;
            case 'mild':
                penalty += 15;
                break;
        }
    });

    // Factor in confidence of detection
    const avgConfidence =
        matchedAllergens.reduce((sum, a) => sum + a.confidence, 0) /
        matchedAllergens.length;
    const confidenceFactor = avgConfidence / 100;

    const finalScore = Math.max(0, 100 - penalty * confidenceFactor);
    return Math.round(finalScore);
};

/**
 * Get color for severity level
 */
export const getSeverityColor = (
    severityLevel: 'safe' | 'warning' | 'danger'
): string => {
    switch (severityLevel) {
        case 'safe':
            return '#10B981'; // Green
        case 'warning':
            return '#F59E0B'; // Yellow/Orange
        case 'danger':
            return '#EF4444'; // Red
        default:
            return '#6B7280'; // Gray
    }
};
