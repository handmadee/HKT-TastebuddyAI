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
        name: 'Pho Bo',
        rating: 4.5,
        distance: '0.5 km',
    },
    {
        id: '2',
        name: 'Cao Nam',
        rating: 4.2,
        distance: '1.2 km',
    },
    {
        id: '3',
        name: 'Banh Mi 25',
        rating: 4.8,
        distance: '2.1 km',
    },
];
