import { renderHook } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, it, expect } from 'vitest';

import en from '../../../../messages/en.json';
import { useStrength } from './use-strength';

describe('useStrength', () => {
  it('should return the correct strength', () => {
    const { result } = renderHook(() => useStrength({ passwordStrength: 0 }), {
      wrapper: ({ children }) => (
        <NextIntlClientProvider locale="en" messages={en}>
          {children}
        </NextIntlClientProvider>
      ),
    });

    const { label, color } = result.current;

    expect(label).toBe('Empty');
    expect(color).toBe('danger');
  });
});
