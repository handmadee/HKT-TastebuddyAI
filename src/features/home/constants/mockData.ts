/**
 * Mock Data for Home Screen
 *
 * Temporary data for development and testing
 */

import { FoodPick, NearbyLocation } from '../types';

export const mockFoodPick: FoodPick = {
    id: '1',
    name: "Today's Pho Pick",
    imageUrl: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800',
    timestamp: new Date(),
    category: 'Vietnamese',
};

export const mockNearbyLocations: NearbyLocation[] = [
    {
        id: '1',
        name: 'Saigon Pho House',
        rating: 4.8,
        distance: '0.4 mi',
        safetyStatus: 'safe',
        safetyLabel: 'Likely safe',
    },
    {
        id: '2',
        name: 'Mama Lee',
        rating: 4.5,
        distance: '1.2 mi',
        safetyStatus: 'warning',
        safetyLabel: 'Check ingredients',
    },
    {
        id: '3',
        name: 'Pho 24',
        rating: 4.6,
        distance: '0.8 mi',
        safetyStatus: 'safe',
        safetyLabel: 'Likely safe',
    },
];
