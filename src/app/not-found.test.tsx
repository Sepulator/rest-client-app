import { render, screen } from '@testing-library/react';

import { renderWithProviders } from '@/testing/utils/render-with-providers';

import GlobalNotFound from './not-found';

vi.mock('@/app/[locale]/_components/root-pages-layout', () => ({
  RootPagesLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="root-pages-layout">{children}</div>
  ),
}));

describe('GlobalNotFound', () => {
  it('renders html with correct lang attribute', () => {
    renderWithProviders(<GlobalNotFound />);
    const htmlElement = document.documentElement;

    expect(htmlElement).toHaveAttribute('lang', 'en');
  });

  it('renders RootPagesLayout wrapper', () => {
    render(<GlobalNotFound />);
    expect(screen.getByTestId('root-pages-layout')).toBeInTheDocument();
  });

  it('renders NotFoundComponent with correct props', () => {
    render(<GlobalNotFound />);

    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(screen.getByText('global non localized')).toBeInTheDocument();
    expect(screen.getByText('Go Home')).toBeInTheDocument();
  });
});
