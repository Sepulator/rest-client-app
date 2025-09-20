import { screen } from '@testing-library/react';

import { ResponseSection } from '@/features/rest-client/components/response-section';
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
  it('should show spinner when loading', () => {
    renderWithProviders(<ResponseSection response={mockResponse} isLoading={true} />);

    expect(screen.getByLabelText('Loading...')).toBeInTheDocument();
  });

  it('should show error message when response has error', () => {
    const errorResponse = { ...mockResponse, status: 500 };

    renderWithProviders(<ResponseSection response={errorResponse} isLoading={false} />);

    expect(screen.getByText(/500/i)).toBeInTheDocument();
  });
});
