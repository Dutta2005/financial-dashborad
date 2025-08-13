'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { MisData } from '@/types/dashboard';

interface MonthlyMisChartProps {
  data: MisData[] | null;
  isLoading?: boolean;
  onViewReport?: () => void;
}

const MonthlyMisChart: React.FC<MonthlyMisChartProps> = ({
  data,
  isLoading = false,
  onViewReport,
}) => {
  if (isLoading) {
    return (
      <Card className="h-80">
        <CardHeader className="flex flex-row items-center justify-between">
          <h3 className="text-lg font-semibold">MONTHLY MIS</h3>
          <Button variant="outline" size="sm" disabled>
            View Report
          </Button>
        </CardHeader>
        <CardContent>
          <LoadingSpinner size="lg" className="h-48" />
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card className="h-80">
        <CardHeader className="flex flex-row items-center justify-between">
          <h3 className="text-lg font-semibold">MONTHLY MIS</h3>
          <Button variant="outline" size="sm" disabled>
            View Report
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-48 text-gray-500">
            No data available
          </div>
        </CardContent>
      </Card>
    );
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              Series {index + 1}: {entry.value.toFixed(2)} Cr
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="h-80">
      <CardHeader className="flex flex-row items-center justify-between">
        <h3 className="text-lg font-semibold">MONTHLY MIS</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onViewReport}
          className="text-red-600 border-red-600 hover:bg-red-50"
        >
          View Report
        </Button>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorSeries1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorSeries2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorSeries3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EC4899" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#EC4899" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="series1"
              stroke="#3B82F6"
              fillOpacity={1}
              fill="url(#colorSeries1)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="series2"
              stroke="#10B981"
              fillOpacity={1}
              fill="url(#colorSeries2)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="series3"
              stroke="#EC4899"
              fillOpacity={1}
              fill="url(#colorSeries3)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default MonthlyMisChart;