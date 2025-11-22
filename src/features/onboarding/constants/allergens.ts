/**
 * Allergen Constants
 *
 * Available allergen types
 */

import { AllergenType } from '../types';

export const ALLERGENS: Array<{
    value: AllergenType;
    label: string;
    description: string;
    icon: string;
}> = [
    {
        value: 'peanuts',
        label: 'Peanuts',
        description: 'Peanuts and peanut products',
        icon: '🥜',
    },
    {
        value: 'shellfish',
        label: 'Shellfish',
        description: 'Shrimp, crab, lobster, etc.',
        icon: '🦐',
    },
    {
        value: 'dairy',
        label: 'Dairy',
        description: 'Milk and dairy products',
        icon: '🥛',
    },
    {
        value: 'eggs',
        label: 'Eggs',
        description: 'Eggs and egg products',
        icon: '🥚',
    },
    {
        value: 'fish',
        label: 'Fish',
        description: 'All types of fish',
        icon: '🐟',
    },
    {
        value: 'soy',
        label: 'Soy',
        description: 'Soybeans and soy products',
        icon: '🫘',
    },
    {
        value: 'wheat',
        label: 'Wheat',
        description: 'Wheat and gluten',
        icon: '🌾',
    },
    {
        value: 'tree-nuts',
        label: 'Tree Nuts',
        description: 'Almonds, walnuts, cashews, etc.',
        icon: '🌰',
    },
    {
        value: 'sesame',
        label: 'Sesame',
        description: 'Sesame seeds and sesame oil',
        icon: '🫑',
    },
];
