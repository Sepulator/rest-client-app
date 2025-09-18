import { screen } from '@testing-library/react';

import { Variables } from '@/features/variables/components/variables';
import { useVariablesStore } from '@/stores/variables/store';
import { renderWithProviders } from '@/testing/utils/render-with-providers';
import { renderWithUserEvent } from '@/testing/utils/render-with-user-event';

import en from '../../../../messages/en.json';

const mockInitialState = useVariablesStore.getState();

describe('Variables', () => {
  beforeEach(() => {
    useVariablesStore.setState(mockInitialState);
    useVariablesStore.getState().isHydrated = true;
  });

  describe('Render', () => {
    it('should not render when not hydrated', () => {
      useVariablesStore.getState().isHydrated = false;
      const { container } = renderWithProviders(<Variables />);

      expect(container).toHaveTextContent('');
    });

    it('should render headings and add button', () => {
      const variablesMessages = en.Variables;

      renderWithProviders(<Variables />);

      expect(screen.getByText(variablesMessages.heading)).toBeInTheDocument();
      expect(screen.getByText(variablesMessages.key)).toBeInTheDocument();
      expect(screen.getByText(variablesMessages.value)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
    });

    it('should render with store data', () => {
      const { actions } = useVariablesStore.getState();
      const index = 0;
      const variableData = { key: 'test key', value: 'test value' };

      actions.addVariable();
      actions.addVariable();
      actions.updateVariable(variableData, index);

      renderWithProviders(<Variables />);

      const keyInputs = screen.getAllByPlaceholderText(/key/i);
      const valueInputs = screen.getAllByPlaceholderText(/value/i);

      expect(keyInputs).toHaveLength(3);
      expect(valueInputs).toHaveLength(3);
      expect(keyInputs[index]).toHaveValue(variableData.key);
      expect(valueInputs[index]).toHaveValue(variableData.value);
    });
  });

  describe('Interactions', () => {
    it('should add variable empty inputs when add button clicked', async () => {
      const { user } = renderWithUserEvent(<Variables />);

      await user.click(screen.getByRole('button', { name: /add/i }));

      expect(screen.getAllByPlaceholderText(/key/i)).toHaveLength(2);
      expect(screen.getAllByPlaceholderText(/value/i)).toHaveLength(2);
    });

    it('should add new variable when button add clicked', async () => {
      const { user } = renderWithUserEvent(<Variables />);

      await user.click(screen.getByRole('button', { name: /add/i }));

      expect(useVariablesStore.getState().variables).toHaveLength(2);
    });

    it('should remove inputs when remove button clicked', async () => {
      const { user } = renderWithUserEvent(<Variables />);

      await user.click(screen.getByRole('button', { name: /remove/i }));

      expect(screen.queryByRole('button', { name: /remove/i })).not.toBeInTheDocument();
      expect(screen.queryByPlaceholderText(/key/i)).not.toBeInTheDocument();
      expect(screen.queryByPlaceholderText(/value/i)).not.toBeInTheDocument();
    });
  });
});
