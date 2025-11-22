import { SavedRestaurant, SavedMenu } from '../types';

const MOCK_RESTAURANTS: SavedRestaurant[] = [
    {
        id: 'r1',
        name: 'Green Garden',
        imageUri: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=300&q=80',
        rating: 4.8,
        tags: ['Vegetarian', 'Organic'],
        distance: '1.2 km',
        savedAt: '2023-10-15T10:00:00Z',
    },
    {
        id: 'r2',
        name: 'Sushi Master',
        imageUri: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=300&q=80',
        rating: 4.5,
        tags: ['Japanese', 'Sushi'],
        distance: '3.5 km',
        savedAt: '2023-10-20T18:30:00Z',
    },
];

const MOCK_MENUS: SavedMenu[] = [
    {
        id: 'm1',
        name: 'Avocado Toast',
        restaurantName: 'Green Garden',
        imageUri: 'https://images.unsplash.com/photo-1588137372308-15f75323ca8d?auto=format&fit=crop&w=300&q=80',
        calories: 450,
        savedAt: '2023-10-15T10:05:00Z',
    },
    {
        id: 'm2',
        name: 'Spicy Tuna Roll',
        restaurantName: 'Sushi Master',
        imageUri: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=300&q=80',
        calories: 320,
        savedAt: '2023-10-20T18:35:00Z',
    },
];

export const savedItemsService = {
    getSavedRestaurants: async (): Promise<SavedRestaurant[]> => {
        await new Promise(resolve => setTimeout(resolve, 600));
        return MOCK_RESTAURANTS;
    },

    getSavedMenus: async (): Promise<SavedMenu[]> => {
        await new Promise(resolve => setTimeout(resolve, 600));
        return MOCK_MENUS;
    },

    removeRestaurant: async (id: string): Promise<void> => {
        await new Promise(resolve => setTimeout(resolve, 300));
    },

    removeMenu: async (id: string): Promise<void> => {
        await new Promise(resolve => setTimeout(resolve, 300));
    },
};
