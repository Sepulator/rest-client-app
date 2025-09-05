import { AuthForm } from '@/features/auth-form/components/auth-form';

const TEXTS = {
  HEADING: 'Sign in',
  SECONDARY_ACTION: "Don't have an account? ",
  SECONDARY_ACTION_LINK: 'Sign up.',
};

export default function LoginPage() {
  const secondaryAction = {
    intro: TEXTS.SECONDARY_ACTION,
    link: '/sign-up',
    linkText: TEXTS.SECONDARY_ACTION_LINK,
  };

  return <AuthForm heading={TEXTS.HEADING} secondaryAction={secondaryAction} />;
}
