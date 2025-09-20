import { describe, it, expect, vi, beforeEach } from 'vitest';

import type { Header } from '@/types/http-request';

import { DEFAULT_URL } from '@/features/rest-client/constants/http-request';
import { useRestClientStore } from '@/stores/rest-client/store';

const mockReplaceVariables = (text: string) => text;

vi.mock('@/features/variables/hooks/use-replace-with-variable', () => ({
  useReplaceWithVariable: () => mockReplaceVariables,
}));

const executeRequest = async () => {
  const { executeRequest } = useRestClientStore.getState();

  return await executeRequest('en', mockReplaceVariables, 'Invalid URL. Please enter a valid HTTP or HTTPS URL.');
};

describe('RestClientStore', () => {
  beforeEach(() => {
    useRestClientStore.setState({
      method: 'GET',
      url: DEFAULT_URL,
      headers: [],
      response: null,
      isJsonMode: true,
      jsonBody: '',
      textBody: '',
      isLoading: false,
    });
  });

  it('should execute request successfully', async () => {
    useRestClientStore.setState({ url: DEFAULT_URL });
    await executeRequest();

    const { response } = useRestClientStore.getState();

    expect(response?.status).toBe(200);
    expect(response?.body).toContain('Mock Post');
  });

  it('should handle error responses', async () => {
    useRestClientStore.setState({ url: 'https://error.example.com' });
    await executeRequest();

    const { response } = useRestClientStore.getState();

    expect(response?.error).toBe('Network error');
  });

  it('should process headers correctly', async () => {
    const headers: Header[] = [
      { id: '1', key: 'Content-Type', value: 'application/json' },
      { id: '2', key: 'Authorization', value: 'Bearer token' },
    ];

    useRestClientStore.setState({
      url: 'https://api.example.com',
      headers,
    });
    await executeRequest();

    const { response } = useRestClientStore.getState();

    expect(response?.status).toBe(200);
    expect(response?.headers).toEqual({
      'Content-Type': 'application/json',
      Authorization: 'Bearer token',
    });
  });

  it('should add Content-Type for POST with body', async () => {
    useRestClientStore.setState({
      url: 'https://api.example.com',
      method: 'POST',
      jsonBody: '{"test": "data"}',
    });
    await executeRequest();

    const { response } = useRestClientStore.getState();

    expect(response?.status).toBe(200);
    expect(response?.headers).toEqual({
      'Content-Type': 'application/json',
    });
  });

  it('should not add Content-Type for GET method', async () => {
    useRestClientStore.setState({
      url: 'https://api.example.com',
      jsonBody: '{"test": "data"}',
    });

    await executeRequest();

    const { response } = useRestClientStore.getState();

    expect(response?.status).toBe(200);
    expect(response?.headers).toEqual({});
  });

  it('should not execute request for invalid URLs', async () => {
    useRestClientStore.setState({ url: 'invalid-url' });
    await executeRequest();

    const { response } = useRestClientStore.getState();

    expect(response?.error).toBe('Invalid URL. Please enter a valid HTTP or HTTPS URL.');
  });

  it('should accept valid HTTP URLs', async () => {
    useRestClientStore.setState({ url: 'http://api.example.com' });
    await executeRequest();

    const { response } = useRestClientStore.getState();

    expect(response?.status).toBe(200);
  });

  it('should not execute request for non-HTTP protocols', async () => {
    useRestClientStore.setState({ url: 'ftp://example.com' });
    await executeRequest();

    const { response } = useRestClientStore.getState();

    expect(response?.error).toBe('Invalid URL. Please enter a valid HTTP or HTTPS URL.');
  });

  it('should accept valid HTTPS URLs', async () => {
    useRestClientStore.setState({ url: 'https://api.example.com' });
    await executeRequest();

    const { response } = useRestClientStore.getState();

    expect(response?.status).toBe(200);
  });

  it('should handle network errors', async () => {
    useRestClientStore.setState({ url: 'https://network-error.example.com' });

    await executeRequest();

    const { response } = useRestClientStore.getState();

    expect(response?.error).toBe('Network error');
  });
});
