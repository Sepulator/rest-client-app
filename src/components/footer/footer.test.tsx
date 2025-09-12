import { screen } from '@testing-library/react';

import { teamInfo } from '@/components/footer/constants/team-info';
import { Footer } from '@/components/footer/footer';
import { renderWithProviders } from '@/testing/utils/render-with-providers';

describe('Footer', () => {
  describe('Render', () => {
    it('should render links to the authors GitHub', () => {
      renderWithProviders(<Footer />);

      teamInfo.forEach((person) => {
        const link = screen.getByRole('link', { name: new RegExp(person.name, 'i') });

        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', person.github);
      });
    });

    it('should render the year the application', () => {
      renderWithProviders(<Footer />);

      expect(screen.getByText(/2025/i)).toBeInTheDocument();
    });

    it('course logo link', () => {
      renderWithProviders(<Footer />);

      const rsLink = screen.getByRole('link', { name: /rs/i });

      expect(rsLink).toBeInTheDocument();
      expect(rsLink).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
      expect(screen.getByAltText(/rs/i)).toBeInTheDocument();
    });
  });
});
