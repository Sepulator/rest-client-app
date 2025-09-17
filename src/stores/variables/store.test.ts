import { renderHook, act } from '@testing-library/react';
import { create } from 'zustand';

import type { VariablesStoreActions, VariablesStoreType } from '@/stores/variables/store';

import { variablesStoreCreator } from '@/stores/variables/store';

const mockDefaultField = { key: '', value: '', id: 'id' };
const mockRandomUUID = vi.fn().mockReturnValue('id');

vi.stubGlobal('crypto', {
  randomUUID: mockRandomUUID,
});

const useTestVariablesStore = create<VariablesStoreType & VariablesStoreActions>()(variablesStoreCreator);
const mockInitialState = useTestVariablesStore.getState();

describe('Variables Store', () => {
  beforeEach(() => {
    useTestVariablesStore.setState(mockInitialState);
  });

  it('should have correct initial state', () => {
    const state = useTestVariablesStore.getState();

    expect(state.variables).toEqual([mockDefaultField]);
    expect(state.isHydrated).toBe(false);
  });

  it('should have isHydrated true after setHydrated', () => {
    const { result } = renderHook(() => useTestVariablesStore());

    act(() => {
      result.current.actions.setHydrated();
    });

    expect(result.current.isHydrated).toBe(true);
  });

  it('should add new variable', () => {
    const { result } = renderHook(() => useTestVariablesStore());

    act(() => {
      result.current.actions.addVariable();
      result.current.actions.addVariable();
    });

    expect(result.current.variables).toHaveLength(3);
    expect(result.current.variables).toEqual([mockDefaultField, mockDefaultField, mockDefaultField]);
  });

  it('should remove variable', () => {
    const { result } = renderHook(() => useTestVariablesStore());

    act(() => {
      result.current.actions.removeVariable(0);
    });

    expect(result.current.variables).toHaveLength(0);
  });

  it('should clear variables', () => {
    const { result } = renderHook(() => useTestVariablesStore());

    act(() => {
      result.current.actions.addVariable();
    });

    expect(result.current.variables).toHaveLength(2);

    act(() => {
      result.current.actions.clearVariables();
    });

    expect(result.current.variables).toHaveLength(1);
  });

  it('should update variables', () => {
    const { result } = renderHook(() => useTestVariablesStore());

    act(() => {
      result.current.actions.addVariable();
      result.current.actions.updateVariable({ key: 'test' }, 0);
      result.current.actions.updateVariable({ value: 'test' }, 1);
    });

    expect(result.current.variables).toEqual([
      { key: 'test', value: '', id: 'id' },
      { key: '', value: 'test', id: 'id' },
    ]);
  });

  it('should not update variables if here is no such index', () => {
    const { result } = renderHook(() => useTestVariablesStore());

    act(() => {
      result.current.actions.updateVariable({ key: 'test' }, 10);
    });

    expect(result.current.variables).toEqual([mockDefaultField]);
  });
});
