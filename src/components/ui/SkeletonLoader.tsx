import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gray-200',
        className
      )}
    />
  );
};

const MetricCardSkeleton: React.FC = () => {
  return (
    <div className="p-6 border rounded-lg bg-white space-y-4">
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-4 w-24" />
      <div className="flex justify-between">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  );
};

const StatCardSkeleton: React.FC = () => {
  return (
    <div className="p-4 border rounded-lg bg-white">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-lg" />
        <div className="flex-1 space-y-2">
          <div className="flex justify-between">
            <Skeleton className="h-6 w-8" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
    </div>
  );
};

const ChartSkeleton: React.FC<{ height?: string }> = ({ height = 'h-48' }) => {
  return (
    <div className="border rounded-lg bg-white">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
      <div className="p-6">
        <Skeleton className={cn('w-full', height)} />
      </div>
    </div>
  );
};

export { Skeleton, MetricCardSkeleton, StatCardSkeleton, ChartSkeleton };