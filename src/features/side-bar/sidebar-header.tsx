import { Button, cn } from '@heroui/react';

import { ChevronIcon } from '@/components/icons/chevron';

type SidebarHeaderProps = {
  toggleSidebar: () => void;
  title: string;
};

export function SidebarHeader({ toggleSidebar, title }: SidebarHeaderProps) {
  return (
    <div
      className={cn(
        'absolute top-2 left-0 mb-2 flex w-full items-center justify-between px-6',
        'md:group-data-[closed=true]:justify-center'
      )}
    >
      <div className="truncate md:group-data-[closed=true]:opacity-0">{title}</div>
      <Button isIconOnly onPress={toggleSidebar} variant="light">
        <ChevronIcon
          className={cn(
            'rotate-90 transform duration-500 group-data-[closed=true]:rotate-270',
            'md:rotate-0 md:group-data-[closed=true]:rotate-180'
          )}
        />
      </Button>
    </div>
  );
}
