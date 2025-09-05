import React from 'react';

import { AuthForm } from '@/features/auth-form/components/auth-form';

const TEXTS = {
  HEADING: 'Sign up',
  SECONDARY_ACTION: 'Already have an account? ',
  SECONDARY_ACTION_LINK: 'Sign in.',
};

export default function SignUpPage() {
  const secondaryAction = {
    intro: TEXTS.SECONDARY_ACTION,
    link: '/sign-up',
    linkText: TEXTS.SECONDARY_ACTION_LINK,
  };

  return (
    <>
      <AuthForm heading={TEXTS.HEADING} secondaryAction={secondaryAction} />;
    </>
  );
}
