'use client';

import { Form, Input, Button } from '@heroui/react';

import { MailIcon } from '@/components/login-form/mail-icon';

import { PasswordInput } from '../password-input/password-input';

const TEXTS = {
  INTRO: 'Welcome back! Please, login',
  EMAIL: 'Email',
  EMAIL_ERROR: 'Please enter a valid email',
  EMAIL_PLACEHOLDER: 'Enter your email',
  SUBMIT: 'Submit',
};

export const LoginForm = () => {
  return (
    <Form
      className="flex w-full max-w-xs flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Input
        endContent={<MailIcon className="text-default-400 pointer-events-none shrink-0 text-2xl" />}
        isRequired
        errorMessage={TEXTS.EMAIL_ERROR}
        label={TEXTS.EMAIL}
        labelPlacement="outside"
        placeholder="you@example.com"
        name="email"
        type="email"
      />
      <PasswordInput />
      <div className="flex gap-2">
        <Button color="primary" type="submit">
          {TEXTS.SUBMIT}
        </Button>
      </div>
    </Form>
  );
};
