import type { Locale } from 'next-intl';

import { cn } from '@heroui/react';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { routing } from '@/i18n/routing';
import { mockUser } from '@/testing/mocks/user';
import { isLocale } from '@/utils/type-guards';

import './globals.css';
import { AppLayout } from './_components/app-layout';
import { geistMono, geistSans } from './fonts';
import { Providers } from './providers';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  const t = await getTranslations({
    locale: locale,
    namespace: 'LocaleLayout',
  });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params;
  const messages = await getMessages();
  const user = mockUser;

  if (!isLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className={cn(geistSans.variable, geistMono.variable, 'dark text-foreground bg-background antialiased')}>
        <Providers locale={locale} messages={messages} userData={user}>
          <AppLayout>{children}</AppLayout>
        </Providers>
      </body>
    </html>
  );
}
