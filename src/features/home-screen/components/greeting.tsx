import { AuthNav } from '@/components/auth-nav';
import { CalendarIcon } from '@/components/icons/calendar';

type GreetingProps = {
  user?: { name: string; email: string };
  dayOfWeek?: string;
};

const TEXTS = {
  WELCOME: (userName?: string) => `Welcome${userName ? ' back' : ''}`,
  GREETING_FALLBACK: 'please login',
};

export function Greeting({ dayOfWeek, user }: GreetingProps) {
  const title = TEXTS.WELCOME(user?.name);
  const greeting = user?.name ?? TEXTS.GREETING_FALLBACK;

  return (
    <div className="mb-30 flex w-full flex-col-reverse justify-between md:flex-row">
      <div>
        <h1 className="mb-2 font-bold">
          {title}, <span className="text-primary whitespace-nowrap">{greeting}👋</span>
        </h1>
        {user ? <p className="text-medium text-secondary-800 dark:text-secondary">{user.email}</p> : <AuthNav />}
      </div>

      {dayOfWeek && (
        <div className="mb-4 flex h-fit items-center gap-2">
          <CalendarIcon className="text-primary" />
          {dayOfWeek}
        </div>
      )}
    </div>
  );
}
