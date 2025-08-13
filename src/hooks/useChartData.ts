'use client';

import { useMemo } from 'react';
import { ClientData, SipBusinessData, MisData } from '@/types/dashboard';
import { BubbleChartData, BarLineChartData, MultiLineChartData } from '@/types/charts';
import { CHART_COLORS } from '@/lib/constants';

export function useClientChartData(data: ClientData | null): BubbleChartData[] {
  return useMemo(() => {
    if (!data) return [];

    return [
      {
        name: 'Online',
        value: data.online,
        color: CHART_COLORS.online,
        x: 50,
        y: 50,
      },
      {
        name: 'New',
        value: data.new,
        color: CHART_COLORS.new,
        x: 30,
        y: 70,
      },
      {
        name: 'Active',
        value: data.active,
        color: CHART_COLORS.active,
        x: 70,
        y: 30,
      },
      {
        name: 'InActive',
        value: data.inactive,
        color: CHART_COLORS.inactive,
        x: 40,
        y: 40,
      },
    ];
  }, [data]);
}

export function useSipBusinessChartData(data: SipBusinessData[] | null): BarLineChartData[] {
  return useMemo(() => {
    if (!data) return [];

    return data.map(item => ({
      month: item.month,
      barValue: item.barValue,
      lineValue: item.lineValue,
    }));
  }, [data]);
}

export function useMisChartData(data: MisData[] | null): MultiLineChartData[] {
  return useMemo(() => {
    if (!data) return [];

    return data.map(item => ({
      date: item.date,
      series1: item.series1,
      series2: item.series2,
      series3: item.series3,
    }));
  }, [data]);
}

export function useChartColors() {
  return useMemo(() => CHART_COLORS, []);
}