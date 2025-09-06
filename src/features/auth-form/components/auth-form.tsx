'use client';

import { Form, Input, Button, Card, CardHeader, CardBody, CardFooter, Divider, Link } from '@heroui/react';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { type FormEvent } from 'react';
import { useForm } from 'react-hook-form';

import { MailIcon } from '@/components/icons/mail-icon';
import { type AuthFormType } from '@/features/auth-form/types/types';
import { useRouter } from '@/i18n/navigation';

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

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    void handleSubmit((data) => {
      event.preventDefault();

      console.log('data:', data);

      router.push('/');
    })(event);
  };

  const passwordValue = watch(PASSWORD_NAME);

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
            name={PASSWORD_NAME}
            passwordValue={passwordValue}
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
