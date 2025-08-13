import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { formatNumber } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  count: number;
  amount: number;
  icon: LucideIcon;
  color: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  count,
  amount,
  icon: Icon,
  color,
  className,
}) => {
  return (
    <Card className={cn('p-4', className)}>
      <CardContent className="p-0">
        <div className="flex items-center space-x-4">
          {/* Icon */}
          <div className={cn('p-3 rounded-lg', color)}>
            <Icon size={24} className="text-white" />
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-gray-900">
                {formatNumber(count)}
              </div>
              <div className="text-sm text-gray-600">
                {title}
              </div>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {amount.toFixed(2)} INR
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;