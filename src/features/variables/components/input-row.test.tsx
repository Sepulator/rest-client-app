import { fireEvent, screen } from '@testing-library/react';

import type { InputRowProps } from '@/features/variables/components/input-row';

import { InputRow } from '@/features/variables/components/input-row';
import { STORAGE_KEY, useVariablesStore } from '@/stores/variables/store';
import { renderWithUserEvent } from '@/testing/utils/render-with-user-event';

const mockField = { key: '', value: '', id: 'id' };
const mockInitialState = useVariablesStore.getState();
const getDataFromStorage = () => localStorage.getItem(STORAGE_KEY) ?? '';

const mockRandomUUID = vi.fn().mockReturnValue('id');

vi.stubGlobal('crypto', {
  randomUUID: mockRandomUUID,
});

const setupInput = (props?: Partial<InputRowProps>) => ({
  ...renderWithUserEvent(<InputRow index={0} field={mockField} {...props} />),
  keyInput: screen.getByPlaceholderText(/key/i),
  valueInput: screen.getByPlaceholderText(/value/i),
});

describe('InputRow', () => {
  beforeEach(() => {
    useVariablesStore.setState(mockInitialState);
  });

  describe('Render', () => {
    it('should render inputs and remove button', () => {
      const { keyInput, valueInput } = setupInput();

      expect(screen.getByRole('button', { name: /remove/i })).toBeInTheDocument();
      expect(keyInput).toHaveValue(mockField.key);
      expect(valueInput).toHaveValue(mockField.value);
    });

    describe('Interactions', () => {
      afterEach(() => vi.useRealTimers());
      const newVariable = { key: 'new key', value: 'new value', id: 'id' };

      it('should update variables information on user type', () => {
        vi.useFakeTimers();
        const { keyInput, valueInput } = setupInput();

        fireEvent.change(keyInput, { target: { value: newVariable.key } });
        vi.advanceTimersByTime(200);

        fireEvent.change(valueInput, { target: { value: newVariable.value } });
        vi.advanceTimersByTime(200);

        const variable = useVariablesStore.getState().variables[0];

        expect(variable.key).toBe(newVariable.key);
        expect(variable.value).toBe(newVariable.value);
      });

      it('should update localStorage information on user type', () => {
        vi.useFakeTimers();
        const { keyInput, valueInput } = setupInput();

        const initialStorageData = getDataFromStorage();

        expect(initialStorageData).not.toMatch(/new/i);

        fireEvent.change(keyInput, { target: { value: newVariable.key } });
        vi.advanceTimersByTime(200);

        fireEvent.change(valueInput, { target: { value: newVariable.value } });
        vi.advanceTimersByTime(200);

        const variableString = getDataFromStorage();

        expect(variableString).toMatch(/new/i);
      });

      it('should show alert if there duplicate keys', () => {
        useVariablesStore.setState({
          ...mockInitialState,
          variables: [
            { key: 'key', value: '', id: '' },
            { key: 'key', value: '', id: '' },
          ],
        });
        setupInput();

        expect(screen.getByRole('alert')).toBeInTheDocument();
      });
    });
  });
});
