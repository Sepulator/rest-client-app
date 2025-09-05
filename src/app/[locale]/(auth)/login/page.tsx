import { AuthForm } from '@/features/auth-form/components/auth-form';

const TEXTS = {
  INTRO: 'Welcome back! Please, login',
};

export default function LoginPage() {
  return (
    <>
      <h1>{TEXTS.INTRO}</h1>
      <AuthForm />
    </>
  );
}
