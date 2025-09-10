import type { ReactNode } from 'react';

import { screen } from '@testing-library/react';

import { ROUTES } from '@/config/routes';
import { Sidebar } from '@/features/side-bar/sidebar';
import { renderWithUserEvent } from '@/testing/utils/render-with-user-event';

type MockIntlLink = { [key: string]: unknown; children: ReactNode; href: string };

let pathnameMock: string;

vi.mock('@/i18n/navigation', () => {
  return {
    usePathname: () => pathnameMock,
    Link: ({ children, href, ...props }: MockIntlLink) => (
      <a href={href} {...props}>
        {children}
      </a>
    ),
  };
});

const mockTranslations = {
  navigation: {
    home: 'Home',
    client: 'REST Client',
    history: 'History',
    variables: 'Variables',
  },
  actions: {
    logout: 'Temp Logout',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    menu: 'Menu',
  },
};

const { menu, menuOpen, menuClose } = mockTranslations.actions;

vi.mock('react-i18next', () => ({
  useTranslations: () => ({
    t: (key: keyof typeof mockTranslations) => mockTranslations[key],
  }),
}));

const mockLogout = vi.fn();
const setupSidebar = () => ({ ...renderWithUserEvent(<Sidebar tempLogout={mockLogout} />) });

describe('Sidebar', () => {
  describe('Render', () => {
    it('should render links', () => {
      setupSidebar();

      const homeLink = screen.getByRole('link', { name: /home/i });
      const restClientLink = screen.getByRole('link', { name: /client/i });
      const historyLink = screen.getByRole('link', { name: /history/i });
      const variablesLink = screen.getByRole('link', { name: /variables/i });

      expect(homeLink).toBeInTheDocument();
      expect(restClientLink).toBeInTheDocument();
      expect(historyLink).toBeInTheDocument();
      expect(variablesLink).toBeInTheDocument();

      expect(homeLink).toHaveAttribute('href', ROUTES.MAIN);
      expect(restClientLink).toHaveAttribute('href', ROUTES.CLIENT);
      expect(historyLink).toHaveAttribute('href', ROUTES.HISTORY);
      expect(variablesLink).toHaveAttribute('href', ROUTES.VARIABLES);
    });

    it('should render sidebar heading with button', () => {
      setupSidebar();

      expect(screen.getByText(menu)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: menuOpen })).toBeInTheDocument();
    });
  });

  describe('Interaction', () => {
    it('should open and close sidebar on button click', async () => {
      const { user } = setupSidebar();
      const button = screen.getByRole('button', { name: menuOpen });

      await user.click(button);

      expect(button).toHaveAccessibleName(menuClose);
      Object.values(mockTranslations.navigation).forEach((value) => expect(screen.getByText(value)).toBeVisible());

      await user.click(button);

      expect(button).toHaveAccessibleName(menuOpen);
      Object.values(mockTranslations.navigation).forEach((value) => expect(screen.queryByText(value)).toBeVisible());
    });

    it('should show active link', () => {
      pathnameMock = '/';
      setupSidebar();

      const homeLink = screen.getByRole('link', { name: /home/i });

      expect(homeLink).toHaveAttribute('aria-current', 'page');
    });
  });
});
