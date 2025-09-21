import { useTranslations } from 'next-intl';

import { ROUTES } from '@/config/routes';
import { AuthForm } from '@/features/auth-form/components/auth-form';

export default function LoginPage() {
  const t = useTranslations('userActions.navigation');

  const secondaryAction = {
    intro: t('haveAccount'),
    link: ROUTES.SIGN_UP,
    linkText: t('signUp'),
  };

  return <AuthForm heading={t('login')} secondaryAction={secondaryAction} />;
}
