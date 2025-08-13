'use client';

import React from 'react';
import { DashboardState } from '@/types/dashboard';
import { formatCurrency, formatPercentage, formatNumber } from '@/lib/utils';

interface PdfDashboardProps {
  data: DashboardState['data'];
  timeRange: string;
}

const PdfDashboard: React.FC<PdfDashboardProps> = ({ data, timeRange }) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-white p-8 max-w-4xl mx-auto" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div className="border-b-2 border-red-600 pb-4 mb-8">
        <h1 className="text-3xl font-bold text-red-600 mb-2">Financial Dashboard Report</h1>
        <div className="flex justify-between items-center text-gray-600">
          <p>Generated on: {currentDate}</p>
          <p>Time Range: {timeRange}</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Key Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* AUM Card */}
          {data.aum && (
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <div className="text-sm text-gray-600 mb-2">Current</div>
              <div className="text-2xl font-bold text-gray-900 mb-2">
                AUM {formatCurrency(data.aum.current)}
              </div>
              <div className={`flex items-center text-sm ${data.aum.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                <span className="mr-1">{data.aum.trend === 'up' ? '↗' : '↘'}</span>
                {formatPercentage(data.aum.momChange)} MoM
              </div>
            </div>
          )}

          {/* SIP Card */}
          {data.sip && (
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <div className="text-sm text-gray-600 mb-2">Current</div>
              <div className="text-2xl font-bold text-gray-900 mb-2">
                SIP {formatCurrency(data.sip.current)}
              </div>
              <div className={`flex items-center text-sm ${data.sip.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                <span className="mr-1">{data.sip.trend === 'up' ? '↗' : '↘'}</span>
                {formatPercentage(data.sip.momChange)} MoM
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Transaction Statistics */}
      {data.transactions && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Transaction Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{formatNumber(data.transactions.purchases.count)}</div>
              <div className="text-sm text-gray-600">Purchases</div>
              <div className="text-xs text-gray-500">{data.transactions.purchases.amount.toFixed(2)} INR</div>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{formatNumber(data.transactions.redemptions.count)}</div>
              <div className="text-sm text-gray-600">Redemptions</div>
              <div className="text-xs text-gray-500">{data.transactions.redemptions.amount.toFixed(2)} INR</div>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{formatNumber(data.transactions.rejectedTransactions.count)}</div>
              <div className="text-sm text-gray-600">Rejected</div>
              <div className="text-xs text-gray-500">{data.transactions.rejectedTransactions.amount.toFixed(2)} INR</div>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{formatNumber(data.transactions.sipRejections.count)}</div>
              <div className="text-sm text-gray-600">SIP Rejections</div>
              <div className="text-xs text-gray-500">{data.transactions.sipRejections.amount.toFixed(2)} INR</div>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{formatNumber(data.transactions.newSip.count)}</div>
              <div className="text-sm text-gray-600">New SIP</div>
              <div className="text-xs text-gray-500">{data.transactions.newSip.amount.toFixed(2)} INR</div>
            </div>
          </div>
        </div>
      )}

      {/* Client Distribution */}
      {data.clients && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Client Distribution</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="w-4 h-4 bg-yellow-500 rounded-full mx-auto mb-2"></div>
              <div className="text-lg font-bold text-gray-900">{formatNumber(data.clients.online)}</div>
              <div className="text-sm text-gray-600">Online</div>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-2"></div>
              <div className="text-lg font-bold text-gray-900">{formatNumber(data.clients.new)}</div>
              <div className="text-sm text-gray-600">New</div>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="w-4 h-4 bg-red-500 rounded-full mx-auto mb-2"></div>
              <div className="text-lg font-bold text-gray-900">{formatNumber(data.clients.active)}</div>
              <div className="text-sm text-gray-600">Active</div>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="w-4 h-4 bg-gray-500 rounded-full mx-auto mb-2"></div>
              <div className="text-lg font-bold text-gray-900">{formatNumber(data.clients.inactive)}</div>
              <div className="text-sm text-gray-600">Inactive</div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <div className="text-2xl font-bold text-gray-900">Total Clients: {formatNumber(data.clients.total)}</div>
          </div>
        </div>
      )}

      {/* SIP Business Data */}
      {data.sipBusiness && data.sipBusiness.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">SIP Business Data</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Month</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Bar Value</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Line Value</th>
                </tr>
              </thead>
              <tbody>
                {data.sipBusiness.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="border border-gray-300 px-4 py-2">{item.month}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.barValue.toFixed(1)}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.lineValue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MIS Data */}
      {data.mis && data.mis.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Monthly MIS Data</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Series 1</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Series 2</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Series 3</th>
                </tr>
              </thead>
              <tbody>
                {data.mis.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="border border-gray-300 px-4 py-2">{item.date}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.series1.toFixed(2)} Cr</td>
                    <td className="border border-gray-300 px-4 py-2">{item.series2.toFixed(2)} Cr</td>
                    <td className="border border-gray-300 px-4 py-2">{item.series3.toFixed(2)} Cr</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-gray-200 pt-4 mt-8 text-center text-sm text-gray-500">
        <p>Generated by Financial Dashboard System</p>
        <p>This report contains confidential financial information</p>
      </div>
    </div>
  );
};

export default PdfDashboard;