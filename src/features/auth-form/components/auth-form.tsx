'use client';

import type { FieldErrors } from 'react-hook-form';

import { Input, Button, Card, CardHeader, CardBody, CardFooter, Divider, Link as HeroLink } from '@heroui/react';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { signIn, signUp } from '@/app/actions/auth';
import { MailIcon } from '@/components/icons/mail-icon';
import { type AuthFormType } from '@/features/auth-form/types/types';
import { Link as IntlLink } from '@/i18n/navigation';
import { type SecondaryAction } from '@/types/types';

import { useSchemas } from '../hooks/use-schemas';
import { PasswordField } from './password-field';

const EMAIL_NAME = 'email';
const PASSWORD_NAME = 'password';
const EMAIL_PLACEHOLDER = 'email@example.com';

const createErrorsArray = (errors: FieldErrors) =>
  Object.values(errors.password?.types ?? {})
    .flat()
    .filter((value) => typeof value === 'string');

type Props = {
  heading: string;
  secondaryAction: SecondaryAction;
};

export const AuthForm = ({ heading, secondaryAction }: Props) => {
  const { authSchema } = useSchemas();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<AuthFormType>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    resolver: valibotResolver(authSchema),
  });
  const t = useTranslations('AuthForm');

  const isSignUp = heading === 'Sign up';
  const action = isSignUp ? signUp : signIn;

  const passwordValue = watch(PASSWORD_NAME);
  const passwordErrorsArray = createErrorsArray(errors);

  return (
    <Card className="w-full max-w-sm p-2">
      <CardHeader>
        <h2 className="text-large">{heading}</h2>
      </CardHeader>
      <Divider />
      <CardBody>
        <form action={action} className="mt-2 flex w-full flex-col items-stretch gap-4">
          <Input
            endContent={<MailIcon className="text-default-400 pointer-events-none shrink-0 text-2xl" />}
            className="w-full"
            autoComplete="email"
            label={t('emailLabel')}
            labelPlacement="outside"
            placeholder={EMAIL_PLACEHOLDER}
            {...register(EMAIL_NAME)}
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email}
            type="email"
          />
          <PasswordField
            register={register}
            error={passwordErrorsArray}
            name={PASSWORD_NAME}
            passwordValue={passwordValue}
          />
          {error && <div className="text-danger text-small">{error}</div>}
          <Button color="primary" type="submit" className="w-full">
            {heading}
          </Button>
        </form>
      </CardBody>
      <CardFooter className="flex-col gap-2">
        <Divider />
        <div className="text-small">
          <span>{secondaryAction.intro}</span>{' '}
          <HeroLink as={IntlLink} href={secondaryAction.link}>
            {secondaryAction.linkText}
          </HeroLink>
        </div>
      </CardFooter>
    </Card>
  );
};
