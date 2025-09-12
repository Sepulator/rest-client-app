'use client';

import { cn, Navbar, NavbarContent, NavbarItem } from '@heroui/react';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import { HeaderLink } from '@/components/header/ui/header-link';
import { HeaderNav } from '@/components/header/ui/header-nav';
import { Logo } from '@/components/header/ui/logo';
import { ROUTES } from '@/config/routes';
import { useScrollState } from '@/hooks/use-scroll-state/use-scroll-state';
import { usePathname } from '@/i18n/navigation';

const SCROLL_OFFSET = 50;
const THROTTLE_DELAY = 50;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const decorate = useScrollState(SCROLL_OFFSET, THROTTLE_DELAY);
  const t = useTranslations('userActions.navigation');

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const checkIsActive = (href: string) => {
    return pathname === href;
  };

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      isBordered={decorate}
      maxWidth="full"
      className={cn(decorate && 'bg-default-100/50')}
      classNames={{
        item: ['link header-link', 'hidden sm:flex', 'data-[active=true]:font-normal'],
        menuItem: ['link header-link', 'w-full p-5 text-center text-xl'],
        content: ['gap-8'],
        wrapper: ['transition-all duration-200 ease-in-out max-w-screen-2xl'],
      }}
    >
      <NavbarContent>
        <Logo />
        <NavbarItem isActive={checkIsActive(ROUTES.MAIN)}>
          <HeaderLink href={ROUTES.MAIN} title={t('home')} />
        </NavbarItem>
      </NavbarContent>

      <HeaderNav isMenuOpen={isMenuOpen} checkIsActive={checkIsActive} />
    </Navbar>
  );
}
