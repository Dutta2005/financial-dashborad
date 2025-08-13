'use client';

import { useState, useCallback } from 'react';
import { PDFGenerator } from '@/lib/pdfGenerator';
import { DashboardState } from '@/types/dashboard';

interface UsePdfGeneratorReturn {
  isGenerating: boolean;
  error: string | null;
  generateDataPDF: (dashboardData: DashboardState['data']) => Promise<void>;
  generateScreenshotPDF: (elementId: string) => Promise<void>;
}

export function usePdfGenerator(): UsePdfGeneratorReturn {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateDataPDF = useCallback(async (dashboardData: DashboardState['data']) => {
    setIsGenerating(true);
    setError(null);

    try {
      const pdfGenerator = new PDFGenerator();
      await pdfGenerator.generatePDF(dashboardData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate PDF';
      setError(errorMessage);
      console.error('PDF generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const generateScreenshotPDF = useCallback(async (elementId: string) => {
    setIsGenerating(true);
    setError(null);

    try {
      const pdfGenerator = new PDFGenerator();
      await pdfGenerator.generateFromHTML(elementId);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate PDF from screenshot';
      setError(errorMessage);
      console.error('PDF screenshot generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return {
    isGenerating,
    error,
    generateDataPDF,
    generateScreenshotPDF,
  };
}