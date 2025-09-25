import { act, renderHook } from '@testing-library/react';

import { useScrollState } from '@/hooks/use-scroll-state/use-scroll-state';

describe('useScrollState', () => {
  afterEach(() => {
    window.scrollY = 0;
    vi.useRealTimers();
  });

  it('should return true when when scrollY > offset', () => {
    window.scrollY = 100;

    const { result } = renderHook(() => useScrollState(10));

    expect(result.current).toBe(true);
  });

  it('should return false when when scrollY < offset', () => {
    window.scrollY = 20;

    const { result } = renderHook(() => useScrollState(50));

    expect(result.current).toBe(false);
  });

  it('should update state on scroll', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useScrollState(50, 0));

    expect(result.current).toBe(false);

    vi.advanceTimersByTime(100);

    act(() => {
      window.scrollY = 100;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(true);
  });

  it('should update state after delay', () => {
    vi.useFakeTimers();
    const DELAY = 10;
    const { result } = renderHook(() => useScrollState(50, DELAY));

    act(() => {
      window.scrollY = 100;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(false);

    vi.advanceTimersByTime(20);

    act(() => {
      window.scrollY = 150;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(true);
  });
});
