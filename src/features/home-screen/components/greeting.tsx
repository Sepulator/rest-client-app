import type { ReactNode } from 'react';

import { useTranslations } from 'next-intl';

import { AuthNav } from '@/components/auth-nav';
import { CalendarIcon } from '@/components/icons/calendar';

type GreetingProps = {
  user?: { name: string; email: string };
  dayOfWeek?: string;
};

export function Greeting({ dayOfWeek, user }: GreetingProps) {
  const t = useTranslations('HomePage.greeting');

  const renderRichText = (message: 'user' | 'guest', values?: { name: string }) => {
    const tags = {
      i: (chunks: ReactNode) => <span className="text-primary whitespace-nowrap">{chunks}</span>,
    };

    return t.rich(message, { ...tags, ...values });
  };

  return (
    <div className="mb-30 flex w-full flex-col-reverse justify-between md:flex-row">
      {user ? (
        <div>
          <h1>{renderRichText('user', { name: user.name })}</h1>
          <p className="text-medium text-secondary-800 dark:text-secondary">{user.email}</p>
        </div>
      ) : (
        <div>
          <h1>{renderRichText('guest')}</h1>
          <AuthNav />
        </div>
      )}

      {dayOfWeek && (
        <div className="mb-4 flex h-fit items-center gap-2">
          <CalendarIcon className="text-primary" />
          {dayOfWeek}
        </div>
      )}
    </div>
  );
}
