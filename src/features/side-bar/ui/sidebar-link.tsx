import type { JSX, SVGProps } from 'react';

import { cn } from '@heroui/react';

import { Link, usePathname } from '@/i18n/navigation';

type SidebarLinkProps = {
  title: string;
  href: string;
  Icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
};

export function SidebarLink({ title, href, Icon }: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      aria-current={isActive && 'page'}
      tabIndex={isActive ? -1 : 0}
      className={cn(
        'border-default-700 hover:bg-default-300/50 flex rounded-lg border-l-4',
        'group-data-[closed=true]:pointer-events-none group-data-[closed=true]:border-l-0',
        'md:group-data-[closed=true]:pointer-events-auto',
        'duration-50',
        isActive ? 'border-primary pointer-events-none opacity-100' : 'opacity-70'
      )}
    >
      <div
        className={cn(
          'flex translate-x-3 transform gap-3 p-2',
          'duration-200',
          'group-data-[closed=true]:translate-x-0 group-data-[closed=true]:opacity-0 md:group-data-[closed=true]:opacity-100'
        )}
      >
        {Icon && <Icon className={cn(isActive && 'text-primary')} />}
        <span className={cn('truncate whitespace-nowrap', 'group-data-[closed=true]:w-0')}>{title}</span>
      </div>
    </Link>
  );
}
