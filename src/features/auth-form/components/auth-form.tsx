'use client';

import { Form, Input, Button } from '@heroui/react';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useState, type FormEvent, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as v from 'valibot';

import { EyeFilledIcon } from '@/components/icons/eye-filled-icon';
import { EyeSlashFilledIcon } from '@/components/icons/eye-slash-filled-icon';
import { MailIcon } from '@/components/icons/mail-icon';

import { MIN_PASSWORD_LENGTH } from '../constants/constants';
import { PASSWORD_STRENGTH_MAX } from '../constants/constants';
import { PasswordStrength } from './password-strength';

const TEXTS = {
  EMAIL_LABEL: 'Email',
  SUBMIT: 'Submit',
  PASSWORD_LABEL: 'Password',
  EMAIL_PLACEHOLDER: 'Enter your email',
  PASSWORD_PLACEHOLDER: 'Enter your password',
  PASSWORD_TOGGLE_VISIBILITY: 'toggle password visibility',
};

const VALIDATION_MESSAGES = {
  MIN_LENGTH: 'Password must be at least 8 characters',
  NUMBER: 'Password must contain at least one number',
  LETTER: 'Password must contain at least one letter',
  SPECIAL_CHARACTER: 'Password must contain at least one special character',
  EMAIL_REQUIRED: 'Email is required',
  EMAIL_INVALID: 'Email is invalid',
};

const EMAIL_NAME = 'email';
const PASSWORD_NAME = 'password';

const passwordSchema = v.pipe(
  v.string(),
  v.regex(/\p{N}/u, VALIDATION_MESSAGES.NUMBER),
  v.regex(/\p{L}/u, VALIDATION_MESSAGES.LETTER),
  v.regex(/[^\p{L}\p{N}]/u, VALIDATION_MESSAGES.SPECIAL_CHARACTER),
  v.minLength(MIN_PASSWORD_LENGTH, VALIDATION_MESSAGES.MIN_LENGTH)
);

const emailSchema = v.pipe(
  v.string(),
  v.nonEmpty(VALIDATION_MESSAGES.EMAIL_REQUIRED),
  v.email(VALIDATION_MESSAGES.EMAIL_INVALID)
);

const authSchema = v.object({
  [EMAIL_NAME]: emailSchema,
  [PASSWORD_NAME]: passwordSchema,
});

type AuthForm = v.InferInput<typeof authSchema>;

export const AuthForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    resolver: valibotResolver(authSchema),
  });

  const toggleVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    const target = event.currentTarget;

    void handleSubmit((data) => {
      event.preventDefault();

      console.log('data:', data);

      target.submit();
    })(event);
  }

  const passwordValue = watch(PASSWORD_NAME);

  useEffect(() => {
    const parsed = v.safeParse(passwordSchema, passwordValue);
    const issues = parsed.issues ?? [];
    const value = PASSWORD_STRENGTH_MAX - issues.length;

    setPasswordStrength(value);
  }, [passwordValue]);

  return (
    <Form
      className="flex w-full max-w-xs flex-col gap-4"
      onSubmit={(event) => {
        onSubmit(event);
      }}
    >
      <Input
        endContent={<MailIcon className="text-default-400 pointer-events-none shrink-0 text-2xl" />}
        className="w-full"
        autoComplete="email"
        label={TEXTS.EMAIL_LABEL}
        labelPlacement="outside"
        placeholder="you@example.com"
        {...register(EMAIL_NAME)}
        errorMessage={errors.email?.message}
        isInvalid={!!errors.email}
        type="email"
      />

      <Input
        autoComplete="current-password"
        {...register(PASSWORD_NAME)}
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
        errorMessage={errors.password?.message}
        isInvalid={!!errors.password}
        type={isPasswordVisible ? 'text' : 'password'}
      />
      <PasswordStrength passwordStrength={passwordStrength} />
      <div className="flex gap-2">
        <Button color="primary" type="submit">
          {TEXTS.SUBMIT}
        </Button>
      </div>
    </Form>
  );
};
