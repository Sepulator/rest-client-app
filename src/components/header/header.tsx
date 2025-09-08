'use client';

import { cn, Navbar, NavbarContent, NavbarItem } from '@heroui/react';
import React, { useEffect, useState } from 'react';

import { HeaderLink } from '@/components/header/header-link';
import { HeaderNav } from '@/components/header/header-nav';
import { Logo } from '@/components/header/logo';
import { ROUTES } from '@/config/routes';
import { useChangeOnScroll } from '@/hooks/use-change-on-scroll';
import { usePathname } from '@/i18n/navigation';

const linkClasses = [
  'transition-all duration-300 ease-in-out',
  'opacity-70',
  'data-[active=true]:pointer-events-none',
  'data-[active=true]:opacity-100',
  'data-[active=true]:text-primary ',
  'hover:opacity-100',
];

const SCROLL_OFFSET = 50;
const THROTTLE_DELAY = 50;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const decorate = useChangeOnScroll(SCROLL_OFFSET, THROTTLE_DELAY);

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
        item: [...linkClasses, 'hidden sm:flex', 'data-[active=true]:font-normal'],
        menuItem: [...linkClasses, 'w-full p-5 text-center text-xl'],
        content: ['gap-8'],
        wrapper: ['transition-all duration-200 ease-in-out max-w-screen-2xl'],
      }}
    >
      <NavbarContent>
        <Logo />
        <NavbarItem isActive={checkIsActive(ROUTES.HOME)}>
          <HeaderLink href={ROUTES.HOME} title="Home" />
        </NavbarItem>
      </NavbarContent>

      <HeaderNav isMenuOpen={isMenuOpen} checkIsActive={checkIsActive} />
    </Navbar>
  );
}
