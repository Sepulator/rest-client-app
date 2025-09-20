import { describe, it, expect, vi, beforeEach } from 'vitest';

import type { Header, ResponseData } from '@/types/http-request';

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

  describe('Store Actions', () => {
    it('should set method', () => {
      const { setMethod } = useRestClientStore.getState();

      setMethod('POST');
      expect(useRestClientStore.getState().method).toBe('POST');
    });

    it('should set URL', () => {
      const { setUrl } = useRestClientStore.getState();

      setUrl('https://api.test.com');
      expect(useRestClientStore.getState().url).toBe('https://api.test.com');
    });

    it('should set headers', () => {
      const headers: Header[] = [{ id: '1', key: 'Auth', value: 'token' }];
      const { setHeaders } = useRestClientStore.getState();

      setHeaders(headers);
      expect(useRestClientStore.getState().headers).toEqual(headers);
    });

    it('should add header', () => {
      const { addHeader } = useRestClientStore.getState();

      addHeader();
      const { headers } = useRestClientStore.getState();

      expect(headers).toHaveLength(1);
      expect(headers[0]).toMatchObject({ key: '', value: '' });
      expect(headers[0].id).toBeDefined();
    });

    it('should update header', () => {
      const { addHeader, updateHeader } = useRestClientStore.getState();

      addHeader();
      const { headers } = useRestClientStore.getState();
      const headerId = headers[0].id;

      updateHeader(headerId, { key: 'Content-Type', value: 'application/json' });
      const updatedHeaders = useRestClientStore.getState().headers;

      expect(updatedHeaders[0]).toMatchObject({
        id: headerId,
        key: 'Content-Type',
        value: 'application/json',
      });
    });

    it('should remove header', () => {
      const { addHeader, removeHeader } = useRestClientStore.getState();

      addHeader();
      const { headers } = useRestClientStore.getState();
      const headerId = headers[0].id;

      removeHeader(headerId);
      expect(useRestClientStore.getState().headers).toHaveLength(0);
    });

    it('should set JSON mode', () => {
      const { setIsJsonMode } = useRestClientStore.getState();

      setIsJsonMode(false);
      expect(useRestClientStore.getState().isJsonMode).toBe(false);
    });

    it('should set JSON body', () => {
      const { setJsonBody } = useRestClientStore.getState();

      setJsonBody('{"test": true}');
      expect(useRestClientStore.getState().jsonBody).toBe('{"test": true}');
    });

    it('should set text body', () => {
      const { setTextBody } = useRestClientStore.getState();

      setTextBody('plain text');
      expect(useRestClientStore.getState().textBody).toBe('plain text');
    });

    it('should set loading state', () => {
      const { setIsLoading } = useRestClientStore.getState();

      setIsLoading(true);
      expect(useRestClientStore.getState().isLoading).toBe(true);
    });

    it('should set response', () => {
      const mockResponse: ResponseData = {
        status: 200,
        statusText: 'OK',
        headers: {},
        body: 'test',
        timestamp: '2023-01-01',
        duration: 100,
        requestSize: 50,
        responseSize: 4,
      };

      const { setResponse } = useRestClientStore.getState();

      setResponse(mockResponse);
      expect(useRestClientStore.getState().response).toEqual(mockResponse);
    });
  });

  describe('Request Body Handling', () => {
    it('should use text body when not in JSON mode', async () => {
      useRestClientStore.setState({
        url: 'https://api.example.com',
        method: 'POST',
        isJsonMode: false,
        textBody: 'plain text data',
        jsonBody: '{"ignored": true}',
      });

      await executeRequest();
      const { response } = useRestClientStore.getState();

      expect(response?.headers).toEqual({ 'Content-Type': 'text/plain' });
    });

    it('should not send body for GET requests', async () => {
      useRestClientStore.setState({
        url: 'https://api.example.com',
        method: 'GET',
        jsonBody: '{"should": "be ignored"}',
      });

      await executeRequest();
      const { response } = useRestClientStore.getState();

      expect(response?.headers).toEqual({});
    });

    it('should not send body for HEAD requests', async () => {
      useRestClientStore.setState({
        url: 'https://api.example.com',
        method: 'HEAD',
        jsonBody: '{"should": "be ignored"}',
      });

      await executeRequest();
      const { response } = useRestClientStore.getState();

      expect(response?.headers).toEqual({});
    });
  });

  describe('URL Normalization', () => {
    it('should normalize URL without protocol', async () => {
      useRestClientStore.setState({ url: 'api.example.com' });
      await executeRequest();
      const { response } = useRestClientStore.getState();

      expect(response?.status).toBe(200);
    });

    it('should preserve existing HTTPS protocol', async () => {
      useRestClientStore.setState({ url: 'https://api.example.com' });
      await executeRequest();
      const { response } = useRestClientStore.getState();

      expect(response?.status).toBe(200);
    });
  });

  describe('Header Processing', () => {
    it('should ignore headers with empty keys', async () => {
      const headers: Header[] = [
        { id: '1', key: '', value: 'ignored' },
        { id: '2', key: 'Valid-Header', value: 'valid-value' },
      ];

      useRestClientStore.setState({
        url: 'https://api.example.com',
        headers,
      });

      await executeRequest();
      const { response } = useRestClientStore.getState();

      expect(response?.headers).toEqual({ 'Valid-Header': 'valid-value' });
    });

    it('should ignore headers with empty values', async () => {
      const headers: Header[] = [
        { id: '1', key: 'Empty-Value', value: '' },
        { id: '2', key: 'Valid-Header', value: 'valid-value' },
      ];

      useRestClientStore.setState({
        url: 'https://api.example.com',
        headers,
      });

      await executeRequest();
      const { response } = useRestClientStore.getState();

      expect(response?.headers).toEqual({ 'Valid-Header': 'valid-value' });
    });

    it('should not override existing Content-Type header', async () => {
      const headers: Header[] = [{ id: '1', key: 'Content-Type', value: 'application/xml' }];

      useRestClientStore.setState({
        url: 'https://api.example.com',
        method: 'POST',
        headers,
        jsonBody: '{"test": true}',
      });

      await executeRequest();
      const { response } = useRestClientStore.getState();

      expect(response?.headers).toEqual({ 'Content-Type': 'application/xml' });
    });
  });
});
