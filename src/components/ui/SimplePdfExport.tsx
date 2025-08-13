'use client';

import React from 'react';
import { FileDown, Loader2 } from 'lucide-react';
import Button from './Button';
import { usePdfGenerator } from '@/hooks/usePdfGenerator';
import { DashboardState } from '@/types/dashboard';

interface SimplePdfExportProps {
  dashboardData: DashboardState['data'];
  className?: string;
}

const SimplePdfExport: React.FC<SimplePdfExportProps> = ({
  dashboardData,
  className,
}) => {
  const { isGenerating, error, generateDataPDF } = usePdfGenerator();

  const handleExport = async () => {
    await generateDataPDF(dashboardData);
  };

  return (
    <div className={className}>
      <Button
        onClick={handleExport}
        disabled={isGenerating}
        variant="primary"
        size="sm"
      >
        {isGenerating ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FileDown className="mr-2 h-4 w-4" />
        )}
        Export PDF Report
      </Button>
      {error && (
        <p className="text-sm text-red-600 mt-2">{error}</p>
      )}
    </div>
  );
};

export default SimplePdfExport;