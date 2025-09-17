import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import type { Header } from '@/types/http-request';

import { DEFAULT_URL } from '@/features/rest-client/constants/http-request';
import { useHttpRequest } from '@/features/rest-client/hooks/use-http-request';

type UseHttpRequestReturn = ReturnType<typeof useHttpRequest>;

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
}));

const setupHook = () => renderHook(() => useHttpRequest());

const setUrlAndMethod = (result: { current: UseHttpRequestReturn }, url: string, method = 'GET') => {
  act(() => {
    result.current.setUrl(url);
    result.current.setMethod(method);
  });
};

const executeRequest = async (result: { current: UseHttpRequestReturn }, headers: Header[] = [], body = '') => {
  await act(async () => {
    await result.current.executeRequest(headers, body);
  });
};

describe('useHttpRequest', () => {
  it('should execute request successfully', async () => {
    const { result } = setupHook();

    setUrlAndMethod(result, DEFAULT_URL);
    await executeRequest(result);

    expect(result.current.response?.status).toBe(200);
    expect(result.current.response?.body).toContain('Mock Post');
  });

  it('should handle error responses', async () => {
    const { result } = setupHook();

    setUrlAndMethod(result, 'https://error.example.com');
    await executeRequest(result);

    expect(result.current.response?.error).toBe('Network error');
  });

  it('should process headers correctly', async () => {
    const { result } = setupHook();

    setUrlAndMethod(result, 'https://api.example.com');

    const headers: Header[] = [
      { id: '1', key: 'Content-Type', value: 'application/json' },
      { id: '2', key: 'Authorization', value: 'Bearer token' },
    ];

    await executeRequest(result, headers);

    expect(result.current.response?.status).toBe(200);
    expect(result.current.response?.headers).toEqual({
      'Content-Type': 'application/json',
      Authorization: 'Bearer token',
    });
  });

  it('should add Content-Type for POST with body', async () => {
    const { result } = setupHook();

    setUrlAndMethod(result, 'https://api.example.com', 'POST');
    await executeRequest(result, [], '{"test": "data"}');

    expect(result.current.response?.status).toBe(200);
    expect(result.current.response?.headers).toEqual({
      'Content-Type': 'application/json',
    });
  });

  it('should not add Content-Type for GET method', async () => {
    const { result } = setupHook();

    setUrlAndMethod(result, 'https://api.example.com');
    await executeRequest(result, [], '{"test": "data"}');

    expect(result.current.response?.status).toBe(200);
    expect(result.current.response?.headers).toEqual({});
  });
});
