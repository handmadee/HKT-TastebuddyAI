import { useState, useEffect, useCallback } from 'react';
import { DailySummary } from '../types';
import { summaryService } from '../services/summaryService';

export const useDailySummary = () => {
    const [summary, setSummary] = useState<DailySummary | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchSummary = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await summaryService.getTodaySummary();
            setSummary(data);
        } catch (error) {
            console.error('Failed to fetch daily summary', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSummary();
    }, [fetchSummary]);

    return {
        summary,
        isLoading,
        refetch: fetchSummary,
    };
};
