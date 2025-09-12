import { NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@heroui/navbar';
import { Button, cn } from '@heroui/react';
import { useTranslations } from 'next-intl';

import { HeaderLink } from '@/components/header/ui/header-link';
import { LangToggle } from '@/components/header/ui/lang-toggle';
import { ROUTES } from '@/config/routes';
import { useAuth } from '@/stores/auth-context/use-auth';

const navLinks = {
  base: [{ href: ROUTES.MAIN, key: 'home' }],
  auth: [
    { href: ROUTES.LOGIN, key: 'login' },
    { href: ROUTES.SIGN_UP, key: 'signUp' },
  ],
} as const;

type HeaderNavProps = {
  isMenuOpen: boolean;
  checkIsActive: (href: string) => boolean;
};

export function HeaderNav({ isMenuOpen, checkIsActive }: HeaderNavProps) {
  const { user, logout } = useAuth();
  const links = user ? navLinks.base : [...navLinks.base, ...navLinks.auth];
  const t = useTranslations('userActions');

  const renderAuthNav = (isMobile?: boolean) => {
    const Wrapper = isMobile ? NavbarMenuItem : NavbarItem;

    return (
      <>
        {links.map(({ key, href }, index) => {
          if (!isMobile && href === ROUTES.MAIN) {
            return;
          }

          return (
            <Wrapper key={isMobile ? `${key}-${index.toString()}` : key} isActive={checkIsActive(href)}>
              <HeaderLink title={t(`navigation.${key}`)} href={href} isMobile={isMobile} />
            </Wrapper>
          );
        })}

        {user && (
          <Button
            variant="flat"
            onPress={logout}
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
