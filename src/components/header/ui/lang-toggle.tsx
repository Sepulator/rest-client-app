import type { Key } from 'react';

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@heroui/react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'use-intl';

import { LangIcon } from '@/components/icons/lang-icon';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { isLocale } from '@/utils/type-guards';

export function LangToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations('Header');

  const handleChange = (locale: Key) => {
    if (typeof locale !== 'string' || !isLocale(locale)) {
      return;
    }
    const query = Object.fromEntries(searchParams.entries());

    router.replace({ pathname, query }, { locale });
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly variant="flat" aria-label={t('chooseLanguage')}>
          <LangIcon className="text-xl" />
        </Button>
      </DropdownTrigger>

      <DropdownMenu onAction={handleChange}>
        {routing.locales.map((locale) => (
          <DropdownItem
            classNames={{ base: 'data-[hover=true]:hover:bg-default-300/50' }}
            key={locale}
            endContent={<span className="text-primary ml-auto text-xs">{locale.toUpperCase()}</span>}
          >
            {t(`locales.${locale}`)}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
