import { Progress } from '@heroui/react';
import { Input } from '@heroui/react';
import { cn } from '@heroui/react';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { type UseFormRegister } from 'react-hook-form';
import * as v from 'valibot';

import { ErrorMessageList } from '@/components/error-message-list';
import { EyeFilledIcon } from '@/components/icons/eye-filled-icon';
import { EyeSlashFilledIcon } from '@/components/icons/eye-slash-filled-icon';

import { PASSWORD_STRENGTH_MAX } from '../constants/constants';
import { useSchemas } from '../hooks/use-schemas';
import { useStrength } from '../hooks/use-strength';
import { type AuthFormType } from '../types/types';

type Props = {
  register: UseFormRegister<AuthFormType>;
  error: string[];
  name: keyof AuthFormType;
  passwordValue: string;
};

export const PasswordField = ({ register, error, name, passwordValue }: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { passwordSchema } = useSchemas();
  const { label: strengthLabel, color: strengthColor, passwordStrength, setPasswordStrength } = useStrength();
  const t = useTranslations('PasswordField');

  useEffect(() => {
    const parsed = v.safeParse(passwordSchema, passwordValue);
    const issues = parsed.issues ?? [];
    const value = PASSWORD_STRENGTH_MAX - issues.length;

    setPasswordStrength(value);
  }, [passwordValue, passwordSchema]);

  const toggleVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="flex flex-col gap-1">
      <Input
        autoComplete="current-password"
        {...register(name)}
        endContent={
          <button
            aria-label={t('passwordToggleVisibility')}
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
        label={t('passwordLabel')}
        placeholder={t('passwordPlaceholder')}
        isInvalid={error.length > 0}
        errorMessage={ErrorMessageList({ errors: error })}
        classNames={{ input: cn(!isPasswordVisible && 'hidden-password') }}
      />
      <Progress
        classNames={{
          base: 'gap-1',
          track: 'drop-shadow-md border border-default',
          label: 'lowercase ml-auto text-tiny',
        }}
        label={strengthLabel}
        color={strengthColor}
        aria-label={t('passwordStrength')}
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
