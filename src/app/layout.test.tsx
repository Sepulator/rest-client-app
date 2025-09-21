import { render, screen } from '@testing-library/react';

import RootLayout from './layout';

describe('RootLayout', () => {
  it('renders children correctly', () => {
    const testContent = 'Test content';

    render(
      <RootLayout>
        <div>{testContent}</div>
      </RootLayout>
    );

    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('passes through multiple children', () => {
    render(
      <RootLayout>
        <div>First child</div>
        <div>Second child</div>
      </RootLayout>
    );

    expect(screen.getByText('First child')).toBeInTheDocument();
    expect(screen.getByText('Second child')).toBeInTheDocument();
  });

  it('handles empty children', () => {
    const { container } = render(<RootLayout>{null}</RootLayout>);

    expect(container).toBeInTheDocument();
  });
});
