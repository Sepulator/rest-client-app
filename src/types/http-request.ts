export type Header = {
  id: string;
  key: string;
  value: string;
};

export type ResponseData = {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
  timestamp: string;
  duration: number;
  requestSize: number;
  responseSize: number;
  error?: string;
};

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';
