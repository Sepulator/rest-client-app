'use client';

import { Form, Input, Button, Card, CardHeader, CardBody, CardFooter, Divider, Link } from '@heroui/react';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useState, type FormEvent, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as v from 'valibot';

import { MailIcon } from '@/components/icons/mail-icon';
import { type AuthFormType } from '@/features/auth-form/types/types';

import { PASSWORD_STRENGTH_MAX } from '../constants/constants';
import { useSchemas } from '../hooks/use-schemas';
import { PasswordField } from './password-field';

const TEXTS = {
  EMAIL_LABEL: 'Email',
  SUBMIT: 'Submit',
  EMAIL_PLACEHOLDER: 'Enter your email',
};

const EMAIL_NAME = 'email';
const PASSWORD_NAME = 'password';

export const AuthForm = ({
  heading,
  secondaryAction,
}: {
  heading: string;
  secondaryAction: { intro: string; link: string; linkText: string };
}) => {
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const { authSchema, passwordSchema } = useSchemas();
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

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const target = event.currentTarget;

    void handleSubmit((data) => {
      event.preventDefault();

      console.log('data:', data);

      target.submit();
    })(event);
  };

  const passwordValue = watch(PASSWORD_NAME);

  useEffect(() => {
    const parsed = v.safeParse(passwordSchema, passwordValue);
    const issues = parsed.issues ?? [];
    const value = PASSWORD_STRENGTH_MAX - issues.length;

    setPasswordStrength(value);
  }, [passwordValue, passwordSchema]);

  return (
    <Card className="w-full max-w-sm p-2">
      <CardHeader>
        <h2 className="text-large">{heading}</h2>
      </CardHeader>
      <Divider />
      <CardBody>
        <Form
          className="flex w-full flex-col items-stretch gap-4"
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
          <PasswordField
            register={register}
            error={errors.password?.message ?? ''}
            passwordStrength={passwordStrength}
            name={PASSWORD_NAME}
          />
          <Button color="primary" type="submit" className="w-full">
            {TEXTS.SUBMIT}
          </Button>
        </Form>
      </CardBody>
      <CardFooter className="flex-col gap-2">
        <Divider />
        <div className="text-small">
          <span>{secondaryAction.intro}</span> <Link href={secondaryAction.link}>{secondaryAction.linkText}</Link>
        </div>
      </CardFooter>
    </Card>
  );
};
