import { useState, useEffect, useCallback } from 'react';
import { SavedRestaurant, SavedMenu } from '../types';
import { savedItemsService } from '../services/savedItemsService';

export const useSavedItems = () => {
    const [restaurants, setRestaurants] = useState<SavedRestaurant[]>([]);
    const [menus, setMenus] = useState<SavedMenu[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchItems = useCallback(async () => {
        try {
            setIsLoading(true);
            const [restaurantsData, menusData] = await Promise.all([
                savedItemsService.getSavedRestaurants(),
                savedItemsService.getSavedMenus(),
            ]);
            setRestaurants(restaurantsData);
            setMenus(menusData);
            setError(null);
        } catch (err) {
            setError('Failed to load saved items');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const removeRestaurant = async (id: string) => {
        try {
            await savedItemsService.removeRestaurant(id);
            setRestaurants(prev => prev.filter(item => item.id !== id));
        } catch (err) {
            setError('Failed to remove restaurant');
            console.error(err);
        }
    };

    const removeMenu = async (id: string) => {
        try {
            await savedItemsService.removeMenu(id);
            setMenus(prev => prev.filter(item => item.id !== id));
        } catch (err) {
            setError('Failed to remove menu');
            console.error(err);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    return {
        restaurants,
        menus,
        isLoading,
        error,
        removeRestaurant,
        removeMenu,
        refetch: fetchItems,
    };
};
