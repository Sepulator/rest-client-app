'use client';

import { Button, cn } from '@heroui/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { links } from '@/features/side-bar/ui/links-list';
import { SidebarHeader } from '@/features/side-bar/ui/sidebar-header';
import { SidebarLink } from '@/features/side-bar/ui/sidebar-link';
import { SidebarList } from '@/features/side-bar/ui/sidebar-list';
import { SidebarTrigger } from '@/features/side-bar/ui/sidebar-trigger';

type SideNavBarProps = {
  tempLogout: () => void;
};

export function Sidebar({ tempLogout }: SideNavBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('userActions');

  const toggleSidebar = () => {
    setIsOpen((previous) => !previous);
  };

  return (
    <aside
      data-closed={!isOpen}
      role="navigation"
      className={cn(
        'group sticky top-16 z-20 mb-5 flex max-h-[75vh] w-full flex-col justify-center px-6',
        'bg-background/80 border-divider border-b-1 backdrop-blur-lg',
        'md:top-24 md:w-80 md:border-b-0 md:bg-transparent md:data-[closed=true]:w-22',
        'duration-400 ease-in-out'
      )}
    >
      <SidebarHeader
        title={t('actions.menu')}
        menuTrigger={
          <SidebarTrigger
            toggleSidebar={toggleSidebar}
            ariaLabel={isOpen ? t('actions.menuClose') : t('actions.menuOpen')}
          />
        }
      />

      <SidebarList
        itemData={[...links]}
        renderItem={({ href, Icon, key }) => <SidebarLink href={href} Icon={Icon} title={t(`navigation.${key}`)} />}
        appendItems={[
          <Button
            key="tempButton"
            className="w-full group-data-[closed=true]:invisible group-data-[closed=true]:opacity-0"
            onPress={tempLogout}
          >
            {t('actions.logout')}
          </Button>,
        ]}
      />
    </aside>
  );
}
