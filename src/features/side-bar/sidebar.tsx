import { Button, cn } from '@heroui/react';
import { useState } from 'react';

import { links } from '@/features/side-bar/links-list';
import { SidebarHeader } from '@/features/side-bar/sidebar-header';
import { SidebarLink } from '@/features/side-bar/sidebar-link';
import { SidebarList } from '@/features/side-bar/sidebar-list';

type SideNavBarProps = {
  tempLogout: () => void;
};

export function Sidebar({ tempLogout }: SideNavBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((previous) => !previous);
  };

  return (
    <aside
      data-closed={!isOpen}
      role="navigation"
      className={cn(
        'group sticky top-16 z-20 mb-5 flex max-h-[75vh] w-full flex-col justify-center px-6',
        'dark:bg-background/80 border-divider border-b-1 backdrop-blur-lg',
        'md:top-20 md:w-80 md:border-b-0 md:bg-transparent md:data-[closed=true]:w-22',
        'duration-400 ease-in-out'
      )}
    >
      <SidebarHeader toggleSidebar={toggleSidebar} title="Menu" />
      <SidebarList
        itemData={links}
        renderItem={(link) => <SidebarLink {...link} />}
        appendItems={[
          <Button
            key="tempButton"
            className="w-full group-data-[closed=true]:invisible group-data-[closed=true]:opacity-0"
            onPress={tempLogout}
          >
            Temp Logout remove later
          </Button>,
        ]}
      />
    </aside>
  );
}
