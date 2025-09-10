import type { ReactNode } from 'react';

import { cn } from '@heroui/react';

type SidebarHeaderProps = {
  title: string;
  menuTrigger: ReactNode;
};

export function SidebarHeader({ menuTrigger, title }: SidebarHeaderProps) {
  return (
    <div
      className={cn(
        'top-1 left-0 flex w-full items-center justify-between',
        'md:absolute md:px-6 md:group-data-[closed=true]:justify-center'
      )}
    >
      <div className="text-default-foreground truncate md:group-data-[closed=true]:invisible md:group-data-[closed=true]:opacity-0">
        {title}
      </div>
      {menuTrigger}
    </div>
  );
}
