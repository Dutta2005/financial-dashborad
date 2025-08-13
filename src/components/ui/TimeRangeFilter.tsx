import React from 'react';
import { TimeRange, TimeRangeOption } from '@/types/dashboard';
import { cn } from '@/lib/utils';

interface TimeRangeFilterProps {
  selectedRange: TimeRange;
  onRangeChange: (range: TimeRange) => void;
  ranges: TimeRangeOption[];
  className?: string;
}

const TimeRangeFilter: React.FC<TimeRangeFilterProps> = ({
  selectedRange,
  onRangeChange,
  ranges,
  className,
}) => {
  return (
    <div className={cn('flex space-x-2', className)}>
      {ranges.map((range) => (
        <button
          key={range.value}
          onClick={() => onRangeChange(range.value)}
          className={cn(
            'px-4 py-2 text-sm font-medium rounded-md transition-colors',
            selectedRange === range.value
              ? 'bg-red-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          )}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
};

export default TimeRangeFilter;