export interface AumData {
  current: number;
  unit: string;
  momChange: number;
  trend: 'up' | 'down';
  lastUpdated: string;
}

export interface SipData {
  current: number;
  unit: string;
  momChange: number;
  trend: 'up' | 'down';
  lastUpdated: string;
}

export interface TransactionStats {
  purchases: { count: number; amount: number };
  redemptions: { count: number; amount: number };
  rejectedTransactions: { count: number; amount: number };
  sipRejections: { count: number; amount: number };
  newSip: { count: number; amount: number };
}

export interface ClientData {
  online: number;
  new: number;
  active: number;
  inactive: number;
  total: number;
}

export interface SipBusinessData {
  month: string;
  barValue: number;
  lineValue: number;
}

export interface MisData {
  date: string;
  series1: number;
  series2: number;
  series3: number;
}

export interface DashboardState {
  timeRange: TimeRange;
  isLoading: boolean;
  error: string | null;
  data: {
    aum: AumData | null;
    sip: SipData | null;
    transactions: TransactionStats | null;
    clients: ClientData | null;
    sipBusiness: SipBusinessData[] | null;
    mis: MisData[] | null;
  };
}

export type TimeRange = '3d' | '7d' | '10d' | '30d';

export interface TimeRangeOption {
  value: TimeRange;
  label: string;
}