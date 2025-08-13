import React from 'react';
import { cn } from '@/lib/utils';

interface DashboardGridProps {
  children: React.ReactNode;
  className?: string;
}

interface GridSectionProps {
  children: React.ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4;
}

const DashboardGrid: React.FC<DashboardGridProps> = ({ children, className }) => {
  return (
    <div className={cn('space-y-6 p-6', className)}>
      {children}
    </div>
  );
};

const GridSection: React.FC<GridSectionProps> = ({ children, className, cols = 1 }) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={cn('grid gap-6', gridCols[cols], className)}>
      {children}
    </div>
  );
};

const MetricSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <GridSection cols={2} className="mb-6">
      {children}
    </GridSection>
  );
};

const StatSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <GridSection cols={4} className="lg:grid-cols-5 mb-6">
      {children}
    </GridSection>
  );
};

const ChartSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <GridSection cols={3} className="lg:grid-cols-3">
      {children}
    </GridSection>
  );
};

export { DashboardGrid, GridSection, MetricSection, StatSection, ChartSection };