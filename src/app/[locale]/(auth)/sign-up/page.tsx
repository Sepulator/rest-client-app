import { useTranslations } from 'next-intl';
import React from 'react';

import { ROUTES } from '@/config/routes';
import { AuthForm } from '@/features/auth-form/components/auth-form';

export default function SignUpPage() {
  const t = useTranslations('userActions.navigation');

  const secondaryAction = {
    intro: t('alreadyHaveAccount'),
    link: ROUTES.LOGIN,
    linkText: t('login'),
  };

  return <AuthForm heading={t('signUp')} secondaryAction={secondaryAction} />;
}
