'use client';

import React from 'react';
import { ShoppingCart, RotateCcw, XCircle, AlertTriangle, Plus } from 'lucide-react';

// Components
import { DashboardGrid, MetricSection, StatSection, ChartSection } from '@/components/dashboard/DashboardGrid';
import MetricCard from '@/components/dashboard/MetricCard';
import StatCard from '@/components/dashboard/StatCard';
import TimeRangeFilter from '@/components/ui/TimeRangeFilter';
import ClientsBubbleChart from '@/components/charts/ClientsBubbleChart';
import SipBusinessChart from '@/components/charts/SipBusinessChart';
import MonthlyMisChart from '@/components/charts/MonthlyMisChart';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { MetricCardSkeleton, StatCardSkeleton, ChartSkeleton } from '@/components/ui/SkeletonLoader';
import PdfExportButton from '@/components/ui/PdfExportButton';

// Hooks and utilities
import { useDashboard } from '@/hooks/useDashboard';
import { TIME_RANGES } from '@/lib/constants';

export default function Dashboard() {
  const { dashboardState, timeRange, setTimeRange, refreshDashboard, isLoading, error } = useDashboard();

  const handleViewReport = (type: string) => {
    console.log(`View ${type} report clicked`);
    // Implement navigation to detailed report
  };

  const handleDownloadReport = () => {
    console.log('Download report clicked');
    // Implement report download functionality
  };

  if (error) {
    return (
      <div className="container-responsive py-6">
        <ErrorMessage
          message={error}
          onRetry={refreshDashboard}
          variant="card"
          className="max-w-md mx-auto"
        />
      </div>
    );
  }

  return (
    <div className="container-responsive">
      <div id="dashboard-container" className="pdf-safe">
        <DashboardGrid>
        {/* PDF Export and Time Range Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
          <TimeRangeFilter
            selectedRange={timeRange}
            onRangeChange={setTimeRange}
            ranges={TIME_RANGES}
          />
          
          <div className="flex space-x-2">
            <PdfExportButton
              dashboardData={dashboardState.data}
              variant="data"
            />
            <PdfExportButton
              dashboardData={dashboardState.data}
              variant="screenshot"
            />
          </div>
        </div>

        {/* Metric Cards Section */}
        <MetricSection>
          {isLoading ? (
            <>
              <MetricCardSkeleton />
              <MetricCardSkeleton />
            </>
          ) : (
            <>
              {dashboardState.data.aum && (
                <MetricCard
                  title="AUM"
                  value={dashboardState.data.aum.current}
                  unit={dashboardState.data.aum.unit}
                  change={dashboardState.data.aum.momChange}
                  changeType={dashboardState.data.aum.trend}
                  onViewReport={() => handleViewReport('AUM')}
                />
              )}
              {dashboardState.data.sip && (
                <MetricCard
                  title="SIP"
                  value={dashboardState.data.sip.current}
                  unit={dashboardState.data.sip.unit}
                  change={dashboardState.data.sip.momChange}
                  changeType={dashboardState.data.sip.trend}
                  onViewReport={() => handleViewReport('SIP')}
                />
              )}
            </>
          )}
        </MetricSection>

        {/* Transaction Statistics Section */}
        <StatSection>
          {isLoading ? (
            <>
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </>
          ) : (
            dashboardState.data.transactions && (
              <>
                <StatCard
                  title="Purchases"
                  count={dashboardState.data.transactions.purchases.count}
                  amount={dashboardState.data.transactions.purchases.amount}
                  icon={ShoppingCart}
                  color="bg-blue-500"
                />
                <StatCard
                  title="Redemptions"
                  count={dashboardState.data.transactions.redemptions.count}
                  amount={dashboardState.data.transactions.redemptions.amount}
                  icon={RotateCcw}
                  color="bg-orange-500"
                />
                <StatCard
                  title="Rej. Transactions"
                  count={dashboardState.data.transactions.rejectedTransactions.count}
                  amount={dashboardState.data.transactions.rejectedTransactions.amount}
                  icon={XCircle}
                  color="bg-red-500"
                />
                <StatCard
                  title="SIP Rejections"
                  count={dashboardState.data.transactions.sipRejections.count}
                  amount={dashboardState.data.transactions.sipRejections.amount}
                  icon={AlertTriangle}
                  color="bg-yellow-500"
                />
                <StatCard
                  title="New SIP"
                  count={dashboardState.data.transactions.newSip.count}
                  amount={dashboardState.data.transactions.newSip.amount}
                  icon={Plus}
                  color="bg-green-500"
                />
              </>
            )
          )}
        </StatSection>

        {/* Charts Section */}
        <ChartSection>
          {isLoading ? (
            <>
              <ChartSkeleton />
              <ChartSkeleton />
              <ChartSkeleton />
            </>
          ) : (
            <>
              <ClientsBubbleChart
                data={dashboardState.data.clients}
                isLoading={false}
                onDownloadReport={handleDownloadReport}
              />
              <SipBusinessChart
                data={dashboardState.data.sipBusiness}
                isLoading={false}
                onViewReport={() => handleViewReport('SIP Business')}
              />
              <MonthlyMisChart
                data={dashboardState.data.mis}
                isLoading={false}
                onViewReport={() => handleViewReport('Monthly MIS')}
              />
            </>
          )}
        </ChartSection>
      </DashboardGrid>
      </div>
    </div>
  );
}