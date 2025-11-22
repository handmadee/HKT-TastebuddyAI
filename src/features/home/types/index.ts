/**
 * Home Feature Types
 *
 * Type definitions for the home feature components and data
 */

export interface FoodPick {
    id: string;
    name: string;
    imageUrl: string;
    timestamp: Date;
    category?: string;
}

export type SafetyStatus = 'safe' | 'warning' | 'danger';

export interface NearbyLocation {
    id: string;
    name: string;
    rating: number;
    distance: string;
    safetyStatus: SafetyStatus;
    safetyLabel: string;
    imageUrl?: string;
    address?: string;
}

export interface HomeTabItem {
    key: string;
    label: string;
    icon: string;
    activeIcon: string;
}
