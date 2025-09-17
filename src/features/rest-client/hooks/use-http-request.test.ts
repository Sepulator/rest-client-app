import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import type { Header } from '@/types/http-request';

import { DEFAULT_URL } from '@/features/rest-client/constants/http-request';
import { useHttpRequest } from '@/features/rest-client/hooks/use-http-request';

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
}));

describe('useHttpRequest', () => {
  it('should execute request successfully', async () => {
    const { result } = renderHook(() => useHttpRequest());

    act(() => {
      result.current.setUrl(DEFAULT_URL);
      result.current.setMethod('GET');
    });

    await act(async () => {
      await result.current.executeRequest([]);
    });

    expect(result.current.response?.status).toBe(200);
    expect(result.current.response?.body).toContain('Mock Post');
  });

  it('should handle error responses', async () => {
    const { result } = renderHook(() => useHttpRequest());

    act(() => {
      result.current.setUrl('https://error.example.com');
    });

    await act(async () => {
      await result.current.executeRequest([]);
    });

    expect(result.current.response?.error).toBe('Network error');
  });

  it('should process headers correctly', async () => {
    const { result } = renderHook(() => useHttpRequest());

    act(() => {
      result.current.setUrl('https://api.example.com');
    });

    const headers: Header[] = [
      { id: '1', key: 'Content-Type', value: 'application/json' },
      { id: '2', key: 'Authorization', value: 'Bearer token' },
    ];

    await act(async () => {
      await result.current.executeRequest(headers);
    });

    expect(result.current.response?.status).toBe(200);
    expect(result.current.response?.headers).toEqual({
      'Content-Type': 'application/json',
      Authorization: 'Bearer token',
    });
  });

  it('should add Content-Type for POST with body', async () => {
    const { result } = renderHook(() => useHttpRequest());

    act(() => {
      result.current.setUrl('https://api.example.com');
      result.current.setMethod('POST');
    });

    await act(async () => {
      await result.current.executeRequest([], '{"test": "data"}');
    });

    expect(result.current.response?.status).toBe(200);
    expect(result.current.response?.headers).toEqual({
      'Content-Type': 'application/json',
    });
  });

  it('should not add Content-Type for GET method', async () => {
    const { result } = renderHook(() => useHttpRequest());

    act(() => {
      result.current.setUrl('https://api.example.com');
      result.current.setMethod('GET');
    });

    await act(async () => {
      await result.current.executeRequest([], '{"test": "data"}');
    });

    expect(result.current.response?.status).toBe(200);
    expect(result.current.response?.headers).toEqual({});
  });
});
