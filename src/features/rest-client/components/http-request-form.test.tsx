import { screen } from '@testing-library/react';

import { useRestClientStore } from '@/stores/rest-client/store';
import { renderWithProviders } from '@/testing/utils/render-with-providers';
import { renderWithUserEvent } from '@/testing/utils/render-with-user-event';

import { HttpRequestForm } from './http-request-form';

const mockExecuteRequest = vi.fn();

vi.mock('@supabase/ssr', () => ({
  createBrowserClient: vi.fn(),
}));

describe('HttpRequestForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useRestClientStore.setState({
      method: 'GET',
      url: 'https://example.com',
      headers: [{ id: '1', key: 'Accept', value: '*/*' }],
      response: null,
      isJsonMode: true,
      jsonBody: '',
      textBody: '',
      isLoading: false,
      executeRequest: mockExecuteRequest,
    });
  });

  it('should render form elements', () => {
    renderWithProviders(<HttpRequestForm />);

    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Text' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'JSON' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Prettify JSON' })).toBeInTheDocument();
  });

  it('should execute request on form submit', async () => {
    const { user } = renderWithUserEvent(<HttpRequestForm />);

    await user.click(screen.getByRole('button', { name: 'Send' }));

    expect(mockExecuteRequest).toHaveBeenCalled();
  });

  it('should add new header when Add Header button is clicked', async () => {
    const { user } = renderWithUserEvent(<HttpRequestForm />);

    const addButton = screen.getByRole('button', { name: 'Add Header' });
    const initialHeaders = screen.getAllByPlaceholderText('header');

    await user.click(addButton);

    const updatedHeaders = screen.getAllByPlaceholderText('header');

    expect(updatedHeaders).toHaveLength(initialHeaders.length + 1);
  });

  it('should update header key when typing in header input', async () => {
    const { user } = renderWithUserEvent(<HttpRequestForm />);

    const headerInput = screen.getByDisplayValue('Accept');

    await user.clear(headerInput);
    await user.type(headerInput, 'Content-Type');

    expect(headerInput).toHaveValue('Content-Type');
  });

  it('should update header value when typing in value input', async () => {
    const { user } = renderWithUserEvent(<HttpRequestForm />);

    const valueInput = screen.getByDisplayValue('*/*');

    await user.clear(valueInput);
    await user.type(valueInput, 'application/json');

    expect(valueInput).toHaveValue('application/json');
  });

  it('should remove header when delete button is clicked', async () => {
    const { user } = renderWithUserEvent(<HttpRequestForm />);

    await user.click(screen.getByRole('button', { name: 'Add Header' }));

    const deleteButtons = screen.getAllByRole('button', { name: /Remove header/ });
    const initialHeaders = screen.getAllByPlaceholderText('header');

    await user.click(deleteButtons[0]);

    const updatedHeaders = screen.getAllByPlaceholderText('header');

    expect(updatedHeaders).toHaveLength(initialHeaders.length - 1);
  });

  describe('Initialization', () => {
    it('should initialize from URL parameters', () => {
      const mockInitialize = vi.fn();

      useRestClientStore.setState({ initializeFromParams: mockInitialize });

      const initialParams = ['POST', 'https://api.test.com'];
      const initialSearchParams = { 'Content-Type': 'application/json' };

      renderWithProviders(<HttpRequestForm initialParams={initialParams} initialSearchParams={initialSearchParams} />);

      expect(mockInitialize).toHaveBeenCalledWith(initialParams, initialSearchParams);
    });

    it('should initialize without parameters', () => {
      const mockInitialize = vi.fn();

      useRestClientStore.setState({ initializeFromParams: mockInitialize });

      renderWithProviders(<HttpRequestForm />);

      expect(mockInitialize).toHaveBeenCalledWith(undefined, undefined);
    });
  });

  describe('Loading States', () => {
    it('should disable send button when loading', () => {
      useRestClientStore.setState({ isLoading: true });

      renderWithProviders(<HttpRequestForm />);

      expect(screen.getByRole('button', { name: 'Loading Send' })).toBeDisabled();
    });

    it('should show loading state on send button', () => {
      useRestClientStore.setState({ isLoading: true });

      renderWithProviders(<HttpRequestForm />);

      const sendButton = screen.getByRole('button', { name: 'Loading Send' });

      expect(sendButton).toHaveAttribute('data-loading', 'true');
    });
  });

  describe('Body Editor', () => {
    it('should show JSON editor when in JSON mode', () => {
      useRestClientStore.setState({ isJsonMode: true });

      renderWithProviders(<HttpRequestForm />);

      expect(screen.getByRole('tab', { name: 'JSON' })).toHaveAttribute('aria-selected', 'true');
    });

    it('should show text editor when in text mode', () => {
      useRestClientStore.setState({ isJsonMode: false });

      renderWithProviders(<HttpRequestForm />);

      expect(screen.getByRole('tab', { name: 'Text' })).toHaveAttribute('aria-selected', 'true');
    });

    it('should switch to JSON mode when JSON tab is clicked', async () => {
      useRestClientStore.setState({ isJsonMode: false });
      const { user } = renderWithUserEvent(<HttpRequestForm />);

      await user.click(screen.getByRole('tab', { name: 'JSON' }));

      expect(useRestClientStore.getState().isJsonMode).toBe(true);
    });

    it('should switch to text mode when Text tab is clicked', async () => {
      useRestClientStore.setState({ isJsonMode: true });
      const { user } = renderWithUserEvent(<HttpRequestForm />);

      await user.click(screen.getByRole('tab', { name: 'Text' }));

      expect(useRestClientStore.getState().isJsonMode).toBe(false);
    });
  });
});
