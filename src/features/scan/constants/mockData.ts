/**
 * Mock Data for Scan Feature
 *
 * Sample food scan results for testing and development
 */

import { FoodScanResult } from '../types';

export const MOCK_SCAN_RESULTS: FoodScanResult[] = [
    {
        id: '1',
        name: 'Pad Thai',
        confidence: 95,
        imageUri: 'https://images.unsplash.com/photo-1559314809-0d155014e29e',
        cuisine: 'Thai',
        description: 'Classic Thai stir-fried noodles with shrimp, peanuts, and vegetables',
        nutrition: {
            calories: 432,
            protein: 26,
            carbs: 52,
            fats: 12,
            fiber: 4,
            sugar: 8,
            sodium: 890,
        },
        ingredients: [
            { name: 'Rice noodles', amount: '200g' },
            { name: 'Shrimp', amount: '100g', allergens: ['shellfish'] },
            { name: 'Peanuts', amount: '30g', allergens: ['peanuts'] },
            { name: 'Eggs', amount: '2', allergens: ['eggs'] },
            { name: 'Bean sprouts', amount: '50g' },
            { name: 'Green onions', amount: '20g' },
            { name: 'Tamarind sauce', amount: '30ml' },
            { name: 'Fish sauce', amount: '15ml', allergens: ['fish'] },
        ],
        allergens: [
            {
                type: 'shellfish',
                severity: 'severe',
                confidence: 98,
                source: 'Shrimp',
            },
            {
                type: 'peanuts',
                severity: 'severe',
                confidence: 95,
                source: 'Peanuts',
            },
            {
                type: 'eggs',
                severity: 'moderate',
                confidence: 92,
                source: 'Eggs',
            },
            {
                type: 'fish',
                severity: 'moderate',
                confidence: 88,
                source: 'Fish sauce',
            },
        ],
        timestamp: new Date().toISOString(),
    },
    {
        id: '2',
        name: 'Caesar Salad',
        confidence: 92,
        imageUri: 'https://images.unsplash.com/photo-1546793665-c74683f339c1',
        cuisine: 'Italian',
        description: 'Classic Caesar salad with romaine lettuce, croutons, and parmesan',
        nutrition: {
            calories: 280,
            protein: 12,
            carbs: 18,
            fats: 18,
            fiber: 3,
            sugar: 2,
            sodium: 650,
        },
        ingredients: [
            { name: 'Romaine lettuce', amount: '150g' },
            { name: 'Parmesan cheese', amount: '40g', allergens: ['dairy'] },
            { name: 'Croutons', amount: '30g', allergens: ['wheat'] },
            { name: 'Caesar dressing', amount: '40ml', allergens: ['eggs', 'dairy'] },
            { name: 'Lemon juice', amount: '10ml' },
        ],
        allergens: [
            {
                type: 'dairy',
                severity: 'moderate',
                confidence: 90,
                source: 'Parmesan cheese, Caesar dressing',
            },
            {
                type: 'wheat',
                severity: 'moderate',
                confidence: 85,
                source: 'Croutons',
            },
            {
                type: 'eggs',
                severity: 'mild',
                confidence: 80,
                source: 'Caesar dressing',
            },
        ],
        timestamp: new Date().toISOString(),
    },
    {
        id: '3',
        name: 'Grilled Chicken Breast',
        confidence: 98,
        imageUri: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435',
        cuisine: 'American',
        description: 'Simple grilled chicken breast with herbs',
        nutrition: {
            calories: 185,
            protein: 35,
            carbs: 0,
            fats: 4,
            fiber: 0,
            sugar: 0,
            sodium: 75,
        },
        ingredients: [
            { name: 'Chicken breast', amount: '200g' },
            { name: 'Olive oil', amount: '5ml' },
            { name: 'Salt', amount: '2g' },
            { name: 'Black pepper', amount: '1g' },
            { name: 'Herbs (rosemary, thyme)', amount: '5g' },
        ],
        allergens: [],
        timestamp: new Date().toISOString(),
    },
    {
        id: '4',
        name: 'Vegetable Stir Fry',
        confidence: 88,
        imageUri: 'https://images.unsplash.com/photo-1512058564366-18510be2db19',
        cuisine: 'Asian',
        description: 'Mixed vegetables stir-fried with soy sauce',
        nutrition: {
            calories: 156,
            protein: 8,
            carbs: 22,
            fats: 5,
            fiber: 6,
            sugar: 10,
            sodium: 820,
        },
        ingredients: [
            { name: 'Broccoli', amount: '100g' },
            { name: 'Carrots', amount: '80g' },
            { name: 'Bell peppers', amount: '80g' },
            { name: 'Snap peas', amount: '60g' },
            { name: 'Soy sauce', amount: '20ml', allergens: ['soy', 'wheat'] },
            { name: 'Garlic', amount: '10g' },
            { name: 'Ginger', amount: '5g' },
            { name: 'Sesame oil', amount: '10ml', allergens: ['sesame'] },
        ],
        allergens: [
            {
                type: 'soy',
                severity: 'moderate',
                confidence: 92,
                source: 'Soy sauce',
            },
            {
                type: 'wheat',
                severity: 'mild',
                confidence: 85,
                source: 'Soy sauce',
            },
            {
                type: 'sesame',
                severity: 'moderate',
                confidence: 88,
                source: 'Sesame oil',
            },
        ],
        timestamp: new Date().toISOString(),
    },
];

/**
 * Get a random mock scan result
 */
export const getRandomMockScanResult = (): FoodScanResult => {
    const randomIndex = Math.floor(Math.random() * MOCK_SCAN_RESULTS.length);
    return {
        ...MOCK_SCAN_RESULTS[randomIndex],
        id: `scan_${Date.now()}`,
        timestamp: new Date().toISOString(),
    };
};
