import { TimeRangeOption } from '@/types/dashboard';

export const TIME_RANGES: TimeRangeOption[] = [
  { value: '3d', label: '3 Days' },
  { value: '7d', label: '7 Days' },
  { value: '10d', label: '10 Days' },
  { value: '30d', label: '30 Days' },
];

export const NAVIGATION_ITEMS = [
  { id: 'home', label: 'HOME', href: '/' },
  { id: 'crm', label: 'CRM', href: '/crm' },
  { id: 'utilities', label: 'UTILITIES', href: '/utilities' },
  { id: 'insurance', label: 'INSURANCE', href: '/insurance' },
  { id: 'assets', label: 'ASSETS', href: '/assets' },
  { id: 'mutual', label: 'MUTUAL', href: '/mutual' },
  { id: 'research', label: 'RESEARCH', href: '/research' },
  { id: 'transact-online', label: 'TRANSACT ONLINE', href: '/transact-online' },
  { id: 'goal-gps', label: 'GOAL GPS', href: '/goal-gps' },
  { id: 'financial-planning', label: 'FINANCIAL PLANNING', href: '/financial-planning' },
  { id: 'wealth-report', label: 'WEALTH REPORT', href: '/wealth-report' },
  { id: 'other', label: 'OTHER', href: '/other' },
];

export const CHART_COLORS = {
  primary: '#3B82F6',
  secondary: '#EF4444',
  tertiary: '#10B981',
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  online: '#F59E0B',
  new: '#10B981',
  active: '#EF4444',
  inactive: '#6B7280',
};

export const API_ENDPOINTS = {
  AUM: '/api/aum',
  SIP: '/api/sip',
  TRANSACTIONS: '/api/transactions',
  CLIENTS: '/api/clients',
  SIP_BUSINESS: '/api/sip-business',
  MIS: '/api/mis',
};