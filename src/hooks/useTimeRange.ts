'use client';

import { useState, useCallback } from 'react';
import { TimeRange } from '@/types/dashboard';

interface UseTimeRangeReturn {
  selectedRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;
  isRangeSelected: (range: TimeRange) => boolean;
}

export function useTimeRange(initialRange: TimeRange = '7d'): UseTimeRangeReturn {
  const [selectedRange, setSelectedRange] = useState<TimeRange>(initialRange);

  const setTimeRange = useCallback((range: TimeRange) => {
    setSelectedRange(range);
  }, []);

  const isRangeSelected = useCallback((range: TimeRange) => {
    return selectedRange === range;
  }, [selectedRange]);

  return {
    selectedRange,
    setTimeRange,
    isRangeSelected,
  };
}