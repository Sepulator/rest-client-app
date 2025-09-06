import { Progress } from '@heroui/react';
import { Input } from '@heroui/react';
import { useState, useEffect } from 'react';
import { type UseFormRegister } from 'react-hook-form';
import * as v from 'valibot';

import { EyeFilledIcon } from '@/components/icons/eye-filled-icon';
import { EyeSlashFilledIcon } from '@/components/icons/eye-slash-filled-icon';

import { PASSWORD_STRENGTH_MAX } from '../constants/constants';
import { useSchemas } from '../hooks/use-schemas';
import { useStrength } from '../hooks/use-strength';
import { type AuthFormType } from '../types/types';

const TEXTS = {
  PASSWORD_STRENGTH: 'Password strength',
  PASSWORD_PLACEHOLDER: 'Enter your password',
  PASSWORD_TOGGLE_VISIBILITY: 'toggle password visibility',
  PASSWORD_LABEL: 'Password',
};

export const PasswordField = ({
  register,
  error,
  name,
  passwordValue,
}: {
  register: UseFormRegister<AuthFormType>;
  error: string;
  name: keyof AuthFormType;
  passwordValue: string;
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const { passwordSchema } = useSchemas();

  const toggleVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const { label: strengthLabel, color: strengthColor } = useStrength({ passwordStrength });

  useEffect(() => {
    const parsed = v.safeParse(passwordSchema, passwordValue);
    const issues = parsed.issues ?? [];
    const value = PASSWORD_STRENGTH_MAX - issues.length;

    setPasswordStrength(value);
  }, [passwordValue, passwordSchema]);

  return (
    <div className="flex flex-col gap-1">
      <Input
        autoComplete="current-password"
        {...register(name)}
        endContent={
          <button
            aria-label={TEXTS.PASSWORD_TOGGLE_VISIBILITY}
            className="cursor-pointer outline-transparent focus:outline-solid"
            type="button"
            onClick={toggleVisibility}
          >
            {isPasswordVisible ? (
              <EyeSlashFilledIcon className="text-default-400 pointer-events-none text-2xl" />
            ) : (
              <EyeFilledIcon className="text-default-400 pointer-events-none text-2xl" />
            )}
          </button>
        }
        labelPlacement="outside"
        label={TEXTS.PASSWORD_LABEL}
        placeholder={TEXTS.PASSWORD_PLACEHOLDER}
        isInvalid={!!error}
        errorMessage={error}
        type={isPasswordVisible ? 'text' : 'password'}
      />
      <Progress
        classNames={{
          base: 'gap-1',
          track: 'drop-shadow-md border border-default',
          label: 'lowercase ml-auto text-tiny',
        }}
        label={strengthLabel}
        color={strengthColor}
        aria-label={TEXTS.PASSWORD_STRENGTH}
        size="sm"
        maxValue={PASSWORD_STRENGTH_MAX}
        aria-valuemin={0}
        aria-valuemax={PASSWORD_STRENGTH_MAX}
        aria-valuenow={passwordStrength}
        value={passwordStrength}
      />
    </div>
  );
};
