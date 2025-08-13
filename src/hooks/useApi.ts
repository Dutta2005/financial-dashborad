'use client';

import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/lib/api';

interface UseApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

interface UseApiOptions {
  immediate?: boolean;
  retryCount?: number;
  retryDelay?: number;
}

export function useApi<T>(
  endpoint: string,
  options: UseApiOptions = {}
) {
  const { immediate = true, retryCount = 3, retryDelay = 1000 } = options;
  
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    isLoading: immediate,
    error: null,
  });

  const fetchData = useCallback(async (retries = retryCount) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const data = await apiClient.get<T>(endpoint);
      setState({
        data,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      
      if (retries > 0) {
        setTimeout(() => {
          fetchData(retries - 1);
        }, retryDelay);
      } else {
        setState({
          data: null,
          isLoading: false,
          error: errorMessage,
        });
      }
    }
  }, [endpoint, retryCount, retryDelay]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [fetchData, immediate]);

  return {
    ...state,
    refetch,
  };
}