import { describe, expect, it } from 'vitest';

import { generateRouteUrl } from './route-generator';

describe('generateRouteUrl', () => {
  it('should generate basic route without body and headers', () => {
    const result = generateRouteUrl('GET', 'https://api.example.com', 'en');

    expect(result).toBe('/en/client/GET/aHR0cHM6Ly9hcGkuZXhhbXBsZS5jb20=');
  });

  it('should generate route with body', () => {
    const result = generateRouteUrl('POST', 'https://api.example.com', 'en', '{"test": "data"}');

    expect(result).toBe('/en/client/POST/aHR0cHM6Ly9hcGkuZXhhbXBsZS5jb20=/eyJ0ZXN0IjoiZGF0YSJ9');
  });

  it('should generate route with headers', () => {
    const headers = { 'Content-Type': 'application/json', Authorization: 'Bearer token' };
    const result = generateRouteUrl('GET', 'https://api.example.com', 'en', undefined, headers);

    expect(result).toBe(
      '/en/client/GET/aHR0cHM6Ly9hcGkuZXhhbXBsZS5jb20=?Content-Type=application%2Fjson&Authorization=Bearer+token'
    );
  });

  it('should generate route with body and headers', () => {
    const headers = { Accept: 'application/json' };
    const result = generateRouteUrl('POST', 'https://api.example.com', 'en', '{"id": 1}', headers);

    expect(result).toBe('/en/client/POST/aHR0cHM6Ly9hcGkuZXhhbXBsZS5jb20=/eyJpZCI6MX0=?Accept=application%2Fjson');
  });

  it('should handle different locales', () => {
    const result = generateRouteUrl('GET', 'https://api.example.com', 'es');

    expect(result).toBe('/es/client/GET/aHR0cHM6Ly9hcGkuZXhhbXBsZS5jb20=');
  });

  it('should ignore empty header keys or values', () => {
    const headers = { '': 'value', key: '', valid: 'header' };
    const result = generateRouteUrl('GET', 'https://api.example.com', 'en', undefined, headers);

    expect(result).toBe('/en/client/GET/aHR0cHM6Ly9hcGkuZXhhbXBsZS5jb20=?valid=header');
  });

  it('should handle empty body string', () => {
    const result = generateRouteUrl('POST', 'https://api.example.com', 'en', '');

    expect(result).toBe('/en/client/POST/aHR0cHM6Ly9hcGkuZXhhbXBsZS5jb20=');
  });

  it('should handle empty headers object', () => {
    const result = generateRouteUrl('GET', 'https://api.example.com', 'en', undefined, {});

    expect(result).toBe('/en/client/GET/aHR0cHM6Ly9hcGkuZXhhbXBsZS5jb20=');
  });
});
