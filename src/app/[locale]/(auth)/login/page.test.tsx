import { render, screen } from '@testing-library/react';

import type { SecondaryAction } from '@/types/types';

import LoginPage from './page';

const mockTranslations = (key: string) => {
  const translations: Record<string, string> = {
    login: 'Login',
    haveAccount: "Don't have an account?",
    signUp: 'Sign Up',
  };

  return translations[key] || key;
};

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(() => mockTranslations),
}));

vi.mock('@/config/routes', () => ({
  ROUTES: {
    SIGN_UP: '/sign-up',
  },
}));

vi.mock('@/features/auth-form/components/auth-form', () => ({
  AuthForm: ({ heading, secondaryAction }: { heading: string; secondaryAction: SecondaryAction }) => (
    <div data-testid="auth-form">
      <h1>{heading}</h1>
      <div data-testid="secondary-action">
        <span>{secondaryAction.intro}</span>
        <a href={secondaryAction.link}>{secondaryAction.linkText}</a>
      </div>
    </div>
  ),
}));

describe('LoginPage', () => {
  it('renders AuthForm with correct heading', () => {
    render(<LoginPage />);

    expect(screen.getByTestId('auth-form')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('renders secondary action with correct props', () => {
    render(<LoginPage />);

    const secondaryAction = screen.getByTestId('secondary-action');

    expect(secondaryAction).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });
});
