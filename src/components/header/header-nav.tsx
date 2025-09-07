import { NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@heroui/navbar';
import { Button, cn } from '@heroui/react';
import React, { useState } from 'react';

import { LangToggle } from '@/components/header/lang-toggle';
import { ROUTES } from '@/config/routes';
import { Link } from '@/i18n/navigation';

const navLinks = {
  base: [{ href: ROUTES.HOME, title: 'Home' }],
  auth: [
    { href: ROUTES.LOGIN, title: 'Login' },
    { href: ROUTES.SIGN_UP, title: 'Sign Up' },
  ],
};

type HeaderNavProps = {
  isMenuOpen: boolean;
  checkIsActive: (href: string) => boolean;
};

export function HeaderNav({ isMenuOpen, checkIsActive }: HeaderNavProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const links = isLoggedIn ? navLinks.base : [...navLinks.base, ...navLinks.auth];

  const fakeLogout = () => {
    setIsLoggedIn(false);
  };

  const renderAuthNav = (isMobile?: boolean) => {
    const Wrapper = isMobile ? NavbarMenuItem : NavbarItem;

    return (
      <>
        {links.map(({ title, href }, index) => {
          if (!isMobile && href === ROUTES.HOME) return;

          return (
            <Wrapper key={isMobile ? `${title}-${index.toString()}` : title} isActive={checkIsActive(href)}>
              <Link href={href} className={cn(isMobile && 'block w-full gap-4 text-2xl')}>
                {title}
              </Link>
            </Wrapper>
          );
        })}

        {isLoggedIn && (
          <Button
            variant="flat"
            onPress={fakeLogout}
            className={cn('text-foreground-700 hidden sm:flex', isMobile && 'flex p-6')}
          >
            Logout
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
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="sm:hidden" />
      </NavbarContent>

      <NavbarMenu className="justify-center overflow-clip">{renderAuthNav(true)}</NavbarMenu>
    </>
  );
}
