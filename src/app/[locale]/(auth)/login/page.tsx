import { LoginForm } from '@/components/login-form/login-form';

const TEXTS = {
  INTRO: 'Welcome back! Please, login',
};

export default function LoginPage() {
  return (
    <div>
      <h1>{TEXTS.INTRO}</h1>
      <LoginForm />
    </div>
  );
}
