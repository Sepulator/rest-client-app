import { renderHook } from '@testing-library/react';

import { useReplaceWithVariable } from '@/features/variables/hooks/use-replace-with-variable';
import { useVariablesStore } from '@/stores/variables/store';

const mockInitialState = useVariablesStore.getState();

const setupHook = () => renderHook(() => useReplaceWithVariable()).result.current;

describe('useReplaceWithVariable', () => {
  beforeEach(() => {
    useVariablesStore.setState(mockInitialState);
  });

  it('should replace all variables with its values', () => {
    const mockVariables = [
      { key: 'Key 1', value: 'Key 1 value', id: '1' },
      { key: '  Key 2  ', value: '  Key 2 value  ', id: '2' },
    ];

    useVariablesStore.setState({ variables: mockVariables });

    const replaceWithValue = setupHook();

    const string = 'String {{Key 1}},{{  Key 2  }},{{Key 1}}';

    expect(replaceWithValue(string)).toBe('String Key 1 value,  Key 2 value  ,Key 1 value');
  });

  it('should not replace variables when key is not found', () => {
    const mockVariables = [{ key: 'not found', value: 'Key 1 value', id: '1' }];

    useVariablesStore.setState({ variables: mockVariables });

    const replaceWithValue = setupHook();

    const string = 'String {{Key 1}}';

    expect(replaceWithValue(string)).toBe(string);
  });

  it('should return original string when no variables found', () => {
    const replaceWithValue = setupHook();

    const string = 'Without variables';

    expect(replaceWithValue(string)).toBe(string);
  });

  it('should update the last found variable', () => {
    const mockVariables = [
      { key: 'Key 1', value: 'Key 1 value', id: '1' },
      { key: 'Key 1', value: 'actual value', id: '2' },
    ];

    useVariablesStore.setState({ variables: mockVariables });

    const replaceWithValue = setupHook();

    const string = 'String {{Key 1}}';

    expect(replaceWithValue(string)).toBe('String actual value');
  });
});
