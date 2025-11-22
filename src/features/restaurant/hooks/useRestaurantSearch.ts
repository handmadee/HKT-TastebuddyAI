import { useState } from 'react';
import { RestaurantMatch, RestaurantFilters } from '../types';
import { restaurantSearchService } from '../services/restaurantSearchService';

export const useRestaurantSearch = () => {
    const [results, setResults] = useState<RestaurantMatch[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const search = async (filters: RestaurantFilters) => {
        try {
            setIsSearching(true);
            setError(null);
            const matches = await restaurantSearchService.search(filters);
            setResults(matches);
        } catch (err) {
            setError('Failed to search restaurants');
            console.error(err);
        } finally {
            setIsSearching(false);
        }
    };

    return {
        results,
        isSearching,
        error,
        search,
    };
};
