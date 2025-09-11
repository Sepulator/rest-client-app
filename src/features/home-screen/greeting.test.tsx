import { screen } from '@testing-library/react';

import type { MockIntlLink } from '@/testing/mocks/types';

import { ROUTES } from '@/config/routes';
import { Greeting } from '@/features/home-screen/greeting';
import { mockUser } from '@/testing/mocks/user';
import { renderWithProviders } from '@/testing/utils/render-with-providers';

vi.mock('@/i18n/navigation', () => {
  return {
    Link: ({ children, href, ...props }: MockIntlLink) => (
      <a href={href} {...props}>
        {children}
      </a>
    ),
  };
});

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

      expect(loginLink).toHaveAttribute('href', ROUTES.LOGIN);
      expect(signupLink).toHaveAttribute('href', ROUTES.SIGN_UP);
    });

    it('should day of the week when provided', () => {
      const mockWeekDay = 'Test Monday';

      renderWithProviders(<Greeting dayOfWeek={mockWeekDay} />);

      expect(screen.getByText(mockWeekDay)).toBeInTheDocument();
    });
  });
});
