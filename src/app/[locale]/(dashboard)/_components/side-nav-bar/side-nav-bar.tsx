import { Link } from '@/i18n/navigation';
import React from 'react';

const navBarLink = [
  { href: '/client', title: 'REST Client' },
  { href: '/history', title: 'History' },
  { href: '/variables', title: 'Variables' },
];

export function SideNavBar() {
  return (
    <div className="flex h-full w-70 flex-col justify-center gap-5 p-10">
      {navBarLink.map((link) => (
        <Link href={link.href} key={link.title}>
          {link.title}
        </Link>
      ))}
    </div>
  );
}
