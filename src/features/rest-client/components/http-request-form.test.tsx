import { screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { renderWithProviders } from '@/testing/utils/render-with-providers';
import { renderWithUserEvent } from '@/testing/utils/render-with-user-event';

import { HttpRequestForm } from './http-request-form';

const mockExecuteRequest = vi.fn();

vi.mock('@/features/rest-client/hooks/use-http-request', () => ({
  useHttpRequest: () => ({
    method: 'GET',
    setMethod: vi.fn(),
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    setUrl: vi.fn(),
    executeRequest: mockExecuteRequest,
    response: {
      body: '',
      headers: {},
      status: 0,
      statusText: '',
      timestamp: '',
      duration: 0,
      requestSize: 0,
      responseSize: 0,
    },
    isLoading: false,
  }),
}));

describe('HttpRequestForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
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

  it('should toggle between JSON and Text modes', async () => {
    const { user } = renderWithUserEvent(<HttpRequestForm />);

    const textButton = screen.getByRole('tab', { name: 'Text' });
    const jsonButton = screen.getByRole('tab', { name: 'JSON' });

    await user.click(textButton);
    await user.click(jsonButton);

    expect(textButton).toBeInTheDocument();
    expect(jsonButton).toBeInTheDocument();
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
});
