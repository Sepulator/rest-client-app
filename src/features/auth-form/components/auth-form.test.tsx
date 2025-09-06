import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';

import { AuthForm } from './auth-form';

describe('AuthForm', () => {
  const secondaryActionMock = { intro: 'intro', link: '/link', linkText: 'linkText' };

  it('should render heading, email input, password input, progress bar, submit button', () => {
    render(<AuthForm heading="heading" secondaryAction={secondaryActionMock} />);

    const heading = screen.getByRole('heading', { level: 2 });
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText('Password');
    const progressBar = screen.getByRole('progressbar');
    const submitButton = screen.getByRole('button', { name: /submit/i });
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

    const emailInput = screen.getByRole('textbox', { name: /email/i });

    await user.click(emailInput);
    await user.type(emailInput, 'invalid email');

    const errorMessage = screen.getByText('Email is invalid');

    expect(errorMessage).toBeInTheDocument();
  });

  it('should render email input with aria-invalid attribute when email is invalid', async () => {
    render(<AuthForm heading="heading" secondaryAction={secondaryActionMock} />);
    const user = userEvent.setup();

    const emailInput = screen.getByRole('textbox', { name: /email/i });

    await user.click(emailInput);
    await user.type(emailInput, 'invalid email');

    expect(emailInput).toHaveAttribute('aria-invalid', 'true');
  });

  it('should render email input without aria-invalid attribute when email is valid', async () => {
    render(<AuthForm heading="heading" secondaryAction={secondaryActionMock} />);
    const user = userEvent.setup();

    const emailInput = screen.getByRole('textbox', { name: /email/i });

    await user.click(emailInput);
    await user.type(emailInput, 'test@test.com');

    expect(emailInput).not.toHaveAttribute('aria-invalid');
  });
});
