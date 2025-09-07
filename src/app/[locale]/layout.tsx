import type { Locale } from 'next-intl';

import { clsx } from 'clsx';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { routing } from '@/i18n/routing';
import { isLocale } from '@/utils/type-guards';

import { AppLayout } from './_components/app-layout';
import { geistMono, geistSans } from './fonts';
import './globals.css';
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

  if (!isLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className={clsx(geistSans.variable, geistMono.variable, 'dark antialiased')}>
        <Providers locale={locale}>
          <AppLayout>{children}</AppLayout>
        </Providers>
      </body>
    </html>
  );
}
