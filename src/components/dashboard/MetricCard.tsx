import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { formatCurrency, formatPercentage, getChangeColor } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: number;
  unit: string;
  change: number;
  changeType: 'up' | 'down';
  onViewReport: () => void;
  isLoading?: boolean;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  change,
  changeType,
  onViewReport,
  isLoading = false,
  className,
}) => {
  if (isLoading) {
    return (
      <Card className={cn('p-6', className)}>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
          <div className="h-10 bg-gray-200 rounded animate-pulse" />
        </div>
      </Card>
    );
  }

  const formattedValue = formatCurrency(value);
  const changeColor = getChangeColor(change);
  const TrendIcon = changeType === 'up' ? TrendingUp : TrendingDown;

  return (
    <Card className={cn('p-6', className)}>
      <CardContent className="p-0">
        <div className="space-y-4">
          {/* Title */}
          <div className="text-sm text-gray-600 font-medium">
            Current
          </div>

          {/* Value */}
          <div className="space-y-2">
            <div className="text-3xl font-bold text-gray-900">
              {title} {formattedValue}
            </div>
            
            {/* Change Indicator */}
            <div className={cn('flex items-center space-x-1', changeColor)}>
              <TrendIcon size={16} />
              <span className="text-sm font-medium">
                {formatPercentage(change)} MoM
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={onViewReport}
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              View Report
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 hover:bg-blue-50"
            >
              View Trend ▼
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;