import { screen } from '@testing-library/react';

import { ResponseSection } from '@/features/rest-client/components/response-section';
import { useRestClientStore } from '@/stores/rest-client/store';
import { renderWithProviders } from '@/testing/utils/render-with-providers';

const mockResponse = {
  status: 200,
  statusText: 'OK',
  headers: {},
  body: '{"message": "success"}',
  timestamp: '',
  duration: 0,
  requestSize: 0,
  responseSize: 0,
};

describe('ResponseSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useRestClientStore.setState({
      response: null,
      isLoading: false,
    });
  });

  it('should show spinner when loading', () => {
    useRestClientStore.setState({ isLoading: true });
    renderWithProviders(<ResponseSection />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should show error message when response has error', () => {
    useRestClientStore.setState({
      response: { ...mockResponse, error: 'Network error' },
    });
    renderWithProviders(<ResponseSection />);

    expect(screen.getByText('Error:')).toBeInTheDocument();
    expect(screen.getByText('Network error')).toBeInTheDocument();
  });

  it('should show response status and body', () => {
    useRestClientStore.setState({ response: mockResponse });
    renderWithProviders(<ResponseSection />);

    expect(screen.getByText('200 OK')).toBeInTheDocument();
  });
});
