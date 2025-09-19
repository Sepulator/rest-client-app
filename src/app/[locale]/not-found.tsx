import { useTranslations } from 'next-intl';
import Image from 'next/image';

import notFound from '@/assets/images/404.svg';
import { ROUTES } from '@/config/routes';
import { Link } from '@/i18n/navigation';
import { safeSource } from '@/utils/safe-source';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <section className="relative flex min-h-full flex-1 flex-col items-center justify-center gap-10 px-6 text-center">
      <div className="relative h-1/7 w-1/2 md:h-1/5">
        <Image fill alt={t('404')} aria-hidden="true" src={safeSource(notFound)} priority className="z-10" />
      </div>
      <div>
        <h2 className="mb-3 text-5xl">{t('title')}</h2>
        <p>{t('description')}</p>
      </div>

      <Link
        className="bg-primary-300 hover:bg-primary/90 rounded-medium w-50 px-5 py-2 text-sm font-medium transition-colors"
        href={ROUTES.MAIN}
      >
        {t('goHome')}
      </Link>
    </section>
  );
}
