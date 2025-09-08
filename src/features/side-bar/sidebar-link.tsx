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
      className={cn(
        'flex rounded-lg border-l-4 border-gray-700 hover:bg-gray-500/20',
        'group-data-[closed=true]:border-l-0',
        isActive ? 'border-primary pointer-events-none opacity-100' : 'opacity-70'
      )}
    >
      <div
        className={cn(
          'flex translate-x-3 transform gap-3 p-2',
          'group-data-[closed=true]:translate-x-0 group-data-[closed=true]:opacity-0 md:group-data-[closed=true]:opacity-100'
        )}
      >
        {Icon && <Icon className={cn(isActive && 'text-primary-500')} />}
        <span className={cn('truncate whitespace-nowrap', 'group-data-[closed=true]:w-0')}>{title}</span>
      </div>
    </Link>
  );
}
