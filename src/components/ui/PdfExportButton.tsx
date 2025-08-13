'use client';

import React from 'react';
import { FileDown, Camera, Loader2 } from 'lucide-react';
import Button from './Button';
import { usePdfGenerator } from '@/hooks/usePdfGenerator';
import { DashboardState } from '@/types/dashboard';

interface PdfExportButtonProps {
  dashboardData: DashboardState['data'];
  variant?: 'data' | 'screenshot' | 'both';
  className?: string;
}

const PdfExportButton: React.FC<PdfExportButtonProps> = ({
  dashboardData,
  variant = 'both',
  className,
}) => {
  const { isGenerating, error, generateDataPDF, generateScreenshotPDF } = usePdfGenerator();

  const handleDataPDF = async () => {
    await generateDataPDF(dashboardData);
  };

  const handleScreenshotPDF = async () => {
    await generateScreenshotPDF('dashboard-container');
  };

  if (variant === 'data') {
    return (
      <div className={className}>
        <Button
          onClick={handleDataPDF}
          disabled={isGenerating}
          variant="outline"
          className="text-red-600 border-red-600 hover:bg-red-50"
        >
          {isGenerating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FileDown className="mr-2 h-4 w-4" />
          )}
          Export Data PDF
        </Button>
        {error && (
          <p className="text-sm text-red-600 mt-2">{error}</p>
        )}
      </div>
    );
  }

  if (variant === 'screenshot') {
    return (
      <div className={className}>
        <Button
          onClick={handleScreenshotPDF}
          disabled={isGenerating}
          variant="outline"
          className="text-blue-600 border-blue-600 hover:bg-blue-50"
        >
          {isGenerating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Camera className="mr-2 h-4 w-4" />
          )}
          Export Screenshot PDF
        </Button>
        {error && (
          <p className="text-sm text-red-600 mt-2">{error}</p>
        )}
      </div>
    );
  }

  return (
    <div className={`flex space-x-3 ${className}`}>
      <Button
        onClick={handleDataPDF}
        disabled={isGenerating}
        variant="outline"
        size="sm"
        className="text-red-600 border-red-600 hover:bg-red-50"
      >
        {isGenerating ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FileDown className="mr-2 h-4 w-4" />
        )}
        Data PDF
      </Button>
      
      <Button
        onClick={handleScreenshotPDF}
        disabled={isGenerating}
        variant="outline"
        size="sm"
        className="text-blue-600 border-blue-600 hover:bg-blue-50"
      >
        {isGenerating ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Camera className="mr-2 h-4 w-4" />
        )}
        Screenshot PDF
      </Button>
      
      {error && (
        <p className="text-sm text-red-600 mt-2 col-span-2">{error}</p>
      )}
    </div>
  );
};

export default PdfExportButton;