/**
 * Dietary Preferences Constants
 *
 * Available dietary preferences
 */

import { DietaryPreference } from '../types';

export const DIETARY_PREFERENCES: Array<{
    value: DietaryPreference;
    label: string;
    description: string;
    icon: string;
}> = [
    {
        value: 'halal',
        label: 'Halal',
        description: 'Foods permitted under Islamic law',
        icon: '☪️',
    },
    {
        value: 'vegan',
        label: 'Vegan',
        description: 'No animal products',
        icon: '🌱',
    },
    {
        value: 'kosher',
        label: 'Kosher',
        description: 'Foods that conform to Jewish law',
        icon: '✡️',
    },
    {
        value: 'vegetarian',
        label: 'Vegetarian',
        description: 'No meat or fish',
        icon: '🥗',
    },
    {
        value: 'low-carb',
        label: 'Low-Carb (Keto)',
        description: 'Minimal carbohydrates',
        icon: '🥑',
    },
    {
        value: 'lactose-intolerant',
        label: 'Lactose Intolerant',
        description: 'No dairy products',
        icon: '🚫🥛',
    },
    {
        value: 'gluten-free',
        label: 'Gluten-Free',
        description: 'No wheat or gluten',
        icon: '🌾',
    },
    {
        value: 'pescatarian',
        label: 'Pescatarian',
        description: 'Fish but no other meat',
        icon: '🐟',
    },
];
