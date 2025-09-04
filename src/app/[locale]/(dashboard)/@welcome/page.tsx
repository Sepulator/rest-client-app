import { getTranslations } from 'next-intl/server';

import { AuthNav } from '@/components/auth-nav';

export default async function WelcomePage() {
  const t = await getTranslations('WelcomePage');

  return (
    <section className="flex h-full flex-1 flex-col items-center justify-center gap-4">
      <h1>{t('title')}</h1>
      <AuthNav />
    </section>
  );
}
