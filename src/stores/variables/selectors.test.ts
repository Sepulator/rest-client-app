import { renderHook, act } from '@testing-library/react';

import { useIsDuplicate, useVariables, useIsHydrated } from '@/stores/variables/selectors';
import { useVariablesStore } from '@/stores/variables/store';

const mockInitialState = useVariablesStore.getState();

describe('Variables Selectors', () => {
  beforeEach(() => {
    useVariablesStore.setState(mockInitialState);
  });

  it('should return variables from useVariables', () => {
    const { result: store } = renderHook(() => useVariablesStore());
    const { result: variables } = renderHook(() => useVariables());

    act(() => {
      store.current.actions.addVariable();
    });

    expect(variables.current).toHaveLength(2);
    expect(variables.current).toEqual(store.current.variables);
  });

  it('should return isHydrated from useIsHydrated', () => {
    const { result: store } = renderHook(() => useVariablesStore());
    const { result: isHydrated } = renderHook(() => useIsHydrated());

    expect(store.current.isHydrated).toBe(isHydrated.current);
  });

  it('should find if there any duplicates from useIsDuplicate', () => {
    const { result: store } = renderHook(() => useVariablesStore());
    const { result: isDuplicate } = renderHook(() => useIsDuplicate(0));

    expect(isDuplicate.current).toBe(false);

    act(() => {
      store.current.actions.addVariable();
      store.current.actions.updateVariable({ key: 'test' }, 0);
      store.current.actions.updateVariable({ key: 'test' }, 1);
    });

    expect(isDuplicate.current).toBe(true);
  });
});
