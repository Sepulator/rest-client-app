import { Button, cn } from '@heroui/react';

import { ChevronIcon } from '@/components/icons/chevron';

type SidebarTriggerProps = {
  toggleSidebar: () => void;
  ariaLabel: string;
};

export function SidebarTrigger({ toggleSidebar, ariaLabel }: SidebarTriggerProps) {
  return (
    <Button isIconOnly aria-label={ariaLabel} onPress={toggleSidebar} variant="light">
      <ChevronIcon
        className={cn(
          'rotate-90 transform duration-500 group-data-[closed=true]:rotate-270',
          'md:rotate-0 md:group-data-[closed=true]:rotate-180'
        )}
      />
    </Button>
  );
}
