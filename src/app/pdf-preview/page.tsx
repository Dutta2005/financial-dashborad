'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import PdfDashboard from '@/components/dashboard/PdfDashboard';
import { useDashboard } from '@/hooks/useDashboard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';

export default function PdfPreviewPage() {
  const searchParams = useSearchParams();
  const timeRange = searchParams.get('timeRange') || '7d';
  
  const { dashboardState, isLoading, error } = useDashboard(timeRange as any);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <ErrorMessage
          message={error}
          variant="card"
          className="max-w-md"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <PdfDashboard 
        data={dashboardState.data} 
        timeRange={timeRange}
      />
    </div>
  );
}