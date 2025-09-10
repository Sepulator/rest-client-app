import React from 'react';

import { ROUTES } from '@/config/routes';
import { AuthForm } from '@/features/auth-form/components/auth-form';

const TEXTS = {
  HEADING: 'Sign up',
  SECONDARY_ACTION: 'Already have an account? ',
  SECONDARY_ACTION_LINK: 'Sign in.',
};

export default function SignUpPage() {
  const secondaryAction = {
    intro: TEXTS.SECONDARY_ACTION,
    link: ROUTES.LOGIN,
    linkText: TEXTS.SECONDARY_ACTION_LINK,
  };

  return <AuthForm heading={TEXTS.HEADING} secondaryAction={secondaryAction} />;
}
