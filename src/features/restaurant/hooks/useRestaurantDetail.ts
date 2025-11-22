import { useState, useEffect } from 'react';
import { Restaurant, PopularDish } from '../types';
import { restaurantSearchService } from '../services/restaurantSearchService';

export const useRestaurantDetail = (restaurantId: string) => {
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [dishes, setDishes] = useState<PopularDish[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                setIsLoading(true);
                const [restaurantData, dishesData] = await Promise.all([
                    restaurantSearchService.getDetail(restaurantId),
                    restaurantSearchService.getPopularDishes(restaurantId),
                ]);
                setRestaurant(restaurantData);
                setDishes(dishesData);
            } catch (error) {
                console.error('Failed to fetch restaurant detail', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDetail();
    }, [restaurantId]);

    return {
        restaurant,
        dishes,
        isLoading,
    };
};
