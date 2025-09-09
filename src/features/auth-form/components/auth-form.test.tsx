import type { ReactNode } from 'react';

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';

import { renderWithProviders as render } from '@/testing/test-utilities';

import { AuthForm } from './auth-form';

export const createRouterMock = () => ({
  push: mockPush,
  replace: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  prefetch: vi.fn(),
});

export const mockPush = vi.fn();

vi.mock('next/navigation', () => ({ useRouter: createRouterMock }));

vi.mock('@/i18n/navigation', () => ({
  useRouter: () => createRouterMock(),
  Link: ({ children, href, ...props }: { [key: string]: unknown; children: ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('AuthForm', () => {
  const VALID_EMAIL = 'test@test.com';
  const VALID_PASSWORD = 'Password1!';

  const PASSWORD_LABEL = 'Password';
  const EMAIL_LABEL = 'Email';

  const secondaryActionMock = { intro: 'intro', link: '/link', linkText: 'linkText' };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render heading, email input, password input, progress bar, submit button', () => {
    render(<AuthForm heading={'heading'} secondaryAction={secondaryActionMock} />);

    const heading = screen.getByRole('heading', { level: 2 });
    const emailInput = screen.getByRole('textbox', { name: EMAIL_LABEL });
    const passwordInput = screen.getByLabelText(PASSWORD_LABEL);
    const progressBar = screen.getByRole('progressbar');
    const submitButton = screen.getByRole('button', { name: 'heading' });
    const actionIntro = screen.getByText(secondaryActionMock.intro);
    const actionLink = screen.getByRole('link', { name: secondaryActionMock.linkText });

    expect(heading).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(progressBar).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(actionIntro).toBeInTheDocument();
    expect(actionLink).toBeInTheDocument();
  });

  it('should render correct content in secondary action', () => {
    render(<AuthForm heading="heading" secondaryAction={secondaryActionMock} />);

    const actionIntro = screen.getByText(secondaryActionMock.intro);
    const actionLink = screen.getByRole('link', { name: secondaryActionMock.linkText });

    expect(actionIntro).toBeInTheDocument();
    expect(actionLink).toBeInTheDocument();
    expect(actionLink).toHaveAttribute('href', secondaryActionMock.link);
  });

  it('should render error message when email input is invalid', async () => {
    render(<AuthForm heading="heading" secondaryAction={secondaryActionMock} />);
    const user = userEvent.setup();

    const emailInput = screen.getByRole('textbox', { name: EMAIL_LABEL });

    await user.click(emailInput);
    await user.type(emailInput, 'invalid email');

    const errorMessage = screen.getByText('Email is invalid');

    expect(errorMessage).toBeInTheDocument();
  });

  it('should render email input with aria-invalid attribute when email is invalid', async () => {
    render(<AuthForm heading="heading" secondaryAction={secondaryActionMock} />);
    const user = userEvent.setup();

    const emailInput = screen.getByRole('textbox', { name: EMAIL_LABEL });

    await user.click(emailInput);
    await user.type(emailInput, 'invalid email');

    expect(emailInput).toHaveAttribute('aria-invalid', 'true');
  });

  it('should render email input without aria-invalid attribute when email is valid', async () => {
    render(<AuthForm heading="heading" secondaryAction={secondaryActionMock} />);
    const user = userEvent.setup();

    const emailInput = screen.getByRole('textbox', { name: EMAIL_LABEL });

    await user.click(emailInput);
    await user.type(emailInput, VALID_EMAIL);

    expect(emailInput).not.toHaveAttribute('aria-invalid');
  });

  it('should render correct error message when password does not contain a number', async () => {
    render(<AuthForm heading="heading" secondaryAction={secondaryActionMock} />);
    const user = userEvent.setup();

    const passwordInput = screen.getByLabelText(PASSWORD_LABEL);

    await user.click(passwordInput);
    await user.type(passwordInput, 'password!');

    const errorMessage = screen.getByText('Password must contain at least one number');

    expect(errorMessage).toBeInTheDocument();
  });

  it('should render correct error message when password does not contain a letter', async () => {
    render(<AuthForm heading="heading" secondaryAction={secondaryActionMock} />);
    const user = userEvent.setup();

    const passwordInput = screen.getByLabelText(PASSWORD_LABEL);

    await user.click(passwordInput);
    await user.type(passwordInput, '12345678!');

    const errorMessage = screen.getByText('Password must contain at least one letter');

    expect(errorMessage).toBeInTheDocument();
  });

  it('should render correct error message when password does not contain a special character', async () => {
    render(<AuthForm heading="heading" secondaryAction={secondaryActionMock} />);
    const user = userEvent.setup();

    const passwordInput = screen.getByLabelText(PASSWORD_LABEL);

    await user.click(passwordInput);
    await user.type(passwordInput, '12345678a');

    const errorMessage = screen.getByText('Password must contain at least one special character');

    expect(errorMessage).toBeInTheDocument();
  });

  it('should render correct error message when password is too short', async () => {
    render(<AuthForm heading="heading" secondaryAction={secondaryActionMock} />);
    const user = userEvent.setup();

    const passwordInput = screen.getByLabelText(PASSWORD_LABEL);

    await user.click(passwordInput);
    await user.type(passwordInput, '1!a');

    const errorMessage = screen.getByText('Password must be at least 8 characters');

    expect(errorMessage).toBeInTheDocument();
  });

  it('should render password input with aria-invalid attribute when password is invalid', async () => {
    render(<AuthForm heading="heading" secondaryAction={secondaryActionMock} />);
    const user = userEvent.setup();

    const passwordInput = screen.getByLabelText(PASSWORD_LABEL);

    await user.click(passwordInput);
    await user.type(passwordInput, '!');

    expect(passwordInput).toHaveAttribute('aria-invalid', 'true');
  });

  it('should render password input without aria-invalid attribute when password is valid', async () => {
    render(<AuthForm heading="heading" secondaryAction={secondaryActionMock} />);
    const user = userEvent.setup();

    const passwordInput = screen.getByLabelText(PASSWORD_LABEL);

    await user.click(passwordInput);
    await user.type(passwordInput, VALID_PASSWORD);

    expect(passwordInput).not.toHaveAttribute('aria-invalid');
  });

  it('should redirect to the main page on submit', async () => {
    render(<AuthForm heading="heading" secondaryAction={secondaryActionMock} />);
    const user = userEvent.setup();

    const emailInput = screen.getByRole('textbox', { name: 'Email' });
    const passwordInput = screen.getByLabelText(PASSWORD_LABEL);
    const submitButton = screen.getByRole('button', { name: 'heading' });

    await user.click(emailInput);
    await user.type(emailInput, VALID_EMAIL);

    await user.click(passwordInput);
    await user.type(passwordInput, VALID_PASSWORD);

    await user.click(submitButton);

    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('should not redirect to the main page when invalid password is submitted', async () => {
    render(<AuthForm heading="heading" secondaryAction={secondaryActionMock} />);
    const user = userEvent.setup();

    const emailInput = screen.getByRole('textbox', { name: 'Email' });
    const passwordInput = screen.getByLabelText(PASSWORD_LABEL);
    const submitButton = screen.getByRole('button', { name: 'heading' });

    await user.click(emailInput);
    await user.type(emailInput, VALID_EMAIL);

    await user.click(passwordInput);
    await user.type(passwordInput, 'invalid password');

    await user.click(submitButton);

    expect(mockPush).not.toHaveBeenCalled();
  });

  it('should not redirect to the main page when invalid email is submitted', async () => {
    render(<AuthForm heading="heading" secondaryAction={secondaryActionMock} />);
    const user = userEvent.setup();

    const emailInput = screen.getByRole('textbox', { name: 'Email' });
    const passwordInput = screen.getByLabelText(PASSWORD_LABEL);
    const submitButton = screen.getByRole('button', { name: 'heading' });

    await user.click(emailInput);
    await user.type(emailInput, 'invalid email');

    await user.click(passwordInput);
    await user.type(passwordInput, VALID_PASSWORD);

    await user.click(submitButton);

    expect(mockPush).not.toHaveBeenCalled();
  });

  it('should redirect to the main page on submit when password has unicode characters', async () => {
    render(<AuthForm heading="heading" secondaryAction={secondaryActionMock} />);
    const user = userEvent.setup();
    const unicodePassword = 'юникод8🚰';

    const emailInput = screen.getByRole('textbox', { name: 'Email' });
    const passwordInput = screen.getByLabelText(PASSWORD_LABEL);
    const submitButton = screen.getByRole('button', { name: 'heading' });

    await user.click(emailInput);
    await user.type(emailInput, VALID_EMAIL);

    await user.click(passwordInput);
    await user.type(passwordInput, unicodePassword);

    await user.click(submitButton);

    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
