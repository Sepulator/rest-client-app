import { cn } from '@heroui/react';

import { Link } from '@/i18n/navigation';

type HeaderLinkProps = {
  href: string;
  title: string;
  isMobile?: boolean;
};

export function HeaderLink({ href, title, isMobile }: HeaderLinkProps) {
  return (
    <Link href={href} className={cn('text-small', isMobile && 'block w-full gap-4 text-2xl')}>
      {title}
    </Link>
  );
}
