export interface ChartDataPoint {
  x: number;
  y: number;
  z?: number;
  label?: string;
  color?: string;
}

export interface BubbleChartData {
  name: string;
  value: number;
  color: string;
  x: number;
  y: number;
}

export interface BarLineChartData {
  month: string;
  barValue: number;
  lineValue: number;
}

export interface MultiLineChartData {
  date: string;
  [key: string]: string | number;
}

export interface ChartConfig {
  width?: number;
  height?: number;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export interface ChartColors {
  primary: string;
  secondary: string;
  tertiary: string;
  success: string;
  warning: string;
  error: string;
}