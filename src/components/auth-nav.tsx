import { useTranslations } from 'next-intl';

import { ROUTES } from '@/config/routes';
import { Link } from '@/i18n/navigation';

export function AuthNav() {
  const t = useTranslations('userActions.navigation');

  return (
    <div className="flex gap-5">
      <Link href={ROUTES.LOGIN}>{t('login')}</Link>
      <Link href={ROUTES.SIGN_UP}>{t('signUp')}</Link>
    </div>
  );
}
