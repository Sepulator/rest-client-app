import { screen, waitFor, within } from '@testing-library/react';

import type { MockIntlLink } from '@/testing/mocks/types';

import Header from '@/components/header/header';
import { ROUTES } from '@/config/routes';
import { routing } from '@/i18n/routing';
import { renderWithProviders } from '@/testing/utils/render-with-providers';
import { renderWithUserEvent } from '@/testing/utils/render-with-user-event';

const createRouterMock = () => ({
  replace: vi.fn(),
});

vi.mock('next/navigation', () => {
  return { useSearchParams: vi.fn() };
});

vi.mock('@/i18n/navigation', () => {
  return {
    useRouter: () => createRouterMock(),
    usePathname: vi.fn(),
    Link: ({ children, href, ...props }: MockIntlLink) => (
      <a href={href} {...props}>
        {children}
      </a>
    ),
  };
});

describe('Header', () => {
  describe('Render', () => {
    it('should render links when user not logged in', () => {
      renderWithProviders(<Header />, { providerOptions: { userData: undefined } });

      const homeLink = screen.getByRole('link', { name: /home/i });
      const loginLink = screen.getByRole('link', { name: /sign in/i });
      const signupLink = screen.getByRole('link', { name: /sign up/i });

      expect(homeLink).toBeInTheDocument();
      expect(loginLink).toBeInTheDocument();
      expect(signupLink).toBeInTheDocument();

      expect(homeLink).toHaveAttribute('href', ROUTES.MAIN);
      expect(loginLink).toHaveAttribute('href', ROUTES.LOGIN);
      expect(signupLink).toHaveAttribute('href', ROUTES.SIGN_UP);
    });

    it('should render logo and language toggle button', () => {
      renderWithProviders(<Header />);

      expect(screen.getByText(/v-rest/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /language/i })).toBeInTheDocument();
    });

    it('should render logout button instead auth links when user logged in', () => {
      renderWithProviders(<Header />);

      expect(screen.queryByRole('link', { name: /sign up/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('link', { name: /login/i })).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
    });

    it('should not have decoration when scrolled', () => {
      renderWithProviders(<Header />);
      const header = screen.getByRole('navigation');

      expect(header).not.toHaveClass('border-b');
      expect(header).toHaveClass('bg-background/70');
    });

    it('should have decoration when scrolled', () => {
      vi.spyOn(window, 'scrollY', 'get').mockReturnValue(100);
      renderWithProviders(<Header />);
      const header = screen.getByRole('navigation');

      expect(header).toHaveClass('border-b');
      expect(header).toHaveClass('bg-default-100/50');
    });
  });

  describe('Interaction', () => {
    it('should open language menu on button click', async () => {
      const { user } = renderWithUserEvent(<Header />);

      await user.click(screen.getByRole('button', { name: /language/i }));

      expect(screen.getByRole('menu', { name: /language/i })).toBeInTheDocument();
    });

    it('should close on outside click', async () => {
      const { user } = renderWithUserEvent(<Header />);

      await user.click(screen.getByRole('button', { name: /language/i }));

      const menu = screen.getByRole('menu', { name: /language/i });

      expect(menu).toBeInTheDocument();

      await user.click(screen.getByRole('navigation'));

      await waitFor(() => expect(menu).not.toBeInTheDocument());
    });

    it('should show language options on opened menu', async () => {
      const { user } = renderWithUserEvent(<Header />);

      await user.click(screen.getByRole('button', { name: /language/i }));
      const menu = screen.getByRole('menu');

      const menuItems = within(menu).getAllByRole('menuitem');

      expect(menuItems).toHaveLength(routing.locales.length);

      menuItems.forEach((menuItem, index) => {
        const locale = routing.locales[index];

        expect(menuItem).toHaveAttribute('data-key', locale);
        expect(menuItem).toHaveTextContent(new RegExp(locale, 'i'));
      });
    });
  });
});
