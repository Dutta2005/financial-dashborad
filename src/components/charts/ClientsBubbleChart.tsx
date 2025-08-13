'use client';

import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { ClientData } from '@/types/dashboard';
import { CHART_COLORS } from '@/lib/constants';

interface ClientsBubbleChartProps {
  data: ClientData | null;
  isLoading?: boolean;
  onDownloadReport?: () => void;
}

const ClientsBubbleChart: React.FC<ClientsBubbleChartProps> = ({
  data,
  isLoading = false,
  onDownloadReport,
}) => {
  if (isLoading) {
    return (
      <Card className="h-80">
        <CardHeader className="flex flex-row items-center justify-between">
          <h3 className="text-lg font-semibold">CLIENTS</h3>
          <Button variant="outline" size="sm" disabled>
            📥 Download Report
          </Button>
        </CardHeader>
        <CardContent>
          <LoadingSpinner size="lg" className="h-48" />
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="h-80">
        <CardHeader className="flex flex-row items-center justify-between">
          <h3 className="text-lg font-semibold">CLIENTS</h3>
          <Button variant="outline" size="sm" disabled>
            📥 Download Report
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

  // Transform data for bubble chart
  const bubbleData = [
    {
      x: 50,
      y: 50,
      z: data.online,
      name: 'Online',
      color: CHART_COLORS.online,
    },
    {
      x: 30,
      y: 70,
      z: data.new,
      name: 'New',
      color: CHART_COLORS.new,
    },
    {
      x: 70,
      y: 30,
      z: data.active,
      name: 'Active',
      color: CHART_COLORS.active,
    },
    {
      x: 40,
      y: 40,
      z: data.inactive,
      name: 'InActive',
      color: CHART_COLORS.inactive,
    },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold">{data.name}</p>
          <p className="text-sm text-gray-600">Count: {data.z}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="h-80">
      <CardHeader className="flex flex-row items-center justify-between">
        <h3 className="text-lg font-semibold">CLIENTS</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onDownloadReport}
          className="text-red-600 border-red-600 hover:bg-red-50"
        >
          📥 Download Report
        </Button>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" dataKey="x" domain={[0, 100]} hide />
            <YAxis type="number" dataKey="y" domain={[0, 100]} hide />
            <Tooltip content={<CustomTooltip />} />
            <Scatter data={bubbleData}>
              {bubbleData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
        
        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 mt-4">
          {bubbleData.map((item) => (
            <div key={item.name} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-600">{item.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientsBubbleChart;