import { describe, expect, it } from 'vitest';

import { getBodyFromParams, getMethodFromParams, getUrlFromParams, getHeadersFromSearchParams } from './get-parameters';

describe('getBodyFromParams', () => {
  it('should return empty string when no parameters', () => {
    expect(getBodyFromParams()).toBe('');
    expect(getBodyFromParams([])).toBe('');
  });

  it('should return empty string when insufficient parameters', () => {
    expect(getBodyFromParams(['GET'])).toBe('');
    expect(getBodyFromParams(['GET', 'url'])).toBe('');
  });

  it('should decode body from third parameter', () => {
    const body = '{"test":"data"}';
    const encoded = encodeURIComponent(btoa(body));

    expect(getBodyFromParams(['GET', 'url', encoded])).toBe(body);
  });

  it('should return empty string for empty body parameter', () => {
    expect(getBodyFromParams(['GET', 'url', ''])).toBe('');
  });

  it('should handle decode errors gracefully', () => {
    expect(getBodyFromParams(['GET', 'url', 'invalid-base64'])).toBe('');
  });
});

describe('getMethodFromParams', () => {
  it('should return default method when no parameters', () => {
    expect(getMethodFromParams()).toBe('GET');
    expect(getMethodFromParams([])).toBe('GET');
  });

  it('should decode and uppercase valid method from first parameter', () => {
    expect(getMethodFromParams(['post'])).toBe('POST');
    expect(getMethodFromParams(['get'])).toBe('GET');
    expect(getMethodFromParams(['delete'])).toBe('DELETE');
  });

  it('should return default method for invalid HTTP method', () => {
    expect(getMethodFromParams(['INVALID'])).toBe('GET');
    expect(getMethodFromParams(['CUSTOM'])).toBe('GET');
    expect(getMethodFromParams(['123'])).toBe('GET');
  });

  it('should handle encoded valid method', () => {
    const encoded = encodeURIComponent('put');

    expect(getMethodFromParams([encoded])).toBe('PUT');
  });

  it('should handle encoded invalid method', () => {
    const encoded = encodeURIComponent('invalid');

    expect(getMethodFromParams([encoded])).toBe('GET');
  });

  it('should handle case-insensitive valid methods', () => {
    expect(getMethodFromParams(['patch'])).toBe('PATCH');
    expect(getMethodFromParams(['Head'])).toBe('HEAD');
    expect(getMethodFromParams(['OPTIONS'])).toBe('OPTIONS');
  });

  it('should handle decode errors gracefully', () => {
    expect(getMethodFromParams(['%'])).toBe('GET');
  });
});

describe('getUrlFromParams', () => {
  it('should return default URL when no parameters', () => {
    expect(getUrlFromParams()).toBe('https://jsonplaceholder.typicode.com/posts/1');
    expect(getUrlFromParams([])).toBe('https://jsonplaceholder.typicode.com/posts/1');
  });

  it('should return default URL when insufficient parameters', () => {
    expect(getUrlFromParams(['GET'])).toBe('https://jsonplaceholder.typicode.com/posts/1');
  });

  it('should decode URL from second parameter', () => {
    const url = 'https://api.example.com';
    const encoded = encodeURIComponent(btoa(url));

    expect(getUrlFromParams(['GET', encoded])).toBe(url);
  });

  it('should handle decode errors gracefully', () => {
    expect(getUrlFromParams(['GET', 'invalid-base64'])).toBe('');
  });
});

describe('getHeadersFromSearchParams', () => {
  it('should return default headers when no parameters', () => {
    const result = getHeadersFromSearchParams();

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ key: 'Accept', value: '*/*' });
  });

  it('should return default headers when empty object', () => {
    const result = getHeadersFromSearchParams({});

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ key: 'Accept', value: '*/*' });
  });

  it('should convert search params to headers', () => {
    const searchParams = { 'Content-Type': 'application/json', Authorization: 'Bearer token' };
    const result = getHeadersFromSearchParams(searchParams);

    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({ key: 'Content-Type', value: 'application/json' });
    expect(result[1]).toMatchObject({ key: 'Authorization', value: 'Bearer token' });
  });

  it('should generate unique IDs for headers', () => {
    const searchParams = { Accept: 'application/json', 'User-Agent': 'test' };
    const result = getHeadersFromSearchParams(searchParams);

    expect(result[0].id).toBeDefined();
    expect(result[1].id).toBeDefined();
    expect(result[0].id).not.toBe(result[1].id);
  });
});
