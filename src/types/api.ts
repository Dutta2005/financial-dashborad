import { AumData, SipData, TransactionStats, ClientData, SipBusinessData, MisData } from './dashboard';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ApiError {
  success: false;
  message: string;
  code?: string;
}

export type AumApiResponse = ApiResponse<AumData>;
export type SipApiResponse = ApiResponse<SipData>;
export type TransactionStatsApiResponse = ApiResponse<TransactionStats>;
export type ClientDataApiResponse = ApiResponse<ClientData>;
export type SipBusinessApiResponse = ApiResponse<SipBusinessData[]>;
export type MisDataApiResponse = ApiResponse<MisData[]>;