'use client';

import type { FieldErrors } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

import { Form, Input, Button, Card, CardHeader, CardBody, CardFooter, Divider, Link as HeroLink } from '@heroui/react';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { MailIcon } from '@/components/icons/mail-icon';
import { ROUTES } from '@/config/routes';
import { type AuthFormType } from '@/features/auth-form/types/types';
import { useRouter } from '@/i18n/navigation';
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
  const router = useRouter();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormType>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    resolver: valibotResolver(authSchema),
  });
  const t = useTranslations('AuthForm');

  const onSubmit: SubmitHandler<AuthFormType> = (_) => {
    router.push(ROUTES.MAIN);
  };

  const passwordValue = watch(PASSWORD_NAME);

  const passwordErrorsArray = createErrorsArray(errors);

  return (
    <Card className="w-full max-w-sm p-2">
      <CardHeader>
        <h2 className="text-large">{heading}</h2>
      </CardHeader>
      <Divider />
      <CardBody>
        <Form
          className="flex w-full flex-col items-stretch gap-4"
          onSubmit={(event) => void handleSubmit(onSubmit)(event)}
        >
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
          <Button color="primary" type="submit" className="w-full">
            {heading}
          </Button>
        </Form>
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
