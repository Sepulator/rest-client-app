import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { IntlProvider } from '@/testing/test-utilities';

import { useStrength } from './use-strength';

describe('useStrength', () => {
  const STRENGTH_CONFIG = {
    0: {
      label: 'Empty',
      color: 'danger',
    },
    1: {
      label: 'Weak',
      color: 'danger',
    },
    2: {
      label: 'Medium',
      color: 'warning',
    },
    3: {
      label: 'Strong',
      color: 'warning',
    },
    4: {
      label: 'Excellent',
      color: 'success',
    },
  };

  it('should return the correct default strength', () => {
    const { result } = renderHook(() => useStrength(), {
      wrapper: ({ children }) => <IntlProvider>{children}</IntlProvider>,
    });

    const STRENGTH = 0;

    const { label, color } = result.current;

    expect(label).toBe(STRENGTH_CONFIG[STRENGTH].label);
    expect(color).toBe(STRENGTH_CONFIG[STRENGTH].color);
  });

  it('should have a correct default password strength', () => {
    const { result } = renderHook(() => useStrength(), {
      wrapper: ({ children }) => <IntlProvider>{children}</IntlProvider>,
    });

    const { passwordStrength } = result.current;

    expect(passwordStrength).toBe(0);
  });

  it('should properly update the password strength, label and color when the password strength is 1', () => {
    const { result } = renderHook(() => useStrength(), {
      wrapper: ({ children }) => <IntlProvider>{children}</IntlProvider>,
    });

    const STRENGTH = 1;

    act(() => {
      result.current.setPasswordStrength(STRENGTH);
    });

    const { passwordStrength, label, color } = result.current;

    expect(passwordStrength).toBe(STRENGTH);
    expect(label).toBe(STRENGTH_CONFIG[STRENGTH].label);
    expect(color).toBe(STRENGTH_CONFIG[STRENGTH].color);
  });

  it('should properly update the password strength, label and color when the password strength is 2', () => {
    const { result } = renderHook(() => useStrength(), {
      wrapper: ({ children }) => <IntlProvider>{children}</IntlProvider>,
    });

    const STRENGTH = 2;

    act(() => {
      result.current.setPasswordStrength(2);
    });

    const { passwordStrength, label, color } = result.current;

    expect(passwordStrength).toBe(STRENGTH);
    expect(label).toBe(STRENGTH_CONFIG[STRENGTH].label);
    expect(color).toBe(STRENGTH_CONFIG[STRENGTH].color);
  });

  it('should properly update the password strength, label and color when the password strength is 3', () => {
    const { result } = renderHook(() => useStrength(), {
      wrapper: ({ children }) => <IntlProvider>{children}</IntlProvider>,
    });

    const STRENGTH = 3;

    act(() => {
      result.current.setPasswordStrength(STRENGTH);
    });

    const { passwordStrength, label, color } = result.current;

    expect(passwordStrength).toBe(STRENGTH);
    expect(label).toBe(STRENGTH_CONFIG[STRENGTH].label);
    expect(color).toBe(STRENGTH_CONFIG[STRENGTH].color);
  });

  it('should properly update the password strength, label and color when the password strength is 4', () => {
    const { result } = renderHook(() => useStrength(), {
      wrapper: ({ children }) => <IntlProvider>{children}</IntlProvider>,
    });

    const STRENGTH = 4;

    act(() => {
      result.current.setPasswordStrength(STRENGTH);
    });

    const { passwordStrength, label, color } = result.current;

    expect(passwordStrength).toBe(STRENGTH);
    expect(label).toBe(STRENGTH_CONFIG[STRENGTH].label);
    expect(color).toBe(STRENGTH_CONFIG[STRENGTH].color);
  });

  it('should properly update the password strength properly when the password strength is changed multiple times', () => {
    const { result } = renderHook(() => useStrength(), {
      wrapper: ({ children }) => <IntlProvider>{children}</IntlProvider>,
    });

    const FINAL_STRENGTH = 1;

    act(() => {
      result.current.setPasswordStrength(1);
    });

    act(() => {
      result.current.setPasswordStrength(4);
    });

    act(() => {
      result.current.setPasswordStrength(FINAL_STRENGTH);
    });

    const { passwordStrength, label, color } = result.current;

    expect(passwordStrength).toBe(FINAL_STRENGTH);
    expect(label).toBe(STRENGTH_CONFIG[FINAL_STRENGTH].label);
    expect(color).toBe(STRENGTH_CONFIG[FINAL_STRENGTH].color);
  });
});
