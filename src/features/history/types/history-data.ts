import type { StatusCodes } from 'http-status-codes';

export type HistoryData = {
  id: string;
  duration: number;
  status: StatusCodes;
  timestamp: string;
  method: string;
  requestSize: number;
  responseSize: number;
  error?: string;
  url: string;
  headers: Record<string, string>;
  body?: string;
};
