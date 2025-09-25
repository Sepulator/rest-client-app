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

vi.mock('@supabase/ssr', () => ({
  createBrowserClient: vi.fn(),
}));

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

  it('should not show response section when there is an error', () => {
    useRestClientStore.setState({
      response: { ...mockResponse, error: 'Network error' },
    });
    renderWithProviders(<ResponseSection />);

    expect(screen.getByText('Status:')).toBeInTheDocument();
    expect(screen.queryByText('Network error')).not.toBeInTheDocument();
  });

  it('should show response status and body', () => {
    useRestClientStore.setState({ response: mockResponse });
    renderWithProviders(<ResponseSection />);

    expect(screen.getByText('200 OK')).toBeInTheDocument();
  });
});
