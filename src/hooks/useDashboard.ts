'use client';

import { useState, useEffect, useCallback } from 'react';
import { TimeRange, DashboardState, AumData, SipData, TransactionStats, ClientData, SipBusinessData, MisData } from '@/types/dashboard';
import { useApi } from './useApi';
import { API_ENDPOINTS } from '@/lib/constants';

export function useDashboard(initialTimeRange: TimeRange = '7d') {
  const [timeRange, setTimeRange] = useState<TimeRange>(initialTimeRange);
  const [dashboardState, setDashboardState] = useState<DashboardState>({
    timeRange: initialTimeRange,
    isLoading: true,
    error: null,
    data: {
      aum: null,
      sip: null,
      transactions: null,
      clients: null,
      sipBusiness: null,
      mis: null,
    },
  });

  // API hooks
  const { data: aumData, isLoading: aumLoading, error: aumError, refetch: refetchAum } = useApi<AumData>(API_ENDPOINTS.AUM);
  const { data: sipData, isLoading: sipLoading, error: sipError, refetch: refetchSip } = useApi<SipData>(API_ENDPOINTS.SIP);
  const { data: transactionData, isLoading: transactionLoading, error: transactionError, refetch: refetchTransactions } = useApi<TransactionStats>(API_ENDPOINTS.TRANSACTIONS);
  const { data: clientData, isLoading: clientLoading, error: clientError, refetch: refetchClients } = useApi<ClientData>(API_ENDPOINTS.CLIENTS);
  const { data: sipBusinessData, isLoading: sipBusinessLoading, error: sipBusinessError, refetch: refetchSipBusiness } = useApi<SipBusinessData[]>(API_ENDPOINTS.SIP_BUSINESS);
  const { data: misData, isLoading: misLoading, error: misError, refetch: refetchMis } = useApi<MisData[]>(API_ENDPOINTS.MIS);

  // Update dashboard state when data changes
  useEffect(() => {
    const isLoading = aumLoading || sipLoading || transactionLoading || clientLoading || sipBusinessLoading || misLoading;
    const error = aumError || sipError || transactionError || clientError || sipBusinessError || misError;

    setDashboardState({
      timeRange,
      isLoading,
      error,
      data: {
        aum: aumData,
        sip: sipData,
        transactions: transactionData,
        clients: clientData,
        sipBusiness: sipBusinessData,
        mis: misData,
      },
    });
  }, [
    timeRange,
    aumData, sipData, transactionData, clientData, sipBusinessData, misData,
    aumLoading, sipLoading, transactionLoading, clientLoading, sipBusinessLoading, misLoading,
    aumError, sipError, transactionError, clientError, sipBusinessError, misError,
  ]);

  // Handle time range change
  const handleTimeRangeChange = useCallback((newTimeRange: TimeRange) => {
    setTimeRange(newTimeRange);
    
    // Refetch all data when time range changes
    refetchAum();
    refetchSip();
    refetchTransactions();
    refetchClients();
    refetchSipBusiness();
    refetchMis();
  }, [refetchAum, refetchSip, refetchTransactions, refetchClients, refetchSipBusiness, refetchMis]);

  // Refresh all data
  const refreshDashboard = useCallback(() => {
    refetchAum();
    refetchSip();
    refetchTransactions();
    refetchClients();
    refetchSipBusiness();
    refetchMis();
  }, [refetchAum, refetchSip, refetchTransactions, refetchClients, refetchSipBusiness, refetchMis]);

  return {
    dashboardState,
    timeRange,
    setTimeRange: handleTimeRangeChange,
    refreshDashboard,
    isLoading: dashboardState.isLoading,
    error: dashboardState.error,
  };
}