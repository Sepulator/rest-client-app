import { describe, it, expect } from 'vitest';

import { validateHeaderData } from './validate-header';

describe('validateHeaderData', () => {
  it('should validate valid header and value strings', () => {
    const result = validateHeaderData({ header: 'Content-Type', value: 'application/json' });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.output).toEqual({ header: 'Content-Type', value: 'application/json' });
    }
  });

  it('should validate empty strings', () => {
    const result = validateHeaderData({ header: '', value: '' });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.output).toEqual({ header: '', value: '' });
    }
  });

  it('should validate whitespace-only strings', () => {
    const result = validateHeaderData({ header: '   ', value: '\t\n' });

    expect(result.success).toBe(true);
  });

  it('should fail validation for null header', () => {
    const result = validateHeaderData({ header: null, value: 'test' });

    expect(result.success).toBe(false);
  });

  it('should fail validation for null value', () => {
    const result = validateHeaderData({ header: 'test', value: null });

    expect(result.success).toBe(false);
  });
});
