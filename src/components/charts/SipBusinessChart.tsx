'use client';

import React from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { SipBusinessData } from '@/types/dashboard';

interface SipBusinessChartProps {
  data: SipBusinessData[] | null;
  isLoading?: boolean;
  onViewReport?: () => void;
}

const SipBusinessChart: React.FC<SipBusinessChartProps> = ({
  data,
  isLoading = false,
  onViewReport,
}) => {
  if (isLoading) {
    return (
      <Card className="h-80">
        <CardHeader className="flex flex-row items-center justify-between">
          <h3 className="text-lg font-semibold">SIP BUSINESS CHART</h3>
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
          <h3 className="text-lg font-semibold">SIP BUSINESS CHART</h3>
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
              {entry.dataKey === 'barValue' ? 'Bar Value' : 'Line Value'}: {entry.value}
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
        <h3 className="text-lg font-semibold">SIP BUSINESS CHART</h3>
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
          <ComposedChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" orientation="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              yAxisId="left"
              dataKey="barValue"
              fill="#3B82F6"
              name="Bar Value"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="lineValue"
              stroke="#EF4444"
              strokeWidth={2}
              dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
              name="Line Value"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SipBusinessChart;