import { NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@heroui/navbar';
import { Button, cn } from '@heroui/react';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import { HeaderLink } from '@/components/header/header-link';
import { LangToggle } from '@/components/header/lang-toggle';
import { ROUTES } from '@/config/routes';

const navLinks = {
  base: [{ href: ROUTES.MAIN, key: 'home' }],
  auth: [
    { href: ROUTES.LOGIN, key: 'login' },
    { href: ROUTES.SIGN_UP, key: 'sign-up' },
  ],
} as const;

type HeaderNavProps = {
  isMenuOpen: boolean;
  checkIsActive: (href: string) => boolean;
};

export function HeaderNav({ isMenuOpen, checkIsActive }: HeaderNavProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const links = isLoggedIn ? navLinks.base : [...navLinks.base, ...navLinks.auth];
  const t = useTranslations('userActions');

  const fakeLogout = () => {
    setIsLoggedIn(false);
  };

  const renderAuthNav = (isMobile?: boolean) => {
    const Wrapper = isMobile ? NavbarMenuItem : NavbarItem;

    return (
      <>
        {links.map(({ key, href }, index) => {
          if (!isMobile && href === ROUTES.MAIN) return;

          return (
            <Wrapper key={isMobile ? `${key}-${index.toString()}` : key} isActive={checkIsActive(href)}>
              <HeaderLink title={t(`navigation.${key}`)} href={href} isMobile={isMobile} />
            </Wrapper>
          );
        })}

        {isLoggedIn && (
          <Button
            variant="flat"
            onPress={fakeLogout}
            className={cn('text-foreground-700 hidden sm:flex', isMobile && 'flex p-6')}
          >
            {t('actions.logout')}
          </Button>
        )}
      </>
    );
  };

  return (
    <>
      <NavbarContent justify="end">
        {renderAuthNav()}
        <LangToggle />
        <NavbarMenuToggle
          aria-label={isMenuOpen ? t('actions.menuClose') : t('actions.menuOpen')}
          className="sm:hidden"
        />
      </NavbarContent>

      <NavbarMenu className="justify-center overflow-clip">{renderAuthNav(true)}</NavbarMenu>
    </>
  );
}
