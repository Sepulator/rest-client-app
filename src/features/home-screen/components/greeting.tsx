import { AuthNav } from '@/components/auth-nav';

type GreetingProps = {
  userName?: string;
  dayOfWeek?: string;
};

const TEXTS = {
  WELCOME: (userName?: string) => `Welcome ${userName ? 'back' : ''}`,
  GREETING_FALLBACK: 'please login',
};

export function Greeting({ dayOfWeek, userName }: GreetingProps) {
  const title = TEXTS.WELCOME(userName);
  const greeting = userName ?? TEXTS.GREETING_FALLBACK;

  return (
    <div className="mb-16">
      <h1 className="mb-4 text-2xl font-bold">
        {title}, <span className="text-primary-500">{greeting}</span>
      </h1>
      {dayOfWeek && <p>Happy {dayOfWeek}</p>}
      {!userName && <AuthNav />}
    </div>
  );
}
