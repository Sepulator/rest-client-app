import { screen } from '@testing-library/react';

import { ROUTES } from '@/config/routes';
import { Greeting } from '@/features/home-screen/greeting';
import { mockUser } from '@/testing/mocks/user';
import { MOCK_LOCALE, renderWithProviders } from '@/testing/utils/render-with-providers';

describe('Greeting', () => {
  describe('Render', () => {
    it('should render user data when user logged in', () => {
      renderWithProviders(<Greeting />);

      expect(screen.getByRole('heading')).toHaveTextContent(mockUser.name);
      expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    });

    it('should render login and sign up links when user not logged in', () => {
      renderWithProviders(<Greeting />, { providerOptions: { userData: undefined } });

      const loginLink = screen.getByRole('link', { name: /sign in/i });
      const signupLink = screen.getByRole('link', { name: /sign up/i });

      expect(loginLink).toBeInTheDocument();
      expect(signupLink).toBeInTheDocument();

      expect(loginLink).toHaveAttribute('href', `/${MOCK_LOCALE}${ROUTES.LOGIN}`);
      expect(signupLink).toHaveAttribute('href', `/${MOCK_LOCALE}${ROUTES.SIGN_UP}`);
    });

    it('should day of the week when provided', () => {
      const mockWeekDay = 'Test Monday';

      renderWithProviders(<Greeting dayOfWeek={mockWeekDay} />);

      expect(screen.getByText(mockWeekDay)).toBeInTheDocument();
    });
  });
});
