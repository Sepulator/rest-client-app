import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type UseFormRegister } from 'react-hook-form';
import { describe, it, expect, vi } from 'vitest';

import type { AuthFormType } from '../types/types';

import { PasswordField } from './password-field';

const name = 'password' as const;

const mockRegister: UseFormRegister<AuthFormType> = (fieldName) => ({
  name: fieldName,
  onChange: vi.fn(),
  onBlur: vi.fn(),
  ref: vi.fn(),
});

describe('PasswordField', () => {
  it('should render password input and password strength progress and toggle password visibility button', () => {
    render(<PasswordField register={mockRegister} error={[]} passwordValue={''} name={name} />);

    const input = screen.getByLabelText('Password');
    const progress = screen.getByLabelText('Password strength');

    const visibilityButton = screen.getByLabelText('toggle password visibility');

    expect(input).toBeInTheDocument();
    expect(progress).toBeInTheDocument();
    expect(visibilityButton).toBeInTheDocument();
  });

  it('should set password type to text when toggle password visibility button is clicked', async () => {
    const user = userEvent.setup();

    render(<PasswordField register={mockRegister} error={[]} passwordValue={''} name={name} />);

    const visibilityButton = screen.getByLabelText('toggle password visibility');
    const input = screen.getByLabelText('Password');

    await user.click(visibilityButton);

    expect(input).toHaveAttribute('type', 'text');
  });
  it('should set password type to password when toggle password visibility button is clicked twice', async () => {
    const user = userEvent.setup();

    render(<PasswordField register={mockRegister} error={[]} passwordValue={''} name={name} />);

    const visibilityButton = screen.getByLabelText('toggle password visibility');
    const input = screen.getByLabelText('Password');

    await user.click(visibilityButton);
    await user.click(visibilityButton);

    expect(input).toHaveAttribute('type', 'password');
  });
  it('should not have aria-invalid attribute when there is no error', () => {
    render(<PasswordField register={mockRegister} error={[]} passwordValue={''} name={name} />);

    const input = screen.getByLabelText('Password');

    expect(input).not.toHaveAttribute('aria-invalid');
  });

  it('should have aria-invalid attribute when there is an error', () => {
    render(<PasswordField register={mockRegister} error={['error']} passwordValue={''} name={name} />);

    const input = screen.getByLabelText('Password');

    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('should have render error message when there is an error', () => {
    const MESSAGE = 'error';

    render(<PasswordField register={mockRegister} error={[MESSAGE]} passwordValue={''} name={name} />);

    const errorMessage = screen.getByText(MESSAGE);

    expect(errorMessage).toBeInTheDocument();
  });
});
